import React from 'react';
import { Card } from '../ui/Card';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { TrendingUp, Users, Clock, Star } from 'lucide-react';

export const AnalyticsWidget = ({ data }) => {
  const stats = [
    {
      title: 'Total Students',
      value: data.totalStudents,
      change: '+12%',
      icon: Users,
      color: 'blue'
    },
    {
      title: 'Course Completion',
      value: `${data.completionRate}%`,
      change: '+5%',
      icon: TrendingUp,
      color: 'green'
    },
    {
      title: 'Avg. Session Time',
      value: data.avgSessionTime,
      change: '+8%',
      icon: Clock,
      color: 'purple'
    },
    {
      title: 'Avg. Rating',
      value: data.avgRating,
      change: '+2%',
      icon: Star,
      color: 'yellow'
    }
  ];

  return (
    <Card className="p-6">
      <h2 className="text-lg font-semibold mb-4">Analytics Overview</h2>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {stats.map((stat, index) => (
          <div key={index} className="p-4 bg-white rounded-lg shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">{stat.title}</p>
                <h3 className="text-2xl font-bold">{stat.value}</h3>
                <p className={`text-sm text-${stat.color}-600`}>{stat.change}</p>
              </div>
              <div className={`p-3 bg-${stat.color}-100 rounded-lg`}>
                <stat.icon className={`w-6 h-6 text-${stat.color}-600`} />
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data.chartData}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="students" stroke="#3B82F6" />
            <Line type="monotone" dataKey="completion" stroke="#10B981" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}; 