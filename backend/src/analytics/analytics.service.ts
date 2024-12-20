import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Course } from '../course/course.schema';
import { Analytics } from './analytics.schema';

@Injectable()
export class AnalyticsService {
  constructor(
    @InjectModel(Course.name) private courseModel: Model<Course>,
    @InjectModel(Analytics.name) private analyticsModel: Model<Analytics>
  ) {}

  async getChartData(courseIds: Types.ObjectId[], startDate?: Date, endDate?: Date) {
    // Convert ObjectIds to strings and use them in the query
    const stringIds = courseIds.map(id => id.toString());
    
    const enrollmentData = await this.courseModel.aggregate([
      {
        $match: {
          _id: { $in: stringIds },
          createdAt: {
            $gte: startDate || new Date(0),
            $lte: endDate || new Date()
          }
        }
      },
      {
        $group: {
          _id: { $dateToString: { format: '%Y-%m-%d', date: '$createdAt' } },
          count: { $sum: 1 }
        }
      },
      { $sort: { '_id': 1 } }
    ]);

    return enrollmentData;
  }

  async getCourseAnalytics(courseIds: string[]) {
    const stringIds = courseIds.map(id => id.toString());
    return this.analyticsModel.find({
      courseId: { $in: stringIds }
    }).exec();
  }
} 