import { useState } from 'react';
import { Heart, ShoppingCart, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import { formatPrice } from '../../utils/formatPrice.js';
import { getDisplayProductName } from '../../utils/getDisplayProductName.js';
import { getProductReviewSummary } from '../../utils/getProductReviewSummary.js';
import { useCartStore } from '../../store/cartStore.js';
import { useFavouritesStore } from '../../store/favouritesStore.js';

export default function ProductCard({ product }) {
  const [imageFailed, setImageFailed] = useState(false);
  const addItem = useCartStore((state) => state.addItem);
  const favouriteItems = useFavouritesStore((state) => state.items);
  const toggleFavourite = useFavouritesStore((state) => state.toggleItem);
  const isFavourite = favouriteItems.some((item) => item.id === product.id);
  const displayName = getDisplayProductName(product.name);
  const reviews = getProductReviewSummary(product.id);

  return (
    <article className="glass-panel-strong group flex h-full flex-col overflow-hidden transition duration-300 hover:-translate-y-1 hover:border-brand-dark">
      <div className="relative aspect-[15/16] overflow-hidden bg-surface-high/40">
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
      <div className="flex flex-1 flex-col pt-6">
        <div className="space-y-2 pl-7 pr-5">
          <p className="text-[11px] uppercase tracking-[0.12em] text-black">
            {product.category_name || 'Chocolate'}
          </p>
          <h3 className="font-display text-xl font-semibold text-black">
            <Link to={`/products/${product.slug}`} className="hover:text-black">
              {displayName}
            </Link>
          </h3>
          <div className="flex items-center gap-1.5 text-sm text-black">
            <div className="flex items-center gap-0.5" aria-label={`${reviews.rating} out of 5 stars`}>
              {Array.from({ length: 5 }, (_, index) => (
                <Star
                  key={index}
                  className={`h-4 w-4 ${
                    index < reviews.rating
                      ? 'fill-[#d4a373] text-[#d4a373]'
                      : 'text-black/35'
                  }`}
                  strokeWidth={1.6}
                />
              ))}
            </div>
            <span>{reviews.count} reviews</span>
          </div>
          <div className="flex items-center gap-3">
            {Number(product.discount_price) > 0 && (
              <span className="font-mono text-sm text-black/60 line-through">
                {formatPrice(product.price)}
              </span>
            )}
            <span className="ml-auto font-mono text-base text-black text-right">
              {formatPrice(product.discount_price || product.price)}
            </span>
          </div>
        </div>
        <div className="mt-auto px-[20px] pb-[20px] pt-3">
          <button className="button-primary w-full gap-2" onClick={() => addItem(product, 1, { openDrawer: true })}>
            <span>Add to cart</span>
            <ShoppingCart className="h-4 w-4" strokeWidth={1.8} />
          </button>
        </div>
      </div>
    </article>
  );
}
