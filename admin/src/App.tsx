import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { theme } from './theme';
import './styles/global.scss';
import { ProtectedRoute } from './components/ProtectedRoute';
import { CourseProvider } from './contexts/CourseContext';
import { StudentProvider } from './contexts/StudentContext';
import { ErrorBoundary } from './components/ErrorBoundary';

// Import pages
import Dashboard from './pages/Dashboard';
import Courses from './pages/Courses';
import Students from './pages/Students';
import Revenue from './pages/Revenue';
import Settings from './pages/Settings';
import Login from './pages/Login';
import Instructors from './pages/Instructors';
import { CourseForm } from './components/CourseForm';
import { StudentForm } from './components/StudentForm';

const router = createBrowserRouter([
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '/',
    element: <ProtectedRoute><Dashboard /></ProtectedRoute>
  },
  {
    path: '/courses',
    element: <ProtectedRoute><Courses /></ProtectedRoute>
  },
  {
    path: '/students',
    element: <ProtectedRoute><Students /></ProtectedRoute>
  },
  {
    path: '/revenue',
    element: <ProtectedRoute><Revenue /></ProtectedRoute>
  },
  {
    path: '/settings',
    element: <ProtectedRoute><Settings /></ProtectedRoute>
  },
  {
    path: '/instructors',
    element: <ProtectedRoute><Instructors /></ProtectedRoute>
  },
  {
    path: '/courses/new',
    element: <CourseForm />
  },
  {
    path: '/students/new',
    element: <StudentForm />
  }
]);

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <ErrorBoundary>
        <CourseProvider>
          <StudentProvider>
            <RouterProvider router={router} />
          </StudentProvider>
        </CourseProvider>
      </ErrorBoundary>
    </ThemeProvider>
  );
};

export default App; 