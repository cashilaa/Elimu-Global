"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UploadService = void 0;
const common_1 = require("@nestjs/common");
const aws_sdk_1 = require("aws-sdk");
const config_1 = require("@nestjs/config");
const uuid_1 = require("uuid");
const ffmpeg = __importStar(require("fluent-ffmpeg"));
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
const util_1 = require("util");
const writeFile = (0, util_1.promisify)(fs.writeFile);
const unlink = (0, util_1.promisify)(fs.unlink);
let UploadService = class UploadService {
    constructor(configService) {
        this.configService = configService;
        this.MAX_VIDEO_DURATION = 600; // 10 minutes in seconds
        this.s3 = new aws_sdk_1.S3({
            accessKeyId: this.configService.get('AWS_ACCESS_KEY_ID'),
            secretAccessKey: this.configService.get('AWS_SECRET_ACCESS_KEY'),
            region: this.configService.get('AWS_REGION'),
        });
    }
    async validateVideo(file) {
        const tempFilePath = path.join(__dirname, `${(0, uuid_1.v4)()}.mp4`);
        await writeFile(tempFilePath, file.buffer);
        return new Promise((resolve, reject) => {
            ffmpeg.ffprobe(tempFilePath, (err, metadata) => {
                unlink(tempFilePath).catch(console.error); // Clean up temp file
                if (err) {
                    return reject(new common_1.BadRequestException('Invalid video file'));
                }
                const duration = metadata.format.duration;
                if (duration && duration > this.MAX_VIDEO_DURATION) {
                    return reject(new common_1.BadRequestException('Video duration must not exceed 10 minutes'));
                }
                resolve();
            });
        });
    }
    async uploadFile(file, folder) {
        if (file.mimetype.startsWith('video/')) {
            await this.validateVideo(file);
        }
        const key = `${folder}/${(0, uuid_1.v4)()}-${file.originalname}`;
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
    async deleteFile(key) {
        const params = {
            Bucket: this.configService.get('AWS_S3_BUCKET'),
            Key: key,
        };
        await this.s3.deleteObject(params).promise();
    }
    getSignedUrl(key) {
        return this.s3.getSignedUrl('getObject', {
            Bucket: this.configService.get('AWS_S3_BUCKET'),
            Key: key,
            Expires: 3600, // URL expires in 1 hour
        });
    }
    // Helper method for video transcoding status check
    async checkTranscodingStatus(videoKey) {
        try {
            await this.s3.headObject({
                Bucket: this.configService.get('AWS_S3_BUCKET'),
                Key: `transcoded/${videoKey}`
            }).promise();
            return 'completed';
        }
        catch (error) {
            return 'processing';
        }
    }
};
UploadService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], UploadService);
exports.UploadService = UploadService;
