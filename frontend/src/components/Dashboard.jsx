import React, { useState, useEffect } from 'react';
import { useNavigate, Route, Routes, Link, useLocation } from 'react-router-dom';
import { User, LogOut, Book, Users, Calendar, Settings, BarChart, MessageCircle, Bell, Menu, X } from 'lucide-react';
import Card from './ui/Card';
import Button from './ui/Button';
import Badge from './ui/Badge';
import StatCard from './dashboard/StatCard';
import RecentActivity from './dashboard/RecentActivity';
import UpcomingSchedule from './dashboard/UpcomingSchedule';
import Courses from '../pages/instructor/Courses';
import Students from '../pages/instructor/Students';
import Schedule from '../pages/instructor/Schedule';
import InstructorSettings from '../pages/instructor/Settings';

const Dashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [user, setUser] = useState(null);
  const [showNotifications, setShowNotifications] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (!storedUser) {
      navigate('/login');
      return;
    }
    setUser(JSON.parse(storedUser));
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
    { title: 'Total Students', value: '156', icon: Users, trend: 8, color: 'green' },
    { title: 'Total Revenue', value: '$2,450', icon: BarChart, trend: -3, color: 'purple' },
    { title: 'Course Rating', value: '4.8', icon: MessageCircle, color: 'yellow' }
  ];

  const navigationItems = [
    { path: '/dashboard', label: 'Dashboard', icon: BarChart },
    { path: '/dashboard/courses', label: 'My Courses', icon: Book },
    { path: '/dashboard/students', label: 'Students', icon: Users },
    { path: '/dashboard/schedule', label: 'Schedule', icon: Calendar },
    { path: '/dashboard/settings', label: 'Settings', icon: Settings }
  ];

  const isCurrentPath = (path) => {
    if (path === '/dashboard') {
      return location.pathname === path;
    }
    return location.pathname.startsWith(path);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile Sidebar Toggle */}
      <button
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-white rounded-lg shadow-lg"
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
      >
        {isSidebarOpen ? (
          <X className="h-6 w-6" />
        ) : (
          <Menu className="h-6 w-6" />
        )}
      </button>

      {/* Overlay */}
      {isSidebarOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setIsSidebarOpen(false)}
        ></div>
      )}

      {/* Top Navigation */}
      <nav className="fixed top-0 left-0 right-0 lg:left-64 h-16 bg-white border-b z-30">
        <div className="h-full px-6 flex items-center justify-between">
          <h1 className="text-xl font-semibold ml-12 lg:ml-0">Dashboard</h1>
          <div className="flex items-center space-x-4">
            <button 
              className="p-2 hover:bg-gray-100 rounded-lg relative"
              onClick={() => setShowNotifications(!showNotifications)}
            >
              <Bell className="h-5 w-5" />
              <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
            {showNotifications && (
              <div className="absolute top-14 right-4 w-80 bg-white rounded-lg shadow-lg border p-4">
                <h3 className="font-semibold mb-2">Notifications</h3>
                <div className="space-y-2">
                  <div className="p-2 hover:bg-gray-50 rounded">
                    <p className="text-sm font-medium">New course enrollment</p>
                    <p className="text-xs text-gray-500">2 hours ago</p>
                  </div>
                  <div className="p-2 hover:bg-gray-50 rounded">
                    <p className="text-sm font-medium">Student message received</p>
                    <p className="text-xs text-gray-500">5 hours ago</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </nav>

      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 w-64 bg-white shadow-lg transform ${
        isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
      } lg:translate-x-0 transition-transform duration-200 ease-in-out z-40`}>
        <div className="flex flex-col h-full">
          {/* Profile Section */}
          <div className="p-6 border-b">
            <div className="flex items-center space-x-4">
              {user.profilePicture ? (
                <img
                  src={`http://localhost:3000${user.profilePicture}`}
                  alt="Profile"
                  className="w-12 h-12 rounded-full object-cover"
                />
              ) : (
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 flex items-center justify-center text-white text-xl font-semibold">
                  {getInitials()}
                </div>
              )}
              <div>
                <h2 className="text-lg font-semibold">{`${user.firstName} ${user.lastName}`}</h2>
                <Badge variant="info" size="sm">{user.expertise}</Badge>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4">
            <ul className="space-y-2">
              {navigationItems.map((item) => {
                const Icon = item.icon;
                return (
                  <li key={item.path}>
                    <Link
                      to={item.path}
                      onClick={() => setIsSidebarOpen(false)}
                      className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                        isCurrentPath(item.path)
                          ? 'bg-blue-50 text-blue-700'
                          : 'text-gray-600 hover:bg-gray-50'
                      }`}
                    >
                      <Icon className="h-5 w-5" />
                      <span>{item.label}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Logout Button */}
          <div className="p-4 border-t">
            <Button
              variant="danger"
              className="w-full justify-center space-x-2"
              onClick={handleLogout}
            >
              <LogOut className="h-5 w-5" />
              <span>Logout</span>
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="lg:ml-64 pt-16">
        <Routes>
          <Route
            path="/"
            element={
              <div className="p-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                  {stats.map((stat, index) => (
                    <StatCard key={index} {...stat} />
                  ))}
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <UpcomingSchedule />
                  <RecentActivity />
                </div>
              </div>
            }
          />
          <Route path="/courses" element={<Courses />} />
          <Route path="/students" element={<Students />} />
          <Route path="/schedule" element={<Schedule />} />
          <Route path="/settings" element={<InstructorSettings />} />
        </Routes>
      </div>
    </div>
  );
};

export default Dashboard;
