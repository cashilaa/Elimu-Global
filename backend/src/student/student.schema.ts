import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ timestamps: true })
export class Student extends Document {
  @Prop({ required: true })
  firstName: string;

  @Prop({ required: true })
  lastName: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop([{ type: Types.ObjectId, ref: 'Course' }])
  enrolledCourses: Types.ObjectId[];

  @Prop({ type: Date })
  enrollmentDate: Date;

  @Prop({ type: Object })
  profile: {
    avatar?: string;
    bio?: string;
    phone?: string;
    address?: string;
  };

  @Prop({ type: Object })
  preferences: {
    notifications: boolean;
    language: string;
    timezone: string;
  };

  @Prop({ type: Object })
  analytics: {
    totalTimeSpent: number;
    averageScore: number;
    completedCourses: number;
    lastActive: Date;
  };
}

export const StudentSchema = SchemaFactory.createForClass(Student); 