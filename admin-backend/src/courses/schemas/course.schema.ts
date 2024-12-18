import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export enum CourseStatus {
  ACTIVE = 'Active',
  DRAFT = 'Draft',
  INACTIVE = 'Inactive'
}

@Schema({ timestamps: true })
export class Course extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  instructor: string;

  @Prop()
  description: string;

  @Prop({ default: 0 })
  students: number;

  @Prop({ type: Number, required: true })
  price: number;

  @Prop()
  thumbnail: string;

  @Prop({ enum: CourseStatus, default: CourseStatus.DRAFT })
  status: CourseStatus;
}

export const CourseSchema = SchemaFactory.createForClass(Course); 