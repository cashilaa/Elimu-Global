import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Message } from './message.schema';
import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { CourseService } from '../course/course.service';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
@Injectable()
export class ChatService {
  @WebSocketServer()
  server: Server;

  constructor(
    @InjectModel(Message.name) private messageModel: Model<Message>,
    private courseService: CourseService
  ) {}

  async getMessages(conversationId: string) {
    return this.messageModel.find({ conversationId })
      .sort('createdAt')
      .populate('sender', 'firstName lastName profilePicture');
  }

  async sendMessage(messageData: any) {
    const newMessage = new this.messageModel(messageData);
    const savedMessage = await newMessage.save();
    
    // Emit message to all users in the conversation
    this.server.to(messageData.conversationId).emit('newMessage', savedMessage);
    
    return savedMessage;
  }

  async handleConnection(client: Socket) {
    const userId = client.handshake.query.userId as string;
    const userCourses = await this.courseService.getUserCourses(userId);
    userCourses.forEach(course => {
      client.join(`chat:${course.id}`);
    });
  }

  handleDisconnect(client: Socket) {
    console.log(`Client disconnected: ${client.id}`);
  }
} 