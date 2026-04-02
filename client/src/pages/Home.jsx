import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchProducts } from '../api/products.js';
import PageWrapper from '../components/layout/PageWrapper.jsx';
import Pagination from '../components/Pagination.jsx';
import ProductCard from '../components/product/ProductCard.jsx';
import luxuryDarkChocolateImage from '../assets/luxury-dark-chocolate.png';
import useResponsivePageSize from '../hooks/useResponsivePageSize.js';
import { getProductReviewSummary } from '../utils/getProductReviewSummary.js';
import { getTotalPages, paginateItems } from '../utils/pagination.js';

export default function Home() {
  const [products, setProducts] = useState([]);
  const [loadingLoved, setLoadingLoved] = useState(true);
  const [lovedError, setLovedError] = useState('');
  const [currentLovedPage, setCurrentLovedPage] = useState(1);
  const lovedPageSize = useResponsivePageSize();

  useEffect(() => {
    let active = true;

    async function loadProducts() {
      setLoadingLoved(true);
      setLovedError('');

      try {
        const response = await fetchProducts({ page: 1, limit: 100 });
        if (active) {
          setProducts(response.data.result || []);
        }
      } catch {
        if (active) {
          setProducts([]);
          setLovedError('Unable to load the most loved collection.');
        }
      } finally {
        if (active) {
          setLoadingLoved(false);
        }
      }
    }

    loadProducts();

    return () => {
      active = false;
    };
  }, []);

  const mostLovedProducts = useMemo(() => {
    return [...products]
      .sort((left, right) => {
        const leftReviews = getProductReviewSummary(left.id);
        const rightReviews = getProductReviewSummary(right.id);

        if (rightReviews.rating !== leftReviews.rating) {
          return rightReviews.rating - leftReviews.rating;
        }

        if (rightReviews.count !== leftReviews.count) {
          return rightReviews.count - leftReviews.count;
        }

        return Number(left.id) - Number(right.id);
      });
  }, [products]);

  const lovedTotalPages = useMemo(
    () => getTotalPages(mostLovedProducts.length, lovedPageSize),
    [mostLovedProducts.length, lovedPageSize]
  );

  const visibleLovedProducts = useMemo(
    () => paginateItems(mostLovedProducts, currentLovedPage, lovedPageSize),
    [mostLovedProducts, currentLovedPage, lovedPageSize]
  );

  useEffect(() => {
    if (currentLovedPage <= lovedTotalPages) return;
    setCurrentLovedPage(lovedTotalPages);
  }, [currentLovedPage, lovedTotalPages]);

  return (
    <PageWrapper>
      <section className="grid gap-8 md:grid-cols-[1fr_1.02fr] md:items-center lg:min-h-[calc(100vh-240px)] lg:grid-cols-[1fr_1.05fr]">
        <div className="space-y-6 py-8 md:py-10 lg:py-16">
          <p className="text-xs uppercase tracking-[0.2em] text-white">Single-harvest cacao</p>
          <h1 className="max-w-3xl font-display text-display-md font-bold italic text-[#612E35] md:text-display-lg">
            Luxury chocolate, tempered slowly and savored deeply.
          </h1>
          <p className="max-w-2xl text-justify text-body-lg text-[#612E35]">
            Chocolate Craft House grows from an atelier tradition where each batch is tempered with patience and finished by hand. Our shop pairs a classic chocolate-making legacy with modern small-batch discipline, so every bar and praline lands with deep flavor, clean snap, and premium ingredients you can taste immediately.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link to="/shop" className="button-primary">
              Shop the collection
            </Link>
            <Link to="/account" className="button-ghost">
              Enter the atelier
            </Link>
          </div>
        </div>
        <div className="relative md:self-center lg:-mr-8">
          <img
            src={luxuryDarkChocolateImage}
            alt="Luxury dark chocolate bars in high definition"
            className="h-[470px] w-full object-cover [mask-image:radial-gradient(ellipse_at_center,black_82%,transparent_100%)] [-webkit-mask-image:radial-gradient(ellipse_at_center,black_82%,transparent_100%)] md:h-[620px]"
          />
          <div className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-[linear-gradient(to_right,rgb(var(--color-page-bg))_0%,rgba(249,207,191,0.44)_34%,transparent_100%)] md:w-20" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-[linear-gradient(to_left,rgb(var(--color-page-bg))_0%,rgba(249,207,191,0.44)_34%,transparent_100%)] md:w-20" />
          <div className="pointer-events-none absolute inset-x-0 top-0 h-8 bg-[linear-gradient(to_bottom,rgb(var(--color-page-bg))_0%,rgba(249,207,191,0.4)_36%,transparent_100%)] md:h-12" />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-8 bg-[linear-gradient(to_top,rgb(var(--color-page-bg))_0%,rgba(249,207,191,0.4)_36%,transparent_100%)] md:h-12" />
        </div>
      </section>

      <section className="mt-12 space-y-6 md:mt-16 md:space-y-8">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div className="space-y-3">
            <p className="text-panel-secondary text-xs uppercase tracking-[0.2em]">Most loved</p>
            <h2 className="text-panel-ink font-display text-display-md">Our best-reviewed chocolates</h2>
            <p className="text-panel-secondary max-w-2xl text-body-md">
              Chosen again and again for flavor, texture, and gifting appeal.
            </p>
          </div>
          <Link to="/shop" className="button-ghost self-start md:self-auto">
            View all
          </Link>
        </div>

        {loadingLoved && (
          <div className="panel-wash-strong p-6">
            <p className="text-panel-secondary text-body-md">Loading most loved chocolates…</p>
          </div>
        )}

        {!loadingLoved && lovedError && (
          <div className="panel-wash-strong p-6">
            <p className="text-body-md text-red-300">{lovedError}</p>
          </div>
        )}

        {!loadingLoved && !lovedError && mostLovedProducts.length > 0 && (
          <>
            <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-5 lg:grid-cols-5 lg:gap-6">
              {visibleLovedProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
            <Pagination
              currentPage={currentLovedPage}
              totalPages={lovedTotalPages}
              onPageChange={setCurrentLovedPage}
            />
          </>
        )}

        {!loadingLoved && !lovedError && mostLovedProducts.length === 0 && (
          <div className="panel-wash-strong p-6">
            <p className="text-panel-secondary text-body-md">
              Most loved products are unavailable right now.
            </p>
          </div>
        )}
      </section>
    </PageWrapper>
  );
}
