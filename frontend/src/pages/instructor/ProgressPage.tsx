import React, { useEffect, useState } from 'react';
import { ProgressTracker } from '../../components/progress/ProgressTracker';
import { toast } from 'react-hot-toast';
import { Loader2 } from 'lucide-react';

interface CourseProgress {
  courseId: string;
  courseName: string;
  totalStudents: number;
  completionRate: number;
  averageScore: number;
  lastUpdated: string;
}

interface StudentProgress {
  studentId: string;
  studentName: string;
  coursesEnrolled: number;
  averageProgress: number;
  lastActive: string;
  performance: {
    assignments: number;
    quizzes: number;
    participation: number;
  };
}

interface ProgressData {
  courseProgress: CourseProgress[];
  studentProgress: StudentProgress[];
}

export const ProgressPage: React.FC = () => {
  const [progressData, setProgressData] = useState<ProgressData>({
    courseProgress: [],
    studentProgress: []
  });
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    fetchProgressData();
  }, []);

  const fetchProgressData = async () => {
    try {
      const response = await fetch('/api/instructor/progress', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      
      if (!response.ok) {
        throw new Error('Failed to fetch progress data');
      }
      
      const data = await response.json();
      setProgressData(data);
    } catch (error) {
      console.error('Failed to fetch progress data:', error);
      toast.error('Failed to load progress data');
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-[calc(100vh-4rem)]">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="p-6">
      <ProgressTracker 
        courseProgress={progressData.courseProgress}
        studentProgress={progressData.studentProgress}
      />
    </div>
  );
};

export default ProgressPage;

