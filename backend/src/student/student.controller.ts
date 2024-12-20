import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards } from '@nestjs/common';
import { StudentService } from './student.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';

@Controller('api/students')
@UseGuards(JwtAuthGuard, RolesGuard)
export class StudentController {
  constructor(private readonly studentService: StudentService) {}

  @Get()
  @Roles('admin')
  findAll() {
    return this.studentService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.studentService.findOne(id);
  }

  @Post()
  @Roles('admin')
  create(@Body() createStudentDto: any) {
    return this.studentService.create(createStudentDto);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateStudentDto: any) {
    return this.studentService.update(id, updateStudentDto);
  }

  @Delete(':id')
  @Roles('admin')
  remove(@Param('id') id: string) {
    return this.studentService.remove(id);
  }

  @Post(':id/enroll/:courseId')
  enrollInCourse(
    @Param('id') id: string,
    @Param('courseId') courseId: string
  ) {
    return this.studentService.enrollInCourse(id, courseId);
  }

  @Get(':id/courses')
  getEnrolledCourses(@Param('id') id: string) {
    return this.studentService.getEnrolledCourses(id);
  }

  @Put(':id/progress/:courseId')
  updateProgress(
    @Param('id') id: string,
    @Param('courseId') courseId: string,
    @Body('progress') progress: number
  ) {
    return this.studentService.updateProgress(id, courseId, progress);
  }
} 