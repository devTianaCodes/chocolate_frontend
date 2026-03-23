import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import PageWrapper from '../components/layout/PageWrapper.jsx';
import { fetchProducts } from '../api/products.js';
import { fetchCategories, fetchProductsByCategory } from '../api/categories.js';
import ProductCard from '../components/product/ProductCard.jsx';
import Pagination from '../components/Pagination.jsx';
import { getTotalPages, paginateItems, parsePageParam } from '../utils/pagination.js';

const PAGE_SIZE = 12;
const CATEGORY_BUTTON_BASE =
  'border-[rgba(125,82,71,0.55)] shadow-[0_6px_13px_rgba(79,33,33,0.056)]';
const CATEGORY_BUTTON_ACTIVE =
  `button-ghost bg-[rgba(214,167,176,0.92)] text-panel-ink ${CATEGORY_BUTTON_BASE} hover:bg-[rgba(214,167,176,1)]`;
const CATEGORY_BUTTON_IDLE =
  `button-ghost bg-[rgb(252,223,214)] text-panel-ink ${CATEGORY_BUTTON_BASE} hover:bg-[rgb(255,235,229)]`;

export default function Shop() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const selectedCategory = searchParams.get('category') || 'all';
  const currentPage = parsePageParam(searchParams.get('page'));

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

  const totalPages = useMemo(
    () => getTotalPages(products.length, PAGE_SIZE),
    [products.length]
  );

  const visibleProducts = useMemo(
    () => paginateItems(products, currentPage, PAGE_SIZE),
    [products, currentPage]
  );

  useEffect(() => {
    if (currentPage <= totalPages) return;

    const nextParams = new URLSearchParams(searchParams);
    nextParams.set('page', String(totalPages));
    setSearchParams(nextParams, { replace: true });
  }, [currentPage, searchParams, setSearchParams, totalPages]);

  function handleCategoryChange(slug) {
    const nextParams = new URLSearchParams(searchParams);

    if (slug === 'all') {
      nextParams.delete('category');
    } else {
      nextParams.set('category', slug);
    }

    nextParams.delete('page');
    setSearchParams(nextParams);
  }

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
        <p className="text-panel-secondary text-xs uppercase tracking-[0.2em]">The collection</p>
        <h1 className="text-panel-ink font-display text-display-md">Shop</h1>
        <p className="text-panel-secondary max-w-xl text-body-md">
          Explore small-batch bars, pralines, and seasonal releases.
        </p>
        <div className="flex flex-wrap gap-3 pt-2">
          <button
            type="button"
            className={selectedCategory === 'all' ? CATEGORY_BUTTON_ACTIVE : CATEGORY_BUTTON_IDLE}
            onClick={() => handleCategoryChange('all')}
          >
            All
          </button>
          {categories.map((category) => (
            <button
              key={category.id}
              type="button"
              className={
                selectedCategory === category.slug ? CATEGORY_BUTTON_ACTIVE : CATEGORY_BUTTON_IDLE
              }
              onClick={() => handleCategoryChange(category.slug)}
            >
              {category.name}
            </button>
          ))}
        </div>
      </header>

      {loading && <p className="text-body-md text-ink-secondary">Loading products…</p>}
      {error && <p className="text-body-md text-red-300">{error}</p>}

      {!loading && !error && products.length > 0 && (
        <>
          <section className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
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
        <p className="text-body-md text-ink-secondary">No products in this category yet.</p>
      )}
    </PageWrapper>
  );
}
