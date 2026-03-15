import { useState } from 'react';
import { Heart } from 'lucide-react';
import { Link } from 'react-router-dom';
import { formatPrice } from '../../utils/formatPrice.js';
import { useCartStore } from '../../store/cartStore.js';
import { useFavouritesStore } from '../../store/favouritesStore.js';

export default function ProductCard({ product }) {
  const [imageFailed, setImageFailed] = useState(false);
  const addItem = useCartStore((state) => state.addItem);
  const favouriteItems = useFavouritesStore((state) => state.items);
  const toggleFavourite = useFavouritesStore((state) => state.toggleItem);
  const isFavourite = favouriteItems.some((item) => item.id === product.id);

  return (
    <article className="glass-panel-strong group overflow-hidden transition duration-300 hover:-translate-y-1 hover:border-brand-dark">
      <div className="relative aspect-[3/4] overflow-hidden bg-surface-high/40">
        <button
          type="button"
          aria-label={isFavourite ? 'Remove from favourites' : 'Add to favourites'}
          className="absolute right-3 top-3 z-10 inline-flex items-center justify-center p-1 text-ink-primary transition hover:text-red-400"
          onClick={() => toggleFavourite(product)}
        >
          <Heart
            className={`h-5 w-5 ${isFavourite ? 'fill-red-500 text-red-500' : ''}`}
            strokeWidth={1.8}
          />
        </button>
        {!imageFailed ? (
          <img
            src={product.image}
            alt={product.name}
            className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]"
            loading="lazy"
            onError={() => setImageFailed(true)}
          />
        ) : (
          <div
            aria-label={product.name}
            className="h-full w-full bg-[rgba(255,255,255,0.04)]"
          />
        )}
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
