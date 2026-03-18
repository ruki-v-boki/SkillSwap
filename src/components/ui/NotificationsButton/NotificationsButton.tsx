import bellIcon from '@/assets/icons/Notification.svg';
import styles from './NotificationsButton.module.css';
import { useRef, useState } from 'react';
import { BannerUI } from '../Banner';


export function NotificationsButtonUI() {
  const [isNotificationMenuOpen, setIsNotificationMenuOpen] = useState(false);
  const notificationsButtonRef = useRef<HTMLButtonElement>(null);

  return (
    <>
      <button
        type="button"
        ref={notificationsButtonRef}
        onClick={() => setIsNotificationMenuOpen(!isNotificationMenuOpen)}
        className={styles.notificationsButton}
      >
        <img src={bellIcon} alt="Уведомления" />
      </button>

      <BannerUI
        isOpen={isNotificationMenuOpen}
        onClose={() => setIsNotificationMenuOpen(false)}
        triggerRef={notificationsButtonRef}
        className={styles.notificationsBanner}
        data-testid="notifications-banner"
      >
        <span className="h-2">Здесь будет компонент уведомлений</span>
      </BannerUI>
    </>


  )
}