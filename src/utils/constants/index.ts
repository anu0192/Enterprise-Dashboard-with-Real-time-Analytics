export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    LOGOUT: '/auth/logout',
    ME: '/auth/me',
  },
  DASHBOARD: {
    BASE: '/dashboard',
    CHARTS: '/dashboard/charts',
  },
} as const;

export const ROUTES = {
  HOME: '/',
  LOGIN: '/auth/login',
  REGISTER: '/auth/register',
  DASHBOARD: '/dashboard',
  ANALYTICS: '/dashboard/analytics',
  REPORTS: '/dashboard/reports',
  SETTINGS: '/settings',
} as const;

export const WS_URL = import.meta.env.VITE_WS_URL || 'ws://localhost:3000/ws';

export const STORAGE_KEYS = {
  TOKEN: 'token',
  REFRESH_TOKEN: 'refreshToken',
  USER: 'user',
} as const;

