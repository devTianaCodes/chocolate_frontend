import { ShoppingCart } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore.js';
import { useCartStore } from '../../store/cartStore.js';

export default function Navbar() {
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);
  const items = useCartStore((state) => state.items);
  const cartCount = items.reduce((total, item) => total + Number(item.quantity || 0), 0);

  async function handleLogout() {
    await logout();
  }

  return (
    <header className="sticky top-0 z-50 border-b border-border/35 bg-surface-base">
      <div className="mx-auto flex h-[72px] max-w-[1280px] items-center justify-between px-6 md:px-10 lg:px-16">
        <div className="flex flex-col">
          <Link to="/" className="font-display text-[22px] italic text-ink-primary">
            Chocolate Craft House
          </Link>
          <span className="hidden text-[10px] uppercase tracking-[0.12em] text-ink-muted md:block">
            Artisan Chocolate Atelier
          </span>
        </div>
        <nav className="hidden items-center gap-8 text-[13px] uppercase tracking-[0.1em] text-ink-secondary md:flex">
          <Link to="/shop" className="hover:text-ink-primary">Shop</Link>
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
              <Link to="/register" className="hover:text-ink-primary">Register</Link>
            </>
          )}
        </nav>
        <button type="button" className="text-xs uppercase tracking-[0.1em] text-ink-secondary md:hidden">
          Menu
        </button>
      </div>
    </header>
  );
}
