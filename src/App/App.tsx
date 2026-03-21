import { useEffect } from 'react';
import { useDispatch, useSelector } from '@/services/store';
import { getAllUsers, selectAllUsers, selectUserIsLoading } from '@/services/slices/users/userSlice';
import {
  checkAuth,
  // selectIsAuthChecked
} from '@/services/slices/auth/authSlice';
import { UserCardModal } from '@/components/ui/Modal/UserCardModal/UserCardModal';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { NotFoundPage, ServerErrorPage } from '@/pages/Error';
import { SkillsPage } from '@/pages/Skills/SkillsPage';
import { MainLayout } from '@/layouts/Main/MainLayout';
import { HomePage } from '@/pages/Home/HomePage';
import { ModalUI } from '@/components/ui/Modal';
import { ContactsPage } from '@/pages/Contacts';
import { PolicyPage } from '@/pages/Policy';
import { TermsPage } from '@/pages/Terms';
import { AboutPage } from '@/pages/About';
import { BlogPage } from '@/pages/Blog';
import { RegisterPage } from '@/pages/Auth/Register/RegisterPage';
import { AuthLayout } from '@/layouts/Auth/AuthLayout';
import { LoginPage } from '@/pages/Auth/Login';


export function App() {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const background = location.state?.background;
  const closeModal = () => navigate(-1);

  // Селекторы
  const allUsers = useSelector(selectAllUsers);
  const isLoading = useSelector(selectUserIsLoading);
  // const isAuthChecked = useSelector(selectIsAuthChecked);


  useEffect(() => {
    dispatch(checkAuth());

    if (allUsers.length === 0 && !isLoading) {
      dispatch(getAllUsers());
    }
  }, [dispatch, allUsers.length, isLoading]);


  return (
    <>
      <Routes location={background || location}>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<HomePage />} />
          <Route path="home" element={<HomePage />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="skills" element={<SkillsPage />} />
          <Route path="contacts" element={<ContactsPage />} />
          <Route path="blog" element={<BlogPage />} />
          <Route path="policy" element={<PolicyPage />} />
          <Route path="terms" element={<TermsPage />} />
          <Route path="500" element={<ServerErrorPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>

        <Route path="/auth" element={<AuthLayout />}>
          <Route index element={<LoginPage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="register" element={<RegisterPage />} />
        </Route>
      </Routes>

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