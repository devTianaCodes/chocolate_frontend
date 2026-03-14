import { create } from 'zustand';
import { loginUser, registerUser, logoutUser, refreshToken } from '../api/auth.js';

export const useAuthStore = create((set) => ({
  user: null,
  accessToken: null,
  initialized: false,
  loading: false,
  error: '',

  initialize: async () => {
    set({ loading: true, error: '' });
    try {
      const response = await refreshToken();
      set({
        user: response.data.user,
        accessToken: response.data.accessToken,
        initialized: true,
      });
    } catch (err) {
      set({
        user: null,
        accessToken: null,
        initialized: true,
      });
    } finally {
      set({ loading: false });
    }
  },

  register: async (email, password) => {
    set({ loading: true, error: '' });
    try {
      const response = await registerUser({ email, password });
      set({
        user: response.data.user,
        accessToken: response.data.accessToken,
        initialized: true,
      });
      return true;
    } catch (err) {
      set({ error: 'Registration failed.' });
      return false;
    } finally {
      set({ loading: false });
    }
  },

  login: async (email, password) => {
    set({ loading: true, error: '' });
    try {
      const response = await loginUser({ email, password });
      set({
        user: response.data.user,
        accessToken: response.data.accessToken,
        initialized: true,
      });
      return true;
    } catch (err) {
      set({ error: 'Login failed.' });
      return false;
    } finally {
      set({ loading: false });
    }
  },

  logout: async () => {
    set({ loading: true, error: '' });
    try {
      await logoutUser();
      set({ user: null, accessToken: null, initialized: true });
      return true;
    } catch (err) {
      set({ error: 'Logout failed.' });
      return false;
    } finally {
      set({ loading: false });
    }
  },
}));
