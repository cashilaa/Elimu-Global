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
exports.UpdatesGateway = void 0;
const websockets_1 = require("@nestjs/websockets");
const socket_io_1 = require("socket.io");
const jwt_1 = require("@nestjs/jwt");
const common_1 = require("@nestjs/common");
const ws_jwt_guard_1 = require("../auth/guards/ws-jwt.guard");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
let UpdatesGateway = class UpdatesGateway {
    constructor(jwtService, courseModel) {
        this.jwtService = jwtService;
        this.courseModel = courseModel;
    }
    async handleConnection(client) {
        try {
            const token = client.handshake.auth.token;
            const decoded = this.jwtService.verify(token);
            const userId = decoded.sub;
            client.join(`user:${userId}`);
            if (decoded.role === 'instructor') {
                const courses = await this.getCoursesByInstructor(userId);
                courses.forEach(course => {
                    if (course && course._id) {
                        client.join(`course:${course._id}`);
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
    async getCoursesByInstructor(instructorId) {
        return this.courseModel.find({ instructor: instructorId }).exec();
    }
    // Methods to emit updates
    notifyProgressUpdate(userId, progress) {
        this.server.to(`user:${userId}`).emit('progressUpdate', progress);
    }
    notifyResourceUpdate(courseId, resource) {
        this.server.to(`course:${courseId}`).emit('resourceUpdate', resource);
    }
    notifyNewSubmission(courseId, submission) {
        this.server.to(`course:${courseId}`).emit('newSubmission', submission);
    }
};
__decorate([
    (0, websockets_1.WebSocketServer)(),
    __metadata("design:type", socket_io_1.Server)
], UpdatesGateway.prototype, "server", void 0);
__decorate([
    (0, common_1.UseGuards)(ws_jwt_guard_1.WsJwtGuard),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket]),
    __metadata("design:returntype", Promise)
], UpdatesGateway.prototype, "handleConnection", null);
UpdatesGateway = __decorate([
    (0, websockets_1.WebSocketGateway)({
        cors: {
            origin: '*',
        },
        namespace: '/updates'
    }),
    __param(1, (0, mongoose_1.InjectModel)('Course')),
    __metadata("design:paramtypes", [jwt_1.JwtService,
        mongoose_2.Model])
], UpdatesGateway);
exports.UpdatesGateway = UpdatesGateway;
