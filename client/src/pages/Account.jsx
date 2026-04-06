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
        <header className="panel-wash-strong flex flex-col gap-4 p-6 md:p-8">
          <p className="text-panel-secondary text-xs uppercase tracking-[0.2em]">Your profile</p>
          <h1 className="text-panel-ink font-display text-display-md">Account</h1>
          <p className="text-panel-secondary max-w-xl text-body-md">
            Review your signed-in details and keep track of every order placed with the atelier.
          </p>
        </header>

        {!user && (
          <div className="panel-wash-strong p-8">
            <p className="text-panel-secondary text-body-md">You are not signed in.</p>
          </div>
        )}

        {user && (
          <>
            <div className="panel-wash-strong p-6 md:p-8">
              <p className="text-panel-secondary text-xs uppercase tracking-[0.2em]">Signed in as</p>
              <p className="text-panel-ink font-display text-display-sm">{user.email}</p>
              <p className="text-panel-secondary text-body-sm">Role: {user.role}</p>
              <button
                className="button-ghost mt-5 px-4 py-2"
                onClick={logout}
                disabled={loading}
              >
                {loading ? 'Signing out…' : 'Sign out'}
              </button>
            </div>

            <div className="panel-wash-strong p-6 md:p-8">
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-panel-ink font-display text-display-sm">Orders</h2>
                <Link to="/shop" className="text-xs uppercase tracking-[0.1em] text-panel-secondary transition hover:text-panel-ink">
                  Continue shopping
                </Link>
              </div>

              {ordersLoading && <p className="text-panel-secondary text-body-sm">Loading orders...</p>}
              {ordersError && <p className="text-body-sm text-red-300">{ordersError}</p>}
              {!ordersLoading && !ordersError && orders.length === 0 && (
                <p className="text-panel-secondary text-body-sm">No orders yet.</p>
              )}

              {!ordersLoading && !ordersError && orders.length > 0 && (
                <div className="space-y-4">
                  {orders.map((order, index) => (
                    <div key={order.id} className={`flex flex-col gap-2 pt-4 text-body-sm text-panel-secondary md:flex-row md:items-center md:justify-between ${index > 0 ? 'border-t border-[rgba(79,33,33,0.14)]' : ''}`}>
                      <div>
                        <p className="text-panel-ink font-mono">{order.order_number}</p>
                        <p>{new Date(order.created_at).toLocaleDateString()}</p>
                      </div>
                      <div className="md:text-right">
                        <p className="text-panel-muted uppercase tracking-[0.08em]">{order.status}</p>
                        <p className="text-panel-ink font-mono">{formatPrice(order.total)}</p>
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
