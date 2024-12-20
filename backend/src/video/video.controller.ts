import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  UseGuards,
  UseInterceptors,
  UploadedFile,
  Query,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { VideoService } from './video.service';
import { CurrentUser } from '../auth/decorators/current-user.decorator';

@Controller('api/videos')
@UseGuards(JwtAuthGuard, RolesGuard)
export class VideoController {
  constructor(private readonly videoService: VideoService) {}

  @Post('upload')
  @Roles('instructor')
  @UseInterceptors(FileInterceptor('video'))
  async uploadVideo(
    @UploadedFile() file: Express.Multer.File,
    @Body('courseId') courseId: string,
    @CurrentUser() user: any
  ) {
    return this.videoService.uploadVideo(file, courseId, user.id);
  }

  @Get('course/:courseId')
  async getVideosForCourse(
    @Param('courseId') courseId: string,
    @Query('status') status?: string
  ) {
    return this.videoService.getVideosForCourse(courseId, status);
  }

  @Get(':id')
  async getVideo(@Param('id') id: string) {
    return this.videoService.getVideo(id);
  }

  @Put(':id')
  @Roles('instructor')
  async updateVideo(
    @Param('id') id: string,
    @Body() updateData: any,
    @CurrentUser() user: any
  ) {
    return this.videoService.updateVideo(id, updateData, user.id);
  }

  @Delete(':id')
  @Roles('instructor')
  async deleteVideo(
    @Param('id') id: string,
    @CurrentUser() user: any
  ) {
    return this.videoService.deleteVideo(id, user.id);
  }

  @Post(':id/view')
  async recordView(
    @Param('id') id: string,
    @CurrentUser() user: any
  ) {
    return this.videoService.recordView(id, user.id);
  }

  @Post(':id/like')
  async toggleLike(
    @Param('id') id: string,
    @CurrentUser() user: any
  ) {
    return this.videoService.toggleLike(id, user.id);
  }

  @Get(':id/stream')
  async getStreamUrl(
    @Param('id') id: string,
    @Query('quality') quality: string,
    @CurrentUser() user: any
  ) {
    return this.videoService.getStreamUrl(id, quality, user.id);
  }
} 