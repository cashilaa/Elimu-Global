export interface Course {
  id: string;
  title: string;
  description: string;
  duration: string;
  price: number;
  maxStudents: number;
  level: 'beginner' | 'intermediate' | 'advanced';
  objectives: string;
  prerequisites?: string;
  status: string;
  analytics: any; // Define proper analytics type if needed
  content?: {
    sections: {
      id: string;
      title: string;
      items: {
        id: string;
        type: 'video' | 'document' | 'link' | 'download';
        title: string;
        duration?: string;
        size?: string;
        url?: string;
      }[];
    }[];
  };
}

export interface ContentItem {
  id: string;
  type: 'video' | 'document' | 'link' | 'download';
  title: string;
  duration?: string;
  size?: string;
  url?: string;
}

export interface Section {
  id: string;
  title: string;
  items: ContentItem[];
}

export interface CourseFormProps {
  onSubmit: (data: {
    title: string;
    duration: string;
    description: string;
    price: number;
    maxStudents: number;
    level: 'beginner' | 'intermediate' | 'advanced';
    objectives: string;
    prerequisites?: string;
  }) => Promise<void>;
  onCancel: () => void;
}

export interface Notification {
  _id: string;
  id: string;
  type: string;
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  createdAt: string;
  metadata?: {
    actionUrl?: string;
    [key: string]: any;
  };
}

export interface Analytics {
  views: number;
  completionRate: number;
  averageRating: number;
  totalEnrollments: number;
  revenueGenerated: number;
  total_students: number;
  avg_rating: number;
  completion_rate: number;
  total_revenue: number;
  enrollments: number;
  revenue: number;
  studentEngagement: {
    date: string;
    count: number;
  }[];
}