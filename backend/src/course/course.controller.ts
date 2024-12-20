import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  UseGuards,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CourseService } from './course.service';
import { Types } from 'mongoose';
import { CreateCourseDto, UpdateCourseDto, CreateReviewDto } from './dto';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';

@Controller('courses')
@UseGuards(JwtAuthGuard, RolesGuard)
export class CourseController {
  constructor(private readonly courseService: CourseService) {}

  @Post()
  @Roles('instructor')
  async create(@Body() createCourseDto: CreateCourseDto) {
    try {
      const course = await this.courseService.create(createCourseDto);
      return {
        success: true,
        data: course
      };
    } catch (error: any) {
      throw new HttpException(
        error.message || 'Failed to create course',
        error.status || HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  @Get()
  async findAll() {
    try {
      const courses = await this.courseService.findAll();
      return {
        success: true,
        data: courses.map(course => ({
          id: course._id instanceof Types.ObjectId ? course._id.toString() : course._id,
          instructor: course.instructor instanceof Types.ObjectId ? course.instructor.toString() : course.instructor,
          ...course.toObject()
        }))
      };
    } catch (error: any) {
      throw new HttpException(
        error.message || 'Failed to fetch courses',
        error.status || HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      const course = await this.courseService.findOne(id);
      return {
        success: true,
        data: {
          id: course._id instanceof Types.ObjectId ? course._id.toString() : course._id,
          instructor: course.instructor instanceof Types.ObjectId ? course.instructor.toString() : course.instructor,
          ...course.toObject()
        }
      };
    } catch (error: any) {
      throw new HttpException(
        error.message || 'Failed to fetch course',
        error.status || HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  @Put(':id')
  @Roles('instructor')
  async update(@Param('id') id: string, @Body() updateCourseDto: UpdateCourseDto) {
    try {
      const course = await this.courseService.update(id, updateCourseDto);
      return {
        success: true,
        data: {
          id: course._id instanceof Types.ObjectId ? course._id.toString() : course._id,
          instructor: course.instructor instanceof Types.ObjectId ? course.instructor.toString() : course.instructor,
          ...course.toObject()
        }
      };
    } catch (error: any) {
      throw new HttpException(
        error.message || 'Failed to update course',
        error.status || HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  @Delete(':id')
  @Roles('instructor')
  async remove(@Param('id') id: string) {
    try {
      const course = await this.courseService.delete(id);
      return {
        success: true,
        data: {
          id: course._id instanceof Types.ObjectId ? course._id.toString() : course._id,
          instructor: course.instructor instanceof Types.ObjectId ? course.instructor.toString() : course.instructor,
          ...course.toObject()
        }
      };
    } catch (error: any) {
      throw new HttpException(
        error.message || 'Failed to delete course',
        error.status || HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  @Post(':id/students')
  async addStudent(@Param('id') id: string, @Body('studentId') studentId: string) {
    try {
      const course = await this.courseService.addStudent(id, studentId);
      return {
        success: true,
        data: course
      };
    } catch (error: any) {
      throw new HttpException(
        error.message || 'Failed to add student',
        error.status || HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  @Post(':id/reviews')
  async addReview(
    @Param('id') id: string,
    @Body() reviewData: CreateReviewDto
  ) {
    try {
      const course = await this.courseService.addReview(
        id,
        reviewData.studentId,
        reviewData.rating,
        reviewData.comment
      );
      return {
        success: true,
        data: course
      };
    } catch (error: any) {
      throw new HttpException(
        error.message || 'Failed to add review',
        error.status || HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }
}
