import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import PageWrapper from '../components/layout/PageWrapper.jsx';
import { fetchOrder } from '../api/orders.js';
import { useAuthStore } from '../store/authStore.js';
import { formatPrice } from '../utils/formatPrice.js';

export default function OrderConfirmation() {
  const { orderId } = useParams();
  const user = useAuthStore((state) => state.user);
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let active = true;

    async function loadOrder() {
      if (!user) {
        setError('Please sign in to view this order.');
        setLoading(false);
        return;
      }

      try {
        const response = await fetchOrder(orderId, user.id);
        if (active) {
          setOrder(response.data);
        }
      } catch (err) {
        if (active) {
          setError('Unable to load order confirmation.');
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    }

    loadOrder();
    return () => {
      active = false;
    };
  }, [orderId, user]);

  return (
    <PageWrapper>
      <header className="mb-8">
        <p className="text-xs uppercase tracking-[0.2em] text-brand">Order placed</p>
        <h1 className="font-display text-display-md text-ink-primary">Confirmation</h1>
      </header>

      {loading && <p className="text-body-md text-ink-secondary">Loading order...</p>}
      {error && <p className="text-body-md text-red-300">{error}</p>}

      {!loading && !error && order && (
        <div className="space-y-6">
          <div className="rounded-card border border-border bg-surface-elevated p-6">
            <p className="text-body-sm text-ink-secondary">Order number</p>
            <p className="font-mono text-body-lg text-ink-primary">{order.order_number}</p>
            <p className="mt-2 text-body-sm text-ink-muted">Status: {order.status}</p>
            <p className="mt-2 text-body-sm text-ink-muted">
              Total: <span className="font-mono text-ink-primary">{formatPrice(order.total)}</span>
            </p>
          </div>

          <div className="rounded-card border border-border bg-surface-elevated p-6">
            <p className="mb-4 text-xs uppercase tracking-[0.2em] text-brand">Items</p>
            <div className="space-y-4">
              {order.items.map((item) => (
                <div key={`${item.product_id}-${item.name}`} className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-body-sm text-ink-primary">{item.name}</p>
                    <p className="text-body-xs text-ink-muted">Qty {item.quantity}</p>
                  </div>
                  <span className="font-mono text-body-sm text-ink-primary">{formatPrice(item.price)}</span>
                </div>
              ))}
            </div>
          </div>

          <Link
            to="/account"
            className="inline-flex items-center justify-center rounded-sm bg-brand px-6 py-3 text-xs uppercase tracking-[0.12em] text-ink-invert transition hover:bg-brand-light"
          >
            View account
          </Link>
        </div>
      )}
    </PageWrapper>
  );
}
