import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ timestamps: true })
export class Discussion extends Document {
  @Prop({ type: Types.ObjectId, ref: 'Course', required: true })
  courseId: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  author: Types.ObjectId;

  @Prop({ required: true })
  content: string;

  @Prop([{ type: Types.ObjectId, ref: 'User' }])
  likes: Types.ObjectId[];

  @Prop([{
    author: { type: Types.ObjectId, ref: 'User' },
    content: String,
    createdAt: Date
  }])
  replies: {
    author: Types.ObjectId;
    content: string;
    createdAt: Date;
  }[];
}

export const DiscussionSchema = SchemaFactory.createForClass(Discussion); 