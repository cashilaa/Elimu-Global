import axios from 'axios';

// Create a separate axios instance for the instructor backend
export const instructorApi = axios.create({
  baseURL: 'https://elimu-instructor-bc.onrender.com/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add auth interceptor for instructor API
instructorApi.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor for better error handling
instructorApi.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', {
      status: error.response?.status,
      data: error.response?.data,
      url: error.config?.url,
      method: error.config?.method
    });
    return Promise.reject(error);
  }
);

interface CourseData {
  name: string;
  instructor: string;
  description: string;
  price: string;
  status: string;
}

class CoursesService {
  async getAllCourses() {
    try {
      console.log('Fetching courses from:', `${instructorApi.defaults.baseURL}/courses`);
      const response = await instructorApi.get('/courses');
      return response.data;
    } catch (error: any) {
      console.error('Error fetching courses:', error);
      console.error('Error details:', {
        status: error.response?.status,
        data: error.response?.data,
        url: error.config?.url
      });
      throw error;
    }
  }

  async getCourseStats() {
    try {
      const response = await instructorApi.get('/courses/stats');
      return response.data;
    } catch (error) {
      console.error('Error fetching course stats:', error);
      throw error;
    }
  }

  async createCourse(courseData: CourseData) {
    try {
      const formattedData = {
        ...courseData,
        price: parseFloat(courseData.price),
      };
      
      const response = await instructorApi.post('/courses', formattedData);
      return response.data;
    } catch (error) {
      console.error('Error creating course:', error);
      throw error;
    }
  }

  async updateCourse(id: string, courseData: Partial<CourseData>) {
    try {
      const response = await instructorApi.put(`/courses/${id}`, courseData);
      return response.data;
    } catch (error) {
      console.error('Error updating course:', error);
      throw error;
    }
  }

  async deleteCourse(id: string) {
    try {
      const response = await instructorApi.delete(`/courses/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error deleting course:', error);
      throw error;
    }
  }

  async getCourseById(id: string) {
    try {
      const response = await instructorApi.get(`/courses/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching course:', error);
      throw error;
    }
  }

  async checkHealth() {
    try {
      const response = await instructorApi.get('/health');
      console.log('Instructor API health check:', response.data);
      return response.data;
    } catch (error) {
      console.error('Health check failed:', error);
      throw error;
    }
  }
}

export const coursesService = new CoursesService(); 