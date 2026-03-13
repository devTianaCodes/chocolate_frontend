import Navbar from './Navbar.jsx';
import Footer from './Footer.jsx';

export default function PageWrapper({ children }) {
  return (
    <div className="min-h-screen bg-surface-base text-ink-primary">
      <Navbar />
      <main className="mx-auto max-w-[1280px] px-6 py-12 md:px-10 lg:px-16">
        {children}
      </main>
      <Footer />
    </div>
  );
}
