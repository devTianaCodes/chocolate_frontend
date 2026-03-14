import api from './client.js';

function authHeaders(token) {
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
}

export async function createOrder(payload, token) {
  const { data } = await api.post('/orders', payload, authHeaders(token));
  return data;
}

export async function fetchOrder(orderId, token) {
  const { data } = await api.get(`/orders/${orderId}`, authHeaders(token));
  return data;
}

export async function fetchOrders(token) {
  const { data } = await api.get('/orders', authHeaders(token));
  return data;
}
