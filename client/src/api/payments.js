import api from './client.js';

export async function createStripeIntent(orderId) {
  const { data } = await api.post('/payments/stripe/intent', { orderId });
  return data;
}

export async function confirmMockStripePayment({ orderId, paymentIntentId }) {
  const { data } = await api.post('/payments/stripe/webhook', {
    orderId,
    paymentIntentId,
  });
  return data;
}
