import { Link } from 'react-router-dom';
import PageWrapper from '../components/layout/PageWrapper.jsx';

export default function Home() {
  return (
    <PageWrapper>
      <section className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-end">
        <div className="space-y-6 py-8 lg:py-16">
          <p className="section-label">Single-harvest cacao</p>
          <h1 className="max-w-3xl font-display text-display-lg text-ink-primary lg:text-display-xl">
            A warmer chocolate world, wrapped in brown velvet and violet dusk.
          </h1>
          <p className="max-w-2xl text-body-lg text-ink-secondary">
            Chocolate Craft House is shaped like an atelier: reddish cocoa walls, blush highlights, indigo shadows, and glass surfaces that feel softly lacquered.
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
        <div className="glass-panel-strong relative overflow-hidden p-6 md:p-8">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(249,207,191,0.16),transparent_32%)]" />
          <div className="relative space-y-5">
            <div className="glass-panel p-5">
              <p className="text-body-xs uppercase tracking-[0.18em] text-brand">Mood board</p>
              <p className="mt-3 font-display text-display-sm italic text-ink-primary">
                Dark ganache. Blush foil. Indigo evening light on polished glass.
              </p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="glass-panel p-5">
                <p className="text-body-xs uppercase tracking-[0.12em] text-ink-muted">Palette</p>
                <p className="mt-2 font-display text-display-sm text-ink-primary">Three notes</p>
                <p className="text-body-sm text-ink-secondary">#351E10, #4B0082, #F9CFBF</p>
              </div>
              <div className="glass-panel p-5">
                <p className="text-body-xs uppercase tracking-[0.12em] text-ink-muted">Finish</p>
                <p className="mt-2 font-display text-display-sm text-ink-primary">Glassmorphism</p>
                <p className="text-body-sm text-ink-secondary">Soft blur, translucent lacquer, and gentle violet bloom.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </PageWrapper>
  );
}
