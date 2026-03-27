import type { ProfileItemUIProps } from './type';
import { ProfileMenuUI } from '../ProfileMenu';
import styles from './ProfileItem.module.css';
import { useRef, useState } from 'react';
import { BannerUI } from '../../Banner';

// ---------------------------------------------------------------

export function ProfileItemUI ({
  user
}: ProfileItemUIProps) {

  const [isProfileItemOpen, setIsProfileItemOpen] = useState(false);
  const profileItemButtonRef = useRef<HTMLButtonElement>(null);

// ---------------------------------------------------------------

  return (
    <>
      <button
        ref={profileItemButtonRef}
        type="button"
        onClick={() => setIsProfileItemOpen(!isProfileItemOpen)}
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

{/* // --------------------------------------------------------------- */}

      <BannerUI
        isOpen={isProfileItemOpen}
        onClose={() => setIsProfileItemOpen(false)}
        triggerRef={profileItemButtonRef}
        className={styles.profileBanner}
        data-testid="profile-banner"
      >
        <ProfileMenuUI onLinkClick={() => setIsProfileItemOpen(false)}/>
      </BannerUI>

    </>
  );
};

ProfileItemUI.displayName = 'ProfileItemUI';