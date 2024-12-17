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
exports.NotificationService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const websockets_1 = require("@nestjs/websockets");
const socket_io_1 = require("socket.io");
const notification_schema_1 = require("./notification.schema");
let NotificationService = class NotificationService {
    constructor(notificationModel) {
        this.notificationModel = notificationModel;
    }
    async create(createNotificationDto) {
        const notification = new this.notificationModel(createNotificationDto);
        const savedNotification = await notification.save();
        // Emit real-time notification
        this.server.to(createNotificationDto.userId).emit('notification', savedNotification);
        return savedNotification;
    }
    async findAllForUser(userId) {
        return this.notificationModel
            .find({ userId, active: true })
            .sort({ createdAt: -1 })
            .exec();
    }
    async markAsRead(id) {
        return this.notificationModel
            .findByIdAndUpdate(id, { read: true }, { new: true })
            .exec();
    }
    async markAllAsRead(userId) {
        await this.notificationModel
            .updateMany({ userId, read: false }, { read: true })
            .exec();
    }
    async delete(id) {
        return this.notificationModel
            .findByIdAndUpdate(id, { active: false }, { new: true })
            .exec();
    }
    // Helper methods for creating specific notifications
    async notifyCourseCreated(courseId, instructorId, courseTitle) {
        return this.create({
            userId: instructorId,
            title: 'Course Created Successfully',
            message: `Your course "${courseTitle}" has been created and is pending review.`,
            type: 'success',
            category: 'course',
            metadata: { courseId },
        });
    }
    async notifyCourseApproved(courseId, instructorId, courseTitle) {
        return this.create({
            userId: instructorId,
            title: 'Course Approved',
            message: `Your course "${courseTitle}" has been approved and is now live!`,
            type: 'success',
            category: 'course',
            metadata: { courseId },
        });
    }
    async notifyNewEnrollment(courseId, instructorId, studentId, courseTitle) {
        return this.create({
            userId: instructorId,
            title: 'New Course Enrollment',
            message: `A new student has enrolled in your course "${courseTitle}".`,
            type: 'info',
            category: 'enrollment',
            metadata: { courseId, studentId },
        });
    }
    async notifyNewReview(courseId, instructorId, studentId, courseTitle, rating) {
        return this.create({
            userId: instructorId,
            title: 'New Course Review',
            message: `A student has left a ${rating}-star review on your course "${courseTitle}".`,
            type: 'info',
            category: 'review',
            metadata: { courseId, studentId },
        });
    }
};
__decorate([
    (0, websockets_1.WebSocketServer)(),
    __metadata("design:type", socket_io_1.Server)
], NotificationService.prototype, "server", void 0);
NotificationService = __decorate([
    (0, common_1.Injectable)(),
    (0, websockets_1.WebSocketGateway)({
        cors: {
            origin: '*',
        },
    }),
    __param(0, (0, mongoose_1.InjectModel)(notification_schema_1.Notification.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], NotificationService);
exports.NotificationService = NotificationService;
