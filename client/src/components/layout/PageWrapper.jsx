import Navbar from './Navbar.jsx';
import Footer from './Footer.jsx';
import CartDrawer from '../cart/CartDrawer.jsx';

export default function PageWrapper({ children }) {
  return (
    <div className="relative flex min-h-screen flex-col overflow-hidden bg-[rgb(var(--color-page-bg))] text-ink-primary">
      <Navbar />
      <CartDrawer />
      <main className="relative mx-auto w-full max-w-[1440px] flex-1 px-3 pb-10 pt-[128px] sm:px-4 sm:pb-12 sm:pt-[132px] md:px-5 md:pb-14 lg:px-8 lg:pb-16">
        {children}
      </main>
      <Footer />
    </div>
  );
}
