import { Link } from 'react-router-dom';
import PageWrapper from '../components/layout/PageWrapper.jsx';
import luxuryDarkChocolateImage from '../assets/luxury-dark-chocolate.png';

export default function Home() {
  return (
    <PageWrapper>
      <section className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-end">
        <div className="space-y-6 py-8 lg:py-16">
          <p className="section-label">Single-harvest cacao</p>
          <h1 className="max-w-2xl font-display text-display-sm italic text-ink-primary md:text-display-md">
            Luxury chocolate, tempered slowly and savored deeply.
          </h1>
          <p className="max-w-2xl text-body-lg text-ink-secondary">
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
        <div className="relative overflow-hidden rounded-card shadow-velvet">
          <img
            src={luxuryDarkChocolateImage}
            alt="Luxury dark chocolate bars in high definition"
            className="h-[420px] w-full object-cover md:h-[520px]"
          />
          <div className="absolute inset-x-0 bottom-0 bg-[linear-gradient(to_top,rgba(53,30,16,0.92),rgba(53,30,16,0.18),transparent)] p-6 md:p-8">
            <p className="text-body-xs uppercase tracking-[0.18em] text-brand">Signature dark chocolate</p>
            <p className="mt-3 max-w-sm font-display text-display-sm italic text-ink-primary">
              Polished finish, deep cacao notes, slow-crafted luxury.
            </p>
          </div>
        </div>
      </section>
    </PageWrapper>
  );
}
