import React, { useState } from 'react';
import { Card } from '../ui/Card';
import { Calendar as CalendarIcon, Clock, Users, Video } from 'lucide-react';
import { format, startOfWeek, addDays, isSameDay } from 'date-fns';

export const Calendar = ({ events }) => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [currentWeek, setCurrentWeek] = useState(startOfWeek(new Date()));

  const weekDays = Array.from({ length: 7 }).map((_, i) => addDays(currentWeek, i));

  return (
    <Card className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-semibold">Schedule</h2>
        <div className="flex space-x-2">
          <button className="px-3 py-1 text-sm bg-gray-100 rounded-md">
            Week
          </button>
          <button className="px-3 py-1 text-sm bg-gray-100 rounded-md">
            Month
          </button>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-2 mb-4">
        {weekDays.map((day, i) => (
          <div
            key={i}
            className={`text-center p-2 rounded-lg cursor-pointer ${
              isSameDay(day, selectedDate) ? 'bg-blue-50 text-blue-600' : ''
            }`}
            onClick={() => setSelectedDate(day)}
          >
            <p className="text-xs text-gray-500">{format(day, 'EEE')}</p>
            <p className="text-sm font-medium">{format(day, 'd')}</p>
          </div>
        ))}
      </div>

      <div className="space-y-4">
        {events
          .filter(event => isSameDay(new Date(event.startTime), selectedDate))
          .map((event, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
            >
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Video className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-medium">{event.title}</h3>
                  <div className="flex items-center space-x-2 text-sm text-gray-500">
                    <Clock className="w-4 h-4" />
                    <span>{format(new Date(event.startTime), 'h:mm a')}</span>
                    <Users className="w-4 h-4" />
                    <span>{event.attendees.length} students</span>
                  </div>
                </div>
              </div>
              <button className="px-3 py-1 text-sm text-blue-600 bg-blue-50 rounded-md">
                Join
              </button>
            </div>
          ))}
      </div>
    </Card>
  );
}; 