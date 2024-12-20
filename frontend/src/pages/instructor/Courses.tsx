import React, { useState } from 'react';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { Plus, Users, Clock, Star, Edit, Trash } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { CourseForm } from '../../components/instructor/CourseForm';
import { CourseContentManager } from '../../components/instructor/CourseContentManager';
import { CourseAnalytics } from '../../components/instructor/CourseAnalytics';
import { VideoUploader } from '../../components/instructor/VideoUploader';

interface Course {
  id: number;
  title: string;
  description: string;
  enrolledStudents: number;
  duration: string;
  rating: number;
  status: 'published' | 'draft';
  analytics: Analytics;
}

interface Analytics {
  views: number;
  completionRate: number;
  averageRating: number;
  totalEnrollments: number;
  revenue: number;
  studentEngagement: number;
  timeSpent: number;
  assessmentScores: number;
  discussionPosts: number;
  resourceDownloads: number;
}

const Courses: React.FC = () => {
  const [courses, setCourses] = useState<Course[]>([
    {
      id: 1,
      title: 'Introduction to React',
      description: 'Learn the fundamentals of React',
      enrolledStudents: 150,
      duration: '8 weeks',
      rating: 4.5,
      status: 'published',
      analytics: {
        views: 1500,
        completionRate: 75,
        averageRating: 4.5,
        totalEnrollments: 150,
        revenue: 15000,
        studentEngagement: 85,
        timeSpent: 4500,
        assessmentScores: 82,
        discussionPosts: 245,
        resourceDownloads: 890
      }
    }
  ]);

  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [showCourseForm, setShowCourseForm] = useState(false);
  const [activeTab, setActiveTab] = useState<'content' | 'analytics' | 'videos'>('content');

  const handleDeleteCourse = (courseId: number) => {
    setCourses(courses.filter(course => course.id !== courseId));
    toast.success('Course deleted successfully');
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Courses</h1>
        <Button onClick={() => setShowCourseForm(true)}>
          <Plus className="w-4 h-4 mr-2" />
          Create Course
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course) => (
          <Card key={course.id} className="p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="font-semibold text-lg">{course.title}</h3>
                <p className="text-sm text-gray-600">{course.description}</p>
              </div>
              <Badge variant={course.status === 'published' ? 'success' : 'secondary'}>
                {course.status}
              </Badge>
            </div>

            <div className="space-y-2 mb-4">
              <div className="flex items-center text-sm text-gray-600">
                <Users className="w-4 h-4 mr-2" />
                {course.enrolledStudents} students
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <Clock className="w-4 h-4 mr-2" />
                {course.duration}
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <Star className="w-4 h-4 mr-2" />
                {course.rating} rating
              </div>
            </div>

            <div className="flex justify-end gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setSelectedCourse(course)}
              >
                <Edit className="w-4 h-4 mr-2" />
                Edit
              </Button>
              <Button
                variant="destructive"
                size="sm"
                onClick={() => handleDeleteCourse(course.id)}
              >
                <Trash className="w-4 h-4 mr-2" />
                Delete
              </Button>
            </div>
          </Card>
        ))}
      </div>

      {selectedCourse && (
        <div className="mt-8">
          <Card className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold">{selectedCourse.title}</h2>
              <div className="flex gap-2">
                <Button
                  variant={activeTab === 'content' ? 'default' : 'outline'}
                  onClick={() => setActiveTab('content')}
                >
                  Content
                </Button>
                <Button
                  variant={activeTab === 'analytics' ? 'default' : 'outline'}
                  onClick={() => setActiveTab('analytics')}
                >
                  Analytics
                </Button>
                <Button
                  variant={activeTab === 'videos' ? 'default' : 'outline'}
                  onClick={() => setActiveTab('videos')}
                >
                  Videos
                </Button>
              </div>
            </div>

            {activeTab === 'content' && (
              <CourseContentManager course={selectedCourse} />
            )}

            {activeTab === 'analytics' && (
              <CourseAnalytics analytics={selectedCourse.analytics} />
            )}

            {activeTab === 'videos' && (
              <VideoUploader course={selectedCourse} />
            )}
          </Card>
        </div>
      )}

      {showCourseForm && (
        <CourseForm onClose={() => setShowCourseForm(false)} onSubmit={(course) => {
          setCourses([...courses, { ...course, id: courses.length + 1 }]);
          setShowCourseForm(false);
          toast.success('Course created successfully');
        }} />
      )}
    </div>
  );
};

export default Courses;
