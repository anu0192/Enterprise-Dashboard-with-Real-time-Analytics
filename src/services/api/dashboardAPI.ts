import { apiClient } from './axiosConfig';
import type { DashboardStats, ChartData } from '@/types/api.types';
import { generateMockDashboardStats, generateMockChartData } from '../mockData';

// Mock mode for development
const MOCK_MODE = import.meta.env.VITE_MOCK_API === 'true' || !import.meta.env.VITE_API_URL;

export const dashboardAPI = {
  getDashboardData: async (params: { startDate: string; endDate: string }) => {
    if (MOCK_MODE) {
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 500));
      return {
        stats: generateMockDashboardStats(),
        chartData: generateMockChartData(30),
      };
    }
    
    const response = await apiClient.get<{
      stats: DashboardStats;
      chartData: ChartData[];
    }>('/dashboard', { params });
    return response.data;
  },

  updateChartData: async (data: ChartData) => {
    if (MOCK_MODE) {
      await new Promise((resolve) => setTimeout(resolve, 300));
      return data;
    }
    
    const response = await apiClient.put<ChartData>(`/dashboard/charts/${data.id}`, data);
    return response.data;
  },

  getChartData: async (chartId: string) => {
    if (MOCK_MODE) {
      await new Promise((resolve) => setTimeout(resolve, 300));
      return generateMockChartData(1)[0];
    }
    
    const response = await apiClient.get<ChartData>(`/dashboard/charts/${chartId}`);
    return response.data;
  },
};

