export default function Navbar() {
  return (
    <header className="border-b border-border bg-surface-base/95 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-[1280px] items-center justify-between px-6 md:px-10 lg:px-16">
        <div className="flex flex-col">
          <span className="font-display text-lg text-ink-primary">ChocolateCraftHouse</span>
          <span className="hidden text-[10px] uppercase tracking-[0.12em] text-ink-muted md:block">
            Artisan Chocolate Atelier
          </span>
        </div>
        <nav className="hidden items-center gap-6 text-xs uppercase tracking-[0.1em] text-ink-secondary md:flex">
          <span className="cursor-default">Shop</span>
          <span className="cursor-default">Categories</span>
          <span className="cursor-default">About</span>
          <span className="cursor-default">Gifts</span>
        </nav>
        <div className="text-xs uppercase tracking-[0.1em] text-ink-secondary">Menu</div>
      </div>
    </header>
  );
}
