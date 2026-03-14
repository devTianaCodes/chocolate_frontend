import { Navigate, Outlet } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore.js';

export default function RequireGuest() {
  const user = useAuthStore((state) => state.user);

  if (user) {
    return <Navigate to="/account" replace />;
  }

  return <Outlet />;
}
