import axios from 'axios';

const API_URL = 'http://localhost:3002/api/courses';

export interface Course {
  id: string;
  title: string;
  description: string;
  pdfUrl: string;
  createdAt: Date;
}

export const courseService = {
  // Upload a new course with PDF
  uploadCourse: async (formData: FormData): Promise<Course> => {
    try {
      const response = await axios.post(`${API_URL}/upload`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error) {
      throw new Error('Failed to upload course');
    }
  },

  // Create a new course
  createCourse: async (formData: FormData): Promise<Course> => {
    try {
      const response = await axios.post(API_URL, formData);
      if (response.data && typeof response.data === 'object') {
        return response.data;
      }
      throw new Error('Invalid response format');
    } catch (error: any) {
      console.error('Error creating course:', error);
      throw new Error(error.response?.data?.message || 'Failed to create course');
    }
  },

  // Get all courses
  getAllCourses: async (): Promise<Course[]> => {
    try {
      const response = await axios.get(API_URL);
      return response.data;
    } catch (error) {
      throw new Error('Failed to fetch courses');
    }
  },

  // Get a single course by ID
  getCourseById: async (id: string): Promise<Course> => {
    try {
      const response = await axios.get(`${API_URL}/${id}`);
      return response.data;
    } catch (error) {
      throw new Error('Failed to fetch course');
    }
  },

  // Delete a course
  deleteCourse: async (id: string): Promise<void> => {
    if (!id) {
      throw new Error('Course ID is required');
    }
    try {
      await axios.delete(`${API_URL}/${id}`);
    } catch (error) {
      console.error('Error deleting course:', error);
      throw new Error('Failed to delete course');
    }
  },
};
