import { Injectable, BadRequestException } from '@nestjs/common';
import { S3 } from 'aws-sdk';
import { ConfigService } from '@nestjs/config';
import { v4 as uuidv4 } from 'uuid';
import * as ffmpeg from 'fluent-ffmpeg';
import * as fs from 'fs';
import * as path from 'path';
import { promisify } from 'util';

const writeFile = promisify(fs.writeFile);
const unlink = promisify(fs.unlink);

@Injectable()
export class UploadService {
  private s3: S3;
  private readonly MAX_VIDEO_DURATION = 600; // 10 minutes in seconds

  constructor(private configService: ConfigService) {
    this.s3 = new S3({
      accessKeyId: this.configService.get('AWS_ACCESS_KEY_ID'),
      secretAccessKey: this.configService.get('AWS_SECRET_ACCESS_KEY'),
      region: this.configService.get('AWS_REGION'),
    });
  }

  async validateVideo(file: Express.Multer.File): Promise<void> {
    const tempFilePath = path.join(__dirname, `${uuidv4()}.mp4`);
    await writeFile(tempFilePath, file.buffer);

    return new Promise((resolve, reject) => {
      ffmpeg.ffprobe(tempFilePath, (err: Error, metadata: ffmpeg.FfprobeData) => {
        unlink(tempFilePath).catch(console.error); // Clean up temp file

        if (err) {
          return reject(new BadRequestException('Invalid video file'));
        }

        const duration = metadata.format.duration;
        if (duration && duration > this.MAX_VIDEO_DURATION) {
          return reject(new BadRequestException('Video duration must not exceed 10 minutes'));
        }

        resolve();
      });
    });
  }

  async uploadFile(
    file: Express.Multer.File,
    folder: string,
  ): Promise<{ url: string; key: string }> {
    if (file.mimetype.startsWith('video/')) {
      await this.validateVideo(file);
    }

    const key = `${folder}/${uuidv4()}-${file.originalname}`;
    
    const params = {
      Bucket: this.configService.get('AWS_S3_BUCKET'),
      Key: key,
      Body: file.buffer,
      ContentType: file.mimetype,
      ACL: 'public-read',
    };

    const uploadResult = await this.s3.upload(params).promise();
    
    return {
      url: uploadResult.Location,
      key: uploadResult.Key,
    };
  }

  async deleteFile(key: string): Promise<void> {
    const params = {
      Bucket: this.configService.get('AWS_S3_BUCKET'),
      Key: key,
    };

    await this.s3.deleteObject(params).promise();
  }

  getSignedUrl(key: string): string {
    return this.s3.getSignedUrl('getObject', {
      Bucket: this.configService.get('AWS_S3_BUCKET'),
      Key: key,
      Expires: 3600, // URL expires in 1 hour
    });
  }

  // Helper method for video transcoding status check
  async checkTranscodingStatus(videoKey: string): Promise<string> {
    // Implement video transcoding status check
    // This could integrate with AWS Elastic Transcoder or similar service
    return 'completed';
  }
}
