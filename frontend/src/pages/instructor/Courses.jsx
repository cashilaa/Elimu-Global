import React, { useState, useEffect } from 'react';
import { Users, Clock, Star, Video, BarChart, Edit, Trash, Plus, Search, Filter, Download, Upload, Book, Calendar, X } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui';
import { Badge } from '../../components/ui';
import { Alert, AlertDescription } from '../../components/ui/alert';
import { Button } from '../../components/ui';
import { Avatar } from '../../components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/tabs';
import CourseForm from '../../components/instructor/CourseForm';

const Courses = () => {
  const [showCourseForm, setShowCourseForm] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const response = await fetch('/api/courses', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}` // Assuming you store the token in localStorage
        }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch courses');
      }

      const data = await response.json();
      setCourses(data);
    } catch (error) {
      console.error('Error fetching courses:', error);
      setError('Failed to load courses');
    } finally {
      setLoading(false);
    }
  };

  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         course.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filterStatus === 'all' || course.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const renderAnalytics = (analytics) => {
    const metrics = [
      { label: 'Completion Rate', value: `${analytics.completion_rate}%`, icon: BarChart, color: 'blue' },
      { label: 'Avg. Engagement', value: `${analytics.avg_engagement}%`, icon: Users, color: 'green' },
      { label: 'Weekly Active Users', value: analytics.weekly_active_users, icon: Users, color: 'purple' },
      { label: 'Total Hours Watched', value: analytics.total_hours_watched, icon: Clock, color: 'orange' }
    ];

    return (
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {metrics.map((metric, index) => (
          <Card key={index} className="bg-white">
            <CardContent className="p-4">
              <div className={`flex items-center justify-center h-12 w-12 rounded-full bg-${metric.color}-100 mb-4`}>
                <metric.icon className={`h-6 w-6 text-${metric.color}-600`} />
              </div>
              <h3 className="text-lg font-semibold">{metric.value}</h3>
              <p className="text-sm text-gray-600">{metric.label}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  };

  const renderSchedule = (schedule) => (
    <div className="space-y-4">
      {schedule.length > 0 ? (
        schedule.map((session, index) => (
          <Card key={index} className="bg-gray-50">
            <CardContent className="p-4 flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <Calendar className="h-5 w-5 text-gray-500" />
                <div>
                  <p className="font-medium">{session.day}</p>
                  <p className="text-sm text-gray-600">{session.time}</p>
                </div>
              </div>
              <Button variant="outline" size="sm">View Details</Button>
            </CardContent>
          </Card>
        ))
      ) : (
        <Alert>
          <AlertDescription>No scheduled sessions for this course yet.</AlertDescription>
        </Alert>
      )}
    </div>
  );

  const renderCourseDetails = () => {
    if (!selectedCourse) return null;

    return (
      <Card className="mt-6">
        <CardHeader className="border-b">
          <div className="flex justify-between items-start">
            <div className="flex items-start space-x-4">
              <Avatar className="h-12 w-12">
                <img src={selectedCourse.instructor.avatar} alt={selectedCourse.instructor.name} />
              </Avatar>
              <div>
                <CardTitle>{selectedCourse.title}</CardTitle>
                <p className="text-sm text-gray-600">
                  Instructor: {selectedCourse.instructor.name} • {selectedCourse.instructor.department}
                </p>
              </div>
            </div>
            <div className="flex space-x-2">
              <Button variant="outline" size="sm">
                <Edit className="h-4 w-4 mr-1" />
                Edit
              </Button>
              <Button variant="destructive" size="sm">
                <Trash className="h-4 w-4 mr-1" />
                Delete
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="overview" className="mt-4">
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
              <TabsTrigger value="schedule">Schedule</TabsTrigger>
              <TabsTrigger value="content">Content</TabsTrigger>
            </TabsList>
            <TabsContent value="overview" className="mt-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-500">Enrolled Students</p>
                        <p className="text-2xl font-bold">{selectedCourse.students}</p>
                      </div>
                      <Users className="h-8 w-8 text-blue-500" />
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-500">Course Duration</p>
                        <p className="text-2xl font-bold">{selectedCourse.duration}</p>
                      </div>
                      <Clock className="h-8 w-8 text-green-500" />
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-500">Average Rating</p>
                        <p className="text-2xl font-bold">{selectedCourse.rating}</p>
                      </div>
                      <Star className="h-8 w-8 text-yellow-500" />
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            <TabsContent value="analytics" className="mt-4">
              {renderAnalytics(selectedCourse.analytics)}
            </TabsContent>
            <TabsContent value="schedule" className="mt-4">
              {renderSchedule(selectedCourse.schedule)}
            </TabsContent>
            <TabsContent value="content" className="mt-4">
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold">Course Content</h3>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm">
                      <Upload className="h-4 w-4 mr-1" />
                      Import
                    </Button>
                    <Button variant="outline" size="sm">
                      <Download className="h-4 w-4 mr-1" />
                      Export
                    </Button>
                  </div>
                </div>
                <Alert>
                  <AlertDescription>
                    Content management features will be implemented based on specific requirements.
                  </AlertDescription>
                </Alert>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    );
  };

  const handleCreateCourse = async (courseData) => {
    try {
      const response = await fetch('/api/courses', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({
          ...courseData,
          instructor: {
            name: 'Dr. Sarah Johnson', // This should come from your auth context
            avatar: '/api/placeholder/32/32',
            department: 'Computer Science'
          }
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to create course');
      }

      const newCourse = await response.json();
      setCourses(prevCourses => [...prevCourses, newCourse]);
      setShowCourseForm(false);
    } catch (error) {
      console.error('Error creating course:', error);
      alert('Failed to create course. Please try again.');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <h1 className="text-2xl font-bold">Course Management</h1>
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search courses..."
              className="pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <select
            className="px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="draft">Draft</option>
          </select>
          <Button 
            onClick={() => setShowCourseForm(true)}
            variant="default"
          >
            <Plus className="h-4 w-4 mr-2" />
            Create Course
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCourses.map((course) => (
          <Card 
            key={course.id}
            className={`cursor-pointer hover:shadow-lg transition-shadow ${
              selectedCourse?.id === course.id ? 'ring-2 ring-blue-500' : ''
            }`}
            onClick={() => setSelectedCourse(course)}
          >
            <CardContent className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-semibold">{course.title}</h3>
                  <p className="text-sm text-gray-500">{course.instructor.name}</p>
                </div>
                <Badge variant={course.status === 'active' ? 'default' : 'secondary'}>
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
            </CardContent>
          </Card>
        ))}
      </div>

      {renderCourseDetails()}

      {showCourseForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto m-4">
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>Create New Course</CardTitle>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowCourseForm(false)}
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <CourseForm 
                onClose={() => setShowCourseForm(false)}
                onSubmit={handleCreateCourse}
              />
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default Courses;