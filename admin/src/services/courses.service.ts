import { api } from './api';

const API_URL = 'http://localhost:5000/api';

export interface Course {
  id: string;
  title: string;
  description: string;
  instructor: string;
  price: number;
  duration: string;
  level: string;
  category: string;
  thumbnail: string;
  pdfUrl?: string;
  enrolledStudents?: number;
  rating?: number;
  status: 'active' | 'draft' | 'archived';
  createdAt: string;
  updatedAt: string;
}

export const coursesService = {
  // Get all courses
  getAllCourses: async () => {
    try {
      const response = await api.get<Course[]>(`${API_URL}/courses`);
      return response.data;
    } catch (error) {
      console.error('Error fetching courses:', error);
      throw error;
    }
  },

  // Get course by id
  getCourseById: async (id: string) => {
    try {
      const response = await api.get<Course>(`${API_URL}/courses/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching course:', error);
      throw error;
    }
  },

  // Create new course
  createCourse: async (formData: FormData) => {
    try {
      const response = await api.post<Course>(`${API_URL}/courses`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error creating course:', error);
      throw error;
    }
  },

  // Update course
  updateCourse: async (id: string, formData: FormData) => {
    try {
      const response = await api.put<Course>(`${API_URL}/courses/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error updating course:', error);
      throw error;
    }
  },

  // Delete course
  deleteCourse: async (id: string) => {
    try {
      await api.delete(`${API_URL}/courses/${id}`);
    } catch (error) {
      console.error('Error deleting course:', error);
      throw error;
    }
  },

  // Get course stats
  getCourseStats: async () => {
    try {
      const response = await api.get(`${API_URL}/courses/stats`);
      return response.data;
    } catch (error) {
      console.error('Error fetching course stats:', error);
      throw error;
    }
  }
};