import React, { createContext, useContext, useState } from 'react';

interface StudentContextType {
  refreshStudents: () => void;
}

const StudentContext = createContext<StudentContextType>({
  refreshStudents: () => {}
});

export const StudentProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const refreshStudents = () => {
    setRefreshTrigger(prev => prev + 1);
  };

  return (
    <StudentContext.Provider value={{ refreshStudents }}>
      {children}
    </StudentContext.Provider>
  );
};

export const useStudents = () => useContext(StudentContext); 