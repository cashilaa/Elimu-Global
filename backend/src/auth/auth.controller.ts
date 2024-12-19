import { Controller, Post, Get, Body, Param, HttpException, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Instructor } from '../instructor/instructor.schema';

@Controller('instructors')
export class AuthController {
  constructor(
    private authService: AuthService,
    @InjectModel(Instructor.name) private instructorModel: Model<Instructor>
  ) {}

  @Get('check/:email')
  async checkInstructor(@Param('email') email: string) {
    try {
      console.log('Checking instructor with email:', email);
      const instructor = await this.instructorModel.findOne({ 
        email: email.toLowerCase().trim() 
      }).exec();
      
      console.log('Instructor found:', !!instructor);
      return {
        exists: !!instructor,
        email: email,
        found: instructor ? true : false
      };
    } catch (error: any) {
      console.error('Check instructor error:', error);
      throw new HttpException(
        'Error checking instructor',
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  @Post('login')
  async login(@Body() body: any) {
    try {
      console.log('Login request received:', body);

      if (!body.email || !body.password) {
        throw new HttpException('Email and password are required', HttpStatus.BAD_REQUEST);
      }

      const result = await this.authService.login(body.email, body.password);
      console.log('Login result:', result);
      
      return result;
    } catch (error: any) {
      console.error('Login error:', error);
      throw new HttpException(
        error?.message || 'Login failed',
        error?.status || HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }
}
