import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { InstructorService } from './instructor.service';
import { CreateInstructorDto } from './dto/create-instructor.dto';
import { UpdateInstructorDto } from './dto/update-instructor.dto';
import { AuthService } from '../auth/auth.service';

@Controller('instructors')
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

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateInstructorDto: UpdateInstructorDto) {
    return this.instructorService.update(id, updateInstructorDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.instructorService.remove(id);
  }
}
