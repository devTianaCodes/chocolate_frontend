import api from './client.js';

export async function fetchCategories() {
  const { data } = await api.get('/categories');
  return data;
}
