import { Link } from 'react-router-dom';
import { formatPrice } from '../../utils/formatPrice.js';

export default function ProductCard({ product }) {
  return (
    <article className="group overflow-hidden rounded-card border border-border bg-surface-elevated transition duration-300 hover:-translate-y-1 hover:border-brand-dark">
      <div className="aspect-[3/4] bg-surface-high">
        <img
          src={product.image}
          alt={product.name}
          className="h-full w-full object-cover"
          loading="lazy"
        />
      </div>
      <div className="space-y-2 p-4">
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
      </div>
    </article>
  );
}
