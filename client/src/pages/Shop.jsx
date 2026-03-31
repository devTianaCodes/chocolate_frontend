import { useEffect, useMemo, useRef, useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { useSearchParams } from 'react-router-dom';
import PageWrapper from '../components/layout/PageWrapper.jsx';
import { fetchProducts } from '../api/products.js';
import { fetchCategories, fetchProductsByCategory } from '../api/categories.js';
import ProductCard from '../components/product/ProductCard.jsx';
import Pagination from '../components/Pagination.jsx';
import { getTotalPages, paginateItems, parsePageParam } from '../utils/pagination.js';
import { scrollToSection } from '../utils/scrollToSection.js';

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
  const [isMobileCategoryOpen, setIsMobileCategoryOpen] = useState(false);
  const resultsRef = useRef(null);
  const mobileCategoryRef = useRef(null);
  const pendingPageScrollRef = useRef(false);
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

  useEffect(() => {
    function handlePointerDown(event) {
      if (!mobileCategoryRef.current?.contains(event.target)) {
        setIsMobileCategoryOpen(false);
      }
    }

    document.addEventListener('pointerdown', handlePointerDown);
    return () => document.removeEventListener('pointerdown', handlePointerDown);
  }, []);

  useEffect(() => {
    setIsMobileCategoryOpen(false);
  }, [selectedCategory]);

  useEffect(() => {
    if (!pendingPageScrollRef.current || loading) return;
    if (!products.length || !visibleProducts.length || !resultsRef.current) {
      pendingPageScrollRef.current = false;
      return;
    }

    scrollToSection(resultsRef.current);
    pendingPageScrollRef.current = false;
  }, [loading, products.length, visibleProducts.length, currentPage, selectedCategory]);

  function handleCategoryChange(slug) {
    if (slug === selectedCategory) return;

    const nextParams = new URLSearchParams(searchParams);
    pendingPageScrollRef.current = true;

    if (slug === 'all') {
      nextParams.delete('category');
    } else {
      nextParams.set('category', slug);
    }

    nextParams.delete('page');
    setSearchParams(nextParams);
  }

  const mobileCategoryLabel =
    selectedCategory === 'all'
      ? 'All categories'
      : categories.find((category) => category.slug === selectedCategory)?.name || 'Categories';

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
      <header className="panel-wash-strong relative z-20 mb-10 flex flex-col gap-4 overflow-visible p-6 md:p-8">
        <p className="text-panel-secondary text-xs uppercase tracking-[0.2em]">The collection</p>
        <h1 className="text-panel-ink font-display text-display-md">Shop</h1>
        <div ref={mobileCategoryRef} className="relative pt-1 md:hidden">
          <button
            type="button"
            className="flex min-h-[48px] w-full items-center justify-between gap-4 border border-[rgba(125,82,71,0.34)] bg-[rgba(236,210,200,0.985)] px-4 py-3 text-left shadow-[0_10px_24px_rgba(79,33,33,0.11)] backdrop-blur-luxury"
            aria-expanded={isMobileCategoryOpen}
            aria-controls="shop-mobile-category-menu"
            onClick={() => setIsMobileCategoryOpen((current) => !current)}
          >
            <span className="min-w-0">
              <span className="text-panel-secondary block text-[10px] uppercase tracking-[0.16em]">
                Category
              </span>
              <span className="text-panel-ink block truncate pt-1 text-sm font-medium uppercase tracking-[0.08em]">
                {mobileCategoryLabel}
              </span>
            </span>
            <ChevronDown
              className={`text-panel-secondary h-4 w-4 shrink-0 transition duration-300 ${
                isMobileCategoryOpen ? 'rotate-180' : ''
              }`}
              strokeWidth={1.8}
            />
          </button>
          {isMobileCategoryOpen && (
            <div
              id="shop-mobile-category-menu"
              className="absolute inset-x-0 top-[calc(100%+0.5rem)] z-30 flex flex-col overflow-hidden border border-[rgba(125,82,71,0.32)] bg-[rgba(226,191,180,0.992)] shadow-[0_16px_32px_rgba(79,33,33,0.16)] backdrop-blur-luxury"
            >
              <button
                type="button"
                className={`px-4 py-3 text-left text-sm font-medium uppercase tracking-[0.08em] transition ${
                  selectedCategory === 'all'
                    ? 'bg-[rgba(214,167,176,0.92)] text-panel-ink'
                    : 'text-panel-secondary hover:bg-[rgba(79,33,33,0.06)] hover:text-panel-ink'
                }`}
                onClick={() => {
                  setIsMobileCategoryOpen(false);
                  handleCategoryChange('all');
                }}
              >
                All categories
              </button>
              {categories.map((category) => (
                <button
                  key={category.id}
                  type="button"
                  className={`border-t border-[rgba(125,82,71,0.12)] px-4 py-3 text-left text-sm font-medium uppercase tracking-[0.08em] transition ${
                    selectedCategory === category.slug
                      ? 'bg-[rgba(214,167,176,0.92)] text-panel-ink'
                      : 'text-panel-secondary hover:bg-[rgba(79,33,33,0.06)] hover:text-panel-ink'
                  }`}
                  onClick={() => {
                    setIsMobileCategoryOpen(false);
                    handleCategoryChange(category.slug);
                  }}
                >
                  {category.name}
                </button>
              ))}
            </div>
          )}
        </div>
        <div className="hidden flex-wrap gap-3 pt-2 md:flex">
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

      {!loading && !error && products.length === 0 && (
        <p className="text-body-md text-ink-secondary">No products in this category yet.</p>
      )}
    </PageWrapper>
  );
}
