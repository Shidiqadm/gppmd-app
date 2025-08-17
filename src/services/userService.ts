import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '../lib/api';

// Types
interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

interface LoginCredentials {
  email: string;
  password: string;
}

interface RegisterData {
  name: string;
  email: string;
  password: string;
}

// API functions
const userApi = {
  // Get current user
  getCurrentUser: async (): Promise<User> => {
    const response = await api.get<User>('/user/me');
    return response.data;
  },

  // Login user
  login: async (credentials: LoginCredentials): Promise<{ user: User; token: string }> => {
    const response = await api.post<{ user: User; token: string }>('/auth/login', credentials);
    return response.data;
  },

  // Register user
  register: async (userData: RegisterData): Promise<{ user: User; token: string }> => {
    const response = await api.post<{ user: User; token: string }>('/auth/register', userData);
    return response.data;
  },

  // Update user profile
  updateProfile: async (userData: Partial<User>): Promise<User> => {
    const response = await api.patch<User>('/user/profile', userData);
    return response.data;
  },

  // Get user list
  getUsers: async (page = 1, limit = 10): Promise<{ users: User[]; total: number }> => {
    const response = await api.get<{ users: User[]; total: number }>(`/users?page=${page}&limit=${limit}`);
    return response.data;
  },
};

// React Query hooks
export const useCurrentUser = () => {
  return useQuery({
    queryKey: ['user', 'current'],
    queryFn: userApi.getCurrentUser,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};

export const useUsers = (page = 1, limit = 10) => {
  return useQuery({
    queryKey: ['users', page, limit],
    queryFn: () => userApi.getUsers(page, limit),
    staleTime: 1000 * 60 * 2, // 2 minutes
  });
};

export const useLogin = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: userApi.login,
    onSuccess: (data) => {
      // Update user cache
      queryClient.setQueryData(['user', 'current'], data.user);
      // Store token (you might want to use your Zustand store here)
      console.log('Login successful:', data);
    },
    onError: (error) => {
      console.error('Login failed:', error);
    },
  });
};

export const useRegister = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: userApi.register,
    onSuccess: (data) => {
      // Update user cache
      queryClient.setQueryData(['user', 'current'], data.user);
      console.log('Registration successful:', data);
    },
    onError: (error) => {
      console.error('Registration failed:', error);
    },
  });
};

export const useUpdateProfile = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: userApi.updateProfile,
    onSuccess: (data) => {
      // Update user cache
      queryClient.setQueryData(['user', 'current'], data);
      // Invalidate users list to refresh
      queryClient.invalidateQueries({ queryKey: ['users'] });
    },
    onError: (error) => {
      console.error('Profile update failed:', error);
    },
  });
};

export default userApi;
