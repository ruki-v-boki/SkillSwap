import { ProfileSectionUI } from '@/components/ui/ProfileSection';

import { AuthButtonsUI } from '@/components/ui/AuthButtons';
import { useSelector } from '@/services/store';
import { useNavigate } from 'react-router-dom';
import { ThemeToggler } from '@/components/ui/ThemeToggler';
import styles from './ProfileSection.module.css';
import { selectCurrentUser } from '@/services/slices/userSlice';


export function ProfileSection() {
  const currentUser = useSelector(selectCurrentUser);
  const navigate = useNavigate();

  if (currentUser) {
    return <ProfileSectionUI user={currentUser} />;
  }

  return (
    <div className={styles.profileSectionHeaderBox}>
      <ThemeToggler />
      <AuthButtonsUI
        variant="header"
        onLoginClick={() => navigate('/auth/login')}
        onRegisterClick={() => navigate('/auth/register')}
      />
    </div>
  )
}