import { ProfileSectionUI } from '@/components/ui/ProfileSection';
import { selectCurrentUser } from '@/services/slices/userSlice';
import { AuthButtonsUI } from '@/components/ui/AuthButtons';
import styles from './ProfileSection.module.css';
import { getCachedUser } from '@/utils/helpers';
import { useSelector } from '@/services/store';
import { useNavigate } from 'react-router-dom';
import { useCallback } from 'react';

// ---------------------------------------------------------------

export function ProfileSection() {

  const navigate = useNavigate();
  const cachedUser = getCachedUser();
  const currentUser = useSelector(selectCurrentUser);
  const userToShow = currentUser || cachedUser;

// ---------------------------------------------------------------

  const handleLoginClick = useCallback(() => navigate('/login'), [navigate]);
  const handleRegisterClick = useCallback(() => navigate('/register'), [navigate]);

// ---------------------------------------------------------------

  return (
    <div className={styles.profileSectionHeaderBox}>
      {userToShow ? (
        <ProfileSectionUI user={userToShow} />
      ) : (
        <AuthButtonsUI
          variant="header"
          onLoginClick={handleLoginClick}
          onRegisterClick={handleRegisterClick}
        />
      )}
    </div>
  );
}