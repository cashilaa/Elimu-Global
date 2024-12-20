export interface CourseContent {
  id: string;
  type: 'video' | 'document' | 'quiz' | 'assignment';
  title: string;
  description?: string;
  url?: string;
  duration?: number;
  order: number;
  isRequired: boolean;
  metadata?: Record<string, any>;
}

export interface Course {
  id: string;
  title: string;
  description: string;
  instructor: string;
  students: string[];
  content: CourseContent[];
  status: 'draft' | 'published' | 'archived';
  createdAt: Date;
  updatedAt: Date;
} 