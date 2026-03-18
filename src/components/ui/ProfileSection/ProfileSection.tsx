import { NotificationsButtonUI } from "../NotificationsButton";
import { ProfileItemUI } from "./ProfileItem/ProfileItem";
import type { ProfileSectionUIProps } from "./type";
import styles from './ProfileSection.module.css';
import heartIcon from '@/assets/icons/like.svg';
import { AuthButtonsUI } from "../AuthButtons";
import { ThemeToggler } from "../ThemeToggler";
import { NavLink } from "react-router-dom";


export function ProfileSectionUI({
  user
}:ProfileSectionUIProps) {
  return (
    <div className={styles.container}>
      {user ? (
        <div className={styles.profileSection}>
          <div className={styles.iconsBox}>
            <ThemeToggler />
            <NotificationsButtonUI />
            <NavLink to="/favorites" className={styles.favouritesButton}>
              <img src={heartIcon} alt="Избранное" />
            </NavLink>
          </div>

          <ProfileItemUI user={user} />
        </div>
      ) : (
        <div className={styles.authBox}>
          <div className={styles.iconsBox}>
            <ThemeToggler />
          </div>

          <AuthButtonsUI variant="profile" />
        </div>
      )}
    </div>
  );
}