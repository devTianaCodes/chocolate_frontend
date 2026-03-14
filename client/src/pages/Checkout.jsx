import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import PageWrapper from '../components/layout/PageWrapper.jsx';
import { createOrder } from '../api/orders.js';
import { useAuthStore } from '../store/authStore.js';
import { useCartStore } from '../store/cartStore.js';
import { formatPrice } from '../utils/formatPrice.js';

export default function Checkout() {
  const navigate = useNavigate();
  const user = useAuthStore((state) => state.user);
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
    const unitPrice = Number(item.discount_price || item.price || 0);
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
      const response = await createOrder({
        userId: user.id,
        sessionId,
        shippingAddress,
        shippingMethodId: 1,
      });

      clearItems();
      navigate(`/order-confirmation/${response.data.orderId}`);
    } catch (err) {
      setError('Unable to create order.');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <PageWrapper>
      <header className="mb-8">
        <h1 className="font-display text-display-md text-ink-primary">Checkout</h1>
      </header>

      {!user && (
        <div className="rounded-card border border-border bg-surface-elevated p-6 text-body-md text-ink-secondary">
          You need an account to place an order.{' '}
          <Link to="/login" className="text-brand">
            Sign in
          </Link>
          .
        </div>
      )}

      {user && (
        <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <form className="space-y-4 rounded-card border border-border bg-surface-elevated p-6" onSubmit={handleSubmit}>
            <p className="text-xs uppercase tracking-[0.2em] text-brand">Delivery</p>
            {error && <p className="text-body-sm text-red-300">{error}</p>}
            <label className="block text-xs uppercase tracking-[0.08em] text-ink-muted">
              Address line
              <input
                name="line1"
                value={shippingAddress.line1}
                onChange={handleChange}
                className="mt-2 w-full rounded-sm border border-border bg-surface-high px-4 py-3 text-body-sm text-ink-primary"
                required
              />
            </label>
            <label className="block text-xs uppercase tracking-[0.08em] text-ink-muted">
              City
              <input
                name="city"
                value={shippingAddress.city}
                onChange={handleChange}
                className="mt-2 w-full rounded-sm border border-border bg-surface-high px-4 py-3 text-body-sm text-ink-primary"
                required
              />
            </label>
            <label className="block text-xs uppercase tracking-[0.08em] text-ink-muted">
              Country
              <input
                name="country"
                value={shippingAddress.country}
                onChange={handleChange}
                className="mt-2 w-full rounded-sm border border-border bg-surface-high px-4 py-3 text-body-sm text-ink-primary"
                required
              />
            </label>
            <button
              type="submit"
              className="inline-flex w-full items-center justify-center rounded-sm bg-brand px-6 py-3 text-xs uppercase tracking-[0.12em] text-ink-invert transition hover:bg-brand-light disabled:opacity-50"
              disabled={submitting || items.length === 0}
            >
              {submitting ? 'Placing order...' : 'Place order'}
            </button>
          </form>

          <aside className="rounded-card border border-border bg-surface-elevated p-6">
            <p className="mb-4 text-xs uppercase tracking-[0.2em] text-brand">Order summary</p>
            <div className="space-y-3">
              {items.map((item) => (
                <div key={item.id} className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-body-sm text-ink-primary">{item.name}</p>
                    <p className="text-body-xs text-ink-muted">Qty {item.quantity}</p>
                  </div>
                  <span className="font-mono text-body-sm text-ink-primary">
                    {formatPrice(Number(item.discount_price || item.price || 0) * Number(item.quantity || 0))}
                  </span>
                </div>
              ))}
            </div>
            <div className="mt-6 space-y-2 border-t border-border pt-4">
              <div className="flex items-center justify-between text-body-sm text-ink-secondary">
                <span>Subtotal</span>
                <span className="font-mono text-ink-primary">{formatPrice(subtotal)}</span>
              </div>
              <div className="flex items-center justify-between text-body-sm text-ink-secondary">
                <span>Shipping</span>
                <span className="font-mono text-ink-primary">{formatPrice(shippingTotal)}</span>
              </div>
              <div className="flex items-center justify-between text-body-md text-ink-primary">
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
