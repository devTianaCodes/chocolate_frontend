import { Instagram, Linkedin, Youtube } from 'lucide-react';
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
      className="inline-flex h-10 w-10 items-center justify-center rounded-sm border border-brand/30 text-brand transition hover:border-brand hover:bg-brand/10 hover:text-ink-primary"
    >
      {children}
    </a>
  );
}

export default function Footer() {
  return (
    <footer className="border-t border-border/30 bg-[rgba(79,33,33,0.85)] text-ink-primary">
      <div className="mx-auto grid max-w-[1600px] gap-12 px-8 py-14 md:px-10 lg:grid-cols-[1fr_1fr_1fr_1fr_1.45fr] lg:px-14">
        <FooterColumn title="The Company" links={companyLinks} />
        <FooterColumn title="Shop" links={shopLinks} />
        <FooterColumn title="Support" links={supportLinks} />
        <FooterColumn title="Connect" links={connectLinks} />

        <section className="space-y-6 lg:pl-10">
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
              className="h-14 flex-1 rounded-sm border border-border/70 bg-surface-elevated/35 px-6 text-[16px] text-ink-primary placeholder:text-ink-muted focus:border-brand focus-visible:outline-none"
            />
            <button type="submit" className="button-primary h-14 min-w-[146px] px-7">
              Subscribe
            </button>
          </form>
          <div className="flex items-center justify-start gap-4 pt-2 sm:justify-end">
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
