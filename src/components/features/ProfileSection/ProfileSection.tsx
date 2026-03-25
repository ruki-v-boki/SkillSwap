import { AuthButtonsUI } from '@/components/ui/AuthButtons';
import styles from './ProfileSection.module.css';
import { ProfileSectionUI } from '@/components/ui/ProfileSection';
import { ThemeToggler } from '@/components/ui/ThemeToggler';
// import { selectUserId } from '@/services/slices/authSlice';
import { selectCurrentUser } from '@/services/slices/userSlice';
import { useSelector } from '@/services/store';
// import { useEffect, useLayoutEffect } from 'react';
import { useNavigate } from 'react-router-dom';


export function ProfileSection() {
  // const dispatch = useDispatch();
  const navigate = useNavigate();
  // const userId = useSelector(selectUserId);
  const currentUser = useSelector(selectCurrentUser);

// --------------------------------------------------
console.log('🔍 ProfileSection render, currentUser:', currentUser);

  // useLayoutEffect(() => {
  //   if (!userId && currentUser) {
  //     dispatch(clearCurrentUser());
  //   }
  // }, [userId, currentUser, dispatch]);

  // useLayoutEffect(() => {
  //   if (!userId && currentUser) {
  //     dispatch(clearCurrentUser());
  //   }
  // }, [userId, currentUser, dispatch]);

// --------------------------------------------------

  // useEffect(() => {
  //   if (userId && !currentUser) {
  //     dispatch(getCurrentUser(userId));
  //   }
  // }, [userId, currentUser, dispatch]);

// --------------------------------------------------

  // if (currentUser && currentUser.id === userId) {
  //   return <ProfileSectionUI user={currentUser} />;
  // }

  if (currentUser) {
    console.log('✅ Показываем профиль');
    return <ProfileSectionUI user={currentUser} />;
  }

// --------------------------------------------------

  if (!currentUser) {
    console.log('❌ Показываем кнопки входа');
    return (
      <div className={styles.profileSectionHeaderBox}>
        <ThemeToggler />
        <AuthButtonsUI
          variant="header"
          onLoginClick={() => navigate('/login')}
          onRegisterClick={() => navigate('/register')}
        />
      </div>
    );
  }

  return null;
}