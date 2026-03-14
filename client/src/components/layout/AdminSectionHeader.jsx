import { NavLink } from 'react-router-dom';

const links = [
  { to: '/admin/products', label: 'Products' },
  { to: '/admin/inventory', label: 'Inventory' },
  { to: '/admin/orders', label: 'Orders' },
];

export default function AdminSectionHeader({ title, description }) {
  return (
    <header className="space-y-5">
      <div>
        <p className="text-xs uppercase tracking-[0.2em] text-brand">Admin</p>
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
                  ? 'border-brand bg-brand text-ink-invert'
                  : 'border-border text-ink-secondary hover:border-brand hover:text-brand'
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
