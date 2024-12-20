import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Course } from './course.schema';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';

interface Review {
  student: Types.ObjectId;
  rating: number;
  comment?: string;
  createdAt: Date;
}

@Injectable()
export class CourseService {
  constructor(
    @InjectModel(Course.name) private courseModel: Model<Course>,
  ) {}

  async create(createCourseDto: CreateCourseDto): Promise<Course> {
    const createdCourse = new this.courseModel({
      ...createCourseDto,
      instructor: new Types.ObjectId(createCourseDto.instructor),
      status: 'draft',
      students: [],
      reviews: [],
      analytics: {
        enrollments: 0,
        averageRating: 0,
        activeStudents: 0,
        revenue: 0
      }
    });
    return createdCourse.save();
  }

  async findAll(filter: any = {}): Promise<Course[]> {
    return this.courseModel.find(filter).exec();
  }

  async findOne(id: string): Promise<Course> {
    const course = await this.courseModel.findById(id).exec();
    if (!course) {
      throw new NotFoundException(`Course with ID ${id} not found`);
    }
    return course;
  }

  async findByInstructor(instructorId: string): Promise<Course[]> {
    return this.courseModel.find({ instructor: instructorId }).exec();
  }

  async update(id: string, updateCourseDto: UpdateCourseDto): Promise<Course> {
    if (updateCourseDto.instructor) {
      updateCourseDto.instructor = new Types.ObjectId(updateCourseDto.instructor);
    }
    
    const updatedCourse = await this.courseModel
      .findByIdAndUpdate(id, updateCourseDto, { new: true })
      .exec();
    
    if (!updatedCourse) {
      throw new NotFoundException(`Course with ID ${id} not found`);
    }
    return updatedCourse;
  }

  async updateStatus(id: string, status: string): Promise<Course> {
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

  async addStudent(courseId: string, studentId: string): Promise<Course> {
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
  ): Promise<Course> {
    const course = await this.courseModel
      .findByIdAndUpdate(
        courseId,
        {
          $push: {
            reviews: {
              student: new Types.ObjectId(studentId),
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

  async updateAnalytics(courseId: string): Promise<Course> {
    const course = await this.findOne(courseId);
    if (!course) {
      throw new NotFoundException(`Course with ID ${courseId} not found`);
    }

    const averageRating = await this.calculateAverageRating(course);
    const analytics = {
      enrollments: course.students.length,
      averageRating,
      activeStudents: course.students.length,
      revenue: course.students.length * (course.pricing?.amount || 0),
    };

    const updatedCourse = await this.courseModel
      .findByIdAndUpdate(
        courseId,
        { 'analytics': analytics },
        { new: true }
      )
      .exec();

    if (!updatedCourse) {
      throw new NotFoundException(`Course with ID ${courseId} not found`);
    }

    return updatedCourse;
  }

  async delete(id: string): Promise<Course> {
    const deletedCourse = await this.courseModel
      .findByIdAndDelete(id)
      .exec();
    if (!deletedCourse) {
      throw new NotFoundException(`Course with ID ${id} not found`);
    }
    return deletedCourse;
  }

  async calculateAverageRating(course: Course): Promise<number> {
    if (!course.reviews?.length) return 0;
    return course.reviews.reduce((acc: number, review: Review) => acc + review.rating, 0) / course.reviews.length;
  }

  async getUserCourses(userId: string) {
    return this.courseModel.find({
      $or: [
        { instructor: userId },
        { students: userId }
      ]
    }).exec();
  }
}
