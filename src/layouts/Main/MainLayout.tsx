import { Outlet } from 'react-router-dom';
import { HeaderUI } from '@/components/ui/Header/Header';
import styles from './MainLayout.module.css';
import { FooterUI } from '@/components/ui/Footer';


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
}