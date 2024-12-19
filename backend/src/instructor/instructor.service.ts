import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Instructor } from './instructor.schema';
import { CreateInstructorDto } from './dto/create-instructor.dto';
import { UpdateInstructorDto } from './dto/update-instructor.dto';

@Injectable()
export class InstructorService {
  constructor(
    @InjectModel(Instructor.name) private instructorModel: Model<Instructor>
  ) {}

  async findAll() {
    return this.instructorModel.find().exec();
  }

  async findOne(id: string) {
    return this.instructorModel.findById(id).exec();
  }

  async update(id: string, updateInstructorDto: UpdateInstructorDto) {
    return this.instructorModel
      .findByIdAndUpdate(id, updateInstructorDto, { new: true })
      .exec();
  }

  async remove(id: string) {
    return this.instructorModel.findByIdAndDelete(id).exec();
  }

  // Add any other methods you need
}
