import { create } from 'zustand';
import { loginUser, registerUser, logoutUser, refreshToken } from '../api/auth.js';
import { mergeCart } from '../api/cart.js';

let authMutationVersion = 0;

function getSessionId() {
  if (typeof window === 'undefined') {
    return null;
  }

  return window.localStorage.getItem('choc_session');
}

export const useAuthStore = create((set) => ({
  user: null,
  accessToken: null,
  initialized: false,
  loading: false,
  error: '',

  clearError: () => set({ error: '' }),

  setSession: ({ user, accessToken }) => {
    authMutationVersion += 1;
    set({
      user,
      accessToken,
      initialized: true,
      error: '',
    });
  },

  clearSession: () => {
    authMutationVersion += 1;
    set({
      user: null,
      accessToken: null,
      initialized: true,
      error: '',
    });
  },

  initialize: async () => {
    const initializeVersion = authMutationVersion;
    set({ loading: true, error: '' });
    try {
      const response = await refreshToken();
      if (authMutationVersion !== initializeVersion) {
        return;
      }
      set({
        user: response.data.user,
        accessToken: response.data.accessToken,
        initialized: true,
      });
    } catch (err) {
      if (authMutationVersion !== initializeVersion) {
        return;
      }
      set({
        user: null,
        accessToken: null,
        initialized: true,
      });
    } finally {
      set({ loading: false });
    }
  },

  refreshSession: async () => {
    const response = await refreshToken();
    set({
      user: response.data.user,
      accessToken: response.data.accessToken,
      initialized: true,
      error: '',
    });
    return response.data.accessToken;
  },

  register: async (payload) => {
    authMutationVersion += 1;
    set({ loading: true, error: '' });
    try {
      const response = await registerUser(payload);
      const sessionId = getSessionId();
      if (sessionId) {
        await mergeCart(sessionId, response.data.accessToken);
      }
      set({
        user: response.data.user,
        accessToken: response.data.accessToken,
        initialized: true,
      });
      return true;
    } catch (err) {
      set({ error: err.response?.data?.error || 'Registration failed.' });
      return false;
    } finally {
      set({ loading: false });
    }
  },

  login: async (email, password) => {
    authMutationVersion += 1;
    set({ loading: true, error: '' });
    try {
      const response = await loginUser({ email, password });
      const sessionId = getSessionId();
      if (sessionId) {
        await mergeCart(sessionId, response.data.accessToken);
      }
      set({
        user: response.data.user,
        accessToken: response.data.accessToken,
        initialized: true,
      });
      return true;
    } catch (err) {
      set({ error: err.response?.data?.error || 'Login failed.' });
      return false;
    } finally {
      set({ loading: false });
    }
  },

  logout: async () => {
    authMutationVersion += 1;
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
