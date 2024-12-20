import { Types } from 'mongoose';

export interface Resource {
  id: string;
  title: string;
  description?: string;
  type: 'document' | 'video' | 'image' | 'link';
  fileUrl?: string;
  externalUrl?: string;
  courseId?: Types.ObjectId;
  uploadedBy: Types.ObjectId;
  category: string;
  tags: string[];
  downloads: number;
  views: number;
  likes: Types.ObjectId[];
  visibility: 'public' | 'private' | 'restricted';
  metadata: Map<string, string>;
} 