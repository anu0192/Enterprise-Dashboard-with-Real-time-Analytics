import type { DashboardStats, ChartData } from '@/types/api.types';

export interface DashboardState {
  stats: DashboardStats | null;
  chartData: ChartData[];
  loading: boolean;
  error: string | null;
  lastUpdated: string | null;
}

