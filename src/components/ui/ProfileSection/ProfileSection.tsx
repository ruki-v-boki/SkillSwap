import { useDispatch, useSelector } from "@/services/store";
import bellIcon from '@/assets/icons/Notification.svg';
import type { ProfileSectionUIProps } from "./type";
import styles from './ProfileSection.module.css';
import heartIcon from '@/assets/icons/like.svg';
import { AuthButtonsUI } from "../AuthButtons";
import { ThemeToggler } from "../ThemeToggler";
import { ProfileMenuUI } from "./ProfileMenu";
import { ProfileUI } from "./Profile/Profile";
import { NavLink } from "react-router-dom";
import { BannerUI } from "../Banner";
import { useRef } from "react";
import {
  selectIsNotificationMenuOpen,
  selectIsProfileMenuOpen,
  toggleNotificationMenu,
  toggleProfileMenu
} from "@/services/slices/ui/uiSlice";


export function ProfileSectionUI({ user }: ProfileSectionUIProps) {
  const dispatch = useDispatch();
  const isProfileMenuOpen = useSelector(selectIsProfileMenuOpen);
  const isNotificationsOpen = useSelector(selectIsNotificationMenuOpen);
  const profileButtonRef = useRef<HTMLButtonElement>(null);
  const notificationsButtonRef = useRef<HTMLButtonElement>(null);

  return (
    <div className={styles.container}>
      {user ? (
        <div className={styles.profileSection}>

          {/* -------------- ВСЕ ИКОНКИ -------------- */}
          <div className={styles.iconsBox}>
            <ThemeToggler />

            {/* TO-DO отдельный компонент кнопки */}
            <button
              type="button"
              ref={notificationsButtonRef}
              onClick={() => dispatch(toggleNotificationMenu())}
              className={styles.notificationsButton}
            >
              <img src={bellIcon} alt="Уведомления" />
            </button>
            {/* TO-DO отдельный компонент кнопки */}

            <NavLink to="/favorites" className={styles.favouritesButton}>
              <img src={heartIcon} alt="Избранное" />
            </NavLink>
          </div>

          {/* -------------- ПРОФИЛЬ -------------- */}
          <ProfileUI
            user={user}
            ref={profileButtonRef}
          />

          {/* -------------- БАННЕР УВЕДОМЛЕНИЙ -------------- */}
          <BannerUI
            isOpen={isNotificationsOpen}
            onClose={() => dispatch(toggleNotificationMenu())}
            triggerRef={notificationsButtonRef}
            className={styles.notificationsBanner}
            data-testid="notifications-banner"
          >
            <span className="h-2">Здесь будут уведомления</span>
          </BannerUI>

          {/* -------------- БАННЕР ПРОФИЛЯ -------------- */}
          <BannerUI
            isOpen={isProfileMenuOpen}
            onClose={() => dispatch(toggleProfileMenu())}
            triggerRef={profileButtonRef}
            className={styles.profileBanner}
            data-testid="profile-banner"
          >
            <ProfileMenuUI />
          </BannerUI>

        </div>
      ) : (
        <div className={styles.authBox}>

          {/* -------------- ТОЛЬКО КНОПКА ТЕМЫ -------------- */}
          <div className={styles.iconsBox}>
            <ThemeToggler />
          </div>

          {/* -------------- КНОПКИ АВТОРИЗАЦИИ -------------- */}
          <AuthButtonsUI
            variant="profile"
          />
        </div>
      )}
    </div>
  );
}