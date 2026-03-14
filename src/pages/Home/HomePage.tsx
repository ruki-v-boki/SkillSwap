// pages/HomePage/HomePage.tsx
import { useEffect } from 'react';
import {  useSelector } from '@/services/store';
import { selectIsNavOpen } from '@/services/slices/ui/uiSlice';
import styles from './HomePage.module.css'


export function HomePage() {
  const isNavOpen = useSelector(selectIsNavOpen);

  useEffect(() => {
  }, [isNavOpen]);

  return (
    <div className={styles.container}>
      {/* <p>Меню сейчас: {isNavOpen ? '🟢 Открыто' : '⚫ Закрыто'}</p> */}
      <aside className={styles.aside}>
        <h2>Aside</h2>
      </aside>
      <main className={styles.main}>
        <h2>Main</h2>
      </main>
    </div>
  );
}