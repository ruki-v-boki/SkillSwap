import type { ProfileSectionUIProps } from "./type";
import styles from './ProfileSection.module.css'
import { NavLink, useNavigate } from "react-router-dom";
import heartIcon from '@/assets/icons/like.svg'
import { Button } from "../Button";
import { ThemeToggler } from "../ThemeToggler";

export function ProfileSectionUI({ user }: ProfileSectionUIProps) {
  const navigate = useNavigate();

  return (
    <div className={styles.container}>
      {user ? (
        <div className={styles.iconsBox}>
          <ThemeToggler />
          {/* <NotificationButton /> */}
          <NavLink to="/favorites" className={styles.favouritesButton}>
            <img
              src={heartIcon}
              alt="Избранное"
              className={styles.heartIcon}
            />
          </NavLink>
        </div>
      ) : (
        <div className={styles.authBox}>
          <div className={styles.iconsBox}>
            <ThemeToggler />
          </div>
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
      )}
    </div>
  );
}