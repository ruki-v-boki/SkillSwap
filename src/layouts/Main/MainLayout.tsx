import { HeaderUI } from '@/components/ui/Header/Header';
import { FooterUI } from '@/components/ui/Footer';
import styles from './MainLayout.module.css';
import { Outlet } from 'react-router-dom';

// ---------------------------------------------------------------

export function MainLayout() {
  return (
    <div className={styles.layout}>
      <HeaderUI />

      <main className={styles.main}>
        <Outlet />
      </main>

      <FooterUI />
    </div>
  );
};