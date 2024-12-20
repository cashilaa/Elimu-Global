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
exports.FileService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const aws_sdk_1 = require("aws-sdk");
const config_1 = require("@nestjs/config");
const file_schema_1 = require("./file.schema");
let FileService = class FileService {
    constructor(fileModel, configService) {
        this.fileModel = fileModel;
        this.configService = configService;
        this.bucketName = this.configService.get('AWS_BUCKET_NAME') || '';
        if (!this.bucketName) {
            throw new Error('AWS_BUCKET_NAME is not configured');
        }
        this.s3 = new aws_sdk_1.S3({
            accessKeyId: this.configService.get('AWS_ACCESS_KEY_ID'),
            secretAccessKey: this.configService.get('AWS_SECRET_ACCESS_KEY'),
            region: this.configService.get('AWS_REGION'),
        });
    }
    async uploadFile(file, courseId, userId) {
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
    async getFilesByUser(userId) {
        return this.fileModel.find({ uploadedBy: userId })
            .sort('-createdAt')
            .populate('courseId', 'title');
    }
    async getFilesByCourse(courseId) {
        return this.fileModel.find({ courseId })
            .sort('-createdAt')
            .populate('uploadedBy', 'firstName lastName');
    }
    async deleteFile(fileId, userId) {
        const file = await this.fileModel.findOne({ _id: fileId, uploadedBy: userId });
        if (!file) {
            throw new common_1.BadRequestException('File not found or unauthorized');
        }
        await this.s3.deleteObject({
            Bucket: this.bucketName,
            Key: file.key,
        }).promise();
        return this.fileModel.findByIdAndDelete(fileId);
    }
    async getSignedUrl(fileId, userId) {
        const file = await this.fileModel.findOne({ _id: fileId });
        if (!file) {
            throw new common_1.BadRequestException('File not found');
        }
        return this.s3.getSignedUrlPromise('getObject', {
            Bucket: this.bucketName,
            Key: file.key,
            Expires: 3600, // URL expires in 1 hour
        });
    }
};
FileService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(file_schema_1.File.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        config_1.ConfigService])
], FileService);
exports.FileService = FileService;
