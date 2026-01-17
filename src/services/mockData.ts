// Mock data service for development
import type { DashboardStats, ChartData } from '@/types/api.types';

export const generateMockDashboardStats = (): DashboardStats => {
  return {
    totalSales: 1250000,
    activeUsers: 1234,
    conversionRate: 3.2,
    revenue: 980000,
    growth: {
      sales: 12.5,
      users: 8.3,
      revenue: 15.2,
    },
  };
};

export const generateMockChartData = (days = 30): ChartData[] => {
  const data: ChartData[] = [];
  const today = new Date();
  
  for (let i = days; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    data.push({
      id: `chart-${i}`,
      date: date.toISOString().split('T')[0],
      value: Math.floor(Math.random() * 10000) + 5000,
      label: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      category: 'sales',
    });
  }
  
  return data;
};

