import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3002/api';

export const coursesService = {
  async getAllCourses() {
    const response = await axios.get(`${API_URL}/courses`);
    return response.data;
  },

  async getCourseStats() {
    const response = await axios.get(`${API_URL}/courses/stats`);
    return response.data;
  },

  async createCourse(courseData: any) {
    const response = await axios.post(`${API_URL}/courses`, courseData);
    return response.data;
  },

  async updateCourse(id: string, courseData: any) {
    const response = await axios.put(`${API_URL}/courses/${id}`, courseData);
    return response.data;
  },

  async deleteCourse(id: string) {
    const response = await axios.delete(`${API_URL}/courses/${id}`);
    return response.data;
  },

  async getCourseById(id: string) {
    const response = await axios.get(`${API_URL}/courses/${id}`);
    return response.data;
  }
}; 