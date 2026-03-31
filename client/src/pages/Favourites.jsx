import { Link } from 'react-router-dom';
import PageWrapper from '../components/layout/PageWrapper.jsx';
import ProductCard from '../components/product/ProductCard.jsx';
import { useFavouritesStore } from '../store/favouritesStore.js';

export default function Favourites() {
  const items = useFavouritesStore((state) => state.items);
  const clearFavourites = useFavouritesStore((state) => state.clearFavourites);

  return (
    <PageWrapper>
      <header className="panel-wash-strong mb-10 flex items-start justify-between gap-4 p-6 md:p-8">
        <div className="space-y-4">
          <p className="text-panel-secondary text-xs uppercase tracking-[0.2em]">Saved for later</p>
          <h1 className="text-panel-ink font-display text-display-md">Favourites</h1>
          <p className="text-panel-secondary max-w-xl text-body-md">
            Keep the bars and boxes you want close before the next order.
          </p>
        </div>
        {items.length > 0 && (
          <button type="button" className="button-ghost" onClick={clearFavourites}>
            Empty favourites
          </button>
        )}
      </header>

      {items.length === 0 && (
        <div className="panel-wash-strong p-8">
          <p className="text-panel-secondary text-body-md">No favourites yet.</p>
          <Link to="/shop" className="button-primary mt-5">
            Explore the shop
          </Link>
        </div>
      )}

      {items.length > 0 && (
        <section className="catalog-grid">
          {items.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </section>
      )}
    </PageWrapper>
  );
}
