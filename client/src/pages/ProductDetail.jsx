import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import PageWrapper from '../components/layout/PageWrapper.jsx';
import { fetchProductBySlug } from '../api/products.js';
import { formatPrice } from '../utils/formatPrice.js';
import { useCartStore } from '../store/cartStore.js';

export default function ProductDetail() {
  const { slug } = useParams();
  const [product, setProduct] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const addItem = useCartStore((state) => state.addItem);

  useEffect(() => {
    let active = true;
    async function load() {
      setLoading(true);
      setError('');
      try {
        const response = await fetchProductBySlug(slug);
        if (active) setProduct(response.data);
      } catch (err) {
        if (active) setError('Unable to load product.');
      } finally {
        if (active) setLoading(false);
      }
    }
    load();
    return () => {
      active = false;
    };
  }, [slug]);

  return (
    <PageWrapper>
      {loading && <p className="text-body-md text-ink-secondary">Loading product…</p>}
      {error && <p className="text-body-md text-red-300">{error}</p>}

      {!loading && !error && product && (
        <section className="grid gap-10 lg:grid-cols-[1.2fr_1fr]">
          <div className="overflow-hidden rounded-card border border-border bg-surface-elevated">
            <img
              src={product.image}
              alt={product.name}
              className="h-full w-full object-cover"
              loading="eager"
            />
          </div>
          <div className="space-y-4">
            <p className="text-xs uppercase tracking-[0.2em] text-brand">
              {product.category_name || 'Chocolate'}
            </p>
            <h1 className="font-display text-display-md text-ink-primary">{product.name}</h1>
            <p className="text-body-md text-ink-secondary">{product.description}</p>
            <div className="flex items-center gap-4">
              <span className="font-mono text-lg text-ink-primary">
                {formatPrice(product.discount_price || product.price)}
              </span>
              {Number(product.discount_price) > 0 && (
                <span className="font-mono text-sm text-ink-muted line-through">
                  {formatPrice(product.price)}
                </span>
              )}
            </div>
            <div className="text-body-sm text-ink-muted">
              {product.origin ? `Origin: ${product.origin}` : 'Origin: single-harvest'}
            </div>
            <button
              className="inline-flex items-center justify-center rounded-sm bg-brand px-6 py-3 text-xs uppercase tracking-[0.12em] text-ink-invert transition hover:bg-brand-light"
              onClick={() => addItem(product.id, 1)}
            >
              Add to cart
            </button>
          </div>
        </section>
      )}
    </PageWrapper>
  );
}
