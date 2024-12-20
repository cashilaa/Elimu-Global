import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Session } from '../session/session.schema';
import { startOfWeek, endOfWeek } from 'date-fns';

@Injectable()
export class CalendarService {
  constructor(
    @InjectModel(Session.name) private sessionModel: Model<Session>
  ) {}

  async getInstructorSchedule(instructorId: string, date: Date) {
    const weekStart = startOfWeek(date);
    const weekEnd = endOfWeek(date);

    return this.sessionModel.find({
      instructor: instructorId,
      startTime: { $gte: weekStart, $lte: weekEnd }
    }).populate('course', 'title')
      .populate('attendees', 'firstName lastName')
      .sort('startTime');
  }

  async createSession(sessionData: any) {
    const newSession = new this.sessionModel(sessionData);
    return newSession.save();
  }

  async updateSession(sessionId: string, updateData: any) {
    return this.sessionModel.findByIdAndUpdate(
      sessionId,
      updateData,
      { new: true }
    );
  }

  async deleteSession(sessionId: string) {
    return this.sessionModel.findByIdAndDelete(sessionId);
  }
} 