import React, { useState } from 'react';
import { Link, useLocation, Outlet } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  LayoutDashboard,
  BookOpen,
  Video,
  Users,
  Settings,
  LogOut,
  Menu,
  X,
  Sun,
  Moon,
} from 'lucide-react';

const navigation = [
  { name: 'Dashboard', href: '/instructor/dashboard', icon: LayoutDashboard },
  { name: 'Courses', href: '/instructor/courses', icon: BookOpen },
  { name: 'Online Classes', href: '/instructor/zoom-meetings', icon: Video },
  { name: 'Students', href: '/instructor/students', icon: Users },
  { name: 'Settings', href: '/instructor/settings', icon: Settings },
];

const DashboardLayout = () => {
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const isActive = (path) => {
    return location.pathname === path;
  };

  const handleLogout = () => {
    // Add logout logic here
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark');
  };

  return (
    <div className={`min-h-screen ${isDarkMode ? 'dark' : ''}`}>
      <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
        {/* Mobile menu button */}
        <button
          className="md:hidden fixed top-4 left-4 z-50 p-2 rounded-lg bg-white dark:bg-gray-800 shadow-lg"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        >
          {isSidebarOpen ? (
            <X className="w-6 h-6 text-gray-600 dark:text-gray-300" />
          ) : (
            <Menu className="w-6 h-6 text-gray-600 dark:text-gray-300" />
          )}
        </button>

        {/* Sidebar */}
        <motion.div
          className={`${
            isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
          } fixed md:relative md:translate-x-0 z-40 w-64 h-screen transition-transform duration-300 ease-in-out`}
          initial={false}
        >
          <div className="flex flex-col h-full bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between h-16 px-4 border-b border-gray-200 dark:border-gray-700">
              <Link to="/instructor/dashboard" className="flex items-center">
                <img
                  className="h-8 w-auto"
                  src="/logo.png"
                  alt="Elimu Global"
                />
                <span className="ml-2 text-xl font-bold text-gray-900 dark:text-white">
                  Elimu Global
                </span>
              </Link>
            </div>
            
            <div className="flex flex-col flex-1 pt-5 pb-4 overflow-y-auto">
              <nav className="flex-1 px-2 space-y-1">
                {navigation.map((item) => {
                  const isCurrentPage = isActive(item.href);
                  return (
                    <Link
                      key={item.name}
                      to={item.href}
                      className={`group flex items-center px-2 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                        isCurrentPage
                          ? 'bg-blue-50 dark:bg-blue-900/50 text-blue-600 dark:text-blue-300'
                          : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                      }`}
                    >
                      <motion.div
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        className="flex items-center"
                      >
                        <item.icon
                          className={`mr-3 flex-shrink-0 h-6 w-6 ${
                            isCurrentPage
                              ? 'text-blue-600 dark:text-blue-300'
                              : 'text-gray-400 dark:text-gray-500 group-hover:text-gray-500 dark:group-hover:text-gray-300'
                          }`}
                        />
                        {item.name}
                      </motion.div>
                    </Link>
                  );
                })}
              </nav>

              <div className="px-2 space-y-2 mt-auto">
                {/* Dark mode toggle */}
                <button
                  onClick={toggleDarkMode}
                  className="w-full flex items-center px-2 py-2 text-sm font-medium text-gray-600 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700"
                >
                  {isDarkMode ? (
                    <Sun className="mr-3 h-6 w-6" />
                  ) : (
                    <Moon className="mr-3 h-6 w-6" />
                  )}
                  {isDarkMode ? 'Light Mode' : 'Dark Mode'}
                </button>

                {/* Logout button */}
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center px-2 py-2 text-sm font-medium text-red-600 dark:text-red-400 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/50"
                >
                  <LogOut className="mr-3 h-6 w-6" />
                  Logout
                </button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Main content */}
        <main className="flex-1 overflow-y-auto bg-gray-50 dark:bg-gray-900">
          <div className="py-6">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.2 }}
              >
                <Outlet />
              </motion.div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
