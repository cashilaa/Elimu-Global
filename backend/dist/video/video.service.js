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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VideoService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const aws_sdk_1 = require("aws-sdk");
const config_1 = require("@nestjs/config");
const fluent_ffmpeg_1 = __importDefault(require("fluent-ffmpeg"));
const video_schema_1 = require("./video.schema");
let VideoService = class VideoService {
    constructor(videoModel, configService) {
        this.videoModel = videoModel;
        this.configService = configService;
        const bucketName = this.configService.get('AWS_BUCKET_NAME');
        if (!bucketName) {
            throw new Error('AWS_BUCKET_NAME is not configured');
        }
        this.bucketName = bucketName;
        this.s3 = new aws_sdk_1.S3({
            accessKeyId: this.configService.get('AWS_ACCESS_KEY_ID'),
            secretAccessKey: this.configService.get('AWS_SECRET_ACCESS_KEY'),
            region: this.configService.get('AWS_REGION'),
        });
    }
    async uploadVideo(file, courseId, userId) {
        // Check video duration
        const duration = await this.getVideoDuration(file.path);
        if (duration > 300) { // 5 minutes in seconds
            throw new common_1.BadRequestException('Video must be 5 minutes or less');
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
    async getVideoDuration(filePath) {
        return new Promise((resolve, reject) => {
            fluent_ffmpeg_1.default.ffprobe(filePath, (err, metadata) => {
                var _a;
                if (err)
                    reject(err);
                if (!((_a = metadata === null || metadata === void 0 ? void 0 : metadata.format) === null || _a === void 0 ? void 0 : _a.duration)) {
                    reject(new Error('Could not determine video duration'));
                    return;
                }
                resolve(metadata.format.duration);
            });
        });
    }
    async generateThumbnail(filePath) {
        const thumbnailPath = `${filePath}-thumbnail.jpg`;
        return new Promise((resolve, reject) => {
            (0, fluent_ffmpeg_1.default)(filePath)
                .screenshots({
                timestamps: ['50%'],
                filename: thumbnailPath,
                size: '320x240'
            })
                .on('end', () => resolve(thumbnailPath))
                .on('error', reject);
        });
    }
    async processVideo(videoId, filePath) {
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
        }
        catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
            await this.videoModel.findByIdAndUpdate(videoId, {
                status: 'failed',
                error: errorMessage
            });
        }
    }
    async transcodeVideo(input, output, quality) {
        return new Promise((resolve, reject) => {
            (0, fluent_ffmpeg_1.default)(input)
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
    async getVideosForCourse(courseId, status) {
        const query = { courseId };
        if (status) {
            query.status = status;
        }
        return this.videoModel.find(query)
            .sort('-createdAt')
            .populate('uploadedBy', 'firstName lastName');
    }
    async getVideo(id) {
        const video = await this.videoModel.findById(id)
            .populate('uploadedBy', 'firstName lastName')
            .populate('courseId', 'title');
        if (!video) {
            throw new common_1.NotFoundException('Video not found');
        }
        return video;
    }
    async updateVideo(id, updateData, userId) {
        const video = await this.videoModel.findOne({ _id: id, uploadedBy: userId });
        if (!video) {
            throw new common_1.NotFoundException('Video not found or unauthorized');
        }
        Object.assign(video, updateData);
        return video.save();
    }
    async deleteVideo(id, userId) {
        const video = await this.videoModel.findOne({ _id: id, uploadedBy: userId });
        if (!video) {
            throw new common_1.NotFoundException('Video not found or unauthorized');
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
    async recordView(id, userId) {
        const video = await this.videoModel.findById(id);
        if (!video) {
            throw new common_1.NotFoundException('Video not found');
        }
        // Record the view with user information
        await this.videoModel.findByIdAndUpdate(id, {
            $addToSet: { views: userId },
            $inc: { viewCount: 1 }
        });
    }
    async toggleLike(id, userId) {
        const video = await this.videoModel.findById(id);
        if (!video) {
            throw new common_1.NotFoundException('Video not found');
        }
        const userIdObj = new mongoose_2.Types.ObjectId(userId);
        const hasLiked = video.likes.includes(userIdObj);
        if (hasLiked) {
            video.likes = video.likes.filter(id => !id.equals(userIdObj));
        }
        else {
            video.likes.push(userIdObj);
        }
        return video.save();
    }
    async getStreamUrl(id, quality, userId) {
        const video = await this.videoModel.findOne({ _id: id, 'allowedUsers': userId });
        if (!video) {
            throw new common_1.UnauthorizedException('Not authorized to view this video');
        }
        return this.generateSignedUrl(video.url, quality);
    }
    getKeyFromUrl(url) {
        return url.split('.com/')[1];
    }
    async generateSignedUrl(videoUrl, quality) {
        const key = quality ?
            `videos/${videoUrl.split('/').pop()}/${quality}.mp4` :
            this.getKeyFromUrl(videoUrl);
        return this.s3.getSignedUrlPromise('getObject', {
            Bucket: this.bucketName,
            Key: key,
            Expires: 3600 // URL expires in 1 hour
        });
    }
};
VideoService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(video_schema_1.Video.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        config_1.ConfigService])
], VideoService);
exports.VideoService = VideoService;
