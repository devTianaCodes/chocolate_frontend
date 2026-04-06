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
      <header className="panel-wash-strong mb-10 flex flex-col gap-4 p-6 md:p-8">
        <p className="text-panel-secondary text-xs uppercase tracking-[0.2em]">Order placed</p>
        <h1 className="text-panel-ink font-display text-display-md">Confirmation</h1>
        <p className="text-panel-secondary max-w-xl text-body-md">
          Review the confirmed order details and track the payment status from here.
        </p>
      </header>

      {loading && <p className="text-panel-secondary text-body-md">Loading order...</p>}
      {error && <p className="text-body-md text-red-300">{error}</p>}

      {!loading && !error && order && (
        <div className="space-y-6">
          <div className="panel-wash-strong p-6 md:p-8">
            <p className="text-panel-secondary text-xs uppercase tracking-[0.2em]">Order number</p>
            <p className="text-panel-ink font-mono text-body-lg">{order.order_number}</p>
            <p className="text-panel-muted mt-2 text-body-sm">Status: {order.status}</p>
            <p className="text-panel-secondary mt-2 text-body-sm">
              Total: <span className="text-panel-ink font-mono">{formatPrice(order.total)}</span>
            </p>
            <p className="text-panel-secondary mt-4 text-body-sm">
              {order.status === 'paid'
                ? 'Payment received. Your order is now in production.'
                : 'Your order was created, but payment still needs confirmation.'}
            </p>
          </div>

          <div className="panel-wash-strong p-6 md:p-8">
            <p className="text-panel-secondary mb-4 text-xs uppercase tracking-[0.2em]">Items</p>
            <div className="space-y-4">
              {order.items.map((item) => (
                <div key={`${item.product_id}-${item.name}`} className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-panel-ink text-body-sm">{getDisplayProductName(item.name)}</p>
                    <p className="text-panel-secondary text-body-xs">Qty {item.quantity}</p>
                  </div>
                  <span className="text-panel-ink font-mono text-body-sm">{formatPrice(item.price)}</span>
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
