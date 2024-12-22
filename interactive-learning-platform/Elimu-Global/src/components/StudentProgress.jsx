import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaTrophy, FaBook, FaClock } from 'react-icons/fa';

const StudentProgress = () => {
  const [progress, setProgress] = useState(null);

  useEffect(() => {
    fetchProgress();
  }, []);

  const fetchProgress = async () => {
    try {
      const response = await fetch('/api/student/progress');
      if (!response.ok) {
        throw new Error('Failed to fetch progress');
      }
      const data = await response.json();
      setProgress(data);
    } catch (error) {
      console.error('Error fetching progress:', error);
    }
  };

  if (!progress) {
    return <div>Loading...</div>;
  }

  return (
    <section className="py-12 bg-gray-100">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">Your Learning Progress</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <ProgressCard
            icon={<FaBook className="text-4xl text-blue-500" />}
            title="Courses in Progress"
            value={progress.coursesInProgress}
          />
          <ProgressCard
            icon={<FaTrophy className="text-4xl text-yellow-500" />}
            title="Completed Courses"
            value={progress.completedCourses}
          />
          <ProgressCard
            icon={<FaClock className="text-4xl text-green-500" />}
            title="Total Learning Hours"
            value={`${progress.totalLearningHours} hrs`}
          />
        </div>
        <div className="mt-12">
          <h3 className="text-2xl font-semibold mb-4">Recent Activity</h3>
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            {progress.recentActivity.map((activity, index) => (
              <motion.div
                key={index}
                className="p-4 border-b last:border-b-0"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <h4 className="font-semibold">{activity.course}</h4>
                <p className="text-sm text-gray-600">{activity.action}</p>
                <p className="text-xs text-gray-500">{activity.date}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const ProgressCard = ({ icon, title, value }) => (
  <motion.div
    className="bg-white rounded-lg shadow-md p-6"
    whileHover={{ scale: 1.05 }}
    transition={{ duration: 0.3 }}
  >
    <div className="flex items-center mb-4">
      {icon}
      <h3 className="text-xl font-semibold ml-4">{title}</h3>
    </div>
    <p className="text-3xl font-bold text-gray-800">{value}</p>
  </motion.div>
);

export default StudentProgress;

