import { api } from '../utils/api';

export interface ChartDataPoint {
  date: string;
  students: number;
  revenue: number;
  courses: number;
}

class AnalyticsService {
  async getChartData(
    startDate?: string,
    endDate?: string,
    viewType: 'day' | 'week' | 'month' = 'week'
  ): Promise<ChartDataPoint[]> {
    try {
      const response = await api.get('/analytics/chart-data', {
        params: {
          startDate,
          endDate,
          viewType
        }
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching chart data:', error);
      throw error;
    }
  }
}

export const analyticsService = new AnalyticsService(); 