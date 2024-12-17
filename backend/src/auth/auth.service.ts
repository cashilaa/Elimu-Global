import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Instructor, InstructorDocument } from '../instructor/instructor.schema';
import { CreateInstructorDto } from '../instructor/create-instructor.dto';
import * as fs from 'fs';
import * as path from 'path';
import { Express } from 'express';

@Injectable()
export class AuthService {
  constructor(@InjectModel(Instructor.name) private readonly instructorModel: Model<InstructorDocument>) {}

  async signUp(createInstructorDto: CreateInstructorDto, file: Express.Multer.File): Promise<Instructor> {
    const uploadPath = path.join(__dirname, '..', 'uploads', file.originalname);
    fs.writeFileSync(uploadPath, file.buffer);
    createInstructorDto.cv = uploadPath;
    const createdInstructor = new this.instructorModel(createInstructorDto);
    return createdInstructor.save();
  }
}
