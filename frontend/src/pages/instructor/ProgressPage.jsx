import React, { useEffect, useState } from 'react';
import { ProgressTracker } from '../../components/progress/ProgressTracker';

export const ProgressPage = () => {
  const [progressData, setProgressData] = useState({
    courseProgress: [],
    studentProgress: []
  });

  useEffect(() => {
    // Fetch progress data
    const fetchProgressData = async () => {
      try {
        // Replace with actual API call
        const response = await fetch('/api/instructor/progress');
        const data = await response.json();
        setProgressData(data);
      } catch (error) {
        console.error('Failed to fetch progress data:', error);
      }
    };

    fetchProgressData();
  }, []);

  return (
    <div className="p-6">
      <ProgressTracker 
        courseProgress={progressData.courseProgress}
        studentProgress={progressData.studentProgress}
      />
    </div>
  );
}; 