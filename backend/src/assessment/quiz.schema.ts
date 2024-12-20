import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ timestamps: true })
export class Quiz extends Document {
  @Prop({ required: true })
  title: string;

  @Prop()
  description: string;

  @Prop({ type: Types.ObjectId, ref: 'Course', required: true })
  courseId: Types.ObjectId;

  @Prop([{ type: Types.ObjectId, ref: 'Question' }])
  questions: Types.ObjectId[];

  @Prop({ default: 0 })
  timeLimit: number;

  @Prop({ default: false })
  randomizeQuestions: boolean;

  @Prop({ default: 0 })
  passingScore: number;

  @Prop({ default: 'draft', enum: ['draft', 'published', 'archived'] })
  status: string;
}

export const QuizSchema = SchemaFactory.createForClass(Quiz); 