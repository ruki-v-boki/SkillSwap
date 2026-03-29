import { WelcomeModalUI } from '@/components/ui/Modal/WelcomeModal';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { ProfileNavListUI } from '@/components/ui/ProfileNavList';
import { ModalUI } from '@/components/ui/Modal';
import styles from './ProfilePage.module.css';
import { useEffect, useState } from 'react';

// ---------------------------------------------------------------

export function ProfilePage() {
  const location = useLocation();
  const navigate = useNavigate();
  const [showWelcomeModal, setShowWelcomeModal] = useState(false);

// ---------------------------------------------------------------

  useEffect(() => {
    if (location.state?.showWelcomeModal) {
      setShowWelcomeModal(true);
      // Очищаем state, чтобы при обновлении страницы модалка не появлялась
      navigate(location.pathname, { replace: true, state: {} });
    }
  }, [location, navigate]);

// ---------------------------------------------------------------

  const handleCloseModal = () => {
    setShowWelcomeModal(false);
  };

// ---------------------------------------------------------------

  return (
    <>
      <main className={styles.profilePage}>
        <section className={styles.profilePageMenu}>
          <ProfileNavListUI />
        </section>

        <section className={styles.profileDetails}>
          <Outlet />
        </section>
      </main>

      {showWelcomeModal && (
        <ModalUI onClose={handleCloseModal}>
          <WelcomeModalUI
            onClose={handleCloseModal}
          />
        </ModalUI>
      )}
    </>
  )
}