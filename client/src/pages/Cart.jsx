import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import PageWrapper from '../components/layout/PageWrapper.jsx';
import { useCartStore } from '../store/cartStore.js';
import { formatPrice } from '../utils/formatPrice.js';
import { getDisplayProductName } from '../utils/getDisplayProductName.js';

export default function Cart() {
  const { items, loading, error, loadCart, updateItem, removeItem, emptyCart } = useCartStore();
  const subtotal = items.reduce((sum, item) => {
    const unitPrice = Number(item.discount_price || item.price || 0);
    return sum + unitPrice * Number(item.quantity || 0);
  }, 0);

  useEffect(() => {
    loadCart();
  }, [loadCart]);

  return (
    <PageWrapper>
      <header className="mb-8 flex items-start justify-between gap-4">
        <h1 className="text-panel-ink font-display text-display-md">Your Cart</h1>
        {items.length > 0 && (
          <button type="button" className="button-ghost" onClick={emptyCart}>
            Empty cart
          </button>
        )}
      </header>

      {loading && <p className="text-panel-secondary text-body-md">Loading cart…</p>}
      {error && <p className="text-body-md text-red-300">{error}</p>}

      {!loading && !error && items.length === 0 && (
        <p className="text-panel-secondary text-body-md">Your cart is empty.</p>
      )}

      {!loading && !error && items.length > 0 && (
        <div className="grid gap-6 md:grid-cols-[minmax(0,3fr)_minmax(280px,2fr)] md:items-start">
          <div className="space-y-5">
            {items.map((item) => (
              <div key={item.id} className="panel-wash-strong flex flex-col gap-4 p-4 md:flex-row md:items-center">
                <img src={item.image} alt={item.name} className="h-24 w-24 rounded-none object-cover" />
                <div className="flex-1">
                  <p className="text-panel-ink font-display text-lg">{getDisplayProductName(item.name)}</p>
                  <p className="text-panel-secondary text-body-sm">{item.origin || 'Single origin'}</p>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    className="button-ghost px-3 py-1"
                    onClick={() => updateItem(item.id, item.quantity - 1)}
                  >
                    −
                  </button>
                  <span className="text-panel-ink font-mono text-sm">{item.quantity}</span>
                  <button
                    className="button-ghost px-3 py-1"
                    onClick={() => updateItem(item.id, item.quantity + 1)}
                  >
                    +
                  </button>
                </div>
                <div className="text-right">
                  <p className="text-panel-ink font-mono text-base">
                    {formatPrice(item.discount_price || item.price)}
                  </p>
                  <button
                    className="text-xs uppercase tracking-[0.1em] text-[#8c3f37]"
                    onClick={() => removeItem(item.id)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="panel-wash-strong p-6 md:sticky md:top-24">
            <div className="mb-4 flex items-center justify-between">
              <span className="text-panel-ink text-lg font-semibold">Subtotal</span>
              <span className="text-panel-ink font-mono text-xl font-semibold">{formatPrice(subtotal)}</span>
            </div>
            <p className="mb-4 text-panel-secondary text-body-sm">
              Free shipping on orders over €50.
            </p>
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
