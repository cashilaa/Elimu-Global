import React, { useState, useEffect } from 'react';
import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom';
import { 
  BookOpen, Video, Users, Calendar, Settings, 
  LogOut, Menu, X, BarChart2, UserPlus, Layers,
  GraduationCap, FileText, Bell, Plus, Search
} from 'lucide-react';

const DashboardLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Get user data from localStorage
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      navigate('/login');
    }
  }, [navigate]);

  const menuItems = [
    { 
      icon: BarChart2, 
      label: 'Dashboard', 
      path: '/instructor/dashboard',
      description: 'Overview and analytics'
    },
    { 
      icon: BookOpen, 
      label: 'Courses', 
      path: '/instructor/courses',
      description: 'Manage your courses',
      subItems: [
        {
          icon: Plus,
          label: 'Create Course',
          path: '/instructor/courses/new',
          description: 'Add a new course'
        }
      ]
    },
    { 
      icon: Video, 
      label: 'Zoom Meetings', 
      path: '/instructor/zoom-meetings',
      description: 'Schedule and manage sessions'
    },
    { 
      icon: Users, 
      label: 'Students', 
      path: '/instructor/students',
      description: 'View and manage students'
    },
    { 
      icon: Calendar, 
      label: 'Schedule', 
      path: '/instructor/schedule',
      description: 'Class timetable'
    },
    { 
      icon: UserPlus, 
      label: 'Group Management', 
      path: '/instructor/group-management',
      description: 'Manage student groups'
    },
    { 
      icon: FileText, 
      label: 'Content', 
      path: '/instructor/content',
      description: 'Course materials'
    },
    { 
      icon: GraduationCap, 
      label: 'Assessments', 
      path: '/instructor/assessments',
      description: 'Tests and assignments'
    },
    { 
      icon: Settings, 
      label: 'Settings', 
      path: '/instructor/settings',
      description: 'Account settings'
    },
  ];

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside 
        className={`fixed top-0 left-0 z-40 h-screen transition-transform duration-300 ease-in-out
                   bg-white border-r border-gray-200 w-64 shadow-sm
                   ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}
      >
        <div className="flex flex-col h-full">
          {/* Logo/Header */}
          <div className="flex items-center justify-between p-4 border-b">
            <div className="flex items-center space-x-2">
              <Layers className="h-8 w-8 text-blue-600" />
              <span className="text-xl font-bold text-gray-800">Elimu</span>
            </div>
            <button 
              onClick={() => setIsSidebarOpen(false)} 
              className="lg:hidden p-2 rounded-lg hover:bg-gray-100"
            >
              <X className="h-6 w-6 text-gray-600" />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
            {menuItems.map((item) => (
              <div key={item.path}>
                <Link
                  to={item.path}
                  className={`flex items-center px-4 py-3 rounded-lg hover:bg-blue-50 hover:text-blue-600
                           transition-colors duration-200 ${
                             location.pathname === item.path 
                               ? 'bg-blue-50 text-blue-600' 
                               : 'text-gray-700'
                           }`}
                >
                  <item.icon className="h-5 w-5 mr-3" />
                  <div>
                    <span className="font-medium">{item.label}</span>
                    <p className="text-xs text-gray-500">{item.description}</p>
                  </div>
                </Link>
                
                {/* Sub-items */}
                {item.subItems && (
                  <div className="ml-8 mt-1 space-y-1">
                    {item.subItems.map((subItem) => (
                      <Link
                        key={subItem.path}
                        to={subItem.path}
                        className={`flex items-center px-4 py-2 rounded-lg hover:bg-blue-50 hover:text-blue-600
                                 text-sm transition-colors duration-200 ${
                                   location.pathname === subItem.path 
                                     ? 'bg-blue-50 text-blue-600' 
                                     : 'text-gray-600'
                                 }`}
                      >
                        <subItem.icon className="h-4 w-4 mr-2" />
                        <span>{subItem.label}</span>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* Footer */}
          <div className="p-4 border-t">
            <button
              onClick={handleLogout}
              className="flex items-center w-full px-4 py-3 text-red-600 rounded-lg hover:bg-red-50
                       transition-colors duration-200"
            >
              <LogOut className="h-5 w-5 mr-3" />
              <span className="font-medium">Logout</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className={`${isSidebarOpen ? 'lg:ml-64' : ''} transition-margin duration-300 ease-in-out`}>
        {/* Top Bar */}
        <header className="bg-white border-b border-gray-200 shadow-sm">
          <div className="flex items-center justify-between px-4 py-3">
            <button
              onClick={() => setIsSidebarOpen(true)}
              className="lg:hidden p-2 rounded-lg hover:bg-gray-100"
            >
              <Menu className="h-6 w-6 text-gray-600" />
            </button>

            {/* Search Bar */}
            <div className="flex-1 max-w-xl mx-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search..."
                  className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            {/* User Profile Section */}
            <div className="flex items-center gap-4">
              <button className="p-2 hover:bg-gray-100 rounded-lg relative">
                <Bell className="w-5 h-5" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
              </button>
              
              <div className="flex items-center gap-3">
                {user?.profilePicture ? (
                  <img
                    src={user.profilePicture}
                    alt="Profile"
                    className="w-10 h-10 rounded-full object-cover border-2 border-gray-200"
                  />
                ) : (
                  <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                    <span className="text-blue-600 font-medium text-lg">
                      {user?.firstName?.[0]}{user?.lastName?.[0]}
                    </span>
                  </div>
                )}
                
                <div className="hidden sm:block">
                  <p className="text-sm font-medium text-gray-900">
                    {user?.firstName} {user?.lastName}
                  </p>
                  <p className="text-xs text-gray-500">
                    {user?.expertise || 'Instructor'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-4">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout; 