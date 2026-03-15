import type { ProfileSectionUIProps } from "./type";
import styles from './ProfileSection.module.css'
import { NavLink, useNavigate } from "react-router-dom";
import heartIcon from '@/assets/icons/like.svg'
import bellIcon from '@/assets/icons/Notification.svg'
import { Button } from "../Button";
import { ThemeToggler } from "../ThemeToggler";
import { useRef, useState } from "react";
import { useClickOutside } from "@/hooks/useClickOutside";


export function ProfileSectionUI({ user }: ProfileSectionUIProps) {
  const navigate = useNavigate();

  const [isProfileBannerOpen, setProfileBannerOpen] = useState(false);
  const [isNotificationsBannerOpen, setNotificationsBannerOpen] = useState(false);

  const profileBannerRef = useRef<HTMLDivElement>(null);
  const userInfoRef = useRef<HTMLButtonElement>(null);

  const notificationsRef = useRef<HTMLButtonElement>(null);
  const notificationsBannerRef = useRef<HTMLDivElement>(null);

  useClickOutside(profileBannerRef, () => setProfileBannerOpen(false), userInfoRef);
  useClickOutside(notificationsBannerRef, () => setNotificationsBannerOpen(false), notificationsRef);

  return (
    <div className={styles.container}>
      {user ? (
        // -------------- ВСЕ ИКОНКИ --------------
        <div className={styles.profileSection}>
          <div className={styles.iconsBox}>
            <ThemeToggler />


            {/* TO-DO переделать кнопку */}
            <button
              type="button"
              ref={notificationsRef}
              onClick={() => setNotificationsBannerOpen(!isNotificationsBannerOpen)}
              className={styles.notificationsButton}
            >
              <img src={bellIcon} alt="Уведомления" />
            </button>
            {/* TO-DO переделать кнопку */}


            <NavLink to="/favorites" className={styles.favouritesButton}>
              <img src={heartIcon} alt="Избранное" />
            </NavLink>
          </div>

        {/* // -------------- ИМЯ И ФОТОГРАФИЯ ПРОФИЛЯ -------------- */}
          <button
            ref={userInfoRef}
            type="button"
            onClick={() => setProfileBannerOpen(!isProfileBannerOpen)}
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

        {/* // -------------- БАННЕР ПРОФИЛЯ -------------- */}
          {isProfileBannerOpen && (
            <div ref={profileBannerRef} className={styles.profileBanner}>
              <NavLink
                to={'/profile'}
                className={styles.profileLink}
                onClick={() => setProfileBannerOpen(false)}
              >
                  Личный кабинет
              </NavLink>
              <Button
                type="button"
                className={styles.logoutButton}
                variant={'link'}
                onClick={() => setProfileBannerOpen(false)}
              >
                Выйти из аккаунта
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path fill="currentColor"  d="M8.9 22q6.5.1 6.9-5.5a.7.7 0 1 0-1.5-.2c-.3 3.1-1.7 4.2-5.3 4.2h-.1c-4 0-5.4-1.4-5.4-5.3V8.8c0-4 1.4-5.3 5.4-5.3 3.7 0 5.1 1.1 5.4 4.2a.7.7 0 0 0 1.5 0Q15.3 1.8 9 2h-.1C4 2 2 4 2 8.8v6.4C2 20 4 22 9 22"/>
                  <path fill="currentColor"  d="M9.1 12.7h11q.8 0 .8-.7t-.7-.7H9q-.6 0-.7.7t.7.7"/>
                  <path fill="currentColor"  d="M18 16q.3 0 .5-.2l3.3-3.3q.4-.5 0-1l-3.3-3.3a1 1 0 0 0-1 0q-.4.6 0 1l2.7 2.8-2.7 2.7q-.4.6 0 1 .2.3.5.3"/>
                </svg>
              </Button>
            </div>
          )}

        {/* // -------------- БАННЕР УВЕДОМЛЕНИЙ -------------- */}
          {isNotificationsBannerOpen && (
          <div ref={notificationsBannerRef} className={styles.notificationsBanner}>
            <span className={`h-2`}>Здесь будет баннер уведомлений</span>
          </div>
        )}
        </div>

      ) : (
        // -------------- ТОЛЬКО КНОПКА ТЕМЫ --------------
        <div className={styles.authBox}>
          <div className={styles.iconsBox}>
            <ThemeToggler />
          </div>

        {/* // -------------- КНОПКИ АВТОРИЗАЦИИ -------------- */}
          <div className={styles.authButtonsBox}>
            <Button
              type="button"
              variant="outline"
              onClick={() => navigate('/login')}
              className={`${styles.loginButton} h-body`}
            >
              Войти
            </Button>
            <Button
              type="button"
              variant="prime"
              onClick={() => navigate('/register')}
              className={`${styles.registerButton} h-body`}
            >
              Зарегистрироваться
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}