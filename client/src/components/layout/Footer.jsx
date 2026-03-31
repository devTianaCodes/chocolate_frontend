import { Facebook, Instagram, Linkedin, Youtube } from 'lucide-react';
import { Link } from 'react-router-dom';

const companyLinks = [
  { label: 'Our Story', to: '/' },
  { label: 'Our Boutiques', to: '/shop' },
  { label: 'Blog', to: '/shop' },
  { label: 'Superior Sourcing', to: '/shop' },
];

const shopLinks = [
  { label: 'Truffles', to: '/shop?category=filled-pralines' },
  { label: 'Chocolate Bars', to: '/shop?category=chocolate-bars' },
  { label: 'Comfort Foods', to: '/shop?category=spreads-creams' },
  { label: 'Gifts', to: '/gifts' },
  { label: 'Advent', to: '/shop?category=seasonal-limited-edition' },
  { label: 'Collaborations', to: '/shop' },
];

const supportLinks = [
  { label: 'Shipping Policy', to: '/account' },
  { label: 'Allergen Information', to: '/shop' },
  { label: 'Perishable Care', to: '/shop' },
  { label: 'Promo Terms & Conditions', to: '/shop' },
  { label: 'FAQ', to: '/shop' },
  { label: 'Privacy Policy', to: '/shop' },
  { label: 'Return Policy', to: '/shop' },
];

const connectLinks = [
  { label: 'Mobile App', to: '/shop' },
  { label: 'Contact Us', to: '/account' },
  { label: 'Affiliates', to: '/shop' },
  { label: 'Become a Wholesaler', to: '/gifts' },
  { label: 'Events', to: '/shop?category=seasonal-limited-edition' },
];

function FooterColumn({ title, links }) {
  return (
    <section className="space-y-5">
      <h2 className="text-xs uppercase tracking-[0.2em] text-brand">{title}</h2>
      <ul className="space-y-3 text-[16px] leading-snug text-ink-secondary">
        {links.map((link) => (
          <li key={link.label}>
            <Link to={link.to} className="transition hover:text-ink-primary">
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}

function SocialLink({ label, href, children }) {
  return (
    <a
      href={href}
      aria-label={label}
      className="inline-flex h-10 w-10 items-center justify-center rounded-none border border-brand/30 text-brand transition hover:border-brand hover:bg-brand/10 hover:text-ink-primary"
    >
      {children}
    </a>
  );
}

export default function Footer() {
  return (
    <footer className="border-t border-border/30 bg-[rgba(79,33,33,0.85)] text-ink-primary">
      <div className="mx-auto grid max-w-[1600px] gap-10 px-4 py-12 sm:px-5 md:grid-cols-2 md:gap-x-8 md:gap-y-10 md:px-8 lg:px-10 xl:grid-cols-[1fr_1fr_1fr_1fr_1.45fr] xl:gap-12 xl:px-14 xl:py-14">
        <FooterColumn title="The Company" links={companyLinks} />
        <FooterColumn title="Shop" links={shopLinks} />
        <FooterColumn title="Support" links={supportLinks} />
        <FooterColumn title="Connect" links={connectLinks} />

        <section className="space-y-6 md:col-span-2 xl:col-span-1 xl:pl-10">
          <h2 className="text-xs uppercase tracking-[0.2em] text-brand">Keep In Touch</h2>
          <p className="max-w-[420px] text-[16px] leading-relaxed text-ink-secondary">
            Stay up-to-date on our latest haut-chocolat creations, exclusive offers and curated gifting releases.
          </p>
          <form className="flex max-w-[460px] flex-col gap-3 sm:flex-row" onSubmit={(event) => event.preventDefault()}>
            <label className="sr-only" htmlFor="footer-email">Email</label>
            <input
              id="footer-email"
              type="email"
              placeholder="Email"
              className="h-10 flex-1 rounded-none border border-brand-light/40 bg-brand px-4 text-[13px] font-medium uppercase tracking-[0.12em] text-ink-invert shadow-[0_13px_28px_rgba(39,19,13,0.126)] placeholder:text-ink-invert/65 focus:border-brand-dark focus-visible:outline-none"
            />
            <button type="submit" className="button-primary h-10 min-w-[146px] px-6">
              Subscribe
            </button>
          </form>
          <div className="flex items-center justify-center gap-4 pt-2">
            <SocialLink label="Facebook" href="https://facebook.com">
              <Facebook className="h-5 w-5" strokeWidth={2} />
            </SocialLink>
            <SocialLink label="Instagram" href="https://instagram.com">
              <Instagram className="h-5 w-5" strokeWidth={2} />
            </SocialLink>
            <SocialLink label="LinkedIn" href="https://linkedin.com">
              <Linkedin className="h-5 w-5" strokeWidth={2} />
            </SocialLink>
            <SocialLink label="YouTube" href="https://youtube.com">
              <Youtube className="h-5 w-5" strokeWidth={2} />
            </SocialLink>
          </div>
        </section>
      </div>
    </footer>
  );
}
