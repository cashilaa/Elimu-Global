import React, { useState, useEffect } from 'react';
import { useNavigate, Route, Routes, Link, useLocation } from 'react-router-dom';
import { User, LogOut, Book, Users, Calendar, Settings, BarChart, MessageCircle, Bell, Menu, X, Award, TrendingUp, Clock, FileText } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import StatCard from './dashboard/StatCard';
import RecentActivity from './dashboard/RecentActivity';
import UpcomingSchedule from './dashboard/UpcomingSchedule';
import Courses from '../pages/instructor/Courses';
import Students from '../pages/instructor/Students';
import Schedule from '../pages/instructor/Schedule';
import InstructorSettings from '../pages/instructor/Settings';
import GroupManagement from '../pages/instructor/GroupManagement';

const Dashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [user, setUser] = useState(null);
  const [showNotifications, setShowNotifications] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (!storedUser) {
      navigate('/login');
      return;
    }
    setUser(JSON.parse(storedUser));

    // Update time every minute
    const timer = setInterval(() => setCurrentTime(new Date()), 60000);
    return () => clearInterval(timer);
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  if (!user) return null;

  const getInitials = () => {
    return user.firstName ? user.firstName.charAt(0).toUpperCase() : '?';
  };

  const stats = [
    { title: 'Active Courses', value: '4', icon: Book, trend: 12, color: 'blue' },
    { title: 'Total Students', value: '156', icon: Users, trend: 8, color: 'blue' },
    { title: 'Course Completion', value: '87%', icon: Award, trend: 5, color: 'blue' },
    { title: 'Average Rating', value: '4.8', icon: MessageCircle, trend: 2, color: 'blue' },
    { title: 'Total Revenue', value: '$2,450', icon: BarChart, trend: -3, color: 'blue' },
    { title: 'Active Time', value: '24h', icon: Clock, trend: 15, color: 'blue' }
  ];

  const navigationItems = [
    { path: '/dashboard', label: 'Dashboard', icon: BarChart },
    { path: '/instructor/courses', label: 'My Courses', icon: Book },
    { path: '/instructor/students', label: 'Students', icon: Users },
    { path: '/instructor/schedule', label: 'Schedule', icon: Calendar },
    { path: '/instructor/group-management', label: 'Groups', icon: Users },
    { path: '/instructor/analytics', label: 'Analytics', icon: TrendingUp},
    { path: '/instructor/documents', label: 'Documents', icon: FileText },
    { path: '/instructor/settings', label: 'Settings', icon: Settings }
  ];

  const isCurrentPath = (path) => {
    if (path === '/dashboard') {
      return location.pathname === path;
    }
    return location.pathname.startsWith(path);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
      {/* Mobile Sidebar Toggle */}
      <button
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-white rounded-lg shadow-lg hover:bg-blue-50 transition-colors"
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
      >
        {isSidebarOpen ? (
          <X className="h-6 w-6 text-blue-600" />
        ) : (
          <Menu className="h-6 w-6 text-blue-600" />
        )}
      </button>

      {/* Overlay */}
      {isSidebarOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40 backdrop-blur-sm"
          onClick={() => setIsSidebarOpen(false)}
        ></div>
      )}

      {/* Top Navigation */}
      <nav className="fixed top-0 left-0 right-0 lg:left-72 h-20 bg-white border-b border-blue-100 shadow-sm z-30">
        <div className="h-full px-8 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <h1 className="text-2xl font-bold text-blue-900 ml-12 lg:ml-0">Instructor Dashboard</h1>
            <span className="text-blue-500 text-lg">
              {currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </span>
          </div>
          <div className="flex items-center space-x-6">
            <div className="relative">
              <input
                type="text"
                placeholder="Search..."
                className="w-64 px-4 py-2 rounded-lg bg-blue-50 border border-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-400 text-lg"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <button 
              className="p-3 hover:bg-blue-50 rounded-lg relative transition-colors"
              onClick={() => setShowNotifications(!showNotifications)}
            >
              <Bell className="h-6 w-6 text-blue-600" />
              <span className="absolute top-2 right-2 w-3 h-3 bg-red-500 rounded-full border-2 border-white"></span>
            </button>
          </div>
        </div>
      </nav>

      {/* Enhanced Notifications Panel */}
      {showNotifications && (
        <div className="absolute top-20 right-4 w-96 bg-white rounded-xl shadow-xl border border-blue-100 p-4 z-50">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-bold text-blue-900">Notifications</h3>
            <Badge variant="blue" className="px-2 py-1">3 New</Badge>
          </div>
          <div className="space-y-3">
            {[
              { title: 'New course enrollment', time: '2 hours ago', type: 'enrollment' },
              { title: 'Student message received', time: '5 hours ago', type: 'message' },
              { title: 'Course completion', time: '1 day ago', type: 'completion' }
            ].map((notification, index) => (
              <div key={index} className="p-3 hover:bg-blue-50 rounded-lg transition-colors cursor-pointer">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                  <div>
                    <p className="text-lg font-medium text-blue-900">{notification.title}</p>
                    <p className="text-sm text-blue-500">{notification.time}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Enhanced Sidebar */}
      <div className={`fixed inset-y-0 left-0 w-72 bg-white shadow-lg transform ${
        isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
      } lg:translate-x-0 transition-transform duration-200 ease-in-out z-40`}>
        <div className="flex flex-col h-full">
          {/* Profile Section */}
          <div className="p-6 border-b border-blue-100">
            <div className="flex items-center space-x-4">
              {user.profilePicture ? (
                <img
                  src={user.profilePicture}
                  alt="Profile"
                  className="w-16 h-16 rounded-full object-cover ring-4 ring-blue-100"
                />
              ) : (
                <div className="w-16 h-16 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 flex items-center justify-center text-white text-2xl font-bold ring-4 ring-blue-100">
                  {getInitials()}
                </div>
              )}
              <div>
                <h2 className="text-xl font-bold text-blue-900">{`${user.firstName} ${user.lastName}`}</h2>
                <Badge variant="blue" className="mt-1 text-sm">{user.expertise}</Badge>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 overflow-y-auto">
            <ul className="space-y-2">
              {navigationItems.map((item) => {
                const Icon = item.icon;
                return (
                  <li key={item.path}>
                    <Link
                      to={item.path}
                      onClick={() => setIsSidebarOpen(false)}
                      className={`flex items-center space-x-4 px-4 py-3 rounded-xl transition-all text-lg ${
                        isCurrentPath(item.path)
                          ? 'bg-blue-100 text-blue-900 font-semibold shadow-sm'
                          : 'text-blue-600 hover:bg-blue-50'
                      }`}
                    >
                      <Icon className="h-6 w-6" />
                      <span>{item.label}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Logout Button */}
          <div className="p-4 border-t border-blue-100">
            <Button
              variant="destructive"
              className="w-full justify-center space-x-3 py-6 text-lg font-semibold"
              onClick={handleLogout}
            >
              <LogOut className="h-6 w-6" />
              <span>Logout</span>
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="lg:ml-72 pt-20">
        <Routes>
          <Route
            path="/"
            element={
              <div className="p-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                  {stats.map((stat, index) => (
                    <StatCard key={index} {...stat} />
                  ))}
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <Card className="shadow-lg border-blue-100">
                    <CardHeader>
                      <CardTitle className="text-xl text-blue-900">Upcoming Schedule</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <UpcomingSchedule />
                    </CardContent>
                  </Card>
                  <Card className="shadow-lg border-blue-100">
                    <CardHeader>
                      <CardTitle className="text-xl text-blue-900">Recent Activity</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <RecentActivity />
                    </CardContent>
                  </Card>
                </div>
              </div>
            }
          />
          <Route path="/instructor/courses" element={<Courses />} />
          <Route path="/instructor/students" element={<Students />} />
          <Route path="/instructor/schedule" element={<Schedule />} />
          <Route path="/instructor/group-management" element={<GroupManagement />} />
          <Route path="/instructor/settings" element={<InstructorSettings />} />
        </Routes>
      </div>
    </div>
  );
};

export default Dashboard;