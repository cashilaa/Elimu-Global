import React, { useEffect, useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from './ui/Card';
import { LoadingSpinner } from './ui/LoadingSpinner';
import { 
  BookOpen, Users, Calendar, TrendingUp, 
  Clock, Award, Bell, ChevronRight 
} from 'lucide-react';

const Dashboard = () => {
  const [instructor, setInstructor] = useState(null);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fallback data
  const fallbackData = {
    activeCourses: 0,
    totalStudents: 0,
    upcomingSessions: 0,
    revenue: 0,
    upcomingSessionsList: [
      {
        title: 'No upcoming sessions',
        time: '-',
        date: '-',
        students: 0,
        type: 'No Session'
      }
    ],
    recentActivities: [
      {
        type: 'info',
        message: 'No recent activities',
        time: '-'
      }
    ]
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userData = JSON.parse(localStorage.getItem('user'));
        if (!userData?._id) {
          throw new Error('User data not found');
        }

        setInstructor(userData);

        const response = await fetch(`http://localhost:3000/api/instructors/${userData._id}/stats`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });

        if (!response.ok) {
          throw new Error('Failed to fetch stats');
        }

        const { data } = await response.json();
        setStats(data);
      } catch (err) {
        console.error('Error fetching data:', err);
        setError(err.message);
        // Use fallback data on error
        setStats(fallbackData);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const statCards = [
    {
      title: 'Active Courses',
      value: stats?.activeCourses?.toString() || '0',
      icon: BookOpen,
      change: '+2.5%',
      color: 'blue'
    },
    {
      title: 'Total Students',
      value: stats?.totalStudents?.toLocaleString() || '0',
      icon: Users,
      change: '+12.3%',
      color: 'green'
    },
    {
      title: 'Upcoming Sessions',
      value: stats?.upcomingSessions?.toString() || '0',
      icon: Calendar,
      change: stats?.upcomingSessions > 0 ? `${stats.upcomingSessions} this week` : 'No sessions',
      color: 'purple'
    },
    {
      title: 'Revenue',
      value: stats?.revenue ? `$${stats.revenue.toLocaleString()}` : '$0',
      icon: TrendingUp,
      change: stats?.revenue > 0 ? '+8.1%' : 'No revenue',
      color: 'yellow'
    },
  ];

  const StatCard = ({ stat }) => (
    <Card className="hover:translate-y-[-4px] transition-transform">
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
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      {/* Welcome Section */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Welcome back, {instructor?.firstName || 'Instructor'}!
          </h1>
          <p className="text-gray-600">
            {error 
              ? 'Some data might be unavailable at the moment'
              : "Here's what's happening with your courses today."
            }
          </p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors">
          <Bell size={20} />
          <span className="hidden sm:inline">Notifications</span>
        </button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat, index) => (
          <StatCard key={index} stat={stat} />
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
              {(stats?.upcomingSessionsList || fallbackData.upcomingSessionsList).map((session, index) => (
                <div 
                  key={index} 
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-blue-100 rounded-lg">
                      <Clock className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">{session.title}</h4>
                      <p className="text-sm text-gray-600">
                        {session.time} • {session.date} • {session.students} students
                      </p>
                    </div>
                  </div>
                  <button className="p-2 hover:bg-white rounded-full transition-colors">
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
              {(stats?.recentActivities || fallbackData.recentActivities).map((activity, index) => (
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