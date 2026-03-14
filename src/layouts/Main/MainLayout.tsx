import { Outlet } from 'react-router-dom';
import { HeaderUI } from '@/components/ui/Header/Header';
import styles from './MainLayout.module.css';

export function MainLayout() {
  return (
    <div className={styles.layout}>
      {/* Хедер на всех страницах */}
      <HeaderUI />
      
      {/* Основной контент - сюда будут подставляться страницы */}
      <main className={styles.main}>
        <Outlet />
      </main>


      {/* <Footer /> */}
    </div>
  );
}