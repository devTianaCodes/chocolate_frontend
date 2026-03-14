import { useEffect } from 'react';
import { RouterProvider } from 'react-router-dom';
import router from './router.jsx';
import { useAuthStore } from './store/authStore.js';
import { useCartStore } from './store/cartStore.js';

export default function App() {
  const initialize = useAuthStore((state) => state.initialize);
  const initialized = useAuthStore((state) => state.initialized);
  const accessToken = useAuthStore((state) => state.accessToken);
  const loadCart = useCartStore((state) => state.loadCart);

  useEffect(() => {
    initialize();
  }, [initialize]);

  useEffect(() => {
    if (initialized) {
      loadCart();
    }
  }, [accessToken, initialized, loadCart]);

  if (!initialized) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-surface-base px-6 text-body-md text-ink-secondary">
        Restoring your atelier session...
      </div>
    );
  }

  return <RouterProvider router={router} />;
}
