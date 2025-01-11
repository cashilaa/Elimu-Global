import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Course } from './schemas/course.schema';
import { CreateCourseDto, UpdateCourseDto } from './dto/course.dto';
import * as fs from 'fs';
import * as path from 'path';
import { HttpService } from '@nestjs/axios';

@Injectable()
export class CoursesService {
  private readonly externalApiUrl = 'https://af07-102-212-236-208.ngrok-free.app/api/courses/all';

  constructor(
    @InjectModel(Course.name) private courseModel: Model<Course>,
    private readonly httpService: HttpService
  ) {
    // Ensure uploads directory exists
    const uploadsDir = path.join(process.cwd(), 'uploads');
    if (!fs.existsSync(uploadsDir)) {
      fs.mkdirSync(uploadsDir, { recursive: true });
    }
  }

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

  async create(createCourseDto: CreateCourseDto, file?: Express.Multer.File) {
    const courseData = {
      ...createCourseDto,
      pdfUrl: file ? `/uploads/${file.filename}` : null,
    };
    const newCourse = new this.courseModel(courseData);
    return newCourse.save();
  }

  async update(id: string, updateCourseDto: UpdateCourseDto, file?: Express.Multer.File) {
    const course = await this.courseModel.findById(id).exec();
    if (!course) {
      throw new NotFoundException('Course not found');
    }

    // Delete old PDF if a new one is uploaded
    if (file && course.pdfUrl) {
      const oldPdfPath = path.join(process.cwd(), course.pdfUrl);
      if (fs.existsSync(oldPdfPath)) {
        fs.unlinkSync(oldPdfPath);
      }
    }

    const updateData = {
      ...updateCourseDto,
      pdfUrl: file ? `/uploads/${file.filename}` : course.pdfUrl,
    };

    const updatedCourse = await this.courseModel
      .findByIdAndUpdate(id, updateData, { new: true })
      .exec();
    return updatedCourse;
  }

  async remove(id: string) {
    if (!id) {
      throw new NotFoundException('Course ID is required');
    }

    try {
      const course = await this.courseModel.findById(id).exec();
      if (!course) {
        throw new NotFoundException('Course not found');
      }

      // Delete the associated PDF file if it exists
      if (course.pdfUrl) {
        const pdfPath = path.join(process.cwd(), course.pdfUrl.replace('/', ''));
        if (fs.existsSync(pdfPath)) {
          try {
            fs.unlinkSync(pdfPath);
          } catch (error) {
            console.error('Error deleting PDF file:', error);
            // Continue with course deletion even if PDF deletion fails
          }
        }
      }

      const result = await this.courseModel.findByIdAndDelete(id).exec();
      if (!result) {
        throw new NotFoundException('Course not found');
      }
      return result;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new Error(`Failed to delete course: ${error.message}`);
    }
  }

  async getStats() {
    const [totalCourses, activeCourses, totalStudents] = await Promise.all([
      this.courseModel.countDocuments(),
      this.courseModel.countDocuments({ status: 'Active' }),
      this.courseModel.aggregate([
        {
          $group: {
            _id: null,
            totalStudents: { $sum: '$enrolledStudents' }
          }
        }
      ])
    ]);

    return {
      totalCourses,
      activeCourses,
      totalStudents: totalStudents[0]?.totalStudents || 0
    };
  }

  async getFreeCourses() {
    return this.courseModel.find({ 
      price: 0,
      status: 'Active'
    }).select('-__v').exec();
  }

  async syncCoursesFromExternal() {
    try {
      // Fetch courses from external API
      const response = await this.httpService.get(this.externalApiUrl).toPromise();
      const externalCourses = response.data;

      // Store each course in our database
      for (const courseData of externalCourses) {
        // Check if course already exists by some unique identifier (e.g., name or external ID)
        const existingCourse = await this.courseModel.findOne({ name: courseData.name }).exec();
        
        if (!existingCourse) {
          // Create new course if it doesn't exist
          const newCourse = new this.courseModel(courseData);
          await newCourse.save();
        }
      }

      return { message: `Successfully synced ${externalCourses.length} courses` };
    } catch (error) {
      console.error('Error syncing courses:', error);
      throw error;
    }
  }
}