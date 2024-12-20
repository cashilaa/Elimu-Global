import {
  WebSocketGateway,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { JwtService } from '@nestjs/jwt';
import { UseGuards } from '@nestjs/common';
import { WsJwtGuard } from '../auth/guards/ws-jwt.guard';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Course as CourseModel } from '../course/course.schema';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
  namespace: '/updates'
})
export class UpdatesGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  constructor(
    private jwtService: JwtService,
    @InjectModel('Course') private courseModel: Model<CourseModel>
  ) {}

  @UseGuards(WsJwtGuard)
  async handleConnection(client: Socket) {
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
    } catch (error) {
      client.disconnect();
    }
  }

  handleDisconnect(client: Socket) {
    console.log(`Client disconnected: ${client.id}`);
  }

  private async getCoursesByInstructor(instructorId: string): Promise<CourseModel[]> {
    return this.courseModel.find({ instructor: instructorId }).exec();
  }

  // Methods to emit updates
  notifyProgressUpdate(userId: string, progress: any) {
    this.server.to(`user:${userId}`).emit('progressUpdate', progress);
  }

  notifyResourceUpdate(courseId: string, resource: any) {
    this.server.to(`course:${courseId}`).emit('resourceUpdate', resource);
  }

  notifyNewSubmission(courseId: string, submission: any) {
    this.server.to(`course:${courseId}`).emit('newSubmission', submission);
  }
} 