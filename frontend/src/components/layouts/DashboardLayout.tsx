import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import { 
  BookOpen, Video, Users, BarChart2, Settings, 
  LogOut, Menu, X 
} from 'lucide-react';

const DashboardLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(true);

  const menuItems = [
    { icon: BookOpen, label: 'Courses', path: '/dashboard/courses' },
    { icon: Video, label: 'Content', path: '/dashboard/content' },
    { icon: Users, label: 'Students', path: '/dashboard/students' },
    { icon: BarChart2, label: 'Analytics', path: '/dashboard/analytics' },
    { icon: Settings, label: 'Settings', path: '/dashboard/settings' },
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className={`fixed top-0 left-0 z-40 h-screen transition-transform ${
        isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
      } bg-white border-r border-gray-200 w-64`}>
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between p-4 border-b">
            <h1 className="text-xl font-bold text-gray-800">Instructor Dashboard</h1>
            <button onClick={() => setIsSidebarOpen(false)} className="lg:hidden">
              <X className="h-6 w-6" />
            </button>
          </div>
          <nav className="flex-1 p-4 space-y-2">
            {menuItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg"
              >
                <item.icon className="h-5 w-5 mr-3" />
                {item.label}
              </Link>
            ))}
          </nav>
          <div className="p-4 border-t">
            <button className="flex items-center px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg w-full">
              <LogOut className="h-5 w-5 mr-3" />
              Logout
            </button>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <div className={`${isSidebarOpen ? 'lg:ml-64' : ''} p-4`}>
        <div className="lg:hidden mb-4">
          <button onClick={() => setIsSidebarOpen(true)} className="p-2 hover:bg-gray-100 rounded-lg">
            <Menu className="h-6 w-6" />
          </button>
        </div>
        <Outlet />
      </div>
    </div>
  );
};

export default DashboardLayout; 