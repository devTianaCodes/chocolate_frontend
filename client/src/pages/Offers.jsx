import { useEffect, useMemo, useRef, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import PageWrapper from '../components/layout/PageWrapper.jsx';
import ProductCard from '../components/product/ProductCard.jsx';
import Pagination from '../components/Pagination.jsx';
import { fetchProducts } from '../api/products.js';
import useResponsivePageSize from '../hooks/useResponsivePageSize.js';
import { getTotalPages, paginateItems, parsePageParam } from '../utils/pagination.js';
import { scrollToSection } from '../utils/scrollToSection.js';

export default function Offers() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const resultsRef = useRef(null);
  const pendingPageScrollRef = useRef(false);
  const pageSize = useResponsivePageSize();
  const currentPage = parsePageParam(searchParams.get('page'));

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
          setError('Unable to load offers.');
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

  const offerProducts = useMemo(
    () => products.filter((product) => Number(product.discount_price) > 0),
    [products]
  );

  const totalPages = useMemo(
    () => getTotalPages(offerProducts.length, pageSize),
    [offerProducts.length, pageSize]
  );

  const visibleProducts = useMemo(
    () => paginateItems(offerProducts, currentPage, pageSize),
    [offerProducts, currentPage, pageSize]
  );

  useEffect(() => {
    if (currentPage <= totalPages) return;

    const nextParams = new URLSearchParams(searchParams);
    nextParams.set('page', String(totalPages));
    setSearchParams(nextParams, { replace: true });
  }, [currentPage, searchParams, setSearchParams, totalPages]);

  useEffect(() => {
    if (!pendingPageScrollRef.current || loading) return;
    if (!offerProducts.length || !visibleProducts.length || !resultsRef.current) {
      pendingPageScrollRef.current = false;
      return;
    }

    scrollToSection(resultsRef.current);
    pendingPageScrollRef.current = false;
  }, [loading, offerProducts.length, visibleProducts.length, currentPage]);

  function handlePageChange(page) {
    if (page === currentPage) return;

    const nextParams = new URLSearchParams(searchParams);
    pendingPageScrollRef.current = true;

    if (page <= 1) {
      nextParams.delete('page');
    } else {
      nextParams.set('page', String(page));
    }

    setSearchParams(nextParams);
  }

  return (
    <PageWrapper>
      <header className="panel-wash-strong mb-10 flex flex-col gap-4 p-6 md:p-8">
        <p className="text-panel-secondary text-xs uppercase tracking-[0.2em]">Special pricing</p>
        <h1 className="text-panel-ink font-display text-display-md">Offers</h1>
        <p className="text-panel-secondary max-w-xl text-body-md">
          Discover all products currently on sale, from everyday bars to gift-ready selections.
        </p>
      </header>

      {loading && <p className="text-panel-secondary text-body-md">Loading offers…</p>}
      {error && <p className="text-body-md text-red-300">{error}</p>}

      {!loading && !error && offerProducts.length > 0 && (
        <>
          <section ref={resultsRef} className="catalog-grid">
            {visibleProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </section>
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </>
      )}

      {!loading && !error && offerProducts.length === 0 && (
        <div className="panel-wash-strong p-8">
          <p className="text-panel-secondary text-body-md">
            No discounted products are available right now.
          </p>
          <Link to="/shop" className="button-primary mt-5">
            Explore the shop
          </Link>
        </div>
      )}
    </PageWrapper>
  );
}
