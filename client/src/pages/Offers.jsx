import { useEffect, useMemo, useRef, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import PageWrapper from '../components/layout/PageWrapper.jsx';
import ProductCard from '../components/product/ProductCard.jsx';
import Pagination from '../components/Pagination.jsx';
import { fetchProducts } from '../api/products.js';
import useResponsivePageSize from '../hooks/useResponsivePageSize.js';
import { getTotalPages, paginateItems, parsePageParam } from '../utils/pagination.js';
import { scrollToSection } from '../utils/scrollToSection.js';

const FOOD_FILTERS = [
  {
    value: 'vegan-dairy-free',
    label: 'Vegan & Dairy-Free',
    matches: (product) => product.category_slug === 'vegan-dairy-free',
  },
  {
    value: 'sugar-free',
    label: 'Sugar-Free',
    matches: (product) => product.category_slug === 'sugar-free',
  },
  {
    value: 'raw-organic',
    label: 'Raw & Organic',
    matches: (product) => product.category_slug === 'raw-organic',
  },
];

const CATEGORY_BUTTON_BASE =
  'rounded-none border-[rgba(125,82,71,0.55)] shadow-[0_6px_13px_rgba(79,33,33,0.056)]';
const CATEGORY_BUTTON_ACTIVE =
  `button-ghost bg-[rgba(214,167,176,0.92)] text-panel-ink ${CATEGORY_BUTTON_BASE} hover:bg-[rgba(214,167,176,1)]`;
const CATEGORY_BUTTON_IDLE =
  `button-ghost bg-[rgb(252,223,214)] text-panel-ink ${CATEGORY_BUTTON_BASE} hover:bg-[rgb(255,235,229)]`;

function getOfferPrice(product) {
  return Number(product.discount_price) > 0
    ? Number(product.discount_price)
    : Number(product.price || 0);
}

function formatFilterPrice(value) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'EUR',
  }).format(value);
}

function FilterCheckbox({ checked, onChange, label, count }) {
  return (
    <label className="flex items-center gap-3 text-panel-secondary">
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="h-5 w-5 rounded-sm border-[#b65436] text-[#b65436] focus:ring-[#b65436]"
      />
      <span className="text-body-sm text-panel-ink sm:text-body-md">
        {label} <span className="text-panel-secondary">({count})</span>
      </span>
    </label>
  );
}

function CategoryPill({ selected, onClick, label }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={selected ? CATEGORY_BUTTON_ACTIVE : CATEGORY_BUTTON_IDLE}
    >
      {label}
    </button>
  );
}

