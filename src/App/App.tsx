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


export function App() {
  const location = useLocation();
  const navigate = useNavigate();
  const background = location.state?.background;
  const closeModal = () => navigate(-1);

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