import authReducer, { loginUser, logoutUser, setUser } from './authSlice';
import type { AuthState } from '../types/auth.types';

describe('authSlice', () => {
  const initialState: AuthState = {
    user: null,
    token: null,
    refreshToken: null,
    loading: false,
    error: null,
    isAuthenticated: false,
  };

  it('should return initial state', () => {
    expect(authReducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  it('should handle setUser', () => {
    const user = {
      id: '1',
      email: 'test@example.com',
      name: 'Test User',
      role: 'user' as const,
    };
    const action = setUser(user);
    const state = authReducer(initialState, action);
    expect(state.user).toEqual(user);
    expect(state.isAuthenticated).toBe(true);
  });

  it('should handle loginUser.pending', () => {
    const action = loginUser.pending('', { email: 'test@example.com', password: 'password' });
    const state = authReducer(initialState, action);
    expect(state.loading).toBe(true);
    expect(state.error).toBeNull();
  });

  it('should handle loginUser.fulfilled', () => {
    const payload = {
      user: {
        id: '1',
        email: 'test@example.com',
        name: 'Test User',
        role: 'user',
      },
      token: 'token123',
      refreshToken: 'refresh123',
    };
    const action = loginUser.fulfilled(payload, '', { email: 'test@example.com', password: 'password' });
    const state = authReducer(initialState, action);
    expect(state.user).toEqual(payload.user);
    expect(state.token).toBe(payload.token);
    expect(state.isAuthenticated).toBe(true);
    expect(state.loading).toBe(false);
  });

  it('should handle logoutUser.fulfilled', () => {
    const loggedInState: AuthState = {
      ...initialState,
      user: { id: '1', email: 'test@example.com', name: 'Test', role: 'user' },
      token: 'token123',
      isAuthenticated: true,
    };
    const action = logoutUser.fulfilled(undefined, '');
    const state = authReducer(loggedInState, action);
    expect(state.user).toBeNull();
    expect(state.token).toBeNull();
    expect(state.isAuthenticated).toBe(false);
  });
});

