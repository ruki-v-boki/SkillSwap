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
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M3.5 14.5c-.2 1.2.7 2.1 1.7 2.6 4 1.6 9.6 1.6 13.7 0 1-.5 1.9-1.4 1.7-2.6q-.3-1.2-1.2-2-.7-1.4-.6-2.7a6.8 6.8 0 0 0-13.5 0q.2 1.4-.6 2.7-.8.8-1.2 2"/>
          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M8.5 18.3A4 4 0 0 0 12 21q2.7-.2 3.6-2.7"/>
        </svg>
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