import { Link } from 'react-router-dom';
import { formatPrice } from '../../utils/formatPrice.js';
import { useCartStore } from '../../store/cartStore.js';

export default function ProductCard({ product }) {
  const addItem = useCartStore((state) => state.addItem);

  return (
    <article className="glass-panel-strong group overflow-hidden transition duration-300 hover:-translate-y-1 hover:border-brand-dark">
      <div className="relative aspect-[3/4] overflow-hidden bg-surface-high/40">
        <img
          src={product.image}
          alt={product.name}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-surface-base/75 via-brand-subtle/10 to-transparent opacity-0 transition duration-300 group-hover:opacity-100" />
        <div className="absolute inset-x-4 bottom-4 opacity-0 transition duration-300 group-hover:opacity-100">
          <Link to={`/products/${product.slug}`} className="button-ghost w-full bg-surface-base/30 backdrop-blur-md">
            Quick view
          </Link>
        </div>
      </div>
      <div className="space-y-2 pl-7 pr-5 pb-5 pt-6">
        <p className="text-[11px] uppercase tracking-[0.12em] text-ink-muted">
          {product.category_name || 'Chocolate'}
        </p>
        <h3 className="font-display text-lg text-ink-primary">
          <Link to={`/products/${product.slug}`} className="hover:text-brand">
            {product.name}
          </Link>
        </h3>
        <div className="flex items-center justify-between">
          <span className="font-mono text-sm text-ink-primary">
            {formatPrice(product.discount_price || product.price)}
          </span>
          {Number(product.discount_price) > 0 && (
            <span className="font-mono text-xs text-ink-muted line-through">
              {formatPrice(product.price)}
            </span>
          )}
        </div>
        <button className="button-primary mt-3 w-full" onClick={() => addItem(product.id, 1)}>
          Add to cart
        </button>
      </div>
    </article>
  );
}
