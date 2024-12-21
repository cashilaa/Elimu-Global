import React, { useState, useEffect } from 'react';
import { Users, BookOpen, Clock, DollarSign, Calendar, Bell, Search, ChevronRight, Book, GraduationCap, Award } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Alert, AlertDescription } from '../../components/ui/alert';
import { Avatar } from '../../components/ui/avatar';
import { Badge } from '../../components/ui';

const Dashboard = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [user, setUser] = useState(null);
  
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // Simulated stats data
  const stats = [
    {
      name: 'Total Students',
      value: '2,100',
      icon: Users,
      change: '+4.75%',
      changeType: 'positive'
    },
    {
      name: 'Active Courses',
      value: '15',
      icon: BookOpen,
      change: '+12.5%',
      changeType: 'positive'
    },
    {
      name: 'Teaching Hours',
      value: '245',
      icon: Clock,
      change: '+8.2%',
      changeType: 'positive'
    },
    {
      name: 'Total Revenue',
      value: '$12,500',
      icon: DollarSign,
      change: '+15.3%',
      changeType: 'positive'
    }
  ];

  const recentActivities = [
    {
      id: 1,
      title: "New Course Published",
      description: "Advanced Mathematics for Grade 12",
      timestamp: "2 hours ago",
      type: "course"
    },
    {
      id: 2,
      title: "Student Enrollment",
      description: "150 new students enrolled this week",
      timestamp: "5 hours ago",
      type: "enrollment"
    },
    {
      id: 3,
      title: "Assessment Completed",
      description: "Term 1 Physics Assessment Results Published",
      timestamp: "1 day ago",
      type: "assessment"
    }
  ];

  const upcomingSessions = [
    {
      id: 1,
      title: "Chemistry Lab Introduction",
      instructor: "Prof. Michael Chen",
      time: "10:00 AM",
      date: "Tomorrow",
      students: 45
    },
    {
      id: 2,
      title: "Literature Analysis Workshop",
      instructor: "Dr. Emily Brown",
      time: "2:00 PM",
      date: "Tomorrow",
      students: 32
    },
    {
      id: 3,
      title: "Mathematics Advanced Topics",
      instructor: "Mrs. Rachel Wilson",
      time: "9:00 AM",
      date: "Dec 22, 2024",
      students: 28
    }
  ];

  const achievements = [
    {
      title: "High Performance",
      description: "90% student satisfaction rate",
      icon: Award
    },
    {
      title: "Course Completion",
      description: "85% average completion rate",
      icon: GraduationCap
    },
    {
      title: "New Courses",
      description: "5 new courses this month",
      icon: Book
    }
  ];

  return (
    <div className="p-6">
      {/* Welcome Section */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">
          Welcome back, {user?.firstName || 'Instructor'}!
        </h1>
        <p className="text-gray-600 mt-2">
          Here's what's happening with your courses today
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.name}</p>
                  <h3 className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</h3>
                  <p className={`text-sm mt-1 ${
                    stat.changeType === 'positive' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {stat.change}
                  </p>
                </div>
                <div className={`p-3 rounded-lg ${
                  stat.changeType === 'positive' ? 'bg-green-100' : 'bg-red-100'
                }`}>
                  <stat.icon className={`h-6 w-6 ${
                    stat.changeType === 'positive' ? 'text-green-600' : 'text-red-600'
                  }`} />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* User Profile Summary */}
      {user && (
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              {user.profilePicture ? (
                <img 
                  src={user.profilePicture} 
                  alt={`${user.firstName} ${user.lastName}`}
                  className="w-16 h-16 rounded-full object-cover"
                />
              ) : (
                <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center">
                  <span className="text-blue-600 text-xl font-medium">
                    {user.firstName?.[0]}{user.lastName?.[0]}
                  </span>
                </div>
              )}
              <div>
                <h2 className="text-xl font-bold text-gray-900">
                  {user.firstName} {user.lastName}
                </h2>
                <p className="text-gray-600">{user.expertise || 'Instructor'}</p>
                {user.education && (
                  <p className="text-sm text-gray-500 mt-1">{user.education}</p>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentActivities.map((activity) => (
              <div key={activity.id} className="flex items-center p-4 bg-gray-50 rounded-lg">
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900">{activity.title}</h3>
                  <p className="text-sm text-gray-500">{activity.description}</p>
                  <span className="text-xs text-gray-400">{activity.timestamp}</span>
                </div>
                <ChevronRight className="h-5 w-5 text-gray-400" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Upcoming Sessions */}
      <Card>
        <CardHeader>
          <CardTitle>Upcoming Sessions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {upcomingSessions.map((session) => (
              <div key={session.id} className="flex items-center p-4 bg-gray-50 rounded-lg">
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900">{session.title}</h3>
                  <p className="text-sm text-gray-600">{session.instructor}</p>
                  <div className="flex items-center space-x-2 mt-1">
                    <Clock className="h-4 w-4 text-gray-400" />
                    <span className="text-sm text-gray-500">{session.time} - {session.date}</span>
                    <Badge variant="secondary">{session.students} students</Badge>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Achievements Section */}
      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">Performance Highlights</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {achievements.map((achievement, index) => (
            <Card key={index}>
              <CardContent className="flex items-center space-x-4 p-6">
                <achievement.icon className="h-8 w-8 text-blue-500" />
                <div>
                  <h3 className="font-semibold">{achievement.title}</h3>
                  <p className="text-sm text-gray-500">{achievement.description}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* System Alert */}
      <Alert className="mt-8">
        <AlertDescription>
          Next system maintenance scheduled for December 25, 2024. The platform will be unavailable from 2 AM to 4 AM EST.
        </AlertDescription>
      </Alert>
    </div>
  );
};

export default Dashboard;