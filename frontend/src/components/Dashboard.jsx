import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from './ui/Card';
import { 
  BookOpen, Users, Calendar, TrendingUp, 
  Clock, Award, Bell, ChevronRight 
} from 'lucide-react';

const Dashboard = () => {
  const stats = [
    {
      title: 'Active Courses',
      value: '12',
      icon: BookOpen,
      change: '+2.5%',
      color: 'blue'
    },
    {
      title: 'Total Students',
      value: '1,234',
      icon: Users,
      change: '+12.3%',
      color: 'green'
    },
    {
      title: 'Upcoming Sessions',
      value: '5',
      icon: Calendar,
      change: '2 this week',
      color: 'purple'
    },
    {
      title: 'Revenue',
      value: '$12,345',
      icon: TrendingUp,
      change: '+8.1%',
      color: 'yellow'
    },
  ];

  const upcomingSessions = [
    {
      title: 'Introduction to React',
      time: '2:00 PM - 3:30 PM',
      date: 'Today',
      students: 25,
      type: 'Live Session'
    },
    // Add more sessions...
  ];

  const recentActivities = [
    {
      type: 'enrollment',
      message: 'New student enrolled in React Fundamentals',
      time: '2 hours ago'
    },
    // Add more activities...
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Welcome Section */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Welcome back, Instructor!</h1>
          <p className="text-gray-600">Here's what's happening with your courses today.</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors">
          <Bell size={20} />
          <span>Notifications</span>
        </button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index} className="hover:translate-y-[-4px] transition-transform">
            <CardContent className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                <h3 className="text-2xl font-bold mt-2 text-gray-900">{stat.value}</h3>
                <p className={`text-sm mt-1 text-${stat.color}-600`}>{stat.change}</p>
              </div>
              <div className={`p-3 bg-${stat.color}-50 rounded-lg`}>
                <stat.icon className={`w-6 h-6 text-${stat.color}-500`} />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Upcoming Sessions */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Upcoming Sessions</CardTitle>
              <button className="text-sm text-blue-600 hover:text-blue-700">View All</button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {upcomingSessions.map((session, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-blue-100 rounded-lg">
                      <Clock className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">{session.title}</h4>
                      <p className="text-sm text-gray-600">{session.time} • {session.date}</p>
                    </div>
                  </div>
                  <button className="p-2 hover:bg-gray-100 rounded-full">
                    <ChevronRight className="w-5 h-5 text-gray-400" />
                  </button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivities.map((activity, index) => (
                <div key={index} className="flex gap-4">
                  <div className="p-2 bg-gray-100 rounded-full h-fit">
                    <Award className="w-4 h-4 text-gray-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">{activity.message}</p>
                    <p className="text-xs text-gray-400 mt-1">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;