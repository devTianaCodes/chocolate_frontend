import { Link, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { ShoppingCart, X } from 'lucide-react';
import { useCartStore } from '../../store/cartStore.js';
import { formatPrice } from '../../utils/formatPrice.js';
import { getDisplayProductName } from '../../utils/getDisplayProductName.js';
import { getEffectivePrice } from '../../utils/getEffectivePrice.js';

const FREE_SHIPPING_THRESHOLD = 50;

export default function CartDrawer() {
  const location = useLocation();
  const items = useCartStore((state) => state.items);
  const isOpen = useCartStore((state) => state.isCartDrawerOpen);
  const lastAddedItem = useCartStore((state) => state.lastAddedItem);
  const lastAddedQuantity = useCartStore((state) => state.lastAddedQuantity);
  const closeCartDrawer = useCartStore((state) => state.closeCartDrawer);

  useEffect(() => {
    if (location.pathname === '/cart' && isOpen) {
      closeCartDrawer();
    }
  }, [closeCartDrawer, isOpen, location.pathname]);

  if (!isOpen || !lastAddedItem) {
    return null;
  }

  const subtotal = items.reduce(
    (sum, item) => sum + getEffectivePrice(item) * Number(item.quantity || 0),
    0
  );
  const remaining = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);
  const addedLineTotal = getEffectivePrice(lastAddedItem) * Number(lastAddedQuantity || 0);

  return (
    <div className="fixed inset-x-0 bottom-0 top-[102px] z-[60]">
      <button
        type="button"
        aria-label="Close cart popup"
        className="absolute inset-0 bg-black/15"
        onClick={closeCartDrawer}
      />
      <aside
        className="absolute bottom-0 right-0 top-0 flex w-full max-w-[390px] flex-col border-l border-black/10 bg-[#f8e5dd] p-5 text-black shadow-[-13px_0_28px_rgba(39,19,13,0.126)]"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="mb-5 flex items-start justify-between gap-4">
          <div className="space-y-1">
            <p className="section-label text-black/70">Added to cart</p>
            <h2 className="font-display text-2xl text-black">Cart</h2>
          </div>
          <button
            type="button"
            aria-label="Close cart popup"
            className="inline-flex h-9 w-9 items-center justify-center rounded-sm border border-black/10 text-black transition hover:bg-black/5"
            onClick={closeCartDrawer}
          >
            <X className="h-4 w-4" strokeWidth={1.8} />
          </button>
        </div>

        <p className="mb-5 text-sm leading-6 text-black/75">
          {remaining > 0
            ? `Spend ${formatPrice(remaining)} more to reach free shipping`
            : 'You’ve reached free shipping'}
        </p>

        <div className="mb-6 flex items-center gap-4 border-y border-black/10 py-4">
          <img
            src={lastAddedItem.image}
            alt={lastAddedItem.name}
            className="h-20 w-16 rounded-sm object-cover"
          />
          <div className="min-w-0 flex-1">
            <p className="font-display text-lg leading-6 text-black">
              {getDisplayProductName(lastAddedItem.name)}
            </p>
            <div className="mt-2 flex items-center justify-between gap-3 text-sm text-black/70">
              <span>Qty {lastAddedQuantity}</span>
              <span className="font-mono text-base text-black">{formatPrice(addedLineTotal)}</span>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between gap-4">
            <span className="text-base text-black/75">Subtotal</span>
            <span className="font-mono text-lg text-black">{formatPrice(subtotal)} EUR</span>
          </div>
          <p className="text-sm leading-6 text-black/65">
            Tax included. Shipping calculated at checkout.
          </p>
        </div>

        <div className="mt-auto pt-6">
          <Link to="/cart" className="button-primary w-full gap-2" onClick={closeCartDrawer}>
            <span>View cart</span>
            <ShoppingCart className="h-4 w-4" strokeWidth={1.8} />
          </Link>
        </div>
      </aside>
    </div>
  );
}
