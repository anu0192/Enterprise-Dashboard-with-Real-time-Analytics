// Redux middleware for logging actions in development
import type { Middleware } from '@reduxjs/toolkit';

export const loggerMiddleware: Middleware = () => (next) => (action: any) => {
  if (import.meta.env.DEV) {
    console.log('Redux Action:', action.type, action.payload);
  }
  return next(action);
};

