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

  async update(id: string, updateStudentDto: UpdateStudentDto) {
    const updatedStudent = await this.studentModel
      .findByIdAndUpdate(id, updateStudentDto, { new: true })
      .exec();
    
    if (!updatedStudent) {
      throw new NotFoundException('Student not found');
    }
    
    return updatedStudent;
  }

  async remove(id: string) {
    const deletedStudent = await this.studentModel.findByIdAndDelete(id).exec();
    if (!deletedStudent) {
      throw new NotFoundException('Student not found');
    }
    return deletedStudent;
  }
} 