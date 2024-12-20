import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type CourseContentDocument = CourseContent & Document;

@Schema({ timestamps: true })
export class CourseContent {
  @Prop({ required: true })
  courseId: string;

  @Prop({ required: true })
  title: string;

  @Prop()
  description: string;

  @Prop({ required: true })
  moduleIndex: number;

  @Prop({ required: true })
  contentIndex: number;

  @Prop({
    type: String,
    enum: ['video', 'document', 'quiz', 'assignment'],
    required: true,
  })
  type: string;

  @Prop({ type: Object })
  videoContent: {
    originalUrl: string;
    streamingUrl: string;
    duration: number;
    thumbnailUrl: string;
    transcoded: boolean;
    qualities: {
      [key: string]: string; // e.g., '720p': 'url', '1080p': 'url'
    };
  };

  @Prop({ type: Object })
  documentContent: {
    url: string;
    fileType: string;
    fileSize: number;
    previewUrl?: string;
  };

  @Prop({ type: Object })
  quizContent: {
    questions: {
      question: string;
      options: string[];
      correctAnswer: number;
      explanation?: string;
    }[];
    timeLimit?: number;
    passingScore: number;
  };

  @Prop({ type: Object })
  assignmentContent: {
    instructions: string;
    dueDate?: Date;
    maxScore: number;
    rubric?: {
      criteria: string;
      maxPoints: number;
    }[];
  };

  @Prop({ type: [String], default: [] })
  prerequisites: string[];

  @Prop({ default: true })
  isPublished: boolean;

  @Prop({ type: Object })
  metadata: {
    lastUpdated: Date;
    version: number;
    downloadable: boolean;
    estimatedDuration: number;
  };
}

export const CourseContentSchema = SchemaFactory.createForClass(CourseContent);
