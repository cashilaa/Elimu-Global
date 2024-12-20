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
exports.ProgressService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
let ProgressService = class ProgressService {
    constructor(courseModel, progressModel) {
        this.courseModel = courseModel;
        this.progressModel = progressModel;
    }
    async getProgress(userId, courseId) {
        var _a;
        const course = await this.courseModel.findById(courseId);
        if (!course) {
            throw new common_1.NotFoundException('Course not found');
        }
        const progress = await this.progressModel.findOne({
            userId,
            courseId
        });
        if (!progress) {
            return {
                completedContent: [],
                overallProgress: 0
            };
        }
        const totalContentCount = ((_a = course.content) === null || _a === void 0 ? void 0 : _a.length) || 0;
        const completedCount = progress.completedContent.length;
        return Object.assign(Object.assign({}, progress.toObject()), { overallProgress: totalContentCount > 0
                ? (completedCount / totalContentCount) * 100
                : 0 });
    }
};
ProgressService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)('Course')),
    __param(1, (0, mongoose_1.InjectModel)('Progress')),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model])
], ProgressService);
exports.ProgressService = ProgressService;
