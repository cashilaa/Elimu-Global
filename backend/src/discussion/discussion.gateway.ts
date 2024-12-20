import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { JwtService } from '@nestjs/jwt';
import { UseGuards } from '@nestjs/common';
import { WsJwtGuard } from '../auth/guards/ws-jwt.guard';
import { Course } from '../course/course.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Document } from 'mongoose';

interface CourseDocument extends Course, Document {
  _id: Types.ObjectId;
}

@WebSocketGateway({
  cors: {
    origin: '*',
  },
  namespace: '/discussions'
})
export class DiscussionGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  constructor(
    private jwtService: JwtService,
    @InjectModel(Course.name) private courseModel: Model<CourseDocument>
  ) {}

  @UseGuards(WsJwtGuard)
  async handleConnection(client: Socket) {
    try {
      const token = client.handshake.auth.token;
      const decoded = this.jwtService.verify(token);
      const userId = decoded.sub;

      // Join user's personal room
      client.join(`user:${userId}`);

      // Join course rooms if instructor
      if (decoded.role === 'instructor') {
        const courses = await this.getCoursesByUser(userId);
        courses.forEach((course: CourseDocument) => {
          if (course._id) {
            client.join(`course:${course._id.toString()}`);
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

  @SubscribeMessage('joinCourse')
  handleJoinCourse(client: Socket, courseId: string) {
    client.join(`course:${courseId}`);
  }

  @SubscribeMessage('leaveCourse')
  handleLeaveCourse(client: Socket, courseId: string) {
    client.leave(`course:${courseId}`);
  }

  private async getCoursesByUser(userId: string): Promise<CourseDocument[]> {
    const courses = await this.courseModel
      .find({ instructor: new Types.ObjectId(userId) })
      .lean()
      .exec();
    
    return courses as CourseDocument[];
  }
} 