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
exports.ChatService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const message_schema_1 = require("./message.schema");
const websockets_1 = require("@nestjs/websockets");
const socket_io_1 = require("socket.io");
const course_service_1 = require("../course/course.service");
let ChatService = class ChatService {
    constructor(messageModel, courseService) {
        this.messageModel = messageModel;
        this.courseService = courseService;
    }
    async getMessages(conversationId) {
        return this.messageModel.find({ conversationId })
            .sort('createdAt')
            .populate('sender', 'firstName lastName profilePicture');
    }
    async sendMessage(messageData) {
        const newMessage = new this.messageModel(messageData);
        const savedMessage = await newMessage.save();
        // Emit message to all users in the conversation
        this.server.to(messageData.conversationId).emit('newMessage', savedMessage);
        return savedMessage;
    }
    async handleConnection(client) {
        const userId = client.handshake.query.userId;
        const userCourses = await this.courseService.getUserCourses(userId);
        userCourses.forEach(course => {
            client.join(`chat:${course.id}`);
        });
    }
    handleDisconnect(client) {
        console.log(`Client disconnected: ${client.id}`);
    }
};
__decorate([
    (0, websockets_1.WebSocketServer)(),
    __metadata("design:type", socket_io_1.Server)
], ChatService.prototype, "server", void 0);
ChatService = __decorate([
    (0, websockets_1.WebSocketGateway)({
        cors: {
            origin: '*',
        },
    }),
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(message_schema_1.Message.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        course_service_1.CourseService])
], ChatService);
exports.ChatService = ChatService;
