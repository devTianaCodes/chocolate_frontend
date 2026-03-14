import { NavLink } from 'react-router-dom';

const links = [
  { to: '/admin/products', label: 'Products' },
  { to: '/admin/inventory', label: 'Inventory' },
  { to: '/admin/orders', label: 'Orders' },
];

export default function AdminSectionHeader({ title, description }) {
  return (
    <header className="glass-panel-strong space-y-5 p-6 md:p-8">
      <div>
        <p className="section-label">Admin</p>
        <h1 className="font-display text-display-md text-ink-primary">{title}</h1>
        {description && (
          <p className="mt-2 max-w-2xl text-body-sm text-ink-secondary">{description}</p>
        )}
      </div>
      <nav className="flex flex-wrap gap-3">
        {links.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            className={({ isActive }) =>
              `rounded-sm border px-4 py-2 text-xs uppercase tracking-[0.12em] transition ${
                isActive
                  ? 'border-brand bg-brand/90 text-ink-invert shadow-glass'
                  : 'border-border/70 bg-surface-elevated/20 text-ink-secondary backdrop-blur-md hover:border-brand hover:text-brand'
              }`
            }
          >
            {link.label}
          </NavLink>
        ))}
      </nav>
    </header>
  );
}
