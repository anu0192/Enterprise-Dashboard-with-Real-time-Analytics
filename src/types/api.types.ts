// API type definitions

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  user: {
    id: string;
    email: string;
    name: string;
    role: string;
  };
  token: string;
  refreshToken: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
  name: string;
}

export interface DashboardStats {
  totalSales: number;
  activeUsers: number;
  conversionRate: number;
  revenue: number;
  growth: {
    sales: number;
    users: number;
    revenue: number;
  };
}

export interface ChartData {
  id: string;
  date: string;
  value: number;
  label: string;
  category?: string;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  read: boolean;
  createdAt: string;
}

export interface WebSocketMessage {
  type: string;
  payload: any;
  timestamp: string;
}

