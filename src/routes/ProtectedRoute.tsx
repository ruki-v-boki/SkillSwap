import { selectIsAuthChecked} from '@/services/slices/authSlice';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { selectCurrentUser } from '@/services/slices/userSlice';
import type { ProtectedRouteProps } from './type';
import { Loader } from '@/components/ui/Loader';
import { useSelector } from '@/services/store';


export function ProtectedRoute({ onlyUnAuth = false }: ProtectedRouteProps) {
  const currentUser = useSelector(selectCurrentUser);
  const isAuthChecked = useSelector(selectIsAuthChecked);
  const location = useLocation();

 // Ждём, пока проверится авторизация
  if (!isAuthChecked) {
    return <Loader />;
  }

 // Только для неавторизованных страниц (логин, регистрация)
  if (onlyUnAuth && currentUser) {
    const from = location.state?.from?.pathname || '/profile';
    return <Navigate to={from} replace />;
  }

  // Только для авторизованных страниц
  if (!onlyUnAuth && !currentUser) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <Outlet />;
}