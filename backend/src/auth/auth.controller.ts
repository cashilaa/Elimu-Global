import { Controller, Post, Body, Get, Param, HttpException, HttpStatus, HttpCode } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { CreateInstructorDto } from '../instructor/dto/create-instructor.dto';

@Controller('instructors')
export class AuthController {
  constructor(
    private authService: AuthService,
  ) {}

  @Post('register')
  async register(@Body() createInstructorDto: CreateInstructorDto) {
    try {
      const result = await this.authService.register(createInstructorDto);
      return result;
    } catch (error: unknown) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(
        error instanceof Error ? error.message : 'Registration failed',
        HttpStatus.BAD_REQUEST
      );
    }
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @Get('check/:email')
  async checkInstructor(@Param('email') email: string) {
    try {
      const instructor = await this.authService.findByEmail(email);
      return {
        exists: !!instructor,
        email: email
      };
    } catch (error) {
      throw new HttpException(
        'Error checking instructor email',
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }
}
