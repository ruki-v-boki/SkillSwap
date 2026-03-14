import { useEffect } from 'react';
import {  useSelector } from '@/services/store';
import { selectIsNavOpen } from '@/services/slices/ui/uiSlice';
import styles from './HomePage.module.css'
import { MOCK_USERS } from '@/mock/users';
import { CardUI } from '@/components/ui/Card';


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
        <CardUI user={MOCK_USERS[0]} type='catalog'/>
        <CardUI user={MOCK_USERS[1]} type='catalog'/>
        <CardUI user={MOCK_USERS[3]} type='catalog'/>
        {/* <CardUI user={MOCK_USERS[1]} type='catalog'/>
        <CardUI user={MOCK_USERS[0]} type='catalog'/> */}
      </main>


    </div>
  );
}