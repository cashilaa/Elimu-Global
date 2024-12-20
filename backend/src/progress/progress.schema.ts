import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ timestamps: true })
export class Progress extends Document {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  userId: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Course', required: true })
  courseId: Types.ObjectId;

  @Prop([String])
  completedContent: string[];

  @Prop({ type: Map, of: Number })
  quizScores: Map<string, number>;

  @Prop()
  lastAccessed: Date;

  @Prop({ type: Map, of: Number })
  timeSpent: Map<string, number>;
}

export const ProgressSchema = SchemaFactory.createForClass(Progress); 