import { ProfileNavListUI } from '@/components/ui/ProfileNavList';
import styles from './ProfilePage.module.css';
import { Outlet } from 'react-router-dom';

// ---------------------------------------------------------------

export function ProfilePage() {
  return (
    <main className={styles.profilePage}>
      <section className={styles.profilePageMenu}>
        <ProfileNavListUI />
      </section>

      <section className={styles.profileDetails}>
        <Outlet />
      </section>
    </main>
  );
}