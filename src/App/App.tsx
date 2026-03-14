import { Routes, Route } from 'react-router-dom';
import { MainLayout } from '@/layouts/Main/MainLayout';
import { HomePage } from '@/pages/Home/HomePage';
import { AboutPage } from '@/pages/About';

export function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<HomePage />} />
      </Route>
      <Route path="/home" element={<MainLayout />}>
        <Route index element={<HomePage />} />
      </Route>
      <Route path="/about" element={<MainLayout />}>
        <Route index element={<AboutPage />} />
      </Route>
    </Routes>
  );
}