import { Controller, Get, Post, Put, Delete, Param, Body, Query, UseGuards, HttpException, HttpStatus } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { InstructorService } from './instructor.service';
import { CreateInstructorDto } from './dto/create-instructor.dto';
import { UpdateInstructorDto } from './dto/update-instructor.dto';
import { AuthService } from '../auth/auth.service';

@Controller('api/instructors')
@UseGuards(JwtAuthGuard)
export class InstructorController {
  constructor(
    private readonly instructorService: InstructorService,
    private readonly authService: AuthService
  ) {}

  @Post()
  async create(@Body() createInstructorDto: CreateInstructorDto) {
    // Use AuthService for registration instead
    return this.authService.register(createInstructorDto);
  }

  @Post('login')
  async login(@Body() loginDto: { email: string; password: string }) {
    // Use AuthService for login instead
    return this.authService.login(loginDto.email, loginDto.password);
  }

  @Get()
  findAll() {
    return this.instructorService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.instructorService.findOne(id);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateInstructorDto: UpdateInstructorDto) {
    try {
      return await this.instructorService.update(id, updateInstructorDto);
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
      const errorStatus = error instanceof HttpException ? error.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;
      
      throw new HttpException(
        errorMessage,
        errorStatus
      );
    }
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.instructorService.remove(id);
  }

  @Get(':id/stats')
  async getInstructorStats(@Param('id') id: string) {
    try {
      const stats = await this.instructorService.getInstructorStats(id);
      return {
        success: true,
        data: stats
      };
    } catch (error: any) {
      throw new HttpException(
        error?.message || 'Failed to fetch instructor stats',
        error?.status || HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  // Course Management Endpoints
  @Get(':id/courses')
  @Roles('instructor')
  async getCourses(@Param('id') id: string) {
    return this.instructorService.getInstructorCourses(id);
  }

  @Post(':id/courses')
  @Roles('instructor')
  async createCourse(@Param('id') id: string, @Body() courseData: any) {
    return this.instructorService.createCourse(id, courseData);
  }

  // Student Management Endpoints
  @Get(':id/students')
  @Roles('instructor')
  async getStudents(
    @Param('id') id: string,
    @Query('courseId') courseId?: string
  ) {
    return this.instructorService.getStudents(id, courseId);
  }

  // Analytics Endpoints
  @Get(':id/analytics')
  @Roles('instructor')
  async getAnalytics(
    @Param('id') id: string,
    @Query('startDate') startDate?: string,
    @Query('endDate') endDate?: string
  ) {
    return this.instructorService.getAnalytics(id, startDate, endDate);
  }

  // Session Management Endpoints
  @Get(':id/sessions')
  @Roles('instructor')
  async getSessions(
    @Param('id') id: string,
    @Query('status') status?: 'upcoming' | 'past' | 'all'
  ) {
    return this.instructorService.getSessions(id, status);
  }

  @Post(':id/sessions')
  @Roles('instructor')
  async createSession(@Param('id') id: string, @Body() sessionData: any) {
    return this.instructorService.createSession(id, sessionData);
  }

  // Resource Management Endpoints
  @Get(':id/resources')
  @Roles('instructor')
  async getResources(@Param('id') id: string) {
    return this.instructorService.getResources(id);
  }

  @Post(':id/resources')
  @Roles('instructor')
  async uploadResource(@Param('id') id: string, @Body() resourceData: any) {
    return this.instructorService.uploadResource(id, resourceData);
  }

  // Notification Endpoints
  @Get(':id/notifications')
  @Roles('instructor')
  async getNotifications(@Param('id') id: string) {
    return this.instructorService.getNotifications(id);
  }

  @Put(':id/notifications/:notificationId')
  @Roles('instructor')
  async markNotificationAsRead(
    @Param('id') id: string,
    @Param('notificationId') notificationId: string
  ) {
    return this.instructorService.markNotificationAsRead(id, notificationId);
  }
}
