import { useAppSelector, useAppDispatch } from '@/app/hooks';
import { loginUser, registerUser, logoutUser } from '../slices/authSlice';
import type { LoginRequest, RegisterRequest } from '@/types/api.types';

export const useAuth = () => {
  const dispatch = useAppDispatch();
  const { user, isAuthenticated, loading, error } = useAppSelector((state) => state.auth);

  const login = async (credentials: LoginRequest) => {
    return dispatch(loginUser(credentials));
  };

  const register = async (data: RegisterRequest) => {
    return dispatch(registerUser(data));
  };

  const logout = async () => {
    return dispatch(logoutUser());
  };

  return {
    user,
    isAuthenticated,
    loading,
    error,
    login,
    register,
    logout,
  };
};

