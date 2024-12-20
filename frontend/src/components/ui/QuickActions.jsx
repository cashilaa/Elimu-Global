import React, { useState } from 'react';
import { Plus, Video, Users, Calendar, Settings } from 'lucide-react';

export const QuickActions = () => {
  const [isOpen, setIsOpen] = useState(false);

  const actions = [
    {
      icon: Video,
      label: 'New Session',
      href: '/dashboard/create-session',
      color: 'text-blue-600 bg-blue-100'
    },
    {
      icon: Users,
      label: 'Add Student',
      href: '/dashboard/students/new',
      color: 'text-green-600 bg-green-100'
    },
    {
      icon: Calendar,
      label: 'Schedule Class',
      href: '/dashboard/schedule/new',
      color: 'text-purple-600 bg-purple-100'
    },
    {
      icon: Settings,
      label: 'Settings',
      href: '/dashboard/settings',
      color: 'text-gray-600 bg-gray-100'
    }
  ];

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 rounded-full bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
      >
        <Plus className="h-5 w-5" />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-56 rounded-lg shadow-lg bg-white ring-1 ring-black ring-opacity-5">
          <div className="py-1">
            {actions.map((action, index) => (
              <a
                key={index}
                href={action.href}
                className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                <div className={`p-2 rounded-lg mr-3 ${action.color}`}>
                  <action.icon className="h-4 w-4" />
                </div>
                {action.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}; 