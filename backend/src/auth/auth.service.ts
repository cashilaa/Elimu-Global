import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Instructor, InstructorDocument } from '../instructor/instructor.schema';
import { CreateInstructorDto } from '../instructor/create-instructor.dto';
import * as fs from 'fs';
import * as path from 'path';
import { Express } from 'express';
import { JwtService } from '@nestjs/jwt';

type InstructorResponse = Omit<Instructor, 'password' | 'validatePassword'>;

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(Instructor.name) private readonly instructorModel: Model<InstructorDocument>,
    private readonly jwtService: JwtService,
  ) {}

  async signUp(createInstructorDto: CreateInstructorDto, file: Express.Multer.File): Promise<Instructor> {
    const uploadPath = path.join(__dirname, '..', 'uploads', file.originalname);
    fs.writeFileSync(uploadPath, file.buffer);
    createInstructorDto.cv = uploadPath;
    const createdInstructor = new this.instructorModel(createInstructorDto);
    return createdInstructor.save();
  }

  async login(email: string, password: string): Promise<{ token: string; instructor: InstructorResponse }> {
    console.log('Login attempt:', { email, password }); // Log the incoming credentials

    const instructor = await this.instructorModel.findOne({ email }).exec();
    
    if (!instructor) {
        console.log('Instructor not found'); // Log if instructor is not found
        throw new UnauthorizedException('Invalid credentials');
    }

    const instructorDoc = instructor as InstructorDocument;

    const isPasswordValid = await instructorDoc.validatePassword(password);
    
    if (!isPasswordValid) {
        console.log('Invalid password'); // Log if password is invalid
        throw new UnauthorizedException('Invalid credentials');
    }

    const token = this.generateToken(instructorDoc);
    
    const { password: _, validatePassword, ...instructorData } = instructorDoc.toObject();
    
    return {
        token,
        instructor: instructorData as InstructorResponse,
    };
  }

  private generateToken(instructor: InstructorDocument): string {
    const payload = { 
      sub: instructor._id, 
      email: instructor.email 
    };
    return this.jwtService.sign(payload);
  }
}
