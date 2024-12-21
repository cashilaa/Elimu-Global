import React, { useState, useEffect } from 'react';
import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom';
import { 
  BookOpen, Video, Users, Calendar, Settings, 
  LogOut, Menu, X, BarChart2, UserPlus, Layers,
  GraduationCap, FileText, Bell, Plus, Search,
  ChevronRight, ChevronDown
} from 'lucide-react';

const DashboardLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [user, setUser] = useState(null);
  const [expandedItem, setExpandedItem] = useState(null);
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

    // Handle responsive sidebar
    const handleResize = () => {
      const isMobileView = window.innerWidth < 1024;
      setIsMobile(isMobileView);
      if (isMobileView) {
        setIsSidebarOpen(false);
      } else {
        setIsSidebarOpen(true);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [navigate]);

  const menuItems = [
    { 
      icon: BarChart2, 
      label: 'Dashboard', 
      path: '/instructor/dashboard',
      description: 'Overview and analytics',
      badge: 'New'
    },
    { 
      icon: BookOpen, 
      label: 'Courses', 
      path: '/instructor/courses',
      description: 'Manage your courses',
      badge: '3',
      subItems: [
        {
          icon: Layers,
          label: 'All Courses',
          path: '/instructor/courses',
          description: 'View all your courses'
        },
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
      description: 'View and manage students',
      badge: '12'
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

  const MenuItem = ({ item }) => {
    const isActive = location.pathname === item.path;
    const isExpanded = expandedItem === item.path;
    const hasSubItems = item.subItems && item.subItems.length > 0;

    return (
      <div className="group">
        <Link
          to={item.path}
          className={`
            flex items-center justify-between px-4 py-3 rounded-lg
            transition-all duration-200 group-hover:bg-blue-50/80
            ${isActive ? 'bg-blue-50 text-blue-600' : 'text-gray-700'}
          `}
          onClick={(e) => {
            if (hasSubItems) {
              e.preventDefault();
              setExpandedItem(isExpanded ? null : item.path);
            }
          }}
        >
          <div className="flex items-center min-w-0">
            <item.icon className="h-5 w-5 mr-3 flex-shrink-0" />
            <div className="truncate">
              <div className="flex items-center gap-2">
                <span className="font-medium">{item.label}</span>
                {item.badge && (
                  <span className={`
                    px-2 py-0.5 text-xs rounded-full
                    ${isActive ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-600'}
                  `}>
                    {item.badge}
                  </span>
                )}
              </div>
              <p className="text-xs text-gray-500 truncate">{item.description}</p>
            </div>
          </div>
          {hasSubItems && (
            <ChevronDown className={`
              w-5 h-5 transition-transform duration-200
              ${isExpanded ? 'rotate-180' : ''}
            `} />
          )}
        </Link>
        
        {hasSubItems && isExpanded && (
          <div className="ml-8 mt-1 space-y-1">
            {item.subItems.map((subItem) => (
              <Link
                key={subItem.path}
                to={subItem.path}
                className={`
                  flex items-center px-4 py-2.5 rounded-lg
                  transition-colors duration-200 text-sm
                  hover:bg-blue-50 hover:text-blue-600
                  ${location.pathname === subItem.path 
                    ? 'bg-blue-50 text-blue-600' 
                    : 'text-gray-600'
                  }
                `}
              >
                <subItem.icon className="h-4 w-4 mr-2" />
                <span>{subItem.label}</span>
              </Link>
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile Overlay */}
      {isMobile && isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-30 transition-opacity duration-300"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside 
        className={`
          fixed top-0 left-0 z-40 h-screen
          transition-transform duration-300 ease-in-out
          bg-white border-r border-gray-200 w-64
          ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
      >
        <div className="flex flex-col h-full">
          {/* Logo/Header */}
          <div className="flex items-center justify-between p-4 border-b">
            <div className="flex items-center space-x-2">
              <Layers className="h-8 w-8 text-blue-600" />
              <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
                Elimu
              </span>
            </div>
            {isMobile && (
              <button 
                onClick={() => setIsSidebarOpen(false)}
                className="p-2 rounded-lg hover:bg-gray-100"
              >
                <X className="h-6 w-6 text-gray-600" />
              </button>
            )}
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
            {menuItems.map((item) => (
              <MenuItem key={item.path} item={item} />
            ))}
          </nav>

          {/* User Profile */}
          <div className="p-4 border-t border-gray-200">
            <div className="flex items-center gap-3 mb-4">
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
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">
                  {user?.firstName} {user?.lastName}
                </p>
                <p className="text-xs text-gray-500 truncate">
                  {user?.expertise || 'Instructor'}
                </p>
              </div>
            </div>

            <button
              onClick={handleLogout}
              className="flex items-center w-full px-4 py-2.5 text-red-600 rounded-lg
                hover:bg-red-50 transition-colors duration-200"
            >
              <LogOut className="h-5 w-5 mr-3" />
              <span className="font-medium">Logout</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className={`
        transition-all duration-300 ease-in-out
        ${isSidebarOpen ? 'lg:ml-64' : ''}
      `}>
        {/* Top Bar */}
        <header className="sticky top-0 z-20 bg-white border-b border-gray-200">
          <div className="flex items-center justify-between px-4 py-3">
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="p-2 rounded-lg hover:bg-gray-100 lg:hidden"
            >
              <Menu className="h-6 w-6 text-gray-600" />
            </button>

            {/* Search Bar */}
            <div className="flex-1 max-w-xl mx-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search anything..."
                  className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg
                    transition-all duration-200
                    focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* User Actions */}
            <div className="flex items-center gap-4">
              <button className="relative p-2 hover:bg-gray-100 rounded-lg">
                <Bell className="w-5 h-5" />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full" />
              </button>
              
              <div className="hidden sm:flex items-center gap-3">
                {user?.profilePicture ? (
                  <img
                    src={user.profilePicture}
                    alt="Profile"
                    className="w-8 h-8 rounded-full object-cover border-2 border-gray-200"
                  />
                ) : (
                  <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                    <span className="text-blue-600 font-medium">
                      {user?.firstName?.[0]}{user?.lastName?.[0]}
                    </span>
                  </div>
                )}
                <div className="hidden md:block">
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
        <main className="p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;