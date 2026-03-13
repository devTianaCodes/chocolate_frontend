import api from './client.js';

export async function fetchProducts({ page = 1, limit = 12 } = {}) {
  const { data } = await api.get('/products', { params: { page, limit } });
  return data;
}

export async function fetchProductBySlug(slug) {
  const { data } = await api.get(`/products/${slug}`);
  return data;
}
