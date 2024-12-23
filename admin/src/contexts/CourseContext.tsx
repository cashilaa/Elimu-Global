import React, { createContext, useContext, useState } from 'react';

interface CourseContextType {
  refreshCourses: () => void;
}

const CourseContext = createContext<CourseContextType>({
  refreshCourses: () => {}
});

export const CourseProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const refreshCourses = () => {
    setRefreshTrigger(prev => prev + 1);
  };

  return (
    <CourseContext.Provider value={{ refreshCourses }}>
      {children}
    </CourseContext.Provider>
  );
};

export const useCourses = () => useContext(CourseContext); 