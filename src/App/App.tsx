import { NotFoundPage, ServerErrorPage } from '@/pages/Error';
import { SkillsPage } from '@/pages/Skills/SkillsPage';
import { MainLayout } from '@/layouts/Main/MainLayout';
import { HomePage } from '@/pages/Home/HomePage';
import { Routes, Route } from 'react-router-dom';
import { ContactsPage } from '@/pages/Contacts';
import { PolicyPage } from '@/pages/Policy';
import { TermsPage } from '@/pages/Terms';
import { AboutPage } from '@/pages/About';
import { BlogPage } from '@/pages/Blog';


export function App() {
  return (
    <Routes>
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
  );
}