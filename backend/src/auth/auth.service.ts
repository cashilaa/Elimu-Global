import { Injectable, UnauthorizedException, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';
import { Instructor, InstructorDocument } from '../instructor/instructor.schema';
import { LoginDto } from './dto/login.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(Instructor.name) private instructorModel: Model<InstructorDocument>,
    private jwtService: JwtService,
  ) {}

  async login(loginDto: LoginDto) {
    try {
      // Find instructor and include password
      const instructor = await this.instructorModel
        .findOne({ email: loginDto.email.toLowerCase().trim() })
        .select('+password')
        .exec();

      if (!instructor) {
        throw new UnauthorizedException('Invalid credentials');
      }

      // Verify password
      const isPasswordValid = await bcrypt.compare(
        loginDto.password,
        instructor.password
      );

      if (!isPasswordValid) {
        throw new UnauthorizedException('Invalid credentials');
      }

      // Generate JWT token
      const token = this.jwtService.sign({
        sub: instructor._id,
        email: instructor.email,
        role: 'instructor',
      });

      // Create response without password
      const response = {
        access_token: token,
        instructor: {
          id: instructor._id,
          email: instructor.email,
          role: 'instructor',
          firstName: instructor.firstName,
          lastName: instructor.lastName,
        },
      };

      return response;
    } catch (error) {
      console.error('Login error:', error);
      throw new UnauthorizedException('Invalid credentials');
    }
  }

  async findByEmail(email: string): Promise<InstructorDocument | null> {
    return this.instructorModel
      .findOne({ email: email.toLowerCase().trim() })
      .exec();
  }

  async register(createInstructorDto: any) {
    try {
      const existingInstructor = await this.findByEmail(createInstructorDto.email);

      if (existingInstructor) {
        throw new HttpException('Email already exists', HttpStatus.BAD_REQUEST);
      }

      // Create new instructor
      const newInstructor = new this.instructorModel({
        ...createInstructorDto,
        email: createInstructorDto.email.toLowerCase(),
      });

      // Password will be hashed by pre-save middleware
      const savedInstructor = await newInstructor.save();

      const token = this.jwtService.sign({
        sub: savedInstructor._id,
        email: savedInstructor.email,
        role: 'instructor',
      });

      // Create response without password
      const response = {
        access_token: token,
        instructor: {
          id: savedInstructor._id,
          email: savedInstructor.email,
          role: 'instructor',
          firstName: savedInstructor.firstName,
          lastName: savedInstructor.lastName,
        },
      };

      return response;
    } catch (error) {
      console.error('Registration error:', error);
      throw new HttpException(
        'Registration failed',
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }
}
