import React, { useState } from 'react';
import Card from '../../components/ui/Card';
import Badge from '../../components/ui/Badge';
import Button from '../../components/ui/Button';
import { Plus, Users, Clock, Star, Video, BarChart, Edit, Trash } from 'lucide-react';
import CourseForm from '../../components/instructor/CourseForm';
import CourseAnalytics from '../../components/instructor/CourseAnalytics';
import CourseContentManager from '../../components/instructor/CourseContentManager';
import VideoUploader from '../../components/instructor/VideoUploader';
import { useNavigate } from 'react-router-dom';

const Courses = () => {
  const navigate = useNavigate();
  const [showCourseForm, setShowCourseForm] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');

  const courses = [
    {
      id: 1,
      title: 'Introduction to Web Development',
      description: 'Learn the basics of HTML, CSS, and JavaScript',
      students: 45,
      duration: '8 weeks',
      rating: 4.8,
      status: 'active',
      analytics: {
        completion_rate: 78,
        avg_engagement: 85,
        total_revenue: 4500
      }
    },
    {
      id: 2,
      title: 'Advanced React Patterns',
      description: 'Master advanced React concepts and patterns',
      students: 32,
      duration: '6 weeks',
      rating: 4.9,
      status: 'active',
      analytics: {
        completion_rate: 82,
        avg_engagement: 89,
        total_revenue: 3200
      }
    },
    {
      id: 3,
      title: 'Python for Beginners',
      description: 'Start your journey with Python programming',
      students: 28,
      duration: '10 weeks',
      rating: 4.7,
      status: 'draft',
      analytics: {
        completion_rate: 0,
        avg_engagement: 0,
        total_revenue: 0
      }
    }
  ];

  const handleCourseSelect = (course) => {
    setSelectedCourse(course);
    setActiveTab('overview');
  };

  const renderCourseDetails = () => {
    if (!selectedCourse) return null;

    return (
      <div className="mt-6">
        <Card>
          <div className="border-b pb-4 mb-4">
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-xl font-semibold">{selectedCourse.title}</h2>
                <p className="text-gray-600">{selectedCourse.description}</p>
              </div>
              <div className="flex space-x-2">
                <Button variant="secondary" size="sm">
                  <Edit className="h-4 w-4 mr-1" />
                  Edit
                </Button>
                <Button variant="danger" size="sm">
                  <Trash className="h-4 w-4 mr-1" />
                  Delete
                </Button>
              </div>
            </div>
          </div>

          {/* Course Tabs */}
          <div className="flex space-x-4 border-b mb-4">
            {['overview', 'content', 'analytics', 'videos'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`pb-2 px-1 font-medium capitalize ${
                  activeTab === tab
                    ? 'border-b-2 border-blue-500 text-blue-600'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          {activeTab === 'overview' && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 bg-blue-50 rounded-lg">
                <h3 className="font-medium text-blue-700">Students</h3>
                <p className="text-2xl font-bold">{selectedCourse.students}</p>
              </div>
              <div className="p-4 bg-green-50 rounded-lg">
                <h3 className="font-medium text-green-700">Duration</h3>
                <p className="text-2xl font-bold">{selectedCourse.duration}</p>
              </div>
              <div className="p-4 bg-yellow-50 rounded-lg">
                <h3 className="font-medium text-yellow-700">Rating</h3>
                <p className="text-2xl font-bold">{selectedCourse.rating}</p>
              </div>
            </div>
          )}

          {activeTab === 'content' && (
            <CourseContentManager courseId={selectedCourse.id} />
          )}

          {activeTab === 'analytics' && (
            <CourseAnalytics analytics={selectedCourse.analytics} />
          )}

          {activeTab === 'videos' && (
            <VideoUploader courseId={selectedCourse.id} />
          )}
        </Card>
      </div>
    );
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">My Courses</h1>
        <button
          onClick={() => navigate('/dashboard/courses/create')}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2"
        >
          <Plus className="w-5 h-5" />
          Create Course
        </button>
      </div>

      {/* Course Form Modal */}
      {showCourseForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Create New Course</h2>
              <button
                onClick={() => setShowCourseForm(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                ×
              </button>
            </div>
            <CourseForm onClose={() => setShowCourseForm(false)} />
          </div>
        </div>
      )}

      {/* Course Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course) => (
          <Card 
            key={course.id} 
            className={`hover:shadow-lg transition-shadow cursor-pointer ${
              selectedCourse?.id === course.id ? 'ring-2 ring-blue-500' : ''
            }`}
            onClick={() => handleCourseSelect(course)}
          >
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-lg font-semibold">{course.title}</h3>
              <Badge 
                variant={course.status === 'active' ? 'success' : 'warning'}
                size="sm"
              >
                {course.status}
              </Badge>
            </div>
            <p className="text-gray-600 mb-4">{course.description}</p>
            <div className="flex items-center justify-between text-sm text-gray-500">
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-1">
                  <Users className="h-4 w-4" />
                  <span>{course.students}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Clock className="h-4 w-4" />
                  <span>{course.duration}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Star className="h-4 w-4 text-yellow-500" />
                  <span>{course.rating}</span>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Selected Course Details */}
      {renderCourseDetails()}
    </div>
  );
};

export default Courses;
