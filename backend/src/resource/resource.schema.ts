import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ timestamps: true })
export class Resource extends Document {
  @Prop({ required: true })
  title: string;

  @Prop()
  description: string;

  @Prop({ required: true })
  type: string;

  @Prop()
  fileUrl: string;

  @Prop()
  externalUrl: string;

  @Prop({ type: Types.ObjectId, ref: 'Course' })
  courseId: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  uploadedBy: Types.ObjectId;

  @Prop({ required: true })
  category: string;

  @Prop([String])
  tags: string[];

  @Prop({ default: 0 })
  downloads: number;

  @Prop({ default: 0 })
  views: number;

  @Prop({ type: [{ type: Types.ObjectId, ref: 'User' }] })
  likes: Types.ObjectId[];

  @Prop({ default: 'public', enum: ['public', 'private', 'restricted'] })
  visibility: string;

  @Prop({ type: Map, of: String })
  metadata: Map<string, string>;
}

export const ResourceSchema = SchemaFactory.createForClass(Resource); 