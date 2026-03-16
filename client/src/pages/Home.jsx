import { Link } from 'react-router-dom';
import PageWrapper from '../components/layout/PageWrapper.jsx';
import luxuryDarkChocolateImage from '../assets/luxury-dark-chocolate.png';

const heroNoise = `url("data:image/svg+xml,${encodeURIComponent(
  `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 240 240'>
    <filter id='grain'>
      <feTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='2' stitchTiles='stitch'/>
    </filter>
    <rect width='100%' height='100%' filter='url(#grain)' opacity='0.12'/>
  </svg>`
)}")`;

export default function Home() {
  return (
    <PageWrapper>
      <section
        className="grid gap-8 overflow-hidden rounded-card px-6 py-8 lg:min-h-[calc(100vh-240px)] lg:grid-cols-[1.15fr_0.85fr] lg:items-center lg:px-8 lg:py-10"
        style={{
          backgroundColor: '#1c0f07',
          backgroundImage: `${heroNoise}, radial-gradient(circle at 28% 42%, rgba(92, 42, 16, 0.3), transparent 55%)`,
        }}
      >
        <div className="space-y-6 py-8 lg:py-16">
          <p className="text-xs uppercase tracking-[0.2em] text-brand">Single-harvest cacao</p>
          <h1 className="max-w-3xl font-display text-display-md font-bold italic text-[#fdf6ee] md:text-display-lg">
            Luxury chocolate, tempered slowly and savored deeply.
          </h1>
          <p className="max-w-2xl text-body-lg text-[#c8b8a8]">
            Chocolate Craft House grows from an atelier tradition where each batch is tempered with patience and finished by hand. Our shop pairs a classic chocolate-making legacy with modern small-batch discipline, so every bar and praline lands with deep flavor, clean snap, and premium ingredients you can taste immediately.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link
              to="/shop"
              className="inline-flex items-center justify-center rounded-sm border border-[#fdf6ee] bg-[#fdf6ee] px-6 py-3 text-xs font-medium uppercase tracking-[0.12em] text-[#1c0f07] transition duration-300 hover:bg-[#f3e7d8]"
            >
              Shop the collection
            </Link>
            <Link
              to="/account"
              className="inline-flex items-center justify-center rounded-sm border border-[#fdf6ee] px-6 py-3 text-xs font-medium uppercase tracking-[0.12em] text-[#fdf6ee] transition duration-300 hover:bg-[rgba(253,246,238,0.08)]"
            >
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
          <div className="pointer-events-none absolute inset-y-0 left-0 w-12 bg-[linear-gradient(to_right,#1c0f07,transparent)] md:w-16" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-8 bg-[linear-gradient(to_left,#1c0f07,transparent)] md:w-12" />
          <div className="pointer-events-none absolute inset-x-0 top-0 h-8 bg-[linear-gradient(to_bottom,#1c0f07,transparent)] md:h-12" />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-8 bg-[linear-gradient(to_top,#1c0f07,transparent)] md:h-12" />
        </div>
      </section>
    </PageWrapper>
  );
}
