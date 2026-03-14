import api from './client.js';

export async function createOrder(payload) {
  const { data } = await api.post('/orders', payload);
  return data;
}

export async function fetchOrder(orderId, userId) {
  const { data } = await api.get(`/orders/${orderId}`, {
    params: { userId },
  });
  return data;
}

export async function fetchOrders(userId) {
  const { data } = await api.get('/orders', {
    params: { userId },
  });
  return data;
}
