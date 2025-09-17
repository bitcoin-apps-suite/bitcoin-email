import { create } from 'zustand';
import { HandCashUser } from '@/services/HandCashService';

interface AuthState {
  user: HandCashUser | null;
  accessToken: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (user: HandCashUser, token: string) => void;
  logout: () => void;
  setLoading: (loading: boolean) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  accessToken: null,
  isAuthenticated: false,
  isLoading: true,
  
  login: (user, token) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('accessToken', token);
      localStorage.setItem('user', JSON.stringify(user));
    }
    set({ 
      user, 
      accessToken: token, 
      isAuthenticated: true,
      isLoading: false 
    });
  },
  
  logout: () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('user');
      localStorage.removeItem('handcash_tokens');
      localStorage.removeItem('handcash_user');
    }
    set({ 
      user: null, 
      accessToken: null, 
      isAuthenticated: false,
      isLoading: false 
    });
  },
  
  setLoading: (loading) => set({ isLoading: loading })
}));