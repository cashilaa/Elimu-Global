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
exports.CourseController = void 0;
const common_1 = require("@nestjs/common");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const course_service_1 = require("./course.service");
const mongoose_1 = require("mongoose");
const dto_1 = require("./dto");
let CourseController = class CourseController {
    constructor(courseService) {
        this.courseService = courseService;
    }
    async create(createCourseDto) {
        try {
            const course = await this.courseService.create(createCourseDto);
            return {
                success: true,
                data: course
            };
        }
        catch (error) {
            throw new common_1.HttpException(error.message || 'Failed to create course', error.status || common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async findAll() {
        try {
            const courses = await this.courseService.findAll();
            return {
                success: true,
                data: courses.map(course => (Object.assign({ id: course._id instanceof mongoose_1.Types.ObjectId ? course._id.toString() : course._id, instructor: course.instructor instanceof mongoose_1.Types.ObjectId ? course.instructor.toString() : course.instructor }, course.toObject())))
            };
        }
        catch (error) {
            throw new common_1.HttpException(error.message || 'Failed to fetch courses', error.status || common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async findOne(id) {
        try {
            const course = await this.courseService.findOne(id);
            return {
                success: true,
                data: Object.assign({ id: course._id instanceof mongoose_1.Types.ObjectId ? course._id.toString() : course._id, instructor: course.instructor instanceof mongoose_1.Types.ObjectId ? course.instructor.toString() : course.instructor }, course.toObject())
            };
        }
        catch (error) {
            throw new common_1.HttpException(error.message || 'Failed to fetch course', error.status || common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async update(id, updateCourseDto) {
        try {
            const course = await this.courseService.update(id, updateCourseDto);
            return {
                success: true,
                data: Object.assign({ id: course._id instanceof mongoose_1.Types.ObjectId ? course._id.toString() : course._id, instructor: course.instructor instanceof mongoose_1.Types.ObjectId ? course.instructor.toString() : course.instructor }, course.toObject())
            };
        }
        catch (error) {
            throw new common_1.HttpException(error.message || 'Failed to update course', error.status || common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async remove(id) {
        try {
            const course = await this.courseService.delete(id);
            return {
                success: true,
                data: Object.assign({ id: course._id instanceof mongoose_1.Types.ObjectId ? course._id.toString() : course._id, instructor: course.instructor instanceof mongoose_1.Types.ObjectId ? course.instructor.toString() : course.instructor }, course.toObject())
            };
        }
        catch (error) {
            throw new common_1.HttpException(error.message || 'Failed to delete course', error.status || common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async addStudent(id, studentId) {
        try {
            const course = await this.courseService.addStudent(id, studentId);
            return {
                success: true,
                data: course
            };
        }
        catch (error) {
            throw new common_1.HttpException(error.message || 'Failed to add student', error.status || common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async addReview(id, reviewData) {
        try {
            const course = await this.courseService.addReview(id, reviewData.studentId, reviewData.rating, reviewData.comment);
            return {
                success: true,
                data: course
            };
        }
        catch (error) {
            throw new common_1.HttpException(error.message || 'Failed to add review', error.status || common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
};
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.CreateCourseDto]),
    __metadata("design:returntype", Promise)
], CourseController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], CourseController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CourseController.prototype, "findOne", null);
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, dto_1.UpdateCourseDto]),
    __metadata("design:returntype", Promise)
], CourseController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CourseController.prototype, "remove", null);
__decorate([
    (0, common_1.Post)(':id/students'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)('studentId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], CourseController.prototype, "addStudent", null);
__decorate([
    (0, common_1.Post)(':id/reviews'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, dto_1.CreateReviewDto]),
    __metadata("design:returntype", Promise)
], CourseController.prototype, "addReview", null);
CourseController = __decorate([
    (0, common_1.Controller)('api/courses'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __metadata("design:paramtypes", [course_service_1.CourseService])
], CourseController);
exports.CourseController = CourseController;
