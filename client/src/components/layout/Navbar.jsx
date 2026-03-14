import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <header className="border-b border-border bg-surface-base/95 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-[1280px] items-center justify-between px-6 md:px-10 lg:px-16">
        <div className="flex flex-col">
          <Link to="/" className="font-display text-lg text-ink-primary">
            ChocolateCraftHouse
          </Link>
          <span className="hidden text-[10px] uppercase tracking-[0.12em] text-ink-muted md:block">
            Artisan Chocolate Atelier
          </span>
        </div>
        <nav className="hidden items-center gap-6 text-xs uppercase tracking-[0.1em] text-ink-secondary md:flex">
          <Link to="/shop" className="hover:text-ink-primary">Shop</Link>
          <Link to="/cart" className="hover:text-ink-primary">Cart</Link>
          <Link to="/account" className="hover:text-ink-primary">Account</Link>
        </nav>
        <div className="text-xs uppercase tracking-[0.1em] text-ink-secondary">Menu</div>
      </div>
    </header>
  );
}
