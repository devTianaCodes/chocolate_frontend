import { useEffect, useState } from 'react';
import PageWrapper from '../components/layout/PageWrapper.jsx';
import { fetchAdminOrders, updateAdminOrderStatus } from '../api/admin.js';
import { useAuthStore } from '../store/authStore.js';
import { formatPrice } from '../utils/formatPrice.js';

const statuses = ['pending', 'paid', 'shipped', 'delivered', 'cancelled'];

export default function AdminOrders() {
  const { user, accessToken } = useAuthStore();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let active = true;

    async function load() {
      if (!accessToken || user?.role !== 'admin') {
        setLoading(false);
        return;
      }

      try {
        const response = await fetchAdminOrders(accessToken);
        if (active) {
          setOrders(response.data || []);
        }
      } catch (err) {
        if (active) {
          setError('Unable to load admin orders.');
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    }

    load();
    return () => {
      active = false;
    };
  }, [accessToken, user]);

  async function handleStatusChange(orderId, status) {
    await updateAdminOrderStatus(accessToken, orderId, status);
    const response = await fetchAdminOrders(accessToken);
    setOrders(response.data || []);
  }

  return (
    <PageWrapper>
      <div className="space-y-8">
        <header>
          <p className="text-xs uppercase tracking-[0.2em] text-brand">Admin</p>
          <h1 className="font-display text-display-md text-ink-primary">Orders</h1>
        </header>

        {user?.role !== 'admin' && <p className="text-body-md text-ink-secondary">Admin access required.</p>}
        {error && <p className="text-body-md text-red-300">{error}</p>}
        {loading && <p className="text-body-md text-ink-secondary">Loading orders...</p>}

        {!loading && user?.role === 'admin' && (
          <div className="space-y-4">
            {orders.map((order) => (
              <div key={order.id} className="flex flex-col gap-4 rounded-card border border-border bg-surface-elevated p-4 md:flex-row md:items-center md:justify-between">
                <div>
                  <p className="font-mono text-body-sm text-ink-primary">{order.order_number}</p>
                  <p className="text-body-sm text-ink-secondary">{order.email}</p>
                </div>
                <div className="flex items-center gap-4">
                  <span className="font-mono text-body-sm text-ink-primary">{formatPrice(order.total)}</span>
                  <select
                    value={order.status}
                    onChange={(event) => handleStatusChange(order.id, event.target.value)}
                    className="rounded-sm border border-border bg-surface-high px-3 py-2 text-body-sm text-ink-primary"
                  >
                    {statuses.map((status) => (
                      <option key={status} value={status}>{status}</option>
                    ))}
                  </select>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </PageWrapper>
  );
}
