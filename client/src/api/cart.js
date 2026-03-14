import api from './client.js';

export async function fetchCart({ sessionId, userId } = {}) {
  const { data } = await api.get('/cart', { params: { sessionId, userId } });
  return data;
}

export async function addCartItem(payload) {
  const { data } = await api.post('/cart/items', payload);
  return data;
}

export async function updateCartItem(id, payload) {
  const { data } = await api.patch(`/cart/items/${id}`, payload);
  return data;
}

export async function removeCartItem(id) {
  const { data } = await api.delete(`/cart/items/${id}`);
  return data;
}
