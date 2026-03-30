import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import PageWrapper from '../components/layout/PageWrapper.jsx';
import { fetchProductBySlug } from '../api/products.js';
import { formatPrice } from '../utils/formatPrice.js';
import { getDisplayProductName } from '../utils/getDisplayProductName.js';
import { useCartStore } from '../store/cartStore.js';

export default function ProductDetail() {
  const { slug } = useParams();
  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState('');
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
        if (active) {
          setProduct(response.data);
          setSelectedImage(response.data.images?.[0]?.url || response.data.image || '');
        }
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

  const gallery = product?.images?.length
    ? product.images
    : product?.image
      ? [{ url: product.image, alt_text: product.name, is_primary: true }]
      : [];
  const activeImage = selectedImage || gallery[0]?.url || product?.image || '';

  return (
    <PageWrapper>
      {loading && <p className="text-body-md text-ink-secondary">Loading product…</p>}
      {error && <p className="text-body-md text-red-300">{error}</p>}

      {!loading && !error && product && (
        <section className="grid gap-10 lg:grid-cols-[1.2fr_1fr]">
          <div className="space-y-4">
            <div className="panel-wash-strong overflow-hidden">
              <img
                src={activeImage}
                alt={product.name}
                className="h-full w-full object-cover"
                loading="eager"
              />
            </div>
            {gallery.length > 1 && (
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
                {gallery.map((image, index) => {
                  const isActive = image.url === activeImage;
                  return (
                    <button
                      key={`${image.url}-${index}`}
                      type="button"
                      onClick={() => setSelectedImage(image.url)}
                      className={`panel-wash-strong overflow-hidden border transition ${
                        isActive
                          ? 'border-[rgba(79,33,33,0.48)]'
                          : 'border-[rgba(79,33,33,0.14)] hover:border-[rgba(79,33,33,0.28)]'
                      }`}
                    >
                      <img
                        src={image.url}
                        alt={image.alt_text || product.name}
                        className="aspect-square h-full w-full object-cover"
                        loading="lazy"
                      />
                    </button>
                  );
                })}
              </div>
            )}
          </div>
          <div className="panel-wash space-y-4 p-6 md:p-8">
            <p className="text-panel-secondary text-xs uppercase tracking-[0.2em]">
              {product.category_name || 'Chocolate'}
            </p>
            <h1 className="text-panel-ink font-display text-display-md">{getDisplayProductName(product.name)}</h1>
            <p className="text-panel-secondary text-body-md">{product.description}</p>
            <div className="flex items-center gap-4">
              <span className="text-panel-ink font-mono text-lg">
                {formatPrice(product.discount_price || product.price)}
              </span>
              {Number(product.discount_price) > 0 && (
                <span className="text-panel-muted font-mono text-sm line-through">
                  {formatPrice(product.price)}
                </span>
              )}
            </div>
            <div className="text-panel-muted text-body-sm">
              {product.origin ? `Origin: ${product.origin}` : 'Origin: single-harvest'}
            </div>
            <button
              className="button-primary"
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
