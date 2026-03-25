import { AuthButtonsUI } from '@/components/ui/AuthButtons';
import styles from './ProfileSection.module.css';
import { ProfileSectionUI } from '@/components/ui/ProfileSection';
import { ThemeToggler } from '@/components/ui/ThemeToggler';
import { selectUserId } from '@/services/slices/authSlice';
import { clearCurrentUser, getCurrentUser, selectCurrentUser } from '@/services/slices/userSlice';
import { useDispatch, useSelector } from '@/services/store';
import { useEffect, useLayoutEffect } from 'react';
import { useNavigate } from 'react-router-dom';


export function ProfileSection() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userId = useSelector(selectUserId);
  const currentUser = useSelector(selectCurrentUser);

// --------------------------------------------------

  useLayoutEffect(() => {
    if (!userId && currentUser) {
      dispatch(clearCurrentUser());
    }
  }, [userId, currentUser, dispatch]);

// --------------------------------------------------

  useEffect(() => {
    if (userId && !currentUser) {
      dispatch(getCurrentUser(userId));
    }
  }, [userId, currentUser, dispatch]);

// --------------------------------------------------

  if (currentUser && currentUser.id === userId) {
    return <ProfileSectionUI user={currentUser} />;
  }

// --------------------------------------------------

  if (!userId) {
    return (
      <div className={styles.profileSectionHeaderBox}>
        <ThemeToggler />
        <AuthButtonsUI
          variant="header"
          onLoginClick={() => navigate('/auth/login')}
          onRegisterClick={() => navigate('/auth/register')}
        />
      </div>
    );
  }

  return null;
}