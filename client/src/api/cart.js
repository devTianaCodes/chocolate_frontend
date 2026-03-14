import api from './client.js';

function authHeaders(token) {
  return token
    ? {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    : {};
}

export async function fetchCart({ sessionId, token } = {}) {
  const { data } = await api.get('/cart', {
    params: { sessionId },
    ...authHeaders(token),
  });
  return data;
}

export async function addCartItem(payload, token) {
  const { data } = await api.post('/cart/items', payload, authHeaders(token));
  return data;
}

export async function updateCartItem(id, payload, token) {
  const { data } = await api.patch(`/cart/items/${id}`, payload, authHeaders(token));
  return data;
}

export async function removeCartItem(id, { sessionId, token } = {}) {
  const { data } = await api.delete(`/cart/items/${id}`, {
    params: { sessionId },
    ...authHeaders(token),
  });
  return data;
}
