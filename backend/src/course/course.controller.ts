import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Query,
  UseGuards,
  HttpStatus,
} from '@nestjs/common';
import { CourseService } from './course.service';
import { NotificationService } from '../notification/notification.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';

@Controller('courses')
@UseGuards(JwtAuthGuard, RolesGuard)
export class CourseController {
  constructor(
    private readonly courseService: CourseService,
    private readonly notificationService: NotificationService,
  ) {}

  @Post()
  @Roles('instructor')
  async createCourse(@Body() createCourseDto: any) {
    const course = await this.courseService.create(createCourseDto);
    if (course) {
      await this.notificationService.notifyCourseCreated(
        course._id.toString(),
        course.instructor,
        course.title,
      );
    } else {
      throw new Error('Course not found');
    }
    return course;
  }

  @Get()
  async findAll(@Query() query: any) {
    return this.courseService.findAll(query);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.courseService.findOne(id);
  }

  @Get('instructor/:instructorId')
  async findByInstructor(@Param('instructorId') instructorId: string) {
    return this.courseService.findByInstructor(instructorId);
  }

  @Put(':id')
  @Roles('instructor')
  async update(@Param('id') id: string, @Body() updateCourseDto: any) {
    return this.courseService.update(id, updateCourseDto);
  }

  @Put(':id/status')
  @Roles('instructor', 'admin')
  async updateStatus(
    @Param('id') id: string,
    @Body('status') status: string,
  ) {
    const course = await this.courseService.updateStatus(id, status);
    if (course) {
      if (status === 'published') {
        await this.notificationService.notifyCourseApproved(
          course._id.toString(),
          course.instructor,
          course.title,
        );
      }
    } else {
      throw new Error('Course not found');
    }
    return course;
  }

  @Post(':id/enroll')
  @Roles('student')
  async enrollStudent(
    @Param('id') courseId: string,
    @Body('studentId') studentId: string,
  ) {
    const course = await this.courseService.addStudent(courseId, studentId);
    if (course) {
      await this.notificationService.notifyNewEnrollment(
        course._id.toString(),
        course.instructor,
        studentId,
        course.title,
      );
    } else {
      throw new Error('Course not found');
    }
    return course;
  }

  @Post(':id/review')
  @Roles('student')
  async addReview(
    @Param('id') courseId: string,
    @Body() reviewData: { studentId: string; rating: number; comment: string },
  ) {
    const course = await this.courseService.addReview(
      courseId,
      reviewData.studentId,
      reviewData.rating,
      reviewData.comment,
    );
    if (course) {
      await this.notificationService.notifyNewReview(
        course._id.toString(),
        course.instructor,
        reviewData.studentId,
        course.title,
        reviewData.rating,
      );
    } else {
      throw new Error('Course not found');
    }
    return course;
  }

  @Get(':id/analytics')
  @Roles('instructor', 'admin')
  async getAnalytics(@Param('id') id: string) {
    const course = await this.courseService.findOne(id);
    if (course) {
      return course.analytics;
    } else {
      throw new Error('Course not found');
    }
  }

  @Delete(':id')
  @Roles('instructor', 'admin')
  async delete(@Param('id') id: string) {
    return this.courseService.delete(id);
  }
}
