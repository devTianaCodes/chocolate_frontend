import { create } from 'zustand';
import { loginUser, registerUser, logoutUser } from '../api/auth.js';

export const useAuthStore = create((set) => ({
  user: null,
  accessToken: null,
  loading: false,
  error: '',

  register: async (email, password) => {
    set({ loading: true, error: '' });
    try {
      const response = await registerUser({ email, password });
      set({ user: response.data.user, accessToken: response.data.accessToken });
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
      set({ user: response.data.user, accessToken: response.data.accessToken });
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
      set({ user: null, accessToken: null });
      return true;
    } catch (err) {
      set({ error: 'Logout failed.' });
      return false;
    } finally {
      set({ loading: false });
    }
  },
}));
