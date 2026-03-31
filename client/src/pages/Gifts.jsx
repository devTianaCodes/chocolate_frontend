import { useEffect, useMemo, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { fetchProductsByCategory } from '../api/categories.js';
import PageWrapper from '../components/layout/PageWrapper.jsx';
import ProductCard from '../components/product/ProductCard.jsx';
import Pagination from '../components/Pagination.jsx';
import { getTotalPages, paginateItems, parsePageParam } from '../utils/pagination.js';

const PAGE_SIZE = 12;

export default function Gifts() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const currentPage = parsePageParam(searchParams.get('page'));

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

  const totalPages = useMemo(
    () => getTotalPages(products.length, PAGE_SIZE),
    [products.length]
  );

  const visibleProducts = useMemo(
    () => paginateItems(products, currentPage, PAGE_SIZE),
    [currentPage, products]
  );

  useEffect(() => {
    if (currentPage <= totalPages) return;

    const nextParams = new URLSearchParams(searchParams);
    nextParams.set('page', String(totalPages));
    setSearchParams(nextParams, { replace: true });
  }, [currentPage, searchParams, setSearchParams, totalPages]);

  function handlePageChange(page) {
    const nextParams = new URLSearchParams(searchParams);

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
        <p className="text-panel-secondary text-xs uppercase tracking-[0.2em]">Curated gifting</p>
        <h1 className="text-panel-ink font-display text-display-md">Gifts</h1>
        <p className="text-panel-secondary max-w-xl text-body-md">
          Gift boxes from the catalog, prepared for hosting, celebrations, and polished chocolate giving.
        </p>
      </header>

      {loading && <p className="text-body-md text-ink-secondary">Loading gifts…</p>}
      {error && <p className="text-body-md text-red-300">{error}</p>}

      {!loading && !error && products.length > 0 && (
        <>
          <section className="catalog-grid">
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

      {!loading && !error && products.length === 0 && (
        <div className="panel-wash-strong p-8">
          <p className="text-panel-secondary text-body-md">No gift boxes are available right now.</p>
          <Link to="/shop" className="button-primary mt-5">
            Explore the shop
          </Link>
        </div>
      )}
    </PageWrapper>
  );
}
