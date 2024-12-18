import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Student } from './schemas/student.schema';
import { CreateStudentDto, UpdateStudentDto } from './dto/student.dto';

@Injectable()
export class StudentsService {
  constructor(@InjectModel(Student.name) private studentModel: Model<Student>) {}

  async findAll(filters: any = {}) {
    return this.studentModel.find(filters).exec();
  }

  async findOne(id: string) {
    const student = await this.studentModel.findById(id).exec();
    if (!student) {
      throw new NotFoundException('Student not found');
    }
    return student;
  }

  async create(createStudentDto: CreateStudentDto) {
    const newStudent = new this.studentModel(createStudentDto);
    return newStudent.save();
  }
} 