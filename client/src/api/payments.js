import api from './client.js';

function authHeaders(token) {
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
}

export async function createStripeIntent(orderId, token) {
  const { data } = await api.post('/payments/stripe/intent', { orderId }, authHeaders(token));
  return data;
}

export async function confirmMockStripePayment({ orderId, paymentIntentId }) {
  const { data } = await api.post('/payments/stripe/webhook', {
    orderId,
    paymentIntentId,
  });
  return data;
}
