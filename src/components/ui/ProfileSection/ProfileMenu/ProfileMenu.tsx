import { logout, selectIsAuthLoading } from '@/services/slices/authSlice';
// import { selectCurrentUser } from '@/services/slices/userSlice';
import { useDispatch, useSelector } from '@/services/store';
import { NavLink } from 'react-router-dom';
import type { ProfileMenuUIProps } from './type';
import styles from './ProfileMenu.module.css';


export function ProfileMenuUI({
  onLinkClick
}: ProfileMenuUIProps) {

  const dispatch = useDispatch();
  // const navigate = useNavigate();
  const isLoading = useSelector(selectIsAuthLoading);
  // const user = useSelector(selectCurrentUser)

// ---------------------------------------------------------------

  const handleLogout = async () => {
    try {
      await dispatch(logout()).unwrap();
      onLinkClick();
      // navigate('/');
      console.log('logout success');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

// ---------------------------------------------------------------

  return (
    <>
      <NavLink
        to={'/profile'}
        className={styles.profileLink}
        onClick={() => onLinkClick()}
      >
        Личный кабинет
      </NavLink>

      <button
        type="button"
        className={styles.logoutButton}
        onClick={handleLogout}
        disabled={isLoading}
      >
        {isLoading ? 'Выход...' : 'Выйти из аккаунта'}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path fill="currentColor" d="M8.9 22q6.5.1 6.9-5.5a.7.7 0 1 0-1.5-.2c-.3 3.1-1.7 4.2-5.3 4.2h-.1c-4 0-5.4-1.4-5.4-5.3V8.8c0-4 1.4-5.3 5.4-5.3 3.7 0 5.1 1.1 5.4 4.2a.7.7 0 0 0 1.5 0Q15.3 1.8 9 2h-.1C4 2 2 4 2 8.8v6.4C2 20 4 22 9 22"/>
          <path fill="currentColor" d="M9.1 12.7h11q.8 0 .8-.7t-.7-.7H9q-.6 0-.7.7t.7.7"/>
          <path fill="currentColor" d="M18 16q.3 0 .5-.2l3.3-3.3q.4-.5 0-1l-3.3-3.3a1 1 0 0 0-1 0q-.4.6 0 1l2.7 2.8-2.7 2.7q-.4.6 0 1 .2.3.5.3"/>
        </svg>
      </button>
    </>
  );
}