import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3002/api';
const STUDENT_DASHBOARD_URL = import.meta.env.VITE_STUDENT_DASHBOARD_URL || 'http://localhost:3003/api';

export const studentsService = {
  async getAllStudents() {
    try {
      const response = await axios.get(`${STUDENT_DASHBOARD_URL}/students`);
      return response.data;
    } catch (error) {
      console.error('Error fetching students:', error);
      return []; // Return empty array as fallback
    }
  },

  async getStudentStats() {
    try {
      const response = await axios.get(`${STUDENT_DASHBOARD_URL}/students/stats`);
      return response.data;
    } catch (error) {
      console.error('Error fetching stats:', error);
      return { totalStudents: 0, activeStudents: 0, averageProgress: 0 }; // Return default values
    }
  },

  async getStudentById(id: string) {
    const response = await axios.get(`${STUDENT_DASHBOARD_URL}/students/${id}`);
    return response.data;
  },

  async getStudentProgress(id: string) {
    const response = await axios.get(`${STUDENT_DASHBOARD_URL}/students/${id}/progress`);
    return response.data;
  },

  async getStudentEnrollments(id: string) {
    const response = await axios.get(`${STUDENT_DASHBOARD_URL}/students/${id}/enrollments`);
    return response.data;
  }
}; 