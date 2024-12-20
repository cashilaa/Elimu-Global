import './index.css';
import { Toaster } from 'react-hot-toast';
import { motion, AnimatePresence } from 'framer-motion';
import InstructorForm from './components/InstructorForm';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import DashboardLayout from './components/instructor/DashboardLayout';
import ZoomMeetings from './pages/instructor/ZoomMeetings';
import Courses from './pages/instructor/Courses';
import Students from './pages/instructor/Students';
import Schedule from './pages/instructor/Schedule';
import Settings from './pages/instructor/Settings';
import CreateSession from './pages/instructor/CreateSession';
import GroupManagement from './pages/instructor/GroupManagement';
import InstructorsLanding from './components/InstructorsLanding';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ResourcesPage } from './pages/instructor/ResourcesPage';
import { ProgressPage } from './pages/instructor/ProgressPage';
import { websocketService } from './services/websocket.service';
import { useEffect } from 'react';
import AssessmentsPage from './pages/instructor/AssessmentsPage';
import { CreateCoursePage } from './pages/instructor/CreateCoursePage';

function App() {
  useEffect(() => {
    // Connect to WebSocket when user is authenticated
    const token = localStorage.getItem('token');
    if (token) {
      websocketService.connect();
    }

    return () => {
      websocketService.disconnect();
    };
  }, []);

  return (
    <Router>
      <AnimatePresence mode="wait">
        <motion.div 
          className="App min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <Toaster 
            position="top-right"
            toastOptions={{
              duration: 3000,
              style: {
                background: '#333',
                color: '#fff',
              },
            }}
          />
          <Routes>
            <Route path="/" element={<InstructorsLanding />} />
            <Route path="/login" element={
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -20, opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <Login />
              </motion.div>
            } />
            <Route path="/instructorsform" element={
              <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <InstructorForm />
              </motion.div>
            } />
            
            {/* Dashboard Routes */}
            <Route path="/dashboard" element={<DashboardLayout />}>
              <Route index element={<Dashboard />} />
              <Route path="zoom-meetings" element={<ZoomMeetings />} />
              <Route path="courses/create" element={<CreateCoursePage />} />
              <Route path="courses" element={<Courses />} />
              <Route path="students" element={<Students />} />
              <Route path="schedule" element={<Schedule />} />
              <Route path="settings" element={<Settings />} />
              <Route path="create-session" element={<CreateSession />} />
              <Route path="group-management" element={<GroupManagement />} />
              <Route path="assessments" element={<AssessmentsPage />} />
              <Route path="resources" element={<ResourcesPage />} />
              <Route path="progress" element={<ProgressPage />} />
            </Route>

            {/* Redirect /instructor/* to /dashboard/* */}
            <Route 
              path="/instructor/*" 
              element={<Navigate to="/dashboard" replace />} 
            />
          </Routes>
        </motion.div>
      </AnimatePresence>
    </Router>
  );
}

export default App;
