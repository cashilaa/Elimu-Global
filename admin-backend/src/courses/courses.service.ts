import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Course } from './schemas/course.schema';
import { CreateCourseDto, UpdateCourseDto } from './dto/course.dto';

@Injectable()
export class CoursesService {
  constructor(
    @InjectModel(Course.name) private courseModel: Model<Course>
  ) {}

  async findAll(filters: any = {}) {
    return this.courseModel.find(filters).exec();
  }

  async findOne(id: string) {
    const course = await this.courseModel.findById(id).exec();
    if (!course) {
      throw new NotFoundException('Course not found');
    }
    return course;
  }

  async create(createCourseDto: CreateCourseDto) {
    const newCourse = new this.courseModel(createCourseDto);
    return newCourse.save();
  }

  async update(id: string, updateCourseDto: UpdateCourseDto) {
    const updatedCourse = await this.courseModel
      .findByIdAndUpdate(id, updateCourseDto, { new: true })
      .exec();
    if (!updatedCourse) {
      throw new NotFoundException('Course not found');
    }
    return updatedCourse;
  }

  async remove(id: string) {
    const deletedCourse = await this.courseModel.findByIdAndDelete(id).exec();
    if (!deletedCourse) {
      throw new NotFoundException('Course not found');
    }
    return deletedCourse;
  }

  async getStats() {
    const [totalCourses, activeCourses, totalStudents] = await Promise.all([
      this.courseModel.countDocuments(),
      this.courseModel.countDocuments({ status: 'Active' }),
      this.courseModel.aggregate([
        { $group: { _id: null, total: { $sum: '$students' } } }
      ])
    ]);

    return {
      totalCourses,
      activeCourses,
      totalStudents: totalStudents[0]?.total || 0
    };
  }
} 