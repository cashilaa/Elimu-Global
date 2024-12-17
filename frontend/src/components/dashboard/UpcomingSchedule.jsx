import React from 'react';
import Card from '../ui/Card';
import Badge from '../ui/Badge';

const UpcomingSchedule = () => {
  const schedule = [
    {
      id: 1,
      title: 'Web Development Workshop',
      time: '10:00 AM - 11:30 AM',
      date: 'Today',
      students: 15,
      status: 'upcoming'
    },
    {
      id: 2,
      title: 'Python Basics Q&A',
      time: '2:00 PM - 3:00 PM',
      date: 'Tomorrow',
      students: 8,
      status: 'upcoming'
    },
    {
      id: 3,
      title: 'JavaScript Advanced Concepts',
      time: '11:00 AM - 12:30 PM',
      date: 'Dec 20, 2024',
      students: 12,
      status: 'scheduled'
    }
  ];

  return (
    <Card>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">Upcoming Schedule</h3>
        <Badge variant="info">Next 7 days</Badge>
      </div>
      <div className="space-y-4">
        {schedule.map((session) => (
          <div key={session.id} className="p-4 border rounded-lg hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-medium">{session.title}</h4>
              <Badge 
                variant={session.status === 'upcoming' ? 'warning' : 'default'}
                size="sm"
              >
                {session.status}
              </Badge>
            </div>
            <div className="flex items-center justify-between text-sm text-gray-600">
              <div>
                <p>{session.time}</p>
                <p>{session.date}</p>
              </div>
              <div className="text-right">
                <p>{session.students} students</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default UpcomingSchedule;
