import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import PageWrapper from '../components/layout/PageWrapper.jsx';
import { createOrder } from '../api/orders.js';
import { confirmMockStripePayment, createStripeIntent } from '../api/payments.js';
import { useAuthStore } from '../store/authStore.js';
import { useCartStore } from '../store/cartStore.js';
import { formatPrice } from '../utils/formatPrice.js';
import { getDisplayProductName } from '../utils/getDisplayProductName.js';
import { getEffectivePrice } from '../utils/getEffectivePrice.js';

export default function Checkout() {
  const navigate = useNavigate();
  const user = useAuthStore((state) => state.user);
  const accessToken = useAuthStore((state) => state.accessToken);
  const { items, sessionId, loadCart, clearItems } = useCartStore();
  const [shippingAddress, setShippingAddress] = useState({
    line1: '',
    city: '',
    country: '',
  });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    loadCart();
  }, [loadCart]);

  const subtotal = items.reduce((sum, item) => {
    const unitPrice = getEffectivePrice(item);
    return sum + unitPrice * Number(item.quantity || 0);
  }, 0);
  const shippingTotal = items.length > 0 ? 6.5 : 0;
  const total = subtotal + shippingTotal;

  function handleChange(event) {
    const { name, value } = event.target;
    setShippingAddress((current) => ({
      ...current,
      [name]: value,
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();

    if (!user) {
      setError('Please sign in before placing an order.');
      return;
    }

    setSubmitting(true);
    setError('');

    try {
      const orderResponse = await createOrder({
        sessionId,
        shippingAddress,
        shippingMethodId: 1,
      }, accessToken);
      const orderId = orderResponse.data.orderId;
      const paymentResponse = await createStripeIntent(orderId, accessToken);

      if (paymentResponse.data.mode === 'mock') {
        await confirmMockStripePayment({
          orderId,
          paymentIntentId: paymentResponse.data.paymentIntentId,
        });
      }

      clearItems();
      navigate(`/order-confirmation/${orderId}`);
    } catch (err) {
      setError('Unable to complete checkout.');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <PageWrapper>
      <header className="panel-wash-strong mb-10 flex flex-col gap-4 p-6 md:p-8">
        <p className="text-panel-secondary text-xs uppercase tracking-[0.2em]">Order details</p>
        <h1 className="text-panel-ink font-display text-display-md">Checkout</h1>
        <p className="text-panel-secondary max-w-xl text-body-md">
          Confirm your delivery details and review the final total before payment.
        </p>
      </header>

      {!user && (
        <div className="panel-wash-strong p-6 text-body-md text-panel-secondary">
          You need an account to place an order.{' '}
          <Link to="/login" className="text-panel-ink">
            Sign in
          </Link>
          .
        </div>
      )}

      {user && (
        <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <form className="panel-wash-strong space-y-4 p-6 md:p-8" onSubmit={handleSubmit}>
            <p className="text-panel-secondary text-xs uppercase tracking-[0.2em]">Delivery</p>
            {error && <p className="text-body-sm text-red-300">{error}</p>}
            <label className="text-panel-secondary block text-xs uppercase tracking-[0.08em]">
              Address line
              <input
                name="line1"
                value={shippingAddress.line1}
                onChange={handleChange}
                className="auth-input"
                required
              />
            </label>
            <label className="text-panel-secondary block text-xs uppercase tracking-[0.08em]">
              City
              <input
                name="city"
                value={shippingAddress.city}
                onChange={handleChange}
                className="auth-input"
                required
              />
            </label>
            <label className="text-panel-secondary block text-xs uppercase tracking-[0.08em]">
              Country
              <input
                name="country"
                value={shippingAddress.country}
                onChange={handleChange}
                className="auth-input"
                required
              />
            </label>
            <button
              type="submit"
              className="button-primary w-full disabled:opacity-50"
              disabled={submitting || items.length === 0}
            >
              {submitting ? 'Processing payment...' : 'Pay and place order'}
            </button>
          </form>

          <aside className="panel-wash-strong p-6 md:p-8">
            <p className="text-panel-secondary mb-4 text-xs uppercase tracking-[0.2em]">Order summary</p>
            <div className="space-y-3">
              {items.map((item) => (
                <div key={item.id} className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-panel-ink text-body-sm">{getDisplayProductName(item.name)}</p>
                    <p className="text-panel-secondary text-body-xs">Qty {item.quantity}</p>
                  </div>
                  <span className="text-panel-ink font-mono text-body-sm">
                    {formatPrice(getEffectivePrice(item) * Number(item.quantity || 0))}
                  </span>
                </div>
              ))}
            </div>
            <div className="mt-6 space-y-2 border-t border-[rgba(79,33,33,0.14)] pt-4">
              <div className="text-panel-secondary flex items-center justify-between text-body-sm">
                <span>Subtotal</span>
                <span className="text-panel-ink font-mono">{formatPrice(subtotal)}</span>
              </div>
              <div className="text-panel-secondary flex items-center justify-between text-body-sm">
                <span>Shipping</span>
                <span className="text-panel-ink font-mono">{formatPrice(shippingTotal)}</span>
              </div>
              <div className="text-panel-ink flex items-center justify-between text-body-md">
                <span>Total</span>
                <span className="font-mono">{formatPrice(total)}</span>
              </div>
            </div>
          </aside>
        </div>
      )}
    </PageWrapper>
  );
}
