import axios from 'axios';

const API_URL = 'https://centralize-auth-elimu.onrender.com/admin/revenue';

export const revenueService = {
  async getRevenueStats() {
    const response = await axios.get(`${API_URL}/revenue/stats`);
    return response.data;
  },

  async getRevenueHistory() {
    const response = await axios.get(`${API_URL}/revenue/history`);
    return response.data;
  },

  async getMonthlyRevenue() {
    const response = await axios.get(`${API_URL}/revenue/monthly`);
    return response.data;
  }
};
