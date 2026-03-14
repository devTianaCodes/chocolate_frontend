import api from './client.js';

export async function registerUser(payload) {
  const { data } = await api.post('/auth/register', payload);
  return data;
}

export async function loginUser(payload) {
  const { data } = await api.post('/auth/login', payload);
  return data;
}

export async function logoutUser() {
  const { data } = await api.post('/auth/logout');
  return data;
}

export async function refreshToken() {
  const { data } = await api.post('/auth/refresh');
  return data;
}
