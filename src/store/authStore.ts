import { create } from 'zustand';
import type { User } from '../types/index';

interface AuthState {
  user: User | null;
  token: string | null;
  setAuth: (user: User, token: string) => void;
  clearAuth: () => void;
  isAdmin: () => boolean;
}

const storedUser = localStorage.getItem('voire_auth_user');
const storedToken = localStorage.getItem('voire_auth_token');

export const useAuthStore = create<AuthState>((set, get) => ({
  user: storedUser ? JSON.parse(storedUser) : null,
  token: storedToken || null,
  setAuth: (user, token) => {
    localStorage.setItem('voire_auth_user', JSON.stringify(user));
    localStorage.setItem('voire_auth_token', token);
    set({ user, token });
  },
  clearAuth: () => {
    localStorage.removeItem('voire_auth_user');
    localStorage.removeItem('voire_auth_token');
    set({ user: null, token: null });
  },
  isAdmin: () => get().user?.role === 'admin',
}));
