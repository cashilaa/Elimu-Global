import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { S3 } from 'aws-sdk';
import { ConfigService } from '@nestjs/config';
import { File } from './file.schema';

@Injectable()
export class FileService {
  private s3: S3;
  private readonly bucketName: string;

  constructor(
    @InjectModel(File.name) private fileModel: Model<File>,
    private configService: ConfigService,
  ) {
    this.bucketName = this.configService.get('AWS_BUCKET_NAME') || '';
    if (!this.bucketName) {
      throw new Error('AWS_BUCKET_NAME is not configured');
    }

    this.s3 = new S3({
      accessKeyId: this.configService.get('AWS_ACCESS_KEY_ID'),
      secretAccessKey: this.configService.get('AWS_SECRET_ACCESS_KEY'),
      region: this.configService.get('AWS_REGION'),
    });
  }

  async uploadFile(file: Express.Multer.File, courseId: string, userId: string) {
    const { originalname, mimetype, buffer } = file;
    const key = `courses/${courseId}/${Date.now()}-${originalname}`;

    const uploadResult = await this.s3.upload({
      Bucket: this.bucketName,
      Key: key,
      Body: buffer,
      ContentType: mimetype,
      ACL: 'private',
    }).promise();

    const newFile = new this.fileModel({
      name: originalname,
      key,
      url: uploadResult.Location,
      courseId,
      uploadedBy: userId,
      type: mimetype,
      size: buffer.length,
    });

    return newFile.save();
  }

  async getFilesByUser(userId: string) {
    return this.fileModel.find({ uploadedBy: userId })
      .sort('-createdAt')
      .populate('courseId', 'title');
  }

  async getFilesByCourse(courseId: string) {
    return this.fileModel.find({ courseId })
      .sort('-createdAt')
      .populate('uploadedBy', 'firstName lastName');
  }

  async deleteFile(fileId: string, userId: string) {
    const file = await this.fileModel.findOne({ _id: fileId, uploadedBy: userId });
    if (!file) {
      throw new BadRequestException('File not found or unauthorized');
    }

    await this.s3.deleteObject({
      Bucket: this.bucketName,
      Key: file.key,
    }).promise();

    return this.fileModel.findByIdAndDelete(fileId);
  }

  async getSignedUrl(fileId: string, userId: string) {
    const file = await this.fileModel.findOne({ _id: fileId });
    if (!file) {
      throw new BadRequestException('File not found');
    }

    return this.s3.getSignedUrlPromise('getObject', {
      Bucket: this.bucketName,
      Key: file.key,
      Expires: 3600, // URL expires in 1 hour
    });
  }
} 