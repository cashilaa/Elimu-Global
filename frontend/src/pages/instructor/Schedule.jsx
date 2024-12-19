import React, { useState } from 'react';
import Card from '../../components/ui/Card';
import Badge from '../../components/ui/Badge';
import Button from '../../components/ui/Button';
import { Calendar as CalendarIcon, Clock, Users, Video } from 'lucide-react';

const Schedule = () => {
  const [view, setView] = useState('week');
  
  const sessions = [
    {
      id: 1,
      title: 'Web Development Workshop',
      course: 'Introduction to Web Development',
      date: '2024-12-18',
      time: '10:00 AM - 11:30 AM',
      students: 15,
      type: 'live',
      status: 'upcoming'
    },
    {
      id: 2,
      title: 'React Hooks Deep Dive',
      course: 'Advanced React Patterns',
      date: '2024-12-18',
      time: '2:00 PM - 3:30 PM',
      students: 12,
      type: 'recorded',
      status: 'upcoming'
    },
    {
      id: 3,
      title: 'Python Basics Q&A',
      course: 'Python for Beginners',
      date: '2024-12-19',
      time: '11:00 AM - 12:00 PM',
      students: 20,
      type: 'live',
      status: 'upcoming'
    }
  ];

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Schedule</h1>
        <div className="flex space-x-2">
          <Button
            variant={view === 'week' ? 'primary' : 'secondary'}
            onClick={() => setView('week')}
          >
            Week
          </Button>
          <Button
            variant={view === 'month' ? 'primary' : 'secondary'}
            onClick={() => setView('month')}
          >
            Month
          </Button>
          <Button onClick={() => console.log('Open session creation modal or redirect')}>New Session</Button>
        </div>
      </div>

      <div className="grid gap-6">
        {sessions.map((session) => (
          <Card key={session.id} className="hover:shadow-lg transition-shadow">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <div className="mb-4 md:mb-0">
                <div className="flex items-center space-x-2 mb-2">
                  <h3 className="text-lg font-semibold">{session.title}</h3>
                  <Badge 
                    variant={session.type === 'live' ? 'success' : 'info'}
                    size="sm"
                  >
                    {session.type}
                  </Badge>
                </div>
                <p className="text-gray-600 mb-2">{session.course}</p>
                <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                  <div className="flex items-center space-x-1">
                    <CalendarIcon className="h-4 w-4" />
                    <span>{session.date}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Clock className="h-4 w-4" />
                    <span>{session.time}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Users className="h-4 w-4" />
                    <span>{session.students} students</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Button variant="secondary" size="sm">
                  View Details
                </Button>
                {session.type === 'live' && (
                  <Button size="sm" className="flex items-center space-x-1">
                    <Video className="h-4 w-4" />
                    <span>Join Session</span>
                  </Button>
                )}
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Schedule;
