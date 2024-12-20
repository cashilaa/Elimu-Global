import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ timestamps: true })
export class Session extends Document {
  @Prop({ type: Types.ObjectId, ref: 'Course', required: true })
  courseId: Types.ObjectId;

  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  startTime: Date;

  @Prop({ required: true })
  endTime: Date;

  @Prop({ type: String, enum: ['live', 'recorded'], default: 'live' })
  type: string;

  @Prop({ type: String, enum: ['scheduled', 'in-progress', 'completed'], default: 'scheduled' })
  status: string;

  @Prop([{ type: Types.ObjectId, ref: 'User' }])
  attendees: Types.ObjectId[];

  @Prop()
  recording?: string;

  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  instructor: Types.ObjectId;

  @Prop({ type: Object })
  metadata: Record<string, any>;
}

export const SessionSchema = SchemaFactory.createForClass(Session); 