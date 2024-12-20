import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Course } from '../course/course.schema';
import { Progress } from './progress.schema';

@Injectable()
export class ProgressService {
  constructor(
    @InjectModel('Course') private courseModel: Model<Course>,
    @InjectModel('Progress') private progressModel: Model<Progress>
  ) {}

  async getProgress(userId: string, courseId: string) {
    const course = await this.courseModel.findById(courseId);
    if (!course) {
      throw new NotFoundException('Course not found');
    }

    const progress = await this.progressModel.findOne({
      userId,
      courseId
    });

    if (!progress) {
      return {
        completedContent: [],
        overallProgress: 0
      };
    }

    const totalContentCount = course.content?.length || 0;
    const completedCount = progress.completedContent.length;

    return {
      ...progress.toObject(),
      overallProgress: totalContentCount > 0 
        ? (completedCount / totalContentCount) * 100 
        : 0
    };
  }

  // ... rest of the methods
} 