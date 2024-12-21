import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

export type CourseDocument = Course & Document;

interface Review {
  student: string;
  rating: number;
  comment: string;
  createdAt: Date;
}

interface Analytics {
  enrollments: number;
  averageRating: number;
  activeStudents: number;
  revenue: number;
}

@Schema({ timestamps: true })
export class Course {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  description: string;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Instructor', required: true })
  instructor: string;

  @Prop([{
    title: String,
    description: String,
    content: [{
      type: {
        type: String,
        enum: ['video', 'document', 'quiz', 'assignment'],
      },
      title: String,
      description: String,
      url: String,
      duration: Number,
    }]
  }])
  modules: Array<{
    title: string;
    description: string;
    content: Array<{
      type: string;
      title: string;
      description: string;
      url?: string;
      duration?: number;
    }>;
  }>;

  @Prop({ type: [{ type: MongooseSchema.Types.ObjectId, ref: 'Student' }] })
  students: string[];

  @Prop([{
    student: { type: MongooseSchema.Types.ObjectId, ref: 'Student' },
    rating: Number,
    comment: String,
    createdAt: Date,
  }])
  reviews: Review[];

  @Prop({
    type: {
      enrollments: Number,
      averageRating: Number,
      activeStudents: Number,
      revenue: Number,
    },
    default: {
      enrollments: 0,
      averageRating: 0,
      activeStudents: 0,
      revenue: 0,
    }
  })
  analytics: Analytics;

  @Prop({ type: { amount: Number, currency: String } })
  pricing: { amount: number; currency: string };

  @Prop()
  publishedAt?: Date;

  @Prop({ default: 'draft', enum: ['draft', 'published', 'archived'] })
  status: string;
}

export const CourseSchema = SchemaFactory.createForClass(Course); 