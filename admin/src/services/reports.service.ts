import { api } from '../utils/api';

class ReportsService {
  async generateReport(type: string) {
    try {
      const response = await api.post('/reports/generate', { type });
      return response.data;
    } catch (error) {
      console.error('Error generating report:', error);
      throw error;
    }
  }
}

export const reportsService = new ReportsService(); 