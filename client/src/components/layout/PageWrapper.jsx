import Navbar from './Navbar.jsx';
import Footer from './Footer.jsx';

export default function PageWrapper({ children }) {
  return (
    <div className="relative min-h-screen overflow-hidden text-ink-primary">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[520px] bg-[radial-gradient(circle_at_top,rgba(249,207,191,0.24),transparent_56%)]" />
      <div className="pointer-events-none absolute left-[-12%] top-32 h-72 w-72 rounded-full bg-brand/15 blur-3xl" />
      <div className="pointer-events-none absolute right-[-8%] top-80 h-80 w-80 rounded-full bg-brand-subtle/20 blur-3xl" />
      <Navbar />
      <main className="relative mx-auto max-w-[1280px] px-6 py-12 md:px-10 lg:px-16 lg:py-16">
        {children}
      </main>
      <Footer />
    </div>
  );
}
