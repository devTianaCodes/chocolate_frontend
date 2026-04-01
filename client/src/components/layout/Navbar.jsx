import { useEffect, useState } from 'react';
import { Menu, Search, ShoppingCart, User, X } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore.js';
import { useCartStore } from '../../store/cartStore.js';

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);
  const items = useCartStore((state) => state.items);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const cartCount = items.reduce((total, item) => total + Number(item.quantity || 0), 0);

  useEffect(() => {
    setIsMobileMenuOpen(false);
    if (location.pathname === '/search') {
      setSearchTerm(new URLSearchParams(location.search).get('q') || '');
      return;
    }
    setSearchTerm('');
  }, [location.pathname, location.search]);

  async function handleLogout() {
    await logout();
    setIsMobileMenuOpen(false);
  }

  function toggleMobileMenu() {
    setIsMobileMenuOpen((current) => !current);
  }

  function handleSearchSubmit(event) {
    event.preventDefault();
    const value = searchTerm.trim();
    navigate(value ? `/search?q=${encodeURIComponent(value)}` : '/search');
    setIsMobileMenuOpen(false);
  }

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-border/35 bg-[#4f2121]">
      <div className="flex min-h-[30px] items-center justify-center border-b border-border/20 bg-brand px-3 py-1 text-center text-[9px] font-medium uppercase tracking-[0.14em] text-ink-invert sm:text-[10px] md:text-[11px]">
        Free shipping on orders over €50
      </div>
      <div className="mx-auto flex h-[68px] max-w-[1440px] items-center gap-3 px-3 sm:h-[72px] sm:px-4 md:px-5 lg:gap-5 lg:px-8">
        <div className="min-w-0 flex flex-col leading-none">
          <Link to="/" className="whitespace-nowrap font-display text-[20px] italic tracking-[0.02em] text-ink-primary sm:text-[24px] md:text-[26px] lg:text-[30px]">
            Chocolate Craft House
          </Link>
          <span className="pt-[3px] pb-0.5 text-[8px] uppercase tracking-[0.08em] text-ink-muted sm:pt-[4px] sm:text-[9px] md:text-[10px]">
            Artisan Chocolate Atelier
          </span>
        </div>
        <nav className="ml-auto hidden items-center gap-4 text-[12px] uppercase tracking-[0.08em] text-ink-secondary lg:flex xl:gap-5 xl:text-[13px] xl:tracking-[0.1em]">
          <Link to="/shop" className="hover:text-ink-primary">Shop</Link>
          <Link to="/favourites" className="hover:text-ink-primary">Favourites</Link>
          <Link to="/gifts" className="hover:text-ink-primary">Gifts</Link>
          <form className="relative" onSubmit={handleSearchSubmit}>
            <Search
              className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-invert/75"
              strokeWidth={1.8}
            />
            <input
              type="search"
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              placeholder="Search"
              aria-label="Search products"
              className="h-9 w-[150px] rounded-none border border-brand-light/40 bg-brand pl-10 pr-4 text-[11px] font-medium uppercase tracking-[0.1em] text-ink-invert shadow-[0_13px_28px_rgba(39,19,13,0.126)] placeholder:text-ink-invert/65 focus:border-brand-dark focus-visible:outline-none xl:w-[220px] xl:text-xs xl:tracking-[0.12em]"
            />
          </form>
          <Link
            to="/cart"
            aria-label="Cart"
            className="relative inline-flex items-center justify-center hover:text-ink-primary"
          >
            <span className="relative inline-flex">
              <ShoppingCart className="h-[15px] w-[15px]" strokeWidth={1.8} />
              {cartCount > 0 && (
                <span className="absolute -right-1.5 -top-2.5 inline-flex h-[14px] min-w-[14px] items-center justify-center rounded-pill bg-brand px-[3px] text-[8px] tracking-normal text-ink-invert">
                  {cartCount}
                </span>
              )}
            </span>
          </Link>
          {user ? (
            <>
              <Link
                to="/account"
                aria-label="Account"
                className="inline-flex items-center justify-center hover:text-ink-primary"
              >
                <User className="h-[15px] w-[15px]" strokeWidth={1.8} />
              </Link>
              {user?.role === 'admin' && (
                <Link to="/admin/products" className="hover:text-ink-primary">Admin</Link>
              )}
              <button type="button" className="hover:text-ink-primary" onClick={handleLogout}>
                Logout
              </button>
            </>
          ) : (
            <Link
              to="/login"
              aria-label="Login"
              className="inline-flex items-center justify-center hover:text-ink-primary"
            >
              <User className="h-[15px] w-[15px]" strokeWidth={1.8} />
            </Link>
          )}
        </nav>
        <div className="ml-auto flex items-center gap-3 text-ink-secondary lg:hidden">
          <button
            type="button"
            className="inline-flex items-center justify-center hover:text-ink-primary"
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-nav"
            aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
            onClick={toggleMobileMenu}
          >
            {isMobileMenuOpen ? <X className="h-[18px] w-[18px]" strokeWidth={1.8} /> : <Menu className="h-[18px] w-[18px]" strokeWidth={1.8} />}
          </button>
          <Link
            to="/cart"
            aria-label="Cart"
            className="relative inline-flex items-center justify-center hover:text-ink-primary"
          >
            <span className="relative inline-flex">
              <ShoppingCart className="h-[18px] w-[18px]" strokeWidth={1.8} />
              {cartCount > 0 && (
                <span className="absolute -right-1.5 -top-2.5 inline-flex h-[14px] min-w-[14px] items-center justify-center rounded-pill bg-brand px-[3px] text-[8px] tracking-normal text-ink-invert">
                  {cartCount}
                </span>
              )}
            </span>
          </Link>
          <Link
            to={user ? '/account' : '/login'}
            aria-label={user ? 'Account' : 'Login'}
            className="inline-flex items-center justify-center hover:text-ink-primary"
          >
            <User className="h-[18px] w-[18px]" strokeWidth={1.8} />
          </Link>
        </div>
      </div>
      {isMobileMenuOpen && (
        <nav
          id="mobile-nav"
          className="border-t border-border/30 bg-[#4f2121] px-3 py-4 lg:hidden"
        >
          <div className="flex flex-col gap-4 text-[13px] uppercase tracking-[0.1em] text-ink-secondary">
            <form className="relative" onSubmit={handleSearchSubmit}>
              <Search
                className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-invert/75"
                strokeWidth={1.8}
              />
              <input
                type="search"
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
                placeholder="Search products"
                aria-label="Search products"
                className="h-10 w-full rounded-none border border-brand-light/40 bg-brand pl-10 pr-4 text-xs font-medium uppercase tracking-[0.12em] text-ink-invert shadow-[0_13px_28px_rgba(39,19,13,0.126)] placeholder:text-ink-invert/65 focus:border-brand-dark focus-visible:outline-none"
              />
            </form>
            <Link to="/shop" className="hover:text-ink-primary">Shop</Link>
            <Link to="/favourites" className="hover:text-ink-primary">Favourites</Link>
            <Link to="/gifts" className="hover:text-ink-primary">Gifts</Link>
            <Link
              to="/cart"
              aria-label="Cart"
              className="inline-flex items-center gap-2 hover:text-ink-primary"
            >
              <span className="relative inline-flex">
                <ShoppingCart className="h-[16px] w-[16px]" strokeWidth={1.8} />
                {cartCount > 0 && (
                  <span className="absolute -right-1.5 -top-2.5 inline-flex h-[14px] min-w-[14px] items-center justify-center rounded-pill bg-brand px-[3px] text-[8px] tracking-normal text-ink-invert">
                    {cartCount}
                  </span>
                )}
              </span>
            </Link>
            {user ? (
              <>
                <Link
                  to="/account"
                  aria-label="Account"
                  className="inline-flex items-center gap-2 hover:text-ink-primary"
                >
                  <User className="h-[16px] w-[16px]" strokeWidth={1.8} />
                </Link>
                {user.role === 'admin' && (
                  <Link to="/admin/products" className="hover:text-ink-primary">Admin</Link>
                )}
                <button type="button" className="text-left hover:text-ink-primary" onClick={handleLogout}>
                  Logout
                </button>
              </>
            ) : (
              <Link
                to="/login"
                aria-label="Login"
                className="inline-flex items-center gap-2 hover:text-ink-primary"
              >
                <User className="h-[16px] w-[16px]" strokeWidth={1.8} />
              </Link>
            )}
          </div>
        </nav>
      )}
    </header>
  );
}
