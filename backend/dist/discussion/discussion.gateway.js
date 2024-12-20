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
exports.DiscussionGateway = void 0;
const websockets_1 = require("@nestjs/websockets");
const socket_io_1 = require("socket.io");
const jwt_1 = require("@nestjs/jwt");
const common_1 = require("@nestjs/common");
const ws_jwt_guard_1 = require("../auth/guards/ws-jwt.guard");
const course_schema_1 = require("../course/course.schema");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
let DiscussionGateway = class DiscussionGateway {
    constructor(jwtService, courseModel) {
        this.jwtService = jwtService;
        this.courseModel = courseModel;
    }
    async handleConnection(client) {
        try {
            const token = client.handshake.auth.token;
            const decoded = this.jwtService.verify(token);
            const userId = decoded.sub;
            // Join user's personal room
            client.join(`user:${userId}`);
            // Join course rooms if instructor
            if (decoded.role === 'instructor') {
                const courses = await this.getCoursesByUser(userId);
                courses.forEach((course) => {
                    if (course._id) {
                        client.join(`course:${course._id.toString()}`);
                    }
                });
            }
            console.log(`Client connected: ${client.id}, User: ${userId}`);
        }
        catch (error) {
            client.disconnect();
        }
    }
    handleDisconnect(client) {
        console.log(`Client disconnected: ${client.id}`);
    }
    handleJoinCourse(client, courseId) {
        client.join(`course:${courseId}`);
    }
    handleLeaveCourse(client, courseId) {
        client.leave(`course:${courseId}`);
    }
    async getCoursesByUser(userId) {
        const courses = await this.courseModel
            .find({ instructor: new mongoose_2.Types.ObjectId(userId) })
            .lean()
            .exec();
        return courses;
    }
};
__decorate([
    (0, websockets_1.WebSocketServer)(),
    __metadata("design:type", socket_io_1.Server)
], DiscussionGateway.prototype, "server", void 0);
__decorate([
    (0, common_1.UseGuards)(ws_jwt_guard_1.WsJwtGuard),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket]),
    __metadata("design:returntype", Promise)
], DiscussionGateway.prototype, "handleConnection", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('joinCourse'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket, String]),
    __metadata("design:returntype", void 0)
], DiscussionGateway.prototype, "handleJoinCourse", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('leaveCourse'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket, String]),
    __metadata("design:returntype", void 0)
], DiscussionGateway.prototype, "handleLeaveCourse", null);
DiscussionGateway = __decorate([
    (0, websockets_1.WebSocketGateway)({
        cors: {
            origin: '*',
        },
        namespace: '/discussions'
    }),
    __param(1, (0, mongoose_1.InjectModel)(course_schema_1.Course.name)),
    __metadata("design:paramtypes", [jwt_1.JwtService,
        mongoose_2.Model])
], DiscussionGateway);
exports.DiscussionGateway = DiscussionGateway;
