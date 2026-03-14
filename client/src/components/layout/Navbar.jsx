import { Link } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore.js';

export default function Navbar() {
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);

  async function handleLogout() {
    await logout();
  }

  return (
    <header className="sticky top-0 z-50 border-b border-border/35 bg-surface-base/55 backdrop-blur-luxury">
      <div className="mx-auto flex h-[72px] max-w-[1280px] items-center justify-between px-6 md:px-10 lg:px-16">
        <div className="flex flex-col">
          <Link to="/" className="font-display text-[22px] italic text-ink-primary">
            ChocolateCraftHouse
          </Link>
          <span className="hidden text-[10px] uppercase tracking-[0.12em] text-ink-muted md:block">
            Artisan Chocolate Atelier
          </span>
        </div>
        <nav className="hidden items-center gap-6 rounded-pill border border-border/40 bg-surface-elevated/20 px-5 py-3 text-[13px] uppercase tracking-[0.1em] text-ink-secondary shadow-glass backdrop-blur-luxury md:flex">
          <Link to="/shop" className="hover:text-ink-primary">Shop</Link>
          <Link to="/cart" className="hover:text-ink-primary">Cart</Link>
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
        <div className="rounded-pill border border-border/35 bg-surface-elevated/20 px-4 py-2 text-xs uppercase tracking-[0.1em] text-ink-secondary shadow-glass backdrop-blur-luxury">
          Menu
        </div>
      </div>
    </header>
  );
}
