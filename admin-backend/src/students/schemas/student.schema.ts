import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Student extends Document {
  @Prop({ required: true })
  fullName: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop()
  phone: string;

  @Prop({ default: 0 })
  enrolledCourses: number;

  @Prop({ default: true })
  isActive: boolean;

  @Prop()
  lastLogin: Date;
}

export const StudentSchema = SchemaFactory.createForClass(Student); 