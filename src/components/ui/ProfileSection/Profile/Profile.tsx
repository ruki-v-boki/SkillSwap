import { forwardRef } from 'react';
import { useDispatch } from '@/services/store';
import styles from './Profile.module.css';
import type { ProfileUIProps } from './type';
import { toggleProfileMenu } from '@/services/slices/ui/uiSlice';


export const ProfileUI = forwardRef<HTMLButtonElement, ProfileUIProps>(({ user }, ref) => {
  const dispatch = useDispatch();

  return (
    <button
      ref={ref}
      type="button"
      onClick={() => dispatch(toggleProfileMenu())}
      className={styles.userInfo}
    >
      <span className={`${styles.userName} h-body`}>
        {user.name}
      </span>

      <div className={styles.userAvatarBox}>
        <img
          src={user.avatar}
          className={styles.userAvatar}
          alt={`фотография пользователя ${user.name}`}
        />
      </div>
    </button>
  );
});

ProfileUI.displayName = 'ProfileUI';