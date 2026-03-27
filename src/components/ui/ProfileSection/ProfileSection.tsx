import { selectUnreadCount } from "@/services/slices/notificationsSlice";
import { NotificationsButtonUI } from "../NotificationsButton";
import { ProfileItemUI } from "./ProfileItem/ProfileItem";
import type { ProfileSectionUIProps } from "./type";
import styles from './ProfileSection.module.css';
import { ThemeToggler } from "../ThemeToggler";
import { useSelector } from "@/services/store";
import { NavLink } from "react-router-dom";

// ---------------------------------------------------------------

export function ProfileSectionUI({
  user
}: ProfileSectionUIProps) {

  const unreadCount = useSelector(selectUnreadCount);

// ---------------------------------------------------------------

  return (
    <div className={styles.container}>
      {user && (
        <div className={styles.profileSection}>
          <div className={styles.iconsBox}>
            <ThemeToggler />
            <NotificationsButtonUI
              unreadCount={unreadCount}
            />
            <NavLink to="/profile/favourites" className={styles.favouritesButton}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path fill="currentColor" d="M12 21q-.5 0-.8-.2C7.6 19.6 2 15.3 2 9a5.9 5.9 0 0 1 10-4.2q1.7-1.6 4.1-1.7A6 6 0 0 1 22 8.9c0 6.4-5.6 10.7-9.2 12zM7.9 4.4c-2.5 0-4.5 2-4.5 4.5 0 6.4 6.1 9.9 8.3 10.6h.7c2-.7 8.2-4.2 8.2-10.6 0-2.5-2-4.5-4.5-4.5q-2.2 0-3.5 1.8-.6.6-1.1 0a4 4 0 0 0-3.6-1.8"/>
              </svg>
            </NavLink>
          </div>

          <ProfileItemUI user={user} />
        </div>
      )}
    </div>
  );
}