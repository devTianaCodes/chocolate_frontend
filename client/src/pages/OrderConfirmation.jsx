import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import PageWrapper from '../components/layout/PageWrapper.jsx';
import { fetchOrder } from '../api/orders.js';
import { useAuthStore } from '../store/authStore.js';
import { formatPrice } from '../utils/formatPrice.js';
import { getDisplayProductName } from '../utils/getDisplayProductName.js';

export default function OrderConfirmation() {
  const { orderId } = useParams();
  const user = useAuthStore((state) => state.user);
  const accessToken = useAuthStore((state) => state.accessToken);
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
        const response = await fetchOrder(orderId, accessToken);
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
  }, [accessToken, orderId, user]);

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
          <div className="glass-panel-strong p-6">
            <p className="text-body-sm text-ink-secondary">Order number</p>
            <p className="font-mono text-body-lg text-ink-primary">{order.order_number}</p>
            <p className="mt-2 text-body-sm text-ink-muted">Status: {order.status}</p>
            <p className="mt-2 text-body-sm text-ink-muted">
              Total: <span className="font-mono text-ink-primary">{formatPrice(order.total)}</span>
            </p>
            <p className="mt-4 text-body-sm text-ink-secondary">
              {order.status === 'paid'
                ? 'Payment received. Your order is now in production.'
                : 'Your order was created, but payment still needs confirmation.'}
            </p>
          </div>

          <div className="glass-panel p-6">
            <p className="section-label mb-4">Items</p>
            <div className="space-y-4">
              {order.items.map((item) => (
                <div key={`${item.product_id}-${item.name}`} className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-body-sm text-ink-primary">{getDisplayProductName(item.name)}</p>
                    <p className="text-body-xs text-ink-muted">Qty {item.quantity}</p>
                  </div>
                  <span className="font-mono text-body-sm text-ink-primary">{formatPrice(item.price)}</span>
                </div>
              ))}
            </div>
          </div>

          <Link
            to="/account"
            className="button-primary"
          >
            View account
          </Link>
        </div>
      )}
    </PageWrapper>
  );
}
