// Redux middleware for API error handling
import { isRejectedWithValue } from '@reduxjs/toolkit';
import type { Middleware } from '@reduxjs/toolkit';

export const apiMiddleware: Middleware = () => (next) => (action) => {
  if (isRejectedWithValue(action)) {
    const errorMessage = 
      (action.payload as any)?.message || 
      (action.payload as any)?.error || 
      'An error occurred';
    
    // Log error - can be extended with toast notifications
    console.error('API Error:', errorMessage);
  }
  
  return next(action);
};

