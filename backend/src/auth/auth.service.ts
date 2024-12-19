import { Injectable, UnauthorizedException, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';
import { Instructor } from '../instructor/instructor.schema';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(Instructor.name) private instructorModel: Model<Instructor>,
    private jwtService: JwtService,
  ) {}

  async register(createInstructorDto: any, file?: Express.Multer.File) {
    const { email } = createInstructorDto;

    // Check if instructor already exists
    const existingInstructor = await this.instructorModel.findOne({ email: email.toLowerCase() });
    if (existingInstructor) {
      throw new HttpException('Email already exists', HttpStatus.BAD_REQUEST);
    }

    // Create new instructor
    const instructor = new this.instructorModel({
      ...createInstructorDto,
      email: email.toLowerCase(),
    });

    const savedInstructor = await instructor.save();
    const instructorData = savedInstructor.toObject();
    const { password, ...rest } = instructorData;

    return rest;
  }

  async login(email: string, password: string) {
    try {
      console.log('Attempting to find instructor with email:', email);

      const instructor = await this.instructorModel.findOne({ 
        email: email.toLowerCase() 
      }).select('+password');

      if (!instructor) {
        throw new UnauthorizedException('Invalid email or password');
      }

      console.log('Instructor found, verifying password');

      const isPasswordValid = await bcrypt.compare(password, instructor.password);
      if (!isPasswordValid) {
        throw new UnauthorizedException('Invalid email or password');
      }

      console.log('Password verified, generating token');

      const token = this.jwtService.sign({
        id: instructor._id,
        email: instructor.email
      });

      const instructorData = instructor.toObject();
      const { password: _, ...rest } = instructorData;

      return {
        success: true,
        token,
        instructor: rest
      };

    } catch (error: any) {
      console.error('Login service error:', error);
      throw new HttpException(
        error?.message || 'An error occurred during login',
        error?.status || HttpStatus.BAD_REQUEST
      );
    }
  }
}