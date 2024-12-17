import React from 'react';
import Card from '../ui/Card';

const StatCard = ({ title, value, icon: Icon, trend, color = 'blue' }) => {
  return (
    <Card className="relative overflow-hidden">
      <div className={`absolute top-0 right-0 w-32 h-32 transform translate-x-8 -translate-y-8 rounded-full opacity-10 bg-${color}-500`} />
      <div className="flex items-center space-x-4">
        <div className={`p-3 rounded-lg bg-${color}-100 text-${color}-600`}>
          <Icon className="w-6 h-6" />
        </div>
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <h3 className="text-2xl font-bold">{value}</h3>
          {trend && (
            <p className={`text-sm ${trend > 0 ? 'text-green-600' : 'text-red-600'}`}>
              {trend > 0 ? '↑' : '↓'} {Math.abs(trend)}% from last month
            </p>
          )}
        </div>
      </div>
    </Card>
  );
};

export default StatCard;
