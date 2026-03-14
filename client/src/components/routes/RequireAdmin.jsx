import { Navigate, Outlet } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore.js';

export default function RequireAdmin() {
  const user = useAuthStore((state) => state.user);

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (user.role !== 'admin') {
    return <Navigate to="/account" replace />;
  }

  return <Outlet />;
}
