import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Course, CourseDocument } from './course.schema';

@Injectable()
export class CourseService {
  constructor(
    @InjectModel(Course.name) private courseModel: Model<CourseDocument>,
  ) {}

  async create(createCourseDto: any): Promise<CourseDocument> {
    const createdCourse = new this.courseModel(createCourseDto);
    return createdCourse.save();
  }

  async findAll(filter: any = {}): Promise<CourseDocument[]> {
    return this.courseModel.find(filter).exec();
  }

  async findOne(id: string): Promise<CourseDocument | null> {
    const course = await this.courseModel.findById(id).exec();
    if (!course) {
      throw new NotFoundException(`Course with ID ${id} not found`);
    }
    return course;
  }

  async findByInstructor(instructorId: string): Promise<CourseDocument[]> {
    return this.courseModel.find({ instructor: instructorId }).exec();
  }

  async update(id: string, updateCourseDto: any): Promise<CourseDocument | null> {
    const updatedCourse = await this.courseModel
      .findByIdAndUpdate(id, updateCourseDto, { new: true })
      .exec();
    if (!updatedCourse) {
      throw new NotFoundException(`Course with ID ${id} not found`);
    }
    return updatedCourse;
  }

  async updateStatus(id: string, status: string): Promise<CourseDocument | null> {
    const course = await this.courseModel
      .findByIdAndUpdate(
        id,
        { status, ...(status === 'published' ? { publishedAt: new Date() } : {}) },
        { new: true },
      )
      .exec();
    if (!course) {
      throw new NotFoundException(`Course with ID ${id} not found`);
    }
    return course;
  }

  async addStudent(courseId: string, studentId: string): Promise<CourseDocument | null> {
    const course = await this.courseModel
      .findByIdAndUpdate(
        courseId,
        { $addToSet: { students: studentId } },
        { new: true },
      )
      .exec();
    if (!course) {
      throw new NotFoundException(`Course with ID ${courseId} not found`);
    }
    return course;
  }

  async addReview(
    courseId: string,
    studentId: string,
    rating: number,
    comment: string,
  ): Promise<CourseDocument | null> {
    const course = await this.courseModel
      .findByIdAndUpdate(
        courseId,
        {
          $push: {
            reviews: {
              student: studentId,
              rating,
              comment,
              createdAt: new Date(),
            },
          },
        },
        { new: true },
      )
      .exec();
    if (!course) {
      throw new NotFoundException(`Course with ID ${courseId} not found`);
    }
    return course;
  }

  async updateAnalytics(courseId: string): Promise<CourseDocument | null> {
    const course = await this.findOne(courseId);
    if (!course) {
      throw new NotFoundException(`Course with ID ${courseId} not found`);
    }
    const analytics = {
      enrollments: course.students.length,
      averageRating:
        course.reviews.reduce((acc, review) => acc + review.rating, 0) /
        (course.reviews.length || 1),
      activeStudents: course.students.length, // This should be calculated based on student activity
      revenue: course.students.length * course.pricing.amount,
    };

    return this.courseModel
      .findByIdAndUpdate(
        courseId,
        { 'analytics': analytics },
        { new: true },
      )
      .exec();
  }

  async delete(id: string): Promise<CourseDocument | null> {
    const deletedCourse = await this.courseModel
      .findByIdAndDelete(id)
      .exec();
    if (!deletedCourse) {
      throw new NotFoundException(`Course with ID ${id} not found`);
    }
    return deletedCourse;
  }
}
