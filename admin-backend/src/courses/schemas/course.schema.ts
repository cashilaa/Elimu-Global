import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export enum CourseStatus {
  ACTIVE = 'Active',
  DRAFT = 'Draft',
  INACTIVE = 'Inactive'
}

@Schema({ 
  timestamps: true,
  toJSON: {
    transform: function(doc, ret) {
      ret.id = ret._id;
      delete ret._id;
      delete ret.__v;
      return ret;
    }
  }
})
export class Course extends Document {
  @Prop({ required: true })
  title: string;

  @Prop()
  description: string;

  @Prop()
  pdfUrl: string;

  @Prop({ enum: CourseStatus, default: CourseStatus.ACTIVE })
  status: CourseStatus;
}

export const CourseSchema = SchemaFactory.createForClass(Course);