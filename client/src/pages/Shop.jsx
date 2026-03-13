import { useEffect, useState } from 'react';
import PageWrapper from '../components/layout/PageWrapper.jsx';
import { fetchProducts } from '../api/products.js';
import ProductCard from '../components/product/ProductCard.jsx';

export default function Shop() {
  const [data, setData] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    async function load() {
      setLoading(true);
      setError('');
      try {
        const response = await fetchProducts({ page: 1, limit: 12 });
        if (active) setData(response.data);
      } catch (err) {
        if (active) setError('Unable to load products.');
      } finally {
        if (active) setLoading(false);
      }
    }
    load();
    return () => {
      active = false;
    };
  }, []);

  return (
    <PageWrapper>
      <header className="mb-10 flex flex-col gap-4">
        <p className="text-xs uppercase tracking-[0.2em] text-brand">The collection</p>
        <h1 className="font-display text-display-md text-ink-primary">Shop</h1>
        <p className="max-w-xl text-body-md text-ink-secondary">
          Explore small-batch bars, pralines, and seasonal releases.
        </p>
      </header>

      {loading && <p className="text-body-md text-ink-secondary">Loading products…</p>}
      {error && <p className="text-body-md text-red-300">{error}</p>}

      {!loading && !error && data?.result?.length > 0 && (
        <section className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {data.result.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </section>
      )}
    </PageWrapper>
  );
}
