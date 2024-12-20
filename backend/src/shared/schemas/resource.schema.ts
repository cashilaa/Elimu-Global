import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ timestamps: true })
export class Resource extends Document {
  @Prop({ required: true })
  title: string;

  @Prop()
  description: string;

  @Prop({ required: true })
  url: string;

  @Prop({ required: true })
  type: string;

  @Prop({ type: Types.ObjectId, ref: 'Instructor', required: true })
  uploadedBy: Types.ObjectId;

  @Prop({ type: Object })
  metadata: {
    fileSize?: number;
    fileType?: string;
    duration?: number;
    dimensions?: {
      width: number;
      height: number;
    };
  };

  @Prop({ type: [{ type: Types.ObjectId, ref: 'Course' }] })
  associatedCourses: Types.ObjectId[];
}

export const ResourceSchema = SchemaFactory.createForClass(Resource); 