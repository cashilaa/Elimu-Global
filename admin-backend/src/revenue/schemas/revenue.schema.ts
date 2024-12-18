import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Revenue extends Document {
  @Prop({ required: true })
  amount: number;

  @Prop({ required: true })
  courseId: string;

  @Prop({ required: true })
  studentId: string;

  @Prop({ required: true })
  paymentDate: Date;

  @Prop()
  paymentMethod: string;

  @Prop({ default: 'completed' })
  status: string;
}

export const RevenueSchema = SchemaFactory.createForClass(Revenue); 