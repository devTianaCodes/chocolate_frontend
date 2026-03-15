import Navbar from './Navbar.jsx';
import Footer from './Footer.jsx';

export default function PageWrapper({ children }) {
  return (
    <div className="relative min-h-screen overflow-hidden text-ink-primary">
      <Navbar />
      <main className="relative mx-auto max-w-[1280px] px-6 py-12 md:px-10 lg:px-16 lg:py-16">
        {children}
      </main>
      <Footer />
    </div>
  );
}
