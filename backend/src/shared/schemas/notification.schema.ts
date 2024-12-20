import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ timestamps: true })
export class Notification extends Document {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  message: string;

  @Prop({ type: String, enum: ['info', 'warning', 'error', 'success'], default: 'info' })
  type: string;

  @Prop({ default: false })
  read: boolean;

  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  userId: Types.ObjectId;
}

export const NotificationSchema = SchemaFactory.createForClass(Notification); 