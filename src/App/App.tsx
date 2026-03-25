import { UserCardModal } from '@/components/ui/Modal/UserCardModal/UserCardModal';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
// import { UserOfferModal } from '@/components/ui/Modal/UserOfferModal';
import { NotFoundPage, ServerErrorPage } from '@/pages/Error';
import { getAllUsers, getCurrentUser, selectCurrentUser, selectUserIsLoading } from '@/services/slices/userSlice';
import { checkAuth, selectUserId } from '@/services/slices/authSlice';
import { SkillsPage } from '@/pages/Skills/SkillsPage';
import { MainLayout } from '@/layouts/Main/MainLayout';
import { AuthLayout } from '@/layouts/Auth/AuthLayout';
import { HomePage } from '@/pages/Home/HomePage';
import { ModalUI } from '@/components/ui/Modal';
import { ContactsPage } from '@/pages/Contacts';
import { RegisterPage } from '@/pages/Register';
import { useDispatch, useSelector } from '@/services/store';
import { ProfilePage } from '@/pages/Profile';
import { PolicyPage } from '@/pages/Policy';
import { TermsPage } from '@/pages/Terms';
import { LoginPage } from '@/pages/Login';
import { AboutPage } from '@/pages/About';
import { OfferPage } from '@/pages/Offer';
import { ProtectedRoute } from '@/routes';
import { BlogPage } from '@/pages/Blog';
import { useEffect } from 'react';


export function App() {

  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const background = location.state?.background;
  const closeModal = () => navigate(-1);
  const userId = useSelector(selectUserId);
  const currentUser = useSelector(selectCurrentUser);
  const isLoading = useSelector(selectUserIsLoading)

// ---------------------------------------------------------------

  useEffect(() => {
    dispatch(checkAuth());
    dispatch(getAllUsers());
  }, [dispatch]);


  useEffect(() => {
    if (userId && !currentUser && !isLoading) {
      dispatch(getCurrentUser(userId));
    }
  }, [userId, currentUser, dispatch, isLoading]);

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
            <Route path="/profile" element={<ProfilePage />} />
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
          {/* <Route
            path='offer/:id/modal'
            element={
              <ModalUI onClose={closeModal}>
                <UserOfferModal />
              </ModalUI>
            }
          /> */}
        </Routes>
      )}
    </>
  );
}