export default function Offers() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedFoodFilters, setSelectedFoodFilters] = useState([]);
  const [selectedCategorySlugs, setSelectedCategorySlugs] = useState([]);
  const [priceRange, setPriceRange] = useState({ min: null, max: null });
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

  const priceBounds = useMemo(() => {
    if (!offerProducts.length) {
      return { min: 0, max: 0 };
    }

    const prices = offerProducts.map(getOfferPrice);
    return {
      min: Math.min(...prices),
      max: Math.max(...prices),
    };
  }, [offerProducts]);

  useEffect(() => {
    if (!offerProducts.length) return;

    setPriceRange((current) => {
      const nextMin = current.min == null ? priceBounds.min : Math.max(priceBounds.min, Math.min(current.min, priceBounds.max));
      const nextMax = current.max == null ? priceBounds.max : Math.min(priceBounds.max, Math.max(current.max, priceBounds.min));
      const min = Math.min(nextMin, nextMax);
      const max = Math.max(nextMin, nextMax);

      if (current.min === min && current.max === max) {
        return current;
      }

      return { min, max };
    });
  }, [offerProducts.length, priceBounds.min, priceBounds.max]);

  const foodOptions = useMemo(
    () =>
      FOOD_FILTERS.map((option) => ({
        ...option,
        count: offerProducts.filter((product) => option.matches(product)).length,
      })).filter((option) => option.count > 0),
    [offerProducts]
  );

  const categoryOptions = useMemo(() => {
    const categories = new Map();

    offerProducts.forEach((product) => {
      if (!product.category_slug || !product.category_name) return;

      const current = categories.get(product.category_slug) || {
        slug: product.category_slug,
        name: product.category_name,
        count: 0,
      };

      current.count += 1;
      categories.set(product.category_slug, current);
    });

    return Array.from(categories.values()).sort((a, b) => a.name.localeCompare(b.name));
  }, [offerProducts]);

  const filteredProducts = useMemo(() => {
    return offerProducts.filter((product) => {
      const offerPrice = getOfferPrice(product);
      if (offerPrice < priceRange.min || offerPrice > priceRange.max) {
        return false;
      }

      if (selectedFoodFilters.length > 0) {
        const matchesFood = selectedFoodFilters.every((value) => {
          const filter = FOOD_FILTERS.find((option) => option.value === value);
          return filter ? filter.matches(product) : true;
        });

        if (!matchesFood) return false;
      }

      if (selectedCategorySlugs.length > 0 && !selectedCategorySlugs.includes(product.category_slug)) {
        return false;
      }

      return true;
    });
  }, [offerProducts, priceRange.min, priceRange.max, selectedFoodFilters, selectedCategorySlugs]);

  const totalPages = useMemo(
    () => getTotalPages(filteredProducts.length, pageSize),
    [filteredProducts.length, pageSize]
  );

  const visibleProducts = useMemo(
    () => paginateItems(filteredProducts, currentPage, pageSize),
    [filteredProducts, currentPage, pageSize]
  );

  useEffect(() => {
    if (currentPage <= totalPages) return;

    const nextParams = new URLSearchParams(searchParams);
    if (totalPages <= 1) {
      nextParams.delete('page');
    } else {
      nextParams.set('page', String(totalPages));
    }
    setSearchParams(nextParams, { replace: true });
  }, [currentPage, searchParams, setSearchParams, totalPages]);

  useEffect(() => {
    if (!pendingPageScrollRef.current || loading) return;
    if (!resultsRef.current) {
      pendingPageScrollRef.current = false;
      return;
    }

    scrollToSection(resultsRef.current);
    pendingPageScrollRef.current = false;
  }, [loading, filteredProducts.length, visibleProducts.length, currentPage]);

  function resetPage() {
    if (currentPage <= 1) return;
    const nextParams = new URLSearchParams(searchParams);
    nextParams.delete('page');
    setSearchParams(nextParams, { replace: true });
  }

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

  function toggleFoodFilter(value) {
    pendingPageScrollRef.current = true;
    setSelectedFoodFilters((current) =>
      current.includes(value) ? current.filter((item) => item !== value) : [...current, value]
    );
    resetPage();
  }

  function toggleCategory(slug) {
    pendingPageScrollRef.current = true;
    setSelectedCategorySlugs((current) =>
      current.includes(slug) ? current.filter((item) => item !== slug) : [...current, slug]
    );
    resetPage();
  }

  function updatePriceRange(key, value) {
    pendingPageScrollRef.current = true;
    setPriceRange((current) => {
      if (key === 'min') {
        return { min: Math.min(value, current.max), max: current.max };
      }

      return { min: current.min, max: Math.max(value, current.min) };
    });
    resetPage();
  }

  function clearFilters() {
    pendingPageScrollRef.current = true;
    setSelectedFoodFilters([]);
    setSelectedCategorySlugs([]);
    setPriceRange({ min: priceBounds.min, max: priceBounds.max });
    resetPage();
  }

  const hasActiveFilters =
    selectedFoodFilters.length > 0 ||
    selectedCategorySlugs.length > 0 ||
    priceRange.min !== priceBounds.min ||
    priceRange.max !== priceBounds.max;

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
        <div className="flex flex-col gap-8 lg:grid lg:grid-cols-[minmax(260px,0.3fr)_minmax(0,0.7fr)] lg:items-start lg:gap-8">
          <aside className="panel-wash-strong border border-[rgba(79,33,33,0.12)] p-6 md:p-7 lg:sticky lg:top-[136px]">
            <div className="mb-6 flex items-center justify-between gap-4">
              <p className="text-panel-secondary text-[11px] uppercase tracking-[0.18em]">
                Filter offers
              </p>
              {hasActiveFilters && (
                <button
                  type="button"
                  className="text-body-xs font-medium uppercase tracking-[0.14em] text-[#a94b31] transition hover:text-[#8d3720]"
                  onClick={clearFilters}
                >
                  Clear all
                </button>
              )}
            </div>

            <div className="space-y-7">
              <section className="space-y-4 border-t border-[rgba(193,88,55,0.48)] pt-5 first:border-t-0 first:pt-0">
                <p className="text-panel-ink text-body-md font-semibold">Price</p>
                <div className="flex items-center gap-3">
                  <span className="min-w-[58px] text-body-sm text-[#6a3427]">
                    {formatFilterPrice(priceRange.min ?? priceBounds.min)}
                  </span>
                  <div className="relative flex-1">
                    <div className="absolute inset-x-0 top-1/2 h-[2px] -translate-y-1/2 bg-[rgba(182,84,54,0.28)]" />
                    <input
                      type="range"
                      min={priceBounds.min}
                      max={priceBounds.max}
                      step="0.01"
                      value={priceRange.min ?? priceBounds.min}
                      onChange={(event) => updatePriceRange('min', Number(event.target.value))}
                      className="relative z-[1] h-6 w-full appearance-none bg-transparent accent-[#b65436]"
                    />
                    <input
                      type="range"
                      min={priceBounds.min}
                      max={priceBounds.max}
                      step="0.01"
                      value={priceRange.max ?? priceBounds.max}
                      onChange={(event) => updatePriceRange('max', Number(event.target.value))}
                      className="absolute inset-0 z-[2] h-6 w-full appearance-none bg-transparent accent-[#b65436]"
                    />
                  </div>
                  <span className="min-w-[58px] text-right text-body-sm text-[#6a3427]">
                    {formatFilterPrice(priceRange.max ?? priceBounds.max)}
                  </span>
                </div>
              </section>

              <section className="space-y-4 border-t border-[rgba(193,88,55,0.48)] pt-5">
                <p className="text-panel-ink text-body-md font-semibold">Food preferences</p>
                <div className="space-y-4">
                  {foodOptions.map((option) => (
                    <FilterCheckbox
                      key={option.value}
                      checked={selectedFoodFilters.includes(option.value)}
                      onChange={() => toggleFoodFilter(option.value)}
                      label={option.label}
                      count={option.count}
                    />
                  ))}
                </div>
              </section>

              <section className="space-y-4 border-t border-[rgba(193,88,55,0.48)] pt-5">
                <p className="text-panel-ink text-body-md font-semibold">Chocolate type</p>
                <div className="flex flex-wrap gap-3">
                  {categoryOptions.map((category) => (
                    <CategoryPill
                      key={category.slug}
                      selected={selectedCategorySlugs.includes(category.slug)}
                      onClick={() => toggleCategory(category.slug)}
                      label={category.name}
                    />
                  ))}
                </div>
              </section>
            </div>
          </aside>

          <div className="space-y-8">
            {filteredProducts.length > 0 ? (
              <>
                <section
                  ref={resultsRef}
                  className="grid grid-cols-2 gap-4 md:gap-5 lg:grid-cols-3 lg:gap-6"
                >
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
            ) : (
              <div className="panel-wash-strong p-8">
                <p className="text-panel-secondary text-body-md">
                  No offers match the selected filters.
                </p>
                <button type="button" className="button-primary mt-5" onClick={clearFilters}>
                  Clear filters
                </button>
              </div>
            )}
          </div>
        </div>
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
