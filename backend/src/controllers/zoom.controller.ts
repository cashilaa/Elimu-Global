import { Controller, Post, Body, UseGuards, HttpException, HttpStatus } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { ZoomService } from '../services/zoom.service';
import { CreateMeetingDto } from '../dto/create-meeting.dto';

@Controller('zoom')
@UseGuards(JwtAuthGuard, RolesGuard)
export class ZoomController {
  constructor(private readonly zoomService: ZoomService) {}

  @Post('meetings')
  @Roles('instructor', 'admin')
  async createMeeting(@Body() meetingData: CreateMeetingDto) {
    try {
      console.log('Received meeting data:', meetingData);
      const meeting = await this.zoomService.createMeeting(meetingData);
      return {
        success: true,
        data: meeting,
      };
    } catch (error: any) {
      console.error('Failed to create meeting:', error);
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: 'Failed to create Zoom meeting',
          details: error?.message || 'Unknown error occurred',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
} 