import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchProductsByCategory } from '../api/categories.js';
import PageWrapper from '../components/layout/PageWrapper.jsx';
import ProductCard from '../components/product/ProductCard.jsx';

export default function Gifts() {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;

    async function loadGifts() {
      setLoading(true);
      setError('');

      try {
        const response = await fetchProductsByCategory('gift-boxes');
        if (active) setProducts(response.data.products || []);
      } catch {
        if (active) {
          setProducts([]);
          setError('Unable to load gifts.');
        }
      } finally {
        if (active) setLoading(false);
      }
    }

    loadGifts();

    return () => {
      active = false;
    };
  }, []);

  return (
    <PageWrapper>
      <header className="glass-panel-strong mb-10 flex flex-col gap-4 p-6 md:p-8">
        <p className="section-label">Curated gifting</p>
        <h1 className="font-display text-display-md text-ink-primary">Gifts</h1>
        <p className="max-w-xl text-body-md text-ink-secondary">
          Gift boxes from the catalog, prepared for hosting, celebrations, and polished chocolate giving.
        </p>
      </header>

      {loading && <p className="text-body-md text-ink-secondary">Loading gifts…</p>}
      {error && <p className="text-body-md text-red-300">{error}</p>}

      {!loading && !error && products.length > 0 && (
        <section className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </section>
      )}

      {!loading && !error && products.length === 0 && (
        <div className="glass-panel-strong p-8">
          <p className="text-body-md text-ink-secondary">No gift boxes are available right now.</p>
          <Link to="/shop" className="button-primary mt-5">
            Explore the shop
          </Link>
        </div>
      )}
    </PageWrapper>
  );
}
