import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import DashboardLayout from './components/DashboardLayout';
import Students from './pages/Students';
import Instructors from './pages/Instructors';
import Courses from './pages/Courses';
import Feedback from './pages/Feedback';
import Login from './pages/Login';
import Settings from './pages/Settings'; // Assuming there is a Settings page
import Dashboard from './pages/Dashboard'; // Assuming there is a Dashboard page

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<DashboardLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/students" element={<Students />} />
          <Route path="/instructors" element={<Instructors />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/feedback" element={<Feedback />} />
          <Route path="/settings" element={<Settings />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
