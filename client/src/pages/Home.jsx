import PageWrapper from '../components/layout/PageWrapper.jsx';

export default function Home() {
  return (
    <PageWrapper>
      <section className="flex flex-col gap-6">
        <p className="text-xs uppercase tracking-[0.2em] text-brand">Single-harvest cacao</p>
        <h1 className="font-display text-display-md text-ink-primary">ChocolateCraftHouse</h1>
        <p className="max-w-xl text-body-md text-ink-secondary">
          Warm, indulgent, and hand-tempered. This is the foundation for the storefront.
        </p>
      </section>
    </PageWrapper>
  );
}
