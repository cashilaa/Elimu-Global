import axios from 'axios';
import { API_URL } from './api';

export const instructorsService = {
  async getAllInstructors() {
    try {
      const response = await axios.get(`${API_URL}/approved`);
      return response.data;
    } catch (error) {
      console.error('Error fetching instructors:', error);
      return [];
    }
  },

  async approveInstructor(id: string) {
    try {
      const response = await axios.put(`${API_URL}/approved/${id}/approve`);
      return response.data;
    } catch (error) {
      console.error('Error approving instructor:', error);
      throw error;
    }
  },

  async rejectInstructor(id: string, reason: string) {
    try {
      const response = await axios.put(`${API_URL}/approved/${id}/reject`, { reason });
      return response.data;
    } catch (error) {
      console.error('Error rejecting instructor:', error);
      throw error;
    }
  }
}; 