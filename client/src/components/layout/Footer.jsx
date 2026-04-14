import { Facebook, Instagram } from 'lucide-react';
import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/logo1-transparent.png';

const shopLinks = [
  { label: 'Shop', to: '/shop' },
  { label: 'Offers', to: '/offers' },
  { label: 'Gifts', to: '/gifts' },
  { label: 'Favourites', to: '/favourites' },
  { label: 'Search', to: '/search' },
];

const helpLinks = [
  { label: 'FAQ', to: '/faq' },
  { label: 'Shipping & Delivery', to: '/shipping' },
  { label: 'Returns & Care', to: '/returns' },
  { label: 'Privacy Policy', to: '/privacy' },
  { label: 'Contact', to: '/contact' },
];

const socialLinks = [
  { label: 'Instagram', href: 'https://instagram.com', icon: Instagram },
  { label: 'Facebook', href: 'https://facebook.com', icon: Facebook },
  { label: 'TikTok', href: 'https://tiktok.com', icon: TikTokIcon },
];

const awards = [
  { label: 'Best Artisan Chocolate 2025', rating: 5 },
  { label: "Editors' Choice for Gifting", rating: 5 },
  { label: 'Small-Batch Excellence', rating: 4.7 },
];

function FooterColumn({ title, links, children = null }) {
  return (
    <section className="space-y-4">
      <h2 className="text-[11px] font-semibold uppercase tracking-[0.18em] text-ink-primary">{title}</h2>
      <ul className="space-y-3 text-[15px] leading-snug text-ink-secondary">
        {links.map((link) => (
          <li key={link.label}>
            <Link to={link.to} className="transition hover:text-ink-primary">
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
      {children}
    </section>
  );
}

function SocialIconLink({ href, label, Icon }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer noopener"
      aria-label={`Open ${label}`}
      className="inline-flex h-10 w-10 items-center justify-center border border-brand-light/30 text-ink-secondary transition hover:border-brand-light/55 hover:text-ink-primary"
    >
      <Icon className="h-[18px] w-[18px]" />
    </a>
  );
}

function StarIcon({ className }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className}>
      <path d="M12 2.8l2.8 5.67 6.26.91-4.53 4.42 1.07 6.23L12 17.14 6.4 20.03l1.07-6.23L2.94 9.38l6.26-.91L12 2.8Z" fill="currentColor" />
    </svg>
  );
}

function StarRating({ rating }) {
  return (
    <span className="flex items-center gap-0.5 pt-[1px]" aria-hidden="true">
      {Array.from({ length: 5 }, (_, index) => {
        const fillPercent = Math.max(0, Math.min(1, rating - index)) * 100;
        return (
          <span key={index} className="relative inline-flex h-[13px] w-[13px]">
            <StarIcon className="absolute inset-0 text-[rgba(229,190,92,0.24)]" />
            <span className="absolute inset-y-0 left-0 overflow-hidden" style={{ width: `${fillPercent}%` }}>
              <StarIcon className="h-[13px] w-[13px] text-[rgb(229,190,92)]" />
            </span>
          </span>
        );
      })}
    </span>
  );
}

function AwardRow({ label, rating }) {
  return (
    <div className="flex items-start gap-2.5 border border-brand-light/30 px-3 py-2">
      <StarRating rating={rating} />
      <span className="text-[11px] uppercase tracking-[0.14em] text-brand-light">{label}</span>
    </div>
  );
}

function TikTokIcon(props) {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M14.7 3c.2 1.8 1.2 3.5 2.8 4.4 1 .6 2.1.9 3.3.9v3.1a8.3 8.3 0 0 1-3.5-.8v5.3c0 1.6-.5 3-1.6 4.1a6.3 6.3 0 0 1-8.8 0A6.1 6.1 0 0 1 5 15.6c0-1.7.7-3.2 1.8-4.3a6.3 6.3 0 0 1 6.3-1.4v3.2a3 3 0 0 0-1.4-.3c-1.7 0-3 1.3-3 3 0 .8.3 1.6.9 2.1.6.6 1.3.9 2.1.9 1.7 0 3-1.3 3-3V3h3Z" />
    </svg>
  );
}

