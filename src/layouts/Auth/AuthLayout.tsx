import { Outlet } from 'react-router-dom';
import styles from './AuthLayout.module.css';
import { AuthHeaderUI } from '@/components/ui/AuthHeader';


export function AuthLayout() {
  return (
    <div className={styles.layout}>
      <AuthHeaderUI />

      <main className={styles.main}>
        <Outlet />
      </main>

    </div>
  );
}