import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Question extends Document {
  @Prop({ required: true })
  text: string;

  @Prop({ required: true, enum: ['multiple-choice', 'multiple-select', 'true-false', 'short-answer'] })
  type: string;

  @Prop([String])
  options: string[];

  @Prop({ type: Object })
  correctAnswer: any;

  @Prop()
  explanation: string;

  @Prop({ default: 1 })
  points: number;

  @Prop([String])
  tags: string[];
}

export const QuestionSchema = SchemaFactory.createForClass(Question); 