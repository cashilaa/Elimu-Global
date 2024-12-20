import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Instructor } from './instructor.schema';
import { CreateInstructorDto } from './dto/create-instructor.dto';
import { UpdateInstructorDto } from './dto/update-instructor.dto';
import { Course } from '../shared/types/course-content';
import { Student } from '../student/student.schema';
import { Session } from '../session/session.schema';
import { Resource } from '../shared/types/resource';
import { Notification } from '../shared/types/notification';
import { Analytics } from '../analytics/analytics.schema';

interface SessionQuery {
  instructor: string;
  status?: string;
}

@Injectable()
export class InstructorService {
  constructor(
    @InjectModel('Instructor') private instructorModel: Model<Instructor>,
    @InjectModel('Course') private courseModel: Model<Course>,
    @InjectModel('Student') private studentModel: Model<Student>,
    @InjectModel('Session') private sessionModel: Model<Session>,
    @InjectModel('Resource') private resourceModel: Model<Resource>,
    @InjectModel('Notification') private notificationModel: Model<Notification>,
    @InjectModel('Analytics') private analyticsModel: Model<Analytics>,
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

  async getInstructorStats(instructorId: string) {
    const instructor = await this.instructorModel
      .findById(instructorId)
      .populate('courses')
      .exec();

    if (!instructor) {
      throw new NotFoundException('Instructor not found');
    }

    // Fetch external platform stats
    const externalStats = await this.fetchExternalPlatformStats(instructor.email);

    return {
      activeCourses: instructor.courses.length,
      totalStudents: externalStats.totalStudents,
      upcomingSessions: externalStats.upcomingSessions,
      revenue: externalStats.revenue,
      recentActivities: externalStats.recentActivities
    };
  }

  private async fetchExternalPlatformStats(instructorEmail: string) {
    try {
      // Replace with your external platform API endpoint
      const response = await fetch('https://api.externalplatform.com/instructor-stats', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.EXTERNAL_API_KEY}`
        },
        body: JSON.stringify({ instructorEmail })
      });

      if (!response.ok) {
        throw new Error('Failed to fetch external stats');
      }

      return await response.json();
    } catch (error) {
      console.error('External API error:', error);
      // Return default values if external API fails
      return {
        totalStudents: 0,
        upcomingSessions: 0,
        revenue: 0,
        recentActivities: []
      };
    }
  }

  async getInstructorCourses(id: string) {
    return this.courseModel.find({ instructor: id }).exec();
  }

  async createCourse(id: string, courseData: any) {
    const course = new this.courseModel({
      ...courseData,
      instructor: id
    });
    return course.save();
  }

  async getStudents(id: string, courseId?: string) {
    const query = courseId 
      ? { enrolledCourses: courseId }
      : { enrolledCourses: { $in: await this.getInstructorCourses(id) } };
    return this.studentModel.find(query).exec();
  }

  async getAnalytics(id: string, startDate?: string, endDate?: string) {
    const query: any = { instructorId: id };
    if (startDate && endDate) {
      query.createdAt = {
        $gte: new Date(startDate),
        $lte: new Date(endDate)
      };
    }
    return this.analyticsModel.find(query).exec();
  }

  async getSessions(id: string, status?: 'upcoming' | 'past' | 'all') {
    const query: SessionQuery = { instructor: id };
    if (status && status !== 'all') {
      query.status = status === 'upcoming' ? 'scheduled' : 'completed';
    }
    return this.sessionModel.find(query).exec();
  }

  async createSession(id: string, sessionData: any) {
    const session = new this.sessionModel({
      ...sessionData,
      instructor: id
    });
    return session.save();
  }

  async getResources(id: string) {
    return this.resourceModel.find({ uploadedBy: id }).exec();
  }

  async uploadResource(id: string, resourceData: any, file?: Express.Multer.File) {
    let fileData = null;
    
    if (file) {
      // Convert file to base64
      const base64String = file.buffer.toString('base64');
      const fileType = file.mimetype;
      fileData = {
        dataUrl: `data:${fileType};base64,${base64String}`,
        fileName: file.originalname,
        fileSize: file.size,
        mimeType: file.mimetype
      };
    }

    const resource = new this.resourceModel({
      ...resourceData,
      uploadedBy: id,
      fileData: fileData,
      uploadedAt: new Date()
    });

    return resource.save();
  }

  async getNotifications(id: string) {
    return this.notificationModel.find({ userId: id }).exec();
  }

  async markNotificationAsRead(id: string, notificationId: string) {
    return this.instructorModel.findByIdAndUpdate(
      id,
      {
        $set: { 'notifications.$[elem].read': true }
      },
      {
        arrayFilters: [{ 'elem._id': new Types.ObjectId(notificationId) }]
      }
    );
  }

  async create(createInstructorDto: CreateInstructorDto): Promise<Instructor> {
    const newInstructor = new this.instructorModel(createInstructorDto);
    return newInstructor.save();
  }

  async uploadProfilePicture(file: Express.Multer.File): Promise<string> {
    // Convert file buffer to base64
    const base64String = file.buffer.toString('base64');
    const fileType = file.mimetype;
    
    // Return the data URL directly
    return `data:${fileType};base64,${base64String}`;
  }

  // Add any other methods you need
  
}
