import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Resource } from './resource.schema';
import { FileService } from '../file/file.service';

@Injectable()
export class ResourceService {
  constructor(
    @InjectModel(Resource.name) private resourceModel: Model<Resource>,
    private fileService: FileService,
  ) {}

  async createResource(resourceData: any, file?: Express.Multer.File) {
    let fileUrl = '';
    if (file) {
      const uploadedFile = await this.fileService.uploadFile(
        file,
        resourceData.courseId,
        resourceData.uploadedBy
      );
      fileUrl = uploadedFile.url;
    }

    const resource = new this.resourceModel({
      ...resourceData,
      fileUrl,
      type: file ? this.getResourceType(file.mimetype) : 'link',
    });

    return resource.save();
  }

  async getResourcesByCategory(category: string) {
    return this.resourceModel.find({ category })
      .populate('uploadedBy', 'firstName lastName')
      .sort('-createdAt');
  }

  async getResourcesByCourse(courseId: string) {
    return this.resourceModel.find({ courseId })
      .populate('uploadedBy', 'firstName lastName')
      .sort('-createdAt');
  }

  async searchResources(query: string) {
    return this.resourceModel.find({
      $or: [
        { title: { $regex: query, $options: 'i' } },
        { description: { $regex: query, $options: 'i' } },
        { tags: { $in: [new RegExp(query, 'i')] } },
      ],
    }).populate('uploadedBy', 'firstName lastName');
  }

  async updateResource(resourceId: string, updateData: any) {
    const resource = await this.resourceModel.findById(resourceId);
    if (!resource) {
      throw new BadRequestException('Resource not found');
    }

    Object.assign(resource, updateData);
    return resource.save();
  }

  async deleteResource(resourceId: string) {
    const resource = await this.resourceModel.findById(resourceId);
    if (!resource) {
      throw new BadRequestException('Resource not found');
    }

    if (resource.fileUrl) {
      await this.fileService.deleteFile(resourceId, resource.uploadedBy.toString());
    }

    return this.resourceModel.findByIdAndDelete(resourceId);
  }

  private getResourceType(mimetype: string): string {
    if (mimetype.startsWith('image/')) return 'image';
    if (mimetype.startsWith('video/')) return 'video';
    if (mimetype.startsWith('audio/')) return 'audio';
    if (mimetype.includes('pdf')) return 'pdf';
    return 'document';
  }
} 