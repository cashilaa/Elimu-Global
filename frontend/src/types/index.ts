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

export interface Quiz {
  id: string;
  title: string;
  description: string;
  questions: Question[];
  timeLimit?: number;
  passingScore: number;
  courseId?: string;
}

export interface Question {
  id: string;
  text: string;
  type: 'multiple-choice' | 'true-false' | 'short-answer';
  options?: string[];
  correctAnswer: string | string[];
  points: number;
}

export interface Discussion {
  id: string;
  title: string;
  content: string;
  author: {
    id: string;
    name: string;
    avatar?: string;
  };
  createdAt: string;
  updatedAt: string;
  replies: Reply[];
  tags?: string[];
  likes: number;
  views: number;
}

export interface Reply {
  id: string;
  content: string;
  author: {
    id: string;
    name: string;
    avatar?: string;
  };
  createdAt: string;
  updatedAt: string;
  likes: number;
}

export interface Resource {
  id: string;
  title: string;
  type: 'pdf' | 'video' | 'document' | 'link';
  url: string;
  size?: string;
  duration?: string;
  description?: string;
  uploadedBy: {
    id: string;
    name: string;
  };
  createdAt: string;
  courseId?: string;
}

export interface CalendarEvent {
  id: string;
  title: string;
  start: string;
  end: string;
  allDay?: boolean;
  description?: string;
  type: 'class' | 'assignment' | 'exam' | 'other';
  courseId?: string;
}

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: 'instructor' | 'student' | 'admin';
  avatar?: string;
  bio?: string;
  courses?: string[];
  createdAt: string;
  updatedAt: string;
}

export interface ChatMessage {
  id: string;
  content: string;
  sender: {
    id: string;
    name: string;
    avatar?: string;
  };
  receiver: {
    id: string;
    name: string;
    avatar?: string;
  };
  createdAt: string;
  read: boolean;
}

export interface Group {
  id: string;
  name: string;
  description?: string;
  members: {
    id: string;
    name: string;
    role: 'leader' | 'member';
  }[];
  courseId: string;
  createdAt: string;
  updatedAt: string;
}

export interface Progress {
  userId: string;
  courseId: string;
  completedItems: string[];
  quizScores: {
    quizId: string;
    score: number;
    completedAt: string;
  }[];
  lastAccessed: string;
  overallProgress: number;
}

export interface RecentActivity {
  id: string;
  type: 'course_progress' | 'quiz_completion' | 'discussion_post' | 'resource_access';
  description: string;
  timestamp: string;
  metadata?: {
    courseId?: string;
    quizId?: string;
    discussionId?: string;
    resourceId?: string;
    score?: number;
    [key: string]: any;
  };
}
