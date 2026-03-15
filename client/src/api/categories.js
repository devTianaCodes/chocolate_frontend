import api from './client.js';

export async function fetchCategories() {
  const { data } = await api.get('/categories');
  return data;
}

export async function fetchProductsByCategory(slug) {
  const { data } = await api.get(`/categories/${slug}/products`);
  return data;
}