export default function Footer() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  const newsletterHref = useMemo(() => {
    const subject = encodeURIComponent('Newsletter signup');
    const body = encodeURIComponent(
      `Please add this address to the Chocolate Craft House newsletter: ${email.trim()}`
    );
    return `mailto:hello@chocolatecrafthouse.com?subject=${subject}&body=${body}`;
  }, [email]);

  function handleSubmit(event) {
    event.preventDefault();

    const trimmedEmail = email.trim();
    const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail);

    if (!isValidEmail) {
      setError('Enter a valid email address.');
      return;
    }

    setError('');
    window.location.href = newsletterHref;
  }

  return (
    <footer className="border-t border-border/25 bg-[#4f2121] text-ink-primary">
      <div className="mx-auto max-w-[1520px] px-4 py-10 sm:px-5 md:px-7 lg:px-10 xl:px-12 xl:py-12">
        <div className="grid gap-10 md:grid-cols-2 md:gap-12 lg:grid-cols-[1.3fr_0.9fr_1fr] lg:gap-16">
          <section className="space-y-6">
            <Link to="/" className="inline-flex max-w-[420px]">
              <img src={logo} alt="Chocolate Craft House" className="h-auto w-full max-w-[360px]" />
            </Link>

            <form className="max-w-[440px] space-y-3" onSubmit={handleSubmit}>
              <label className="sr-only" htmlFor="footer-email">Email</label>
              <div className="flex flex-col gap-3 sm:flex-row">
                <input
                  id="footer-email"
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="Email address"
                  className="h-11 min-w-0 w-full rounded-none border border-brand-light/35 bg-[rgba(249,207,191,0.1)] px-4 text-[14px] text-ink-primary placeholder:text-ink-secondary/80 focus:border-brand-light focus-visible:outline-none"
                />
                <button type="submit" className="button-primary h-11 px-6 sm:min-w-[156px]">
                  Subscribe
                </button>
              </div>
              {error && <p className="text-sm text-[rgb(255,220,210)]">{error}</p>}
            </form>

            <section className="space-y-3 pt-12">
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-ink-primary">Awards & Recognition</p>
              <div className="flex flex-wrap gap-2.5">
                {awards.map((award) => (
                  <AwardRow key={award.label} label={award.label} rating={award.rating} />
                ))}
              </div>
            </section>
          </section>

          <FooterColumn title="Shop" links={shopLinks}>
            <div className="space-y-4 pt-12">
              <section className="space-y-2">
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-ink-primary">Contact us</p>
                <address className="not-italic space-y-2 text-[15px] leading-relaxed text-ink-secondary">
                  Rue du Cacao 18
                  <br />
                  1204 Geneva, Switzerland
                  <br />
                  <a href="mailto:hello@chocolatecrafthouse.com" className="transition hover:text-ink-primary">
                    hello@chocolatecrafthouse.com
                  </a>
                  <br />
                  <span>customer support:</span>{' '}
                  <a href="tel:+41225551084" className="transition hover:text-ink-primary">
                    +41 22 555 1084
                  </a>
                </address>
              </section>
            </div>
          </FooterColumn>

          <FooterColumn title="Help" links={helpLinks}>
            <div className="space-y-4 pt-12">

              <section className="space-y-3">
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-ink-primary">Follow us</p>
                <div className="flex flex-wrap gap-3">
                  {socialLinks.map(({ label, href, icon: Icon }) => (
                    <SocialIconLink key={label} href={href} label={label} Icon={Icon} />
                  ))}
                </div>
              </section>
            </div>
          </FooterColumn>
        </div>

        <div className="mt-7 flex flex-col gap-1 border-t border-brand-light/15 pt-3 text-[10px] uppercase tracking-[0.14em] text-ink-secondary sm:flex-row sm:items-center sm:justify-between">
          <p>© Chocolate Craft House</p>
          <p>Artisan chocolate atelier</p>
        </div>
      </div>
    </footer>
  );
}
