import { ProfileSectionUI } from '@/components/ui/ProfileSection';
import { selectCurrentUser } from '@/services/slices/userSlice';
import { ThemeToggler } from '@/components/ui/ThemeToggler';
import { AuthButtonsUI } from '@/components/ui/AuthButtons';
import styles from './ProfileSection.module.css';
import { useSelector } from '@/services/store';
import { useNavigate } from 'react-router-dom';
import { useCallback } from 'react';

// ---------------------------------------------------------------

export function ProfileSection() {

  const navigate = useNavigate();
  const currentUser = useSelector(selectCurrentUser);

// ---------------------------------------------------------------

  const handleLoginClick = useCallback(() => navigate('/login'), [navigate]);
  const handleRegisterClick = useCallback(() => navigate('/register'), [navigate]);

// ---------------------------------------------------------------

  return currentUser ? (
    <ProfileSectionUI user={currentUser} />
  ) : (
    <div className={styles.profileSectionHeaderBox}>
      <ThemeToggler />
      <AuthButtonsUI
        variant="header"
        onLoginClick={handleLoginClick}
        onRegisterClick={handleRegisterClick}
      />
    </div>
  );
};