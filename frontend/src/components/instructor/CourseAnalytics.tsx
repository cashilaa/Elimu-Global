import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from "chart.js";
import { Line } from "react-chartjs-2";
import { Users, Star, BarChart2, DollarSign } from "lucide-react";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,
    },
    title: {
      display: true,
      text: 'Course Performance Over Time',
    },
  },
};

const generateChartData = (analytics) => {
  const labels = ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5', 'Week 6'];
  
  return {
    labels,
    datasets: [
      {
        label: 'Student Engagement',
        data: labels.map(() => Math.floor(Math.random() * 100)),
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
      {
        label: 'Completion Rate',
        data: labels.map(() => Math.floor(Math.random() * 100)),
        borderColor: 'rgb(75, 192, 192)',
        backgroundColor: 'rgba(75, 192, 192, 0.5)',
      },
    ],
  };
};

export const CourseAnalytics = ({ analytics }) => {
  const stats = [
    {
      name: 'Total Students',
      value: analytics.total_students || 0,
      icon: Users,
      change: '+4.75%',
      changeType: 'positive',
    },
    {
      name: 'Average Rating',
      value: analytics.avg_rating || 0,
      icon: Star,
      change: '+1.2%',
      changeType: 'positive',
    },
    {
      name: 'Completion Rate',
      value: `${analytics.completion_rate || 0}%`,
      icon: BarChart2,
      change: '-0.5%',
      changeType: 'negative',
    },
    {
      name: 'Total Revenue',
      value: `$${analytics.total_revenue || 0}`,
      icon: DollarSign,
      change: '+12.5%',
      changeType: 'positive',
    },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((item) => (
          <div
            key={item.name}
            className="relative overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:px-6 sm:py-6"
          >
            <dt>
              <div className="absolute rounded-md bg-blue-500 p-3">
                <item.icon className="h-6 w-6 text-white" aria-hidden="true" />
              </div>
              <p className="ml-16 truncate text-sm font-medium text-gray-500">
                {item.name}
              </p>
            </dt>
            <dd className="ml-16 flex items-baseline">
              <p className="text-2xl font-semibold text-gray-900">{item.value}</p>
              <p
                className={`ml-2 flex items-baseline text-sm font-semibold ${
                  item.changeType === 'positive' ? 'text-green-600' : 'text-red-600'
                }`}
              >
                {item.change}
              </p>
            </dd>
          </div>
        ))}
      </div>

      <div className="bg-white p-6 rounded-lg shadow">
        <Line options={options} data={generateChartData(analytics)} />
      </div>
    </div>
  );
};

export default CourseAnalytics;
