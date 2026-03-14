import PageWrapper from '../components/layout/PageWrapper.jsx';
import { useAuthStore } from '../store/authStore.js';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchOrders } from '../api/orders.js';
import { formatPrice } from '../utils/formatPrice.js';

export default function Account() {
  const { user, accessToken, logout, loading } = useAuthStore();
  const [orders, setOrders] = useState([]);
  const [ordersLoading, setOrdersLoading] = useState(false);
  const [ordersError, setOrdersError] = useState('');

  useEffect(() => {
    let active = true;

    async function loadOrders() {
      if (!user) {
        setOrders([]);
        return;
      }

      setOrdersLoading(true);
      setOrdersError('');
      try {
        const response = await fetchOrders(accessToken);
        if (active) {
          setOrders(response.data || []);
        }
      } catch (err) {
        if (active) {
          setOrdersError('Unable to load orders.');
        }
      } finally {
        if (active) {
          setOrdersLoading(false);
        }
      }
    }

    loadOrders();
    return () => {
      active = false;
    };
  }, [accessToken, user]);

  return (
    <PageWrapper>
      <div className="space-y-6">
        <header>
          <h1 className="font-display text-display-md text-ink-primary">Account</h1>
        </header>

        {!user && (
          <p className="text-body-md text-ink-secondary">
            You are not signed in.
          </p>
        )}

        {user && (
          <>
            <div className="glass-panel p-6">
              <p className="text-body-sm text-ink-secondary">Signed in as</p>
              <p className="font-display text-display-sm text-ink-primary">{user.email}</p>
              <p className="text-body-sm text-ink-muted">Role: {user.role}</p>
              <button
                className="button-ghost mt-4 px-4 py-2"
                onClick={logout}
                disabled={loading}
              >
                {loading ? 'Signing out…' : 'Sign out'}
              </button>
            </div>

            <div className="glass-panel-strong p-6">
              <div className="mb-4 flex items-center justify-between">
                <h2 className="font-display text-display-sm text-ink-primary">Orders</h2>
                <Link to="/shop" className="text-xs uppercase tracking-[0.1em] text-brand">
                  Continue shopping
                </Link>
              </div>

              {ordersLoading && <p className="text-body-sm text-ink-secondary">Loading orders...</p>}
              {ordersError && <p className="text-body-sm text-red-300">{ordersError}</p>}
              {!ordersLoading && !ordersError && orders.length === 0 && (
                <p className="text-body-sm text-ink-secondary">No orders yet.</p>
              )}

              {!ordersLoading && !ordersError && orders.length > 0 && (
                <div className="space-y-4">
                  {orders.map((order) => (
                    <div key={order.id} className="flex flex-col gap-2 border-t border-border/40 pt-4 text-body-sm text-ink-secondary md:flex-row md:items-center md:justify-between">
                      <div>
                        <p className="font-mono text-ink-primary">{order.order_number}</p>
                        <p>{new Date(order.created_at).toLocaleDateString()}</p>
                      </div>
                      <div className="md:text-right">
                        <p className="uppercase tracking-[0.08em] text-ink-muted">{order.status}</p>
                        <p className="font-mono text-ink-primary">{formatPrice(order.total)}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </PageWrapper>
  );
}
