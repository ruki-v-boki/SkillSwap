import { AuthHeaderUI } from '@/components/ui/AuthHeader';
import styles from './AuthLayout.module.css';
import { Outlet } from 'react-router-dom';

// ---------------------------------------------------------------

export function AuthLayout() {
  return (
    <div className={styles.layout}>
      <AuthHeaderUI />

      <main className={styles.main}>
        <Outlet />
      </main>

    </div>
  );
};