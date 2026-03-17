import { useEffect, useState } from 'react';
import { Menu, Search, ShoppingCart, X } from 'lucide-react';
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
    <header className="fixed inset-x-0 top-0 z-50 border-b border-border/35 bg-[rgba(79,33,33,0.85)]">
      <div className="mx-auto flex h-[72px] max-w-[1280px] items-center justify-between px-3 md:px-5 lg:px-8">
        <div className="flex flex-col leading-none">
          <Link to="/" className="whitespace-nowrap font-display text-[22px] italic tracking-[0.02em] text-ink-primary sm:text-[26px] md:text-[30px]">
            Chocolate Craft House
          </Link>
          <span className="hidden pt-[5px] pb-0.5 text-[10px] uppercase tracking-[0.12em] text-ink-muted md:block">
            Artisan Chocolate Atelier
          </span>
        </div>
        <nav className="hidden items-center gap-8 text-[13px] uppercase tracking-[0.1em] text-ink-secondary md:flex">
          <Link to="/shop" className="hover:text-ink-primary">Shop</Link>
          <Link to="/favourites" className="hover:text-ink-primary">Favourites</Link>
          <Link to="/cart" className="relative inline-flex items-center gap-1 hover:text-ink-primary">
            <span>Cart</span>
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
              <Link to="/account" className="hover:text-ink-primary">Account</Link>
              {user?.role === 'admin' && (
                <Link to="/admin/products" className="hover:text-ink-primary">Admin</Link>
              )}
              <button type="button" className="hover:text-ink-primary" onClick={handleLogout}>
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="hover:text-ink-primary">Login</Link>
            </>
          )}
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
              className="h-9 w-[220px] rounded-sm border border-brand-light/40 bg-brand pl-10 pr-4 text-xs font-medium uppercase tracking-[0.12em] text-ink-invert shadow-[0_18px_40px_rgba(39,19,13,0.18)] placeholder:text-ink-invert/65 focus:border-brand-dark focus-visible:outline-none"
            />
          </form>
        </nav>
        <button
          type="button"
          className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.1em] text-ink-secondary md:hidden"
          aria-expanded={isMobileMenuOpen}
          aria-controls="mobile-nav"
          aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
          onClick={toggleMobileMenu}
        >
          <span>Menu</span>
          {isMobileMenuOpen ? <X className="h-4 w-4" strokeWidth={1.8} /> : <Menu className="h-4 w-4" strokeWidth={1.8} />}
        </button>
      </div>
      {isMobileMenuOpen && (
        <nav
          id="mobile-nav"
          className="border-t border-border/30 bg-[rgba(79,33,33,0.85)] px-3 py-4 md:hidden"
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
                className="h-10 w-full rounded-sm border border-brand-light/40 bg-brand pl-10 pr-4 text-xs font-medium uppercase tracking-[0.12em] text-ink-invert shadow-[0_18px_40px_rgba(39,19,13,0.18)] placeholder:text-ink-invert/65 focus:border-brand-dark focus-visible:outline-none"
              />
            </form>
            <Link to="/shop" className="hover:text-ink-primary">Shop</Link>
            <Link to="/favourites" className="hover:text-ink-primary">Favourites</Link>
            <Link to="/cart" className="inline-flex items-center gap-2 hover:text-ink-primary">
              <span>Cart</span>
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
                <Link to="/account" className="hover:text-ink-primary">Account</Link>
                {user.role === 'admin' && (
                  <Link to="/admin/products" className="hover:text-ink-primary">Admin</Link>
                )}
                <button type="button" className="text-left hover:text-ink-primary" onClick={handleLogout}>
                  Logout
                </button>
              </>
            ) : (
              <Link to="/login" className="hover:text-ink-primary">Login</Link>
            )}
          </div>
        </nav>
      )}
    </header>
  );
}
