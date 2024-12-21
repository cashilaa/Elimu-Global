import './index.css';
import { Toaster } from 'react-hot-toast';
import { motion, AnimatePresence } from 'framer-motion';
import InstructorForm from './components/InstructorForm';
import Login from './components/Login';
import Dashboard from './pages/instructor/Dashboard';
import DashboardLayout from './components/layouts/DashboardLayout';
import ZoomMeetings from './pages/instructor/ZoomMeetings';
import Courses from './pages/instructor/Courses';
import Students from './pages/instructor/Students';
import Schedule from './pages/instructor/Schedule';
import Settings from './pages/instructor/Settings';
import CreateSession from './pages/instructor/CreateSession'; 
import GroupManagement from './pages/instructor/GroupManagement';
import InstructorsLanding from './components/InstructorsLanding';
import CreateCourse from './pages/instructor/CreateCourse';
import CourseContentManager from './pages/instructor/CourseContentManager';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

function App() {
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
            <Route path="/instructor/*" element={<DashboardLayout />}>
              <Route index element={<Dashboard />} />
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="zoom-meetings" element={<ZoomMeetings />} />
              <Route path="content" element={<CourseContentManager />} />
              <Route path="courses" element={<Courses />} />
              <Route path="courses/new" element={<CreateCourse />} />
              <Route path="students" element={<Students />} />
              <Route path="schedule" element={<Schedule />} />
              <Route path="settings" element={<Settings />} />
              <Route path="create-session" element={<CreateSession />} />
              <Route path="group-management" element={<GroupManagement />} />
            </Route>
            <Route path="/instructor/create-session" element={<CreateSession />} />
            <Route path="/dashboard" element={<Navigate to="/instructor/dashboard" replace />} />
            
          </Routes>
        </motion.div>
      </AnimatePresence>
    </Router>
  );
}

export default App;