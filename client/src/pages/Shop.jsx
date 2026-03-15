import { useEffect, useState } from 'react';
import PageWrapper from '../components/layout/PageWrapper.jsx';
import { fetchProducts } from '../api/products.js';
import { fetchCategories, fetchProductsByCategory } from '../api/categories.js';
import ProductCard from '../components/product/ProductCard.jsx';

export default function Shop() {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    async function loadCategories() {
      try {
        const response = await fetchCategories();
        if (active) setCategories(response.data || []);
      } catch {
        if (active) setCategories([]);
      }
    }
    loadCategories();
    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    let active = true;
    async function loadProducts() {
      setLoading(true);
      setError('');
      try {
        if (selectedCategory === 'all') {
          const response = await fetchProducts({ page: 1, limit: 100 });
          if (active) setProducts(response.data.result || []);
        } else {
          const response = await fetchProductsByCategory(selectedCategory);
          if (active) setProducts(response.data.products || []);
        }
      } catch {
        if (active) {
          setProducts([]);
          setError('Unable to load products.');
        }
      } finally {
        if (active) setLoading(false);
      }
    }
    loadProducts();
    return () => {
      active = false;
    };
  }, [selectedCategory]);

  return (
    <PageWrapper>
      <header className="glass-panel-strong mb-10 flex flex-col gap-4 p-6 md:p-8">
        <p className="section-label">The collection</p>
        <h1 className="font-display text-display-md text-ink-primary">Shop</h1>
        <p className="max-w-xl text-body-md text-ink-secondary">
          Explore small-batch bars, pralines, and seasonal releases.
        </p>
        <div className="flex flex-wrap gap-3 pt-2">
          <button
            type="button"
            className={selectedCategory === 'all' ? 'button-primary' : 'button-ghost'}
            onClick={() => setSelectedCategory('all')}
          >
            All
          </button>
          {categories.map((category) => (
            <button
              key={category.id}
              type="button"
              className={selectedCategory === category.slug ? 'button-primary' : 'button-ghost'}
              onClick={() => setSelectedCategory(category.slug)}
            >
              {category.name}
            </button>
          ))}
        </div>
      </header>

      {loading && <p className="text-body-md text-ink-secondary">Loading products…</p>}
      {error && <p className="text-body-md text-red-300">{error}</p>}

      {!loading && !error && products.length > 0 && (
        <section className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </section>
      )}

      {!loading && !error && products.length === 0 && (
        <p className="text-body-md text-ink-secondary">No products in this category yet.</p>
      )}
    </PageWrapper>
  );
}
