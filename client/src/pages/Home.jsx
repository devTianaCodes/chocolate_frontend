import { Link } from 'react-router-dom';
import PageWrapper from '../components/layout/PageWrapper.jsx';
import luxuryDarkChocolateImage from '../assets/luxury-dark-chocolate.png';

export default function Home() {
  return (
    <PageWrapper>
      <section className="grid gap-8 lg:min-h-[calc(100vh-240px)] lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
        <div className="space-y-6 py-8 lg:py-16">
          <p className="section-label">Single-harvest cacao</p>
          <h1 className="max-w-3xl font-display text-display-md font-bold italic text-surface-elevated md:text-display-lg">
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
        <div className="relative overflow-hidden rounded-card shadow-velvet lg:self-center">
          <img
            src={luxuryDarkChocolateImage}
            alt="Luxury dark chocolate bars in high definition"
            className="h-[420px] w-full object-cover md:h-[520px]"
          />
        </div>
      </section>
    </PageWrapper>
  );
}
