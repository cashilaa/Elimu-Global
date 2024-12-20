import { CourseContent } from './course-content';
import { Types } from 'mongoose';

export interface Course {
  id: string;
  title: string;
  description: string;
  instructor: Types.ObjectId;
  students: Types.ObjectId[];
  content: CourseContent[];
  status: 'draft' | 'published' | 'archived';
  createdAt: Date;
  updatedAt: Date;
}

export interface Session {
  id: string;
  courseId: string;
  title: string;
  startTime: Date;
  endTime: Date;
  type: 'live' | 'recorded';
  status: 'scheduled' | 'in-progress' | 'completed';
  attendees: string[];
  recording?: string;
}

export interface Progress {
  userId: string;
  courseId: string;
  completedContent: string[];
  quizScores: Record<string, number>;
  lastAccessed: Date;
  overallProgress: number;
}

export interface Notification {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: 'info' | 'warning' | 'success' | 'error';
  read: boolean;
  createdAt: Date;
}

export interface Resource {
  id: string;
  courseId: string;
  title: string;
  type: 'document' | 'video' | 'link';
  url: string;
  accessLevel: 'public' | 'enrolled' | 'instructor';
} 