"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResourceService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const resource_schema_1 = require("./resource.schema");
const file_service_1 = require("../file/file.service");
let ResourceService = class ResourceService {
    constructor(resourceModel, fileService) {
        this.resourceModel = resourceModel;
        this.fileService = fileService;
    }
    async createResource(resourceData, file) {
        let fileUrl = '';
        if (file) {
            const uploadedFile = await this.fileService.uploadFile(file, resourceData.courseId, resourceData.uploadedBy);
            fileUrl = uploadedFile.url;
        }
        const resource = new this.resourceModel(Object.assign(Object.assign({}, resourceData), { fileUrl, type: file ? this.getResourceType(file.mimetype) : 'link' }));
        return resource.save();
    }
    async getResourcesByCategory(category) {
        return this.resourceModel.find({ category })
            .populate('uploadedBy', 'firstName lastName')
            .sort('-createdAt');
    }
    async getResourcesByCourse(courseId) {
        return this.resourceModel.find({ courseId })
            .populate('uploadedBy', 'firstName lastName')
            .sort('-createdAt');
    }
    async searchResources(query) {
        return this.resourceModel.find({
            $or: [
                { title: { $regex: query, $options: 'i' } },
                { description: { $regex: query, $options: 'i' } },
                { tags: { $in: [new RegExp(query, 'i')] } },
            ],
        }).populate('uploadedBy', 'firstName lastName');
    }
    async updateResource(resourceId, updateData) {
        const resource = await this.resourceModel.findById(resourceId);
        if (!resource) {
            throw new common_1.BadRequestException('Resource not found');
        }
        Object.assign(resource, updateData);
        return resource.save();
    }
    async deleteResource(resourceId) {
        const resource = await this.resourceModel.findById(resourceId);
        if (!resource) {
            throw new common_1.BadRequestException('Resource not found');
        }
        if (resource.fileUrl) {
            await this.fileService.deleteFile(resourceId, resource.uploadedBy.toString());
        }
        return this.resourceModel.findByIdAndDelete(resourceId);
    }
    getResourceType(mimetype) {
        if (mimetype.startsWith('image/'))
            return 'image';
        if (mimetype.startsWith('video/'))
            return 'video';
        if (mimetype.startsWith('audio/'))
            return 'audio';
        if (mimetype.includes('pdf'))
            return 'pdf';
        return 'document';
    }
};
ResourceService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(resource_schema_1.Resource.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        file_service_1.FileService])
], ResourceService);
exports.ResourceService = ResourceService;
