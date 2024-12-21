import { 
  Controller, 
  Get, 
  Post, 
  Put, 
  Delete, 
  Body, 
  Param, 
  UseGuards,
  Request 
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CourseService } from '../services/course.service';
import { NotificationService } from '../services/notification.service';
import { CreateCourseDto } from '../dto/create-course.dto';
import { UpdateCourseDto } from '../dto/update-course.dto';

interface RequestWithUser extends Request {
  user: {
    sub: string;
    email: string;
    role: string;
  };
}

@Controller('courses')
@UseGuards(JwtAuthGuard)
export class CourseController {
  constructor(
    private readonly courseService: CourseService,
    private readonly notificationService: NotificationService
  ) {}

  @Post()
  async create(@Request() req: RequestWithUser, @Body() createCourseDto: CreateCourseDto) {
    const course = await this.courseService.create(createCourseDto, req.user.sub);
    await this.notificationService.notifyCourseCreation(
      req.user.sub,
      course.title
    );
    return course;
  }

  @Get()
  async findAll(@Request() req: RequestWithUser) {
    return this.courseService.findAll(req.user.sub);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.courseService.findOne(id);
  }

  @Put(':id')
  async update(
    @Request() req: RequestWithUser,
    @Param('id') id: string,
    @Body() updateCourseDto: UpdateCourseDto
  ) {
    const course = await this.courseService.update(id, updateCourseDto);
    await this.notificationService.notifyCourseUpdate(
      req.user.sub,
      course.title
    );
    return course;
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.courseService.remove(id);
  }
} 