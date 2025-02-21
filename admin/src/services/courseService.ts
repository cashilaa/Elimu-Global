import axios from 'axios';

const API_URL = 'https://centralize-auth-elimu.onrender.com/admin/courses';

export interface Course {
  id: string;
  title: string;
  description: string;
  pdfUrl: string;
  createdAt: Date;
  instructor: string;
  price: number;
  duration: string;
  level: string;
}

const getAuthToken = () => {
  return localStorage.getItem('token'); // Updated to use the correct key
};

export const courseService = {
  // Upload a new course with PDF
  uploadCourse: async (formData: FormData): Promise<Course> => {
    try {
      const response = await axios.post(`${API_URL}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${getAuthToken()}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error uploading course:', error.response?.data || error.message);
      throw new Error('Failed to upload course');
    }
  },

  // Create a new course
  createCourse: async (formData: FormData): Promise<Course> => {
    try {
      const response = await axios.post(API_URL, formData, {
        headers: {
          Authorization: `Bearer ${getAuthToken()}`,
        },
      });
      if (response.data && typeof response.data === 'object') {
        return response.data;
      }
      throw new Error('Invalid response format');
    } catch (error: any) {
      console.error('Error creating course:', error.response?.data || error.message);
      throw new Error(error.response?.data?.message || 'Failed to create course');
    }
  },

  // Get all courses
  getAllCourses: async (): Promise<Course[]> => {
    try {
      const token = getAuthToken();
      const response = await axios.get(API_URL, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error: any) {
      console.error('Error fetching courses:', error.response?.data || error.message);
      throw new Error('Failed to fetch courses');
    }
  },

  // Get a single course by ID
  getCourseById: async (id: string): Promise<Course> => {
    try {
      const response = await axios.get(`${API_URL}/${id}`, {
        headers: {
          Authorization: `Bearer ${getAuthToken()}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching course:', error.response?.data || error.message);
      throw new Error('Failed to fetch course');
    }
  },

  // Update a course
  updateCourse: async (id: string, formData: FormData): Promise<Course> => {
    try {
      const response = await axios.put(`${API_URL}/${id}`, formData, {
        headers: {
          Authorization: `Bearer ${getAuthToken()}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error updating course:', error.response?.data || error.message);
      throw new Error('Failed to update course');
    }
  },

  // Approve a course
  approveCourse: async (id: string): Promise<void> => {
    try {
      const token = getAuthToken();
      await axios.put(`${API_URL}/${id}/approve`, {}, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    } catch (error) {
      console.error('Error approving course:', error.response?.data || error.message);
      throw new Error('Failed to approve course');
    }
  },

  // Delete a course
  deleteCourse: async (id: string): Promise<void> => {
    if (!id) {
      throw new Error('Course ID is required');
    }
    try {
      await axios.delete(`${API_URL}/${id}`, {
        headers: {
          Authorization: `Bearer ${getAuthToken()}`,
        },
      });
    } catch (error) {
      console.error('Error deleting course:', error.response?.data || error.message);
      throw new Error('Failed to delete course');
    }
  },
};
