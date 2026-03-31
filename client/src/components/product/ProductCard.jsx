import { useState } from 'react';
import { Heart, ShoppingCart, Star } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { formatPrice } from '../../utils/formatPrice.js';
import { getDisplayProductName } from '../../utils/getDisplayProductName.js';
import { getEffectivePrice } from '../../utils/getEffectivePrice.js';
import { getProductReviewSummary } from '../../utils/getProductReviewSummary.js';
import { useCartStore } from '../../store/cartStore.js';
import { useFavouritesStore } from '../../store/favouritesStore.js';

export default function ProductCard({ product }) {
  const [imageFailed, setImageFailed] = useState(false);
  const [hoverImageFailed, setHoverImageFailed] = useState(false);
  const navigate = useNavigate();
  const addItem = useCartStore((state) => state.addItem);
  const favouriteItems = useFavouritesStore((state) => state.items);
  const toggleFavourite = useFavouritesStore((state) => state.toggleItem);
  const isFavourite = favouriteItems.some((item) => item.id === product.id);
  const displayName = getDisplayProductName(product.name);
  const reviews = getProductReviewSummary(product.id);
  const hoverImage = product.hover_image && !hoverImageFailed ? product.hover_image : '';
  const effectivePrice = getEffectivePrice(product);

  function openDetails() {
    navigate(`/products/${product.slug}`);
  }

  function shouldIgnoreCardClick(target) {
    return Boolean(target.closest('button, a'));
  }

  function handleCardClick(event) {
    if (shouldIgnoreCardClick(event.target)) return;
    openDetails();
  }

  function handleCardKeyDown(event) {
    if (shouldIgnoreCardClick(event.target)) return;
    if (event.key !== 'Enter' && event.key !== ' ') return;
    event.preventDefault();
    openDetails();
  }

  return (
    <article
      className="panel-wash-strong group flex h-full min-w-0 cursor-pointer flex-col overflow-hidden transition duration-300 hover:-translate-y-1 hover:border-[rgba(79,33,33,0.42)]"
      role="link"
      tabIndex={0}
      onClick={handleCardClick}
      onKeyDown={handleCardKeyDown}
    >
      <div className="relative aspect-[13/15] overflow-hidden bg-[rgba(79,33,33,0.1)] sm:aspect-[15/16]">
        <button
          type="button"
          aria-label={isFavourite ? 'Remove from favourites' : 'Add to favourites'}
          className="absolute right-2.5 top-2.5 z-10 inline-flex items-center justify-center p-1 text-panel-ink transition hover:text-red-400 sm:right-3 sm:top-3"
          onClick={() => toggleFavourite(product)}
        >
          <Heart
            className={`h-5 w-5 ${isFavourite ? 'fill-red-500 text-red-500' : ''}`}
            strokeWidth={1.8}
          />
        </button>
        {!imageFailed ? (
          <>
            <img
              src={product.image}
              alt={product.name}
              className={`h-full w-full object-cover transition duration-500 ${
                hoverImage ? 'group-hover:scale-[1.01] group-hover:opacity-0' : 'group-hover:scale-[1.03]'
              }`}
              loading="lazy"
              onError={() => setImageFailed(true)}
            />
            {hoverImage && (
              <img
                src={hoverImage}
                alt={product.name}
                className="absolute inset-0 h-full w-full object-cover opacity-0 transition duration-500 group-hover:opacity-100"
                loading="lazy"
                onError={() => setHoverImageFailed(true)}
              />
            )}
          </>
        ) : (
          <div
            aria-label={product.name}
            className="h-full w-full bg-[rgba(79,33,33,0.08)]"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-[rgba(79,33,33,0.18)] via-transparent to-transparent opacity-0 transition duration-300 group-hover:opacity-100" />
        <div className="absolute inset-x-3 bottom-3 opacity-0 transition duration-300 group-hover:opacity-100 sm:inset-x-4 sm:bottom-4">
          <Link
            to={`/products/${product.slug}`}
            className="button-ghost min-h-[38px] w-full border-[rgba(79,33,33,0.25)] bg-[rgba(252,223,214,0.88)] px-4 py-2 text-[11px] tracking-[0.1em] text-panel-ink backdrop-blur-md hover:bg-[rgba(252,223,214,0.96)] sm:min-h-[42px] sm:px-6 sm:py-3 sm:text-xs sm:tracking-[0.12em]"
          >
            Quick view
          </Link>
        </div>
      </div>
      <div className="flex flex-1 flex-col pt-4 sm:pt-5">
        <div className="space-y-2 px-4 sm:px-5 xl:px-6">
          <p className="text-panel-secondary text-[10px] uppercase tracking-[0.1em] sm:text-[11px] sm:tracking-[0.12em]">
            {product.category_name || 'Chocolate'}
          </p>
          <h3 className="text-panel-ink min-h-[2.65rem] font-display text-lg font-semibold leading-tight sm:min-h-[2.9rem] sm:text-xl xl:text-[22px]">
            <Link to={`/products/${product.slug}`} className="hover:opacity-85">
              {displayName}
            </Link>
          </h3>
          <div className="text-panel-secondary flex flex-wrap items-center gap-1 text-[12px] sm:gap-1.5 sm:text-sm">
            <div className="flex items-center gap-0.5" aria-label={`${reviews.rating} out of 5 stars`}>
              {Array.from({ length: 5 }, (_, index) => (
                <Star
                  key={index}
                  className={`h-4 w-4 ${
                    index < reviews.rating
                      ? 'fill-[#d4a373] text-[#d4a373]'
                      : 'text-[rgba(71,39,31,0.35)]'
                  }`}
                  strokeWidth={1.6}
                />
              ))}
            </div>
            <span>{reviews.count} reviews</span>
          </div>
        </div>
        <div className="px-4 pb-4 pt-3 sm:px-5 xl:px-6">
          <div className="flex items-center gap-2 sm:gap-3">
            {Number(product.discount_price) > 0 && (
              <span className="font-mono text-xs text-[rgba(71,39,31,0.58)] line-through sm:text-sm">
                {formatPrice(product.price)}
              </span>
            )}
            <span className="text-panel-ink ml-auto text-right font-mono text-sm sm:text-base">
              {formatPrice(effectivePrice)}
            </span>
          </div>
        </div>
        <div className="mt-auto px-4 pb-4 pt-3 sm:px-5 sm:pb-5 xl:px-6">
          <button
            aria-label="Add to cart"
            className="button-primary min-h-[42px] w-full gap-1.5 px-4 py-2.5 text-[11px] tracking-[0.1em] sm:min-h-[46px] sm:gap-2 sm:px-6 sm:py-3 sm:text-xs sm:tracking-[0.12em]"
            onClick={() => addItem(product, 1, { openDrawer: true })}
          >
            <span>Add to</span>
            <ShoppingCart className="h-4 w-4" strokeWidth={1.8} />
          </button>
        </div>
      </div>
    </article>
  );
}
