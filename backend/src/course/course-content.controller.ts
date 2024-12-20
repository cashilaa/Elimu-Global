import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  UseGuards,
} from '@nestjs/common';
import { CourseContentService } from './course-content.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { CreateContentDto, UpdateContentDto } from './dto/content.dto';
import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';

@Controller('courses/:courseId/modules/:moduleId/content')
@UseGuards(JwtAuthGuard, RolesGuard)
export class CourseContentController {
  constructor(private readonly courseContentService: CourseContentService) {}

  @WebSocketServer()
  server: Server;

  @Post()
  @Roles('instructor', 'admin')
  async createContent(
    @Param('courseId') courseId: string,
    @Param('moduleId') moduleId: string,
    @Body() createContentDto: CreateContentDto,
  ) {
    const content = await this.courseContentService.createContent(
      courseId,
      moduleId,
      createContentDto,
    );
    this.server.emit('contentUpdate', { courseId, moduleId, content });
    return content;
  }

  @Put(':contentId')
  @Roles('instructor', 'admin')
  async updateContent(
    @Param('courseId') courseId: string,
    @Param('moduleId') moduleId: string,
    @Param('contentId') contentId: string,
    @Body() updateContentDto: UpdateContentDto,
  ) {
    const content = await this.courseContentService.updateContent(
      courseId,
      moduleId,
      contentId,
      updateContentDto,
    );
    this.server.emit('contentUpdate', { courseId, moduleId, content });
    return content;
  }

  @Delete(':contentId')
  @Roles('instructor', 'admin')
  async deleteContent(
    @Param('courseId') courseId: string,
    @Param('moduleId') moduleId: string,
    @Param('contentId') contentId: string,
  ) {
    await this.courseContentService.deleteContent(courseId, moduleId, contentId);
    this.server.emit('contentUpdate', { courseId, moduleId, contentId });
    return { message: 'Content deleted successfully' };
  }

  @Get()
  async getContent(
    @Param('courseId') courseId: string,
    @Param('moduleId') moduleId: string,
  ) {
    return this.courseContentService.getContent(courseId, moduleId);
  }

  @Get(':contentId')
  async getContentById(
    @Param('courseId') courseId: string,
    @Param('moduleId') moduleId: string,
    @Param('contentId') contentId: string,
  ) {
    return this.courseContentService.getContentById(courseId, moduleId, contentId);
  }
}

@WebSocketGateway({ namespace: 'course-content' })
export class CourseContentGateway {
  @WebSocketServer()
  server: Server;
}
