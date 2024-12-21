import React, { useState, useEffect } from 'react';
import { Users, BookOpen, Clock, DollarSign, Calendar, Bell, Search, ChevronRight, Book, GraduationCap, Award } from 'lucide-react';

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
          <div key={index} className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-gray-600">{stat.name}</p>
                <p className="mt-2 text-3xl font-semibold">{stat.value}</p>
                <p className={`mt-2 text-sm ${
                  stat.changeType === 'positive' ? 'text-green-600' : 'text-red-600'
                }`}>
                  {stat.change}
                </p>
              </div>
              <div className="p-3 bg-blue-50 rounded-lg">
                <stat.icon className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
        <h2 className="text-lg font-semibold mb-4">Recent Activity</h2>
        <div className="space-y-4">
          {[1, 2, 3].map((item) => (
            <div key={item} className="flex items-center justify-between p-4 hover:bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-4">
                <div className="p-2 bg-blue-50 rounded-lg">
                  <BookOpen className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <p className="font-medium">New Course Published</p>
                  <p className="text-sm text-gray-500">2 hours ago</p>
                </div>
              </div>
              <ChevronRight className="h-5 w-5 text-gray-400" />
            </div>
          ))}
        </div>
      </div>

      {/* System Alert */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <p className="text-sm text-blue-700">
          Next system maintenance scheduled for December 25, 2024. The platform will be unavailable from 2 AM to 4 AM EST.
        </p>
      </div>
    </div>
  );
};

export default Dashboard;