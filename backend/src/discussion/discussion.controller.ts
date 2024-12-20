import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  UseGuards,
  Request,
  Query
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { DiscussionService } from './discussion.service';

interface RequestWithUser extends Request {
  user: {
    id: string;
    email: string;
    role: string;
  };
}

@Controller('api/discussions')
@UseGuards(JwtAuthGuard)
export class DiscussionController {
  constructor(private readonly discussionService: DiscussionService) {}

  @Get('course/:courseId')
  async findByCourse(@Param('courseId') courseId: string) {
    return this.discussionService.findByCourse(courseId);
  }

  @Post('course/:courseId')
  async create(
    @Param('courseId') courseId: string,
    @Body('content') content: string,
    @Request() req: RequestWithUser
  ) {
    return this.discussionService.create(courseId, req.user.id, content);
  }

  @Post(':id/like')
  async toggleLike(
    @Param('id') id: string,
    @Request() req: RequestWithUser
  ) {
    return this.discussionService.toggleLike(id, req.user.id);
  }

  @Post(':id/reply')
  async addReply(
    @Param('id') id: string,
    @Body('content') content: string,
    @Request() req: RequestWithUser
  ) {
    return this.discussionService.addReply(id, req.user.id, content);
  }

  @Get('course/:courseId/search')
  async searchDiscussions(
    @Param('courseId') courseId: string,
    @Query('q') query: string,
    @Query('sortBy') sortBy?: 'latest' | 'popular' | 'replies',
    @Query('timeframe') timeframe?: 'day' | 'week' | 'month' | 'all',
    @Query('hasReplies') hasReplies?: boolean,
  ) {
    return this.discussionService.searchDiscussions(courseId, query, {
      sortBy,
      timeframe,
      hasReplies
    });
  }
} 