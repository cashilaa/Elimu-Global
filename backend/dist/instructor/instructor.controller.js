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
exports.InstructorController = void 0;
const common_1 = require("@nestjs/common");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const roles_guard_1 = require("../auth/guards/roles.guard");
const roles_decorator_1 = require("../auth/decorators/roles.decorator");
const instructor_service_1 = require("./instructor.service");
const create_instructor_dto_1 = require("./dto/create-instructor.dto");
const update_instructor_dto_1 = require("./dto/update-instructor.dto");
const auth_service_1 = require("../auth/auth.service");
let InstructorController = class InstructorController {
    constructor(instructorService, authService) {
        this.instructorService = instructorService;
        this.authService = authService;
    }
    async create(createInstructorDto) {
        // Use AuthService for registration instead
        return this.authService.register(createInstructorDto);
    }
    async login(loginDto) {
        // Use AuthService for login instead
        return this.authService.login(loginDto.email, loginDto.password);
    }
    findAll() {
        return this.instructorService.findAll();
    }
    findOne(id) {
        return this.instructorService.findOne(id);
    }
    async update(id, updateInstructorDto) {
        try {
            return await this.instructorService.update(id, updateInstructorDto);
        }
        catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
            const errorStatus = error instanceof common_1.HttpException ? error.getStatus() : common_1.HttpStatus.INTERNAL_SERVER_ERROR;
            throw new common_1.HttpException(errorMessage, errorStatus);
        }
    }
    remove(id) {
        return this.instructorService.remove(id);
    }
    async getInstructorStats(id) {
        try {
            const stats = await this.instructorService.getInstructorStats(id);
            return {
                success: true,
                data: stats
            };
        }
        catch (error) {
            throw new common_1.HttpException((error === null || error === void 0 ? void 0 : error.message) || 'Failed to fetch instructor stats', (error === null || error === void 0 ? void 0 : error.status) || common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    // Course Management Endpoints
    async getCourses(id) {
        return this.instructorService.getInstructorCourses(id);
    }
    async createCourse(id, courseData) {
        return this.instructorService.createCourse(id, courseData);
    }
    // Student Management Endpoints
    async getStudents(id, courseId) {
        return this.instructorService.getStudents(id, courseId);
    }
    // Analytics Endpoints
    async getAnalytics(id, startDate, endDate) {
        return this.instructorService.getAnalytics(id, startDate, endDate);
    }
    // Session Management Endpoints
    async getSessions(id, status) {
        return this.instructorService.getSessions(id, status);
    }
    async createSession(id, sessionData) {
        return this.instructorService.createSession(id, sessionData);
    }
    // Resource Management Endpoints
    async getResources(id) {
        return this.instructorService.getResources(id);
    }
    async uploadResource(id, resourceData) {
        return this.instructorService.uploadResource(id, resourceData);
    }
    // Notification Endpoints
    async getNotifications(id) {
        return this.instructorService.getNotifications(id);
    }
    async markNotificationAsRead(id, notificationId) {
        return this.instructorService.markNotificationAsRead(id, notificationId);
    }
};
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_instructor_dto_1.CreateInstructorDto]),
    __metadata("design:returntype", Promise)
], InstructorController.prototype, "create", null);
__decorate([
    (0, common_1.Post)('login'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], InstructorController.prototype, "login", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], InstructorController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], InstructorController.prototype, "findOne", null);
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_instructor_dto_1.UpdateInstructorDto]),
    __metadata("design:returntype", Promise)
], InstructorController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], InstructorController.prototype, "remove", null);
__decorate([
    (0, common_1.Get)(':id/stats'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], InstructorController.prototype, "getInstructorStats", null);
__decorate([
    (0, common_1.Get)(':id/courses'),
    (0, roles_decorator_1.Roles)('instructor'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], InstructorController.prototype, "getCourses", null);
__decorate([
    (0, common_1.Post)(':id/courses'),
    (0, roles_decorator_1.Roles)('instructor'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], InstructorController.prototype, "createCourse", null);
__decorate([
    (0, common_1.Get)(':id/students'),
    (0, roles_decorator_1.Roles)('instructor'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Query)('courseId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], InstructorController.prototype, "getStudents", null);
__decorate([
    (0, common_1.Get)(':id/analytics'),
    (0, roles_decorator_1.Roles)('instructor'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Query)('startDate')),
    __param(2, (0, common_1.Query)('endDate')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String]),
    __metadata("design:returntype", Promise)
], InstructorController.prototype, "getAnalytics", null);
__decorate([
    (0, common_1.Get)(':id/sessions'),
    (0, roles_decorator_1.Roles)('instructor'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Query)('status')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], InstructorController.prototype, "getSessions", null);
__decorate([
    (0, common_1.Post)(':id/sessions'),
    (0, roles_decorator_1.Roles)('instructor'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], InstructorController.prototype, "createSession", null);
__decorate([
    (0, common_1.Get)(':id/resources'),
    (0, roles_decorator_1.Roles)('instructor'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], InstructorController.prototype, "getResources", null);
__decorate([
    (0, common_1.Post)(':id/resources'),
    (0, roles_decorator_1.Roles)('instructor'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], InstructorController.prototype, "uploadResource", null);
__decorate([
    (0, common_1.Get)(':id/notifications'),
    (0, roles_decorator_1.Roles)('instructor'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], InstructorController.prototype, "getNotifications", null);
__decorate([
    (0, common_1.Put)(':id/notifications/:notificationId'),
    (0, roles_decorator_1.Roles)('instructor'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Param)('notificationId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], InstructorController.prototype, "markNotificationAsRead", null);
InstructorController = __decorate([
    (0, common_1.Controller)('api/instructors'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('instructor', 'admin'),
    __metadata("design:paramtypes", [instructor_service_1.InstructorService,
        auth_service_1.AuthService])
], InstructorController);
exports.InstructorController = InstructorController;
