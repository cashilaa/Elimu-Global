import axios from 'axios';

// Admin backend API
export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'https://elimu-admin-backend.onrender.com/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Instructor backend API
export const instructorApi = axios.create({
  baseURL: import.meta.env.VITE_INSTRUCTOR_API_URL || 'https://elimu-instructor-bc.onrender.com/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add interceptors if needed
[api, instructorApi].forEach(instance => {
  instance.interceptors.request.use(
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
});

// Add response interceptor to handle errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      // Handle specific error cases
      switch (error.response.status) {
        case 401:
          // Handle unauthorized
          localStorage.removeItem('token');
          window.location.href = '/login';
          break;
        case 403:
          // Handle forbidden
          break;
        case 404:
          // Handle not found
          break;
        case 500:
          // Handle server error
          break;
        default:
          // Handle other errors
          break;
      }
    }
    return Promise.reject(error);
  }
);

// Helper methods for common API operations
export const apiHelpers = {
  get: async (url: string, params?: any) => {
    try {
      const response = await api.get(url, { params });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  post: async (url: string, data: any) => {
    try {
      const response = await api.post(url, data);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  put: async (url: string, data: any) => {
    try {
      const response = await api.put(url, data);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  delete: async (url: string) => {
    try {
      const response = await api.delete(url);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
}; 