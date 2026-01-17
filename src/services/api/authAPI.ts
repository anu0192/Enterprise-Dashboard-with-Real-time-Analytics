import { apiClient } from './axiosConfig';
import type { LoginRequest, LoginResponse, RegisterRequest } from '@/types/api.types';

// Mock mode for development
const MOCK_MODE = import.meta.env.VITE_MOCK_API === 'true' || !import.meta.env.VITE_API_URL;

export const authAPI = {
  login: async (credentials: LoginRequest): Promise<LoginResponse> => {
    if (MOCK_MODE) {
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 500));
      
      // Mock successful login
      if (credentials.email && credentials.password) {
        return {
          user: {
            id: '1',
            email: credentials.email,
            name: 'Test User',
            role: 'admin',
          },
          token: 'mock-jwt-token',
          refreshToken: 'mock-refresh-token',
        };
      }
      
      throw new Error('Invalid credentials');
    }
    
    const response = await apiClient.post<LoginResponse>('/auth/login', credentials);
    return response.data;
  },

  register: async (data: RegisterRequest): Promise<LoginResponse> => {
    if (MOCK_MODE) {
      await new Promise((resolve) => setTimeout(resolve, 500));
      return {
        user: {
          id: '1',
          email: data.email,
          name: data.name,
          role: 'user',
        },
        token: 'mock-jwt-token',
        refreshToken: 'mock-refresh-token',
      };
    }
    
    const response = await apiClient.post<LoginResponse>('/auth/register', data);
    return response.data;
  },

  logout: async (): Promise<void> => {
    if (MOCK_MODE) {
      await new Promise((resolve) => setTimeout(resolve, 200));
      return;
    }
    
    await apiClient.post('/auth/logout');
  },

  getCurrentUser: async () => {
    if (MOCK_MODE) {
      await new Promise((resolve) => setTimeout(resolve, 300));
      return {
        id: '1',
        email: 'test@example.com',
        name: 'Test User',
        role: 'admin',
      };
    }
    
    const response = await apiClient.get('/auth/me');
    return response.data;
  },
};

