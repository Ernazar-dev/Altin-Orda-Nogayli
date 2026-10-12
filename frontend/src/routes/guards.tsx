import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { Spin } from 'antd';
import { useAuth } from '@/context/AuthContext';
import type { Role } from '@/types';

export function homeFor(role: Role): string {
  return role === 'TEACHER' ? '/teacher' : '/dashboard';
}

function FullSpin() {
  return (
    <div style={{ minHeight: '60vh', display: 'grid', placeItems: 'center' }}>
      <Spin size="large" />
    </div>
  );
}

/** Faqat kirgan foydalanuvchilar uchun. */
export function ProtectedRoute() {
  const { user, loading } = useAuth();
  const location = useLocation();
  if (loading) return <FullSpin />;
  if (!user) return <Navigate to="/login" replace state={{ from: location.pathname }} />;
  return <Outlet />;
}

/** Faqat ko'rsatilgan rollar uchun; boshqa rol o'z paneliga yo'naltiriladi. */
export function RoleRoute({ roles }: { roles: Role[] }) {
  const { user, loading } = useAuth();
  if (loading) return <FullSpin />;
  if (!user) return <Navigate to="/login" replace />;
  if (!roles.includes(user.role)) return <Navigate to={homeFor(user.role)} replace />;
  return <Outlet />;
}

/** Kirgan foydalanuvchini login/register sahifasidan o'z paneliga qaytaradi. */
export function GuestRoute() {
  const { user, loading } = useAuth();
  if (loading) return <FullSpin />;
  if (user) return <Navigate to={homeFor(user.role)} replace />;
  return <Outlet />;
}
