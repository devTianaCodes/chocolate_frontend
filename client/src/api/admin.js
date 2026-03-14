import api from './client.js';

function authHeaders(token) {
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
}

export async function fetchAdminProducts(token) {
  const { data } = await api.get('/admin/products', authHeaders(token));
  return data;
}

export async function createAdminProduct(token, payload) {
  const { data } = await api.post('/admin/products', payload, authHeaders(token));
  return data;
}

export async function updateAdminInventory(token, productId, quantity) {
  const { data } = await api.patch(
    `/admin/inventory/${productId}`,
    { quantity },
    authHeaders(token)
  );
  return data;
}

export async function fetchAdminOrders(token) {
  const { data } = await api.get('/admin/orders', authHeaders(token));
  return data;
}

export async function updateAdminOrderStatus(token, orderId, status) {
  const { data } = await api.patch(
    `/admin/orders/${orderId}/status`,
    { status },
    authHeaders(token)
  );
  return data;
}
