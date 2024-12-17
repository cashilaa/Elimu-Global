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
const course_service_1 = require("./course.service");
const notification_service_1 = require("../notification/notification.service");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const roles_guard_1 = require("../auth/guards/roles.guard");
const roles_decorator_1 = require("../auth/decorators/roles.decorator");
let CourseController = class CourseController {
    constructor(courseService, notificationService) {
        this.courseService = courseService;
        this.notificationService = notificationService;
    }
    async createCourse(createCourseDto) {
        const course = await this.courseService.create(createCourseDto);
        if (course) {
            await this.notificationService.notifyCourseCreated(course._id.toString(), course.instructor, course.title);
        }
        else {
            throw new Error('Course not found');
        }
        return course;
    }
    async findAll(query) {
        return this.courseService.findAll(query);
    }
    async findOne(id) {
        return this.courseService.findOne(id);
    }
    async findByInstructor(instructorId) {
        return this.courseService.findByInstructor(instructorId);
    }
    async update(id, updateCourseDto) {
        return this.courseService.update(id, updateCourseDto);
    }
    async updateStatus(id, status) {
        const course = await this.courseService.updateStatus(id, status);
        if (course) {
            if (status === 'published') {
                await this.notificationService.notifyCourseApproved(course._id.toString(), course.instructor, course.title);
            }
        }
        else {
            throw new Error('Course not found');
        }
        return course;
    }
    async enrollStudent(courseId, studentId) {
        const course = await this.courseService.addStudent(courseId, studentId);
        if (course) {
            await this.notificationService.notifyNewEnrollment(course._id.toString(), course.instructor, studentId, course.title);
        }
        else {
            throw new Error('Course not found');
        }
        return course;
    }
    async addReview(courseId, reviewData) {
        const course = await this.courseService.addReview(courseId, reviewData.studentId, reviewData.rating, reviewData.comment);
        if (course) {
            await this.notificationService.notifyNewReview(course._id.toString(), course.instructor, reviewData.studentId, course.title, reviewData.rating);
        }
        else {
            throw new Error('Course not found');
        }
        return course;
    }
    async getAnalytics(id) {
        const course = await this.courseService.findOne(id);
        if (course) {
            return course.analytics;
        }
        else {
            throw new Error('Course not found');
        }
    }
    async delete(id) {
        return this.courseService.delete(id);
    }
};
__decorate([
    (0, common_1.Post)(),
    (0, roles_decorator_1.Roles)('instructor'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CourseController.prototype, "createCourse", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
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
    (0, common_1.Get)('instructor/:instructorId'),
    __param(0, (0, common_1.Param)('instructorId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CourseController.prototype, "findByInstructor", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, roles_decorator_1.Roles)('instructor'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], CourseController.prototype, "update", null);
__decorate([
    (0, common_1.Put)(':id/status'),
    (0, roles_decorator_1.Roles)('instructor', 'admin'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)('status')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], CourseController.prototype, "updateStatus", null);
__decorate([
    (0, common_1.Post)(':id/enroll'),
    (0, roles_decorator_1.Roles)('student'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)('studentId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], CourseController.prototype, "enrollStudent", null);
__decorate([
    (0, common_1.Post)(':id/review'),
    (0, roles_decorator_1.Roles)('student'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], CourseController.prototype, "addReview", null);
__decorate([
    (0, common_1.Get)(':id/analytics'),
    (0, roles_decorator_1.Roles)('instructor', 'admin'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CourseController.prototype, "getAnalytics", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, roles_decorator_1.Roles)('instructor', 'admin'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CourseController.prototype, "delete", null);
CourseController = __decorate([
    (0, common_1.Controller)('courses'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    __metadata("design:paramtypes", [course_service_1.CourseService,
        notification_service_1.NotificationService])
], CourseController);
exports.CourseController = CourseController;
