import axios from 'axios';

const API_URL = 'http://localhost:5000/api/courses';

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
};
