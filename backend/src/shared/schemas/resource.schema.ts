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

  @Prop({ type: Types.ObjectId, ref: 'Instructor', required: true })
  uploadedBy: Types.ObjectId;

  @Prop({ type: Object })
  fileData: {
    dataUrl: string;
    fileName: string;
    fileSize: number;
    mimeType: string;
  };

  @Prop({ type: [{ type: Types.ObjectId, ref: 'Course' }] })
  associatedCourses: Types.ObjectId[];

  @Prop({ type: Object })
  metadata: {
    lastUpdated: Date;
    version: number;
    downloadable: boolean;
    estimatedDuration?: number;
  };
}

export const ResourceSchema = SchemaFactory.createForClass(Resource); 