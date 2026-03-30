import { Link } from 'react-router-dom';
import PageWrapper from '../components/layout/PageWrapper.jsx';
import luxuryDarkChocolateImage from '../assets/luxury-dark-chocolate.png';

export default function Home() {
  return (
    <PageWrapper>
      <section className="grid gap-8 lg:min-h-[calc(100vh-240px)] lg:grid-cols-[1fr_1.05fr] lg:items-center">
        <div className="space-y-6 py-8 lg:py-16">
          <p className="text-xs uppercase tracking-[0.2em] text-white">Single-harvest cacao</p>
          <h1 className="max-w-3xl font-display text-display-md font-bold italic text-[#612E35] md:text-display-lg">
            Luxury chocolate, tempered slowly and savored deeply.
          </h1>
          <p className="max-w-2xl text-justify text-body-lg text-[#612E35]">
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
        <div className="relative lg:-mr-8 lg:self-center">
          <img
            src={luxuryDarkChocolateImage}
            alt="Luxury dark chocolate bars in high definition"
            className="h-[470px] w-full object-cover [mask-image:radial-gradient(ellipse_at_center,black_82%,transparent_100%)] [-webkit-mask-image:radial-gradient(ellipse_at_center,black_82%,transparent_100%)] md:h-[620px]"
          />
          <div className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-[linear-gradient(to_right,rgb(var(--color-page-bg))_0%,rgba(249,207,191,0.44)_34%,transparent_100%)] md:w-20" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-[linear-gradient(to_left,rgb(var(--color-page-bg))_0%,rgba(249,207,191,0.44)_34%,transparent_100%)] md:w-20" />
          <div className="pointer-events-none absolute inset-x-0 top-0 h-8 bg-[linear-gradient(to_bottom,rgb(var(--color-page-bg))_0%,rgba(249,207,191,0.4)_36%,transparent_100%)] md:h-12" />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-8 bg-[linear-gradient(to_top,rgb(var(--color-page-bg))_0%,rgba(249,207,191,0.4)_36%,transparent_100%)] md:h-12" />
        </div>
      </section>
    </PageWrapper>
  );
}
