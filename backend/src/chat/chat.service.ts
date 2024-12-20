import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Message } from './message.schema';
import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

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
    @InjectModel(Message.name) private messageModel: Model<Message>
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

  handleConnection(client: Socket) {
    console.log(`Client connected: ${client.id}`);
    // Join rooms based on user's conversations
    const userId = client.handshake.query.userId as string;
    // Implement room joining logic
  }

  handleDisconnect(client: Socket) {
    console.log(`Client disconnected: ${client.id}`);
  }
} 