import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ShoppingCart } from 'lucide-react';
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
  const hoverPreview =
    gallery.find((image) => image.url !== activeImage) || null;
  const specs = [
    {
      label: 'Weight',
      value: product?.weight_grams ? `${product.weight_grams} g` : 'Craft batch',
    },
    {
      label: 'Cocoa',
      value: product?.cocoa_percentage ? `${product.cocoa_percentage}%` : 'Varies by recipe',
    },
    {
      label: 'Origin',
      value: product?.origin || 'Single-harvest selection',
    },
    {
      label: 'Category',
      value: product?.category_name || 'Chocolate',
    },
  ];

  return (
    <PageWrapper>
      {loading && <p className="text-body-md text-ink-secondary">Loading product…</p>}
      {error && <p className="text-body-md text-red-300">{error}</p>}

      {!loading && !error && product && (
        <section className="grid gap-10 lg:grid-cols-[0.85fr_1fr] lg:items-start">
          <div className="space-y-4">
            <div className="panel-wash-strong group mx-auto max-w-[320px] overflow-hidden sm:max-w-[360px] lg:max-w-[400px]">
              <div className="relative aspect-[4/5]">
                <img
                  src={activeImage}
                  alt={product.name}
                  className={`h-full w-full object-cover transition duration-500 ${
                    hoverPreview ? 'group-hover:opacity-0' : ''
                  }`}
                  loading="eager"
                />
                {hoverPreview && (
                  <img
                    src={hoverPreview.url}
                    alt={hoverPreview.alt_text || product.name}
                    className="absolute inset-0 h-full w-full object-cover opacity-0 transition duration-500 group-hover:opacity-100"
                    loading="lazy"
                  />
                )}
              </div>
            </div>
            {gallery.length > 1 && (
              <div className="mx-auto flex max-w-[320px] justify-center gap-3 sm:max-w-[360px] lg:max-w-[400px]">
                {gallery.map((image, index) => {
                  const isActive = image.url === activeImage;
                  return (
                    <button
                      key={`${image.url}-${index}`}
                      type="button"
                      onClick={() => setSelectedImage(image.url)}
                      className={`panel-wash-strong w-[72px] overflow-hidden border transition sm:w-[84px] ${
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
            <div className="grid gap-3 sm:grid-cols-2">
              {specs.map((spec) => (
                <div
                  key={spec.label}
                  className="panel-wash-strong border border-[rgba(79,33,33,0.12)] px-4 py-3"
                >
                  <p className="text-panel-secondary text-[11px] uppercase tracking-[0.14em]">
                    {spec.label}
                  </p>
                  <p className="text-panel-ink mt-1 text-sm font-medium">
                    {spec.value}
                  </p>
                </div>
              ))}
            </div>
            <div className="panel-wash-strong border border-[rgba(79,33,33,0.12)] px-4 py-3">
              <p className="text-panel-secondary text-[11px] uppercase tracking-[0.14em]">
                Product details
              </p>
              <p className="text-panel-ink mt-1 text-sm leading-6">
                Small-batch crafted chocolate with curated origin, cocoa intensity, and artisan finish.
              </p>
            </div>
            <div className="flex justify-end pt-2">
              <button
                className="button-primary min-h-[50px] min-w-[196px] gap-2 px-7 text-[15px]"
                onClick={() => addItem(product.id, 1)}
              >
                <span>Add to cart</span>
                <ShoppingCart className="h-5 w-5" strokeWidth={1.9} />
              </button>
            </div>
          </div>
        </section>
      )}
    </PageWrapper>
  );
}
