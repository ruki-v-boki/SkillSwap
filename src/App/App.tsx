import { fetchMyOffers, fetchPendingIncoming } from '@/services/slices/exchangeSlice';
import { UserCardModal } from '@/components/ui/Modal/UserCardModal/UserCardModal';
import { PersonalDataPage } from '@/pages/Profile/PersonalData/PersonalDataPage';
import { useRealtimeNotifications } from '@/hooks/useRealtimeNotifications';
import { UserSkillsPage } from '@/pages/Profile/UserSkills/UserSkillsPage';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { FavouritesPage } from '@/pages/Profile/Favourites/FavouritesPage';
import { fetchNotifications } from '@/services/slices/notificationsSlice';
import { ExchangesPage } from '@/pages/Profile/Exchanges/ExchangesPage';
import { checkAuth, selectUserId } from '@/services/slices/authSlice';
import { RequestsPage } from '@/pages/Profile/Requests/RequestsPage';
import { useRealtimeExchanges } from '@/hooks/useRealtimeExchanges';
import { NotFoundPage, ServerErrorPage } from '@/pages/Error';
import { useDispatch, useSelector } from '@/services/store';
import { SkillsPage } from '@/pages/Skills/SkillsPage';
import { MainLayout } from '@/layouts/Main/MainLayout';
import { AuthLayout } from '@/layouts/Auth/AuthLayout';
import { HomePage } from '@/pages/Home/HomePage';
import { ModalUI } from '@/components/ui/Modal';
import { ContactsPage } from '@/pages/Contacts';
import { RegisterPage } from '@/pages/Register';
import { ProfilePage } from '@/pages/Profile';
import { PolicyPage } from '@/pages/Policy';
import { TermsPage } from '@/pages/Terms';
import { LoginPage } from '@/pages/Login';
import { AboutPage } from '@/pages/About';
import { OfferPage } from '@/pages/Offer';
import { ProtectedRoute } from '@/routes';
import { BlogPage } from '@/pages/Blog';
import { useEffect } from 'react';
import {
  selectUserIsLoading,
  selectCurrentUser,
  getCurrentUser,
  getAllUsers,
} from '@/services/slices/userSlice';

// ---------------------------------------------------------------

export function App() {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const userId = useSelector(selectUserId);
  const currentUser = useSelector(selectCurrentUser);
  const isLoading = useSelector(selectUserIsLoading);

  const background = location.state?.background;
  const closeModal = () => navigate(-1);

// ---------------------------------------------------------------

  useRealtimeExchanges(userId);
  useRealtimeNotifications(userId);

// ---------------------------------------------------------------

  useEffect(() => {
    dispatch(checkAuth());
    dispatch(getAllUsers());
  }, [dispatch]);

  useEffect(() => {
    if (userId && !currentUser && !isLoading) {
      dispatch(getCurrentUser(userId));
      dispatch(fetchNotifications(userId));
      dispatch(fetchMyOffers(userId));
      dispatch(fetchPendingIncoming(userId));
    }
  }, [
    userId,
    currentUser,
    dispatch,
    isLoading
  ]);

// ---------------------------------------------------------------

  return (
    <>
      <Routes location={background || location}>

        {/* ---------- ПУБЛИЧНЫЕ МАРШРУТЫ (MainLayout) ---------- */}
        <Route path="/" element={<MainLayout />}>
          <Route index element={<HomePage />} />
          <Route path="home" element={<HomePage />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="skills" element={<SkillsPage />} />
          <Route path="contacts" element={<ContactsPage />} />
          <Route path="blog" element={<BlogPage />} />
          <Route path="policy" element={<PolicyPage />} />
          <Route path="terms" element={<TermsPage />} />
          <Route path="offer/:id" element={<OfferPage />} />
          <Route path="500" element={<ServerErrorPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>

        {/* ---------- МАРШРУТЫ ДЛЯ НЕАВТОРИЗОВАННЫХ (AuthLayout) ---------- */}
        <Route element={<ProtectedRoute onlyUnAuth />}>
          <Route element={<AuthLayout />}>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
          </Route>
        </Route>

        {/* ---------- МАРШРУТЫ ДЛЯ АВТОРИЗОВАННЫХ (MainLayout) ---------- */}
        <Route element={<ProtectedRoute />}>
          <Route element={<MainLayout />}>
            <Route path="/profile" element={<ProfilePage />}>
            <Route index element={<PersonalDataPage />} />
            <Route path="requests" element={<RequestsPage />} />
            <Route path="favourites" element={<FavouritesPage />} />
            <Route path="exchanges" element={<ExchangesPage />} />
            <Route path="my-skills" element={<UserSkillsPage />} />
            </Route>
          </Route>
        </Route>
      </Routes>

      {/* ---------- МОДАЛЬНЫЕ ОКНА ---------- */}
      {background && (
        <Routes>
          <Route
            path='/modal/:id'
            element={
              <ModalUI onClose={closeModal}>
                <UserCardModal />
              </ModalUI>
            }
          />
        </Routes>
      )}
    </>
  );
}