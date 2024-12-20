import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { CourseContent } from '../shared/types/course-content';

export interface Review {
  student: Types.ObjectId;
  rating: number;
  comment?: string;
  createdAt: Date;
}

@Schema({ timestamps: true })
export class Course extends Document {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  description: string;

  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  instructor: Types.ObjectId;

  @Prop([{ type: Types.ObjectId, ref: 'User' }])
  students: Types.ObjectId[];

  @Prop({ type: [Object], required: true })
  content: CourseContent[];

  @Prop({ type: String, enum: ['draft', 'published', 'archived'], default: 'draft' })
  status: string;

  @Prop([{
    student: { type: Types.ObjectId, ref: 'User' },
    rating: Number,
    comment: String,
    createdAt: Date
  }])
  reviews: Review[];

  @Prop({ type: Object })
  pricing: {
    amount: number;
    currency: string;
  };

  @Prop({ type: Object })
  settings: {
    enrollmentLimit?: number;
    isPublic: boolean;
    requiresApproval: boolean;
    certificateEnabled: boolean;
  };

  @Prop({ type: Object })
  analytics: {
    enrollments: number;
    averageRating: number;
    activeStudents: number;
    revenue: number;
  };
}

export const CourseSchema = SchemaFactory.createForClass(Course);
