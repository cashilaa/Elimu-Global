import React from 'react';
import './index.css';
import InstructorForm from './components/InstructorForm';
import Login from './components/Login';
import SignUp from './components/SignUp';
import Dashboard from './components/Dashboard';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/dashboard/*" element={<Dashboard />} />
          <Route path="/" element={<InstructorForm />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;