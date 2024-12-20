import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { S3 } from 'aws-sdk';
import { ConfigService } from '@nestjs/config';
import ffmpeg from 'fluent-ffmpeg';
import { Video } from './video.schema';

@Injectable()
export class VideoService {
  private s3: S3;
  private readonly bucketName: string;

  constructor(
    @InjectModel(Video.name) private videoModel: Model<Video>,
    private configService: ConfigService,
  ) {
    const bucketName = this.configService.get<string>('AWS_BUCKET_NAME');
    if (!bucketName) {
      throw new Error('AWS_BUCKET_NAME is not configured');
    }
    this.bucketName = bucketName;

    this.s3 = new S3({
      accessKeyId: this.configService.get<string>('AWS_ACCESS_KEY_ID'),
      secretAccessKey: this.configService.get<string>('AWS_SECRET_ACCESS_KEY'),
      region: this.configService.get<string>('AWS_REGION'),
    });
  }

  async uploadVideo(file: Express.Multer.File, courseId: string, userId: string) {
    // Check video duration
    const duration = await this.getVideoDuration(file.path);
    if (duration > 300) { // 5 minutes in seconds
      throw new BadRequestException('Video must be 5 minutes or less');
    }

    // Generate thumbnail
    const thumbnailPath = await this.generateThumbnail(file.path);

    // Upload to S3
    const key = `courses/${courseId}/videos/${Date.now()}-${file.originalname}`;
    const thumbnailKey = `${key}-thumbnail.jpg`;

    const [videoUpload, thumbnailUpload] = await Promise.all([
      this.s3.upload({
        Bucket: this.bucketName,
        Key: key,
        Body: file.buffer,
        ContentType: file.mimetype,
      }).promise(),
      this.s3.upload({
        Bucket: this.bucketName,
        Key: thumbnailKey,
        Body: thumbnailPath,
        ContentType: 'image/jpeg',
      }).promise(),
    ]);

    // Create video record
    const video = new this.videoModel({
      title: file.originalname,
      courseId,
      uploadedBy: userId,
      duration,
      url: videoUpload.Location,
      thumbnailUrl: thumbnailUpload.Location,
      status: 'processing',
    });

    await video.save();

    // Process video (transcoding, etc.)
    this.processVideo(video.id, file.path);

    return video;
  }

  private async getVideoDuration(filePath: string): Promise<number> {
    return new Promise((resolve, reject) => {
      ffmpeg.ffprobe(filePath, (err: Error | null, metadata: any) => {
        if (err) reject(err);
        if (!metadata?.format?.duration) {
          reject(new Error('Could not determine video duration'));
          return;
        }
        resolve(metadata.format.duration);
      });
    });
  }

  private async generateThumbnail(filePath: string): Promise<string> {
    const thumbnailPath = `${filePath}-thumbnail.jpg`;
    return new Promise((resolve, reject) => {
      ffmpeg(filePath)
        .screenshots({
          timestamps: ['50%'],
          filename: thumbnailPath,
          size: '320x240'
        })
        .on('end', () => resolve(thumbnailPath))
        .on('error', reject);
    });
  }

  private async processVideo(videoId: string, filePath: string) {
    try {
      const qualities = [
        { resolution: '720p', bitrate: '2500k' },
        { resolution: '480p', bitrate: '1500k' },
        { resolution: '360p', bitrate: '1000k' }
      ];

      for (const quality of qualities) {
        const outputPath = `${filePath}-${quality.resolution}.mp4`;
        await this.transcodeVideo(filePath, outputPath, quality);

        const key = `videos/${videoId}/${quality.resolution}.mp4`;
        await this.s3.upload({
          Bucket: this.bucketName,
          Key: key,
          Body: outputPath,
          ContentType: 'video/mp4',
        }).promise();
      }

      await this.videoModel.findByIdAndUpdate(videoId, {
        status: 'ready',
        qualities: qualities.map(q => q.resolution)
      });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
      await this.videoModel.findByIdAndUpdate(videoId, {
        status: 'failed',
        error: errorMessage
      });
    }
  }

  private async transcodeVideo(input: string, output: string, quality: { resolution: string, bitrate: string }) {
    return new Promise((resolve, reject) => {
      ffmpeg(input)
        .outputOptions([
          `-c:v libx264`,
          `-b:v ${quality.bitrate}`,
          `-vf scale=-2:${quality.resolution.replace('p', '')}`,
          `-c:a aac`,
          `-b:a 128k`
        ])
        .output(output)
        .on('end', resolve)
        .on('error', reject)
        .run();
    });
  }

  async getVideosForCourse(courseId: string, status?: string) {
    const query: any = { courseId };
    if (status) {
      query.status = status;
    }
    return this.videoModel.find(query)
      .sort('-createdAt')
      .populate('uploadedBy', 'firstName lastName');
  }

  async getVideo(id: string) {
    const video = await this.videoModel.findById(id)
      .populate('uploadedBy', 'firstName lastName')
      .populate('courseId', 'title');
    
    if (!video) {
      throw new NotFoundException('Video not found');
    }
    return video;
  }

  async updateVideo(id: string, updateData: any, userId: string) {
    const video = await this.videoModel.findOne({ _id: id, uploadedBy: userId });
    if (!video) {
      throw new NotFoundException('Video not found or unauthorized');
    }

    Object.assign(video, updateData);
    return video.save();
  }

  async deleteVideo(id: string, userId: string) {
    const video = await this.videoModel.findOne({ _id: id, uploadedBy: userId });
    if (!video) {
      throw new NotFoundException('Video not found or unauthorized');
    }

    // Delete from S3
    await this.s3.deleteObject({
      Bucket: this.bucketName,
      Key: this.getKeyFromUrl(video.url),
    }).promise();

    // Delete thumbnail if exists
    if (video.thumbnailUrl) {
      await this.s3.deleteObject({
        Bucket: this.bucketName,
        Key: this.getKeyFromUrl(video.thumbnailUrl),
      }).promise();
    }

    // Delete transcoded versions
    for (const quality of video.qualities || []) {
      await this.s3.deleteObject({
        Bucket: this.bucketName,
        Key: `videos/${id}/${quality}.mp4`,
      }).promise();
    }

    return this.videoModel.findByIdAndDelete(id);
  }

  async recordView(id: string, userId: string) {
    return this.videoModel.findByIdAndUpdate(
      id,
      { $inc: { views: 1 } },
      { new: true }
    );
  }

  async toggleLike(id: string, userId: string) {
    const video = await this.videoModel.findById(id);
    if (!video) {
      throw new NotFoundException('Video not found');
    }

    const userIdObj = new Types.ObjectId(userId);
    const hasLiked = video.likes.includes(userIdObj);

    if (hasLiked) {
      video.likes = video.likes.filter(id => !id.equals(userIdObj));
    } else {
      video.likes.push(userIdObj);
    }

    return video.save();
  }

  async getStreamUrl(id: string, quality: string, userId: string) {
    const video = await this.videoModel.findById(id);
    if (!video) {
      throw new NotFoundException('Video not found');
    }

    // Check if user has access to this video
    // Implement your access control logic here

    const key = quality ? 
      `videos/${id}/${quality}.mp4` :
      this.getKeyFromUrl(video.url);

    return this.s3.getSignedUrlPromise('getObject', {
      Bucket: this.bucketName,
      Key: key,
      Expires: 3600, // URL expires in 1 hour
    });
  }

  private getKeyFromUrl(url: string): string {
    return url.split('.com/')[1];
  }
} 