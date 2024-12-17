import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type CourseDocument = Course & Document & { _id: Types.ObjectId };

@Schema()
export class Course {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  category: string;

  @Prop({ type: String, ref: 'Instructor', required: true })
  instructor: string;

  @Prop({ type: [String], default: [] })
  students: string[];

  @Prop({ type: [String], required: true })
  learningObjectives: string[];

  @Prop({ type: [Object], required: true })
  modules: {
    title: string;
    description: string;
    content: {
      type: string; // 'video', 'document', 'quiz', etc.
      url: string;
      duration?: number;
    }[];
  }[];

  @Prop({ type: Object, required: true })
  pricing: {
    amount: number;
    currency: string;
    discountPrice?: number;
    discountValidUntil?: Date;
  };

  @Prop({ type: Object, default: {} })
  analytics: {
    enrollments: number;
    completionRate: number;
    averageRating: number;
    revenue: number;
    activeStudents: number;
  };

  @Prop({ type: [Object], default: [] })
  reviews: {
    student: string;
    rating: number;
    comment: string;
    createdAt: Date;
  }[];

  @Prop({ type: String, enum: ['draft', 'pending', 'published', 'archived'], default: 'draft' })
  status: string;

  @Prop({ type: Date, default: Date.now })
  createdAt: Date;

  @Prop({ type: Date, default: Date.now })
  updatedAt: Date;

  @Prop({ type: Date })
  publishedAt: Date;
}

export const CourseSchema = SchemaFactory.createForClass(Course);
