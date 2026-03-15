export default function Footer() {
  return (
    <footer className="border-t border-border/35 bg-surface-base">
      <div className="mx-auto flex max-w-[1280px] flex-col gap-3 px-6 py-10 md:px-10 lg:flex-row lg:items-end lg:justify-between lg:px-16">
        <div>
          <p className="font-display text-2xl italic text-ink-primary">Chocolate Craft House</p>
          <p className="mt-2 text-body-sm text-ink-secondary">
            Hand-tempered bars, pralines, and gifts wrapped like keepsakes.
          </p>
        </div>
        <p className="text-xs uppercase tracking-[0.12em] text-ink-muted">
          Single-harvest cacao atelier
        </p>
      </div>
    </footer>
  );
}
