import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ timestamps: true })
export class Analytics extends Document {
  @Prop({ type: Types.ObjectId, ref: 'Course', required: true })
  courseId: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Instructor', required: true })
  instructorId: Types.ObjectId;

  @Prop({ type: Number, default: 0 })
  views: number;

  @Prop({ type: Number, default: 0 })
  completions: number;

  @Prop({ type: Number, default: 0 })
  enrollments: number;

  @Prop({ type: Object })
  metadata: Record<string, any>;
}

export const AnalyticsSchema = SchemaFactory.createForClass(Analytics); 