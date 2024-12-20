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
exports.DiscussionService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const discussion_schema_1 = require("./discussion.schema");
const websockets_1 = require("@nestjs/websockets");
const socket_io_1 = require("socket.io");
let DiscussionService = class DiscussionService {
    constructor(discussionModel) {
        this.discussionModel = discussionModel;
    }
    async create(courseId, userId, content) {
        const discussion = new this.discussionModel({
            courseId: new mongoose_2.Types.ObjectId(courseId),
            author: new mongoose_2.Types.ObjectId(userId),
            content,
            likes: [],
            replies: []
        });
        const savedDiscussion = await discussion.save();
        const populatedDiscussion = await this.discussionModel
            .findById(savedDiscussion._id)
            .populate('author', 'firstName lastName profilePicture')
            .exec();
        if (!populatedDiscussion) {
            throw new common_1.NotFoundException('Discussion not found after creation');
        }
        this.server.to(`course:${courseId}`).emit('newDiscussion', populatedDiscussion);
        return populatedDiscussion;
    }
    async findByCourse(courseId) {
        return this.discussionModel
            .find({ courseId: new mongoose_2.Types.ObjectId(courseId) })
            .populate('author', 'firstName lastName profilePicture')
            .sort('-createdAt')
            .exec();
    }
    async toggleLike(discussionId, userId) {
        const discussion = await this.discussionModel.findById(discussionId);
        if (!discussion) {
            throw new common_1.NotFoundException('Discussion not found');
        }
        const userIdObj = new mongoose_2.Types.ObjectId(userId);
        const hasLiked = discussion.likes.includes(userIdObj);
        const updatedDiscussion = await this.discussionModel
            .findByIdAndUpdate(discussionId, hasLiked
            ? { $pull: { likes: userIdObj } }
            : { $addToSet: { likes: userIdObj } }, { new: true })
            .populate('author', 'firstName lastName profilePicture')
            .exec();
        if (!updatedDiscussion) {
            throw new common_1.NotFoundException('Discussion not found after update');
        }
        this.server.to(`course:${discussion.courseId}`).emit('discussionLiked', {
            discussionId,
            likes: updatedDiscussion.likes
        });
        return updatedDiscussion;
    }
    async addReply(discussionId, userId, content) {
        const discussion = await this.discussionModel.findById(discussionId);
        if (!discussion) {
            throw new common_1.NotFoundException('Discussion not found');
        }
        const reply = {
            author: new mongoose_2.Types.ObjectId(userId),
            content,
            createdAt: new Date()
        };
        const updatedDiscussion = await this.discussionModel
            .findByIdAndUpdate(discussionId, { $push: { replies: reply } }, { new: true })
            .populate('author', 'firstName lastName profilePicture')
            .populate('replies.author', 'firstName lastName profilePicture')
            .exec();
        if (!updatedDiscussion) {
            throw new common_1.NotFoundException('Discussion not found after update');
        }
        // Emit new reply to course room
        this.server.to(`course:${discussion.courseId}`).emit('newReply', {
            discussionId,
            reply: Object.assign(Object.assign({}, reply), { author: await this.getUserInfo(userId) })
        });
        return updatedDiscussion;
    }
    async getUserInfo(userId) {
        const User = this.discussionModel.db.model('User');
        return User.findById(userId).select('firstName lastName profilePicture').exec();
    }
    async searchDiscussions(courseId, query, filters) {
        const { sortBy = 'latest', timeframe = 'all', hasReplies } = filters;
        let dateFilter = {};
        if (timeframe !== 'all') {
            const now = new Date();
            switch (timeframe) {
                case 'day':
                    dateFilter = { createdAt: { $gte: new Date(now.setDate(now.getDate() - 1)) } };
                    break;
                case 'week':
                    dateFilter = { createdAt: { $gte: new Date(now.setDate(now.getDate() - 7)) } };
                    break;
                case 'month':
                    dateFilter = { createdAt: { $gte: new Date(now.setMonth(now.getMonth() - 1)) } };
                    break;
            }
        }
        const baseQuery = Object.assign({ courseId: new mongoose_2.Types.ObjectId(courseId) }, dateFilter);
        if (query) {
            baseQuery.$or = [
                { content: { $regex: query, $options: 'i' } },
                { 'replies.content': { $regex: query, $options: 'i' } }
            ];
        }
        if (hasReplies !== undefined) {
            baseQuery['replies.0'] = { $exists: hasReplies };
        }
        return this.discussionModel
            .find(baseQuery)
            .populate('author', 'firstName lastName profilePicture')
            .populate('replies.author', 'firstName lastName profilePicture')
            .sort(sortBy === 'latest' ? { createdAt: -1 } :
            sortBy === 'popular' ? { 'likes.length': -1 } :
                { 'replies.length': -1 })
            .exec();
    }
};
__decorate([
    (0, websockets_1.WebSocketServer)(),
    __metadata("design:type", socket_io_1.Server)
], DiscussionService.prototype, "server", void 0);
DiscussionService = __decorate([
    (0, websockets_1.WebSocketGateway)({
        cors: {
            origin: '*',
        },
    }),
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(discussion_schema_1.Discussion.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], DiscussionService);
exports.DiscussionService = DiscussionService;
