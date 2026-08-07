import { Navigate, Outlet } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore.js';
import SessionRestore from './SessionRestore.jsx';

export default function RequireAdmin() {
  const initialized = useAuthStore((state) => state.initialized);
  const user = useAuthStore((state) => state.user);

  if (!initialized) {
    return <SessionRestore />;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (user.role !== 'admin') {
    return <Navigate to="/account" replace />;
  }

  return <Outlet />;
}
