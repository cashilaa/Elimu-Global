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
exports.DiscussionController = void 0;
const common_1 = require("@nestjs/common");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const discussion_service_1 = require("./discussion.service");
let DiscussionController = class DiscussionController {
    constructor(discussionService) {
        this.discussionService = discussionService;
    }
    async findByCourse(courseId) {
        return this.discussionService.findByCourse(courseId);
    }
    async create(courseId, content, req) {
        return this.discussionService.create(courseId, req.user.id, content);
    }
    async toggleLike(id, req) {
        return this.discussionService.toggleLike(id, req.user.id);
    }
    async addReply(id, content, req) {
        return this.discussionService.addReply(id, req.user.id, content);
    }
    async searchDiscussions(courseId, query, sortBy, timeframe, hasReplies) {
        return this.discussionService.searchDiscussions(courseId, query, {
            sortBy,
            timeframe,
            hasReplies
        });
    }
};
__decorate([
    (0, common_1.Get)('course/:courseId'),
    __param(0, (0, common_1.Param)('courseId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], DiscussionController.prototype, "findByCourse", null);
__decorate([
    (0, common_1.Post)('course/:courseId'),
    __param(0, (0, common_1.Param)('courseId')),
    __param(1, (0, common_1.Body)('content')),
    __param(2, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object]),
    __metadata("design:returntype", Promise)
], DiscussionController.prototype, "create", null);
__decorate([
    (0, common_1.Post)(':id/like'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], DiscussionController.prototype, "toggleLike", null);
__decorate([
    (0, common_1.Post)(':id/reply'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)('content')),
    __param(2, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object]),
    __metadata("design:returntype", Promise)
], DiscussionController.prototype, "addReply", null);
__decorate([
    (0, common_1.Get)('course/:courseId/search'),
    __param(0, (0, common_1.Param)('courseId')),
    __param(1, (0, common_1.Query)('q')),
    __param(2, (0, common_1.Query)('sortBy')),
    __param(3, (0, common_1.Query)('timeframe')),
    __param(4, (0, common_1.Query)('hasReplies')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, String, Boolean]),
    __metadata("design:returntype", Promise)
], DiscussionController.prototype, "searchDiscussions", null);
DiscussionController = __decorate([
    (0, common_1.Controller)('api/discussions'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __metadata("design:paramtypes", [discussion_service_1.DiscussionService])
], DiscussionController);
exports.DiscussionController = DiscussionController;
