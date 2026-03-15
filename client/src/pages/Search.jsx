import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import PageWrapper from '../components/layout/PageWrapper.jsx';
import ProductCard from '../components/product/ProductCard.jsx';
import { fetchProducts } from '../api/products.js';

function matchesQuery(product, query) {
  const haystack = [
    product.name,
    product.description,
    product.category_name,
  ]
    .filter(Boolean)
    .join(' ')
    .toLowerCase();

  return haystack.includes(query);
}

export default function Search() {
  const [searchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const query = searchParams.get('q')?.trim().toLowerCase() || '';

  useEffect(() => {
    let active = true;

    async function loadProducts() {
      setLoading(true);
      setError('');
      try {
        const response = await fetchProducts({ page: 1, limit: 100 });
        if (active) {
          setProducts(response.data.result || []);
        }
      } catch {
        if (active) {
          setProducts([]);
          setError('Unable to search products.');
        }
      } finally {
        if (active) setLoading(false);
      }
    }

    loadProducts();
    return () => {
      active = false;
    };
  }, []);

  const results = useMemo(() => {
    if (!query) return [];
    return products.filter((product) => matchesQuery(product, query));
  }, [products, query]);

  return (
    <PageWrapper>
      <header className="glass-panel-strong mb-10 flex flex-col gap-4 p-6 md:p-8">
        <p className="section-label">Search</p>
        <h1 className="font-display text-display-md text-ink-primary">
          {query ? `Results for "${searchParams.get('q')}"` : 'Search the collection'}
        </h1>
        <p className="max-w-xl text-body-md text-ink-secondary">
          Find bars, pralines, and seasonal releases by name, note, or category.
        </p>
      </header>

      {loading && <p className="text-body-md text-ink-secondary">Searching products…</p>}
      {error && <p className="text-body-md text-red-300">{error}</p>}
      {!loading && !error && !query && (
        <p className="text-body-md text-ink-secondary">Type a search in the header to explore products.</p>
      )}
      {!loading && !error && query && results.length === 0 && (
        <p className="text-body-md text-ink-secondary">No products found for this search.</p>
      )}
      {!loading && !error && results.length > 0 && (
        <section className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {results.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </section>
      )}
    </PageWrapper>
  );
}
