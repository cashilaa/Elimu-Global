import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import DashboardLayout from './components/layouts/DashboardLayout';
import Courses from './components/instructor/Courses';
import InstructorForm from './components/InstructorForm';
import Login from './components/Login';
import Dashboard from './components/instructor/Dashboard';
// Import other components...

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/register" element={<InstructorForm />} />
        <Route path="/login" element={<Login />} />
        
        {/* Dashboard routes */}
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="courses" element={<Courses />} />
          {/* Add other dashboard routes as needed */}
        </Route>
      </Routes>
    </Router>
  );
}

export default App; 