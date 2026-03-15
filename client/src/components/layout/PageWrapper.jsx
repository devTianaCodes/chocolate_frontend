import Navbar from './Navbar.jsx';
import Footer from './Footer.jsx';

export default function PageWrapper({ children }) {
  return (
    <div className="relative flex min-h-screen flex-col overflow-hidden bg-[rgb(var(--color-page-bg))] text-ink-primary">
      <Navbar />
      <main className="relative mx-auto w-full max-w-[1280px] flex-1 px-6 pb-12 pt-[104px] md:px-10 md:pb-14 lg:px-16 lg:pb-16">
        {children}
      </main>
      <Footer />
    </div>
  );
}
