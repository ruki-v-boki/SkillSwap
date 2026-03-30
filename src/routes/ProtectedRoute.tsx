import { selectIsAuthChecked, selectAuthUserId } from '@/services/slices/authSlice';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import type { ProtectedRouteProps } from './type';
import { Loader } from '@/components/ui/Loader';
import { useSelector } from '@/services/store';

// ---------------------------------------------------------------

export function ProtectedRoute({
  onlyUnAuth = false
}: ProtectedRouteProps) {

  const location = useLocation();
  const userId = useSelector(selectAuthUserId);
  const isAuthChecked = useSelector(selectIsAuthChecked);

// ---------------------------------------------------------------

  if (!isAuthChecked) {
    return <Loader />
  }

// ---------------------------------------------------------------

  if (onlyUnAuth && userId) {
    const from = location.state?.from?.pathname || '/profile';
    return <Navigate to={from} replace />;
  }

// ---------------------------------------------------------------

  if (!onlyUnAuth && !userId) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

// ---------------------------------------------------------------

  return <Outlet />;
}