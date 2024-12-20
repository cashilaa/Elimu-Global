import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ timestamps: true })
export class Assessment extends Document {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  userId: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Quiz', required: true })
  quizId: Types.ObjectId;

  @Prop([Object])
  answers: Record<string, any>[];

  @Prop({ required: true })
  score: number;

  @Prop({ required: true })
  submittedAt: Date;

  @Prop({ type: Object })
  feedback: Record<string, any>;
}

export const AssessmentSchema = SchemaFactory.createForClass(Assessment); 