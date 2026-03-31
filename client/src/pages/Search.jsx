import { useEffect, useMemo, useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import PageWrapper from '../components/layout/PageWrapper.jsx';
import ProductCard from '../components/product/ProductCard.jsx';
import Pagination from '../components/Pagination.jsx';
import { fetchProducts } from '../api/products.js';
import useResponsivePageSize from '../hooks/useResponsivePageSize.js';
import { getTotalPages, paginateItems, parsePageParam } from '../utils/pagination.js';
import { scrollToSection } from '../utils/scrollToSection.js';

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
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const resultsRef = useRef(null);
  const pendingPageScrollRef = useRef(false);
  const pageSize = useResponsivePageSize();
  const rawQuery = searchParams.get('q')?.trim() || '';
  const query = rawQuery.toLowerCase();
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

  const totalPages = useMemo(
    () => getTotalPages(results.length, pageSize),
    [results.length, pageSize]
  );

  const visibleResults = useMemo(
    () => paginateItems(results, currentPage, pageSize),
    [currentPage, results, pageSize]
  );

  useEffect(() => {
    if (!query && currentPage === 1) return;
    if (query && currentPage <= totalPages) return;

    const nextParams = new URLSearchParams(searchParams);

    if (!query || totalPages <= 1) {
      nextParams.delete('page');
    } else {
      nextParams.set('page', String(totalPages));
    }

    setSearchParams(nextParams, { replace: true });
  }, [currentPage, query, searchParams, setSearchParams, totalPages]);

  useEffect(() => {
    if (!pendingPageScrollRef.current || loading) return;
    if (!results.length || !visibleResults.length || !resultsRef.current) {
      pendingPageScrollRef.current = false;
      return;
    }

    scrollToSection(resultsRef.current);
    pendingPageScrollRef.current = false;
  }, [loading, results.length, visibleResults.length, currentPage, query]);

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
        <p className="text-panel-secondary text-xs uppercase tracking-[0.2em]">Search</p>
        <h1 className="text-panel-ink font-display text-display-md">
          {query ? `Results for "${rawQuery}"` : 'Search the collection'}
        </h1>
        <p className="text-panel-secondary max-w-xl text-body-md">
          Find bars, pralines, and seasonal releases by name, note, or category.
        </p>
      </header>

      {loading && <p className="text-panel-secondary text-body-md">Searching products…</p>}
      {error && <p className="text-body-md text-red-300">{error}</p>}
      {!loading && !error && !query && (
        <p className="text-panel-secondary text-body-md">Type a search in the header to explore products.</p>
      )}
      {!loading && !error && query && results.length === 0 && (
        <p className="text-panel-secondary text-body-md">No products found for this search.</p>
      )}
      {!loading && !error && results.length > 0 && (
        <>
          <section ref={resultsRef} className="catalog-grid">
            {visibleResults.map((product) => (
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
    </PageWrapper>
  );
}
