import { useEffect } from 'react';
import { RouterProvider } from 'react-router-dom';
import router from './router.jsx';
import { useAuthStore } from './store/authStore.js';

export default function App() {
  const initialize = useAuthStore((state) => state.initialize);
  const initialized = useAuthStore((state) => state.initialized);

  useEffect(() => {
    initialize();
  }, [initialize]);

  if (!initialized) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-surface-base px-6 text-body-md text-ink-secondary">
        Restoring your atelier session...
      </div>
    );
  }

  return <RouterProvider router={router} />;
}
