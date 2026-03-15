import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import PageWrapper from '../components/layout/PageWrapper.jsx';
import { useCartStore } from '../store/cartStore.js';
import { formatPrice } from '../utils/formatPrice.js';

export default function Cart() {
  const { items, loading, error, loadCart, updateItem, removeItem } = useCartStore();
  const subtotal = items.reduce((sum, item) => {
    const unitPrice = Number(item.discount_price || item.price || 0);
    return sum + unitPrice * Number(item.quantity || 0);
  }, 0);

  useEffect(() => {
    loadCart();
  }, [loadCart]);

  return (
    <PageWrapper>
      <header className="mb-8">
        <h1 className="font-display text-display-md text-ink-primary">Your Cart</h1>
      </header>

      {loading && <p className="text-body-md text-ink-secondary">Loading cart…</p>}
      {error && <p className="text-body-md text-red-300">{error}</p>}

      {!loading && !error && items.length === 0 && (
        <p className="text-body-md text-ink-secondary">Your cart is empty.</p>
      )}

      {!loading && !error && items.length > 0 && (
        <div className="space-y-6">
          {items.map((item) => (
            <div key={item.id} className="glass-panel-strong flex flex-col gap-4 p-4 md:flex-row md:items-center">
              <img src={item.image} alt={item.name} className="h-24 w-24 rounded-sm object-cover" />
              <div className="flex-1">
                <p className="font-display text-lg text-ink-primary">{item.name}</p>
                <p className="text-body-sm text-ink-muted">{item.origin || 'Single origin'}</p>
              </div>
              <div className="flex items-center gap-3">
                <button
                  className="button-ghost px-3 py-1"
                  onClick={() => updateItem(item.id, item.quantity - 1)}
                >
                  −
                </button>
                <span className="font-mono text-sm text-ink-primary">{item.quantity}</span>
                <button
                  className="button-ghost px-3 py-1"
                  onClick={() => updateItem(item.id, item.quantity + 1)}
                >
                  +
                </button>
              </div>
              <div className="text-right">
                <p className="font-mono text-sm text-ink-primary">
                  {formatPrice(item.discount_price || item.price)}
                </p>
                <button
                  className="text-xs uppercase tracking-[0.1em] text-red-300"
                  onClick={() => removeItem(item.id)}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
          <div className="glass-panel-strong bg-surface-base/95 p-6">
            <div className="mb-4 flex items-center justify-between">
              <span className="text-body-md text-ink-secondary">Subtotal</span>
              <span className="font-mono text-body-md text-ink-primary">{formatPrice(subtotal)}</span>
            </div>
            <Link
              to="/checkout"
              className="button-primary w-full"
            >
              Continue to checkout
            </Link>
          </div>
        </div>
      )}
    </PageWrapper>
  );
}
