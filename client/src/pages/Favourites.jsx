import { Link } from 'react-router-dom';
import PageWrapper from '../components/layout/PageWrapper.jsx';
import ProductCard from '../components/product/ProductCard.jsx';
import { useFavouritesStore } from '../store/favouritesStore.js';

export default function Favourites() {
  const items = useFavouritesStore((state) => state.items);
  const clearFavourites = useFavouritesStore((state) => state.clearFavourites);

  return (
    <PageWrapper>
      <header className="glass-panel-strong mb-10 flex items-start justify-between gap-4 rounded-none p-6 md:p-8">
        <div className="space-y-4">
          <p className="section-label">Saved for later</p>
          <h1 className="font-display text-display-md text-ink-primary">Favourites</h1>
          <p className="max-w-xl text-body-md text-ink-secondary">
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
        <div className="glass-panel-strong rounded-none p-8">
          <p className="text-body-md text-ink-secondary">No favourites yet.</p>
          <Link to="/shop" className="button-primary mt-5">
            Explore the shop
          </Link>
        </div>
      )}

      {items.length > 0 && (
        <section className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {items.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </section>
      )}
    </PageWrapper>
  );
}
