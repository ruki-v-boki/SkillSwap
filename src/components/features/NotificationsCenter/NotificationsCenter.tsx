import { clearNotifications, markAllAsRead, markAsRead, selectNotifications } from '@/services/slices/notificationsSlice';
import { useRealtimeNotifications } from '@/hooks/useRealtimeNotifications';
import { useDispatch, useSelector } from '@/services/store';
import { selectUserId } from '@/services/slices/authSlice';
import { NavLink, useNavigate } from 'react-router-dom';
import styles from './NotificationsCenter.module.css';

// ---------------------------------------------------------------

export function NotificationCenter() {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const currentUserId = useSelector(selectUserId)
  const notifications = useSelector(selectNotifications);

  const unreadNotifications = notifications.filter(n => !n.isRead);
  const readNotifications = notifications.filter(n => n.isRead);

// ---------------------------------------------------------------

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return 'только что';
    if (diffMins < 60) return `${diffMins} мин. назад`;
    if (diffHours < 24) return `${diffHours} ч. назад`;
    if (diffDays === 1) return 'вчера';
    return `${diffDays} дн. назад`;
  };

// ---------------------------------------------------------------

  useRealtimeNotifications(currentUserId);

// ---------------------------------------------------------------

  const handleNotificationClick = (notificationId: string, link?: string) => {
    if (link) navigate(link)
    dispatch(markAsRead(notificationId));
  };

// ---------------------------------------------------------------

  const handleMarkAllRead = () => {
    if (currentUserId) dispatch(markAllAsRead(currentUserId));
  };

// ---------------------------------------------------------------

  const handleClearRead = () => {
    if (currentUserId) dispatch(clearNotifications())
  };

// ---------------------------------------------------------------

  const getIcon = (type: string) => {
    switch (type) {
      case 'offer': return (
        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="none" viewBox="0 0 40 40">
          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M10.2 25q-1-2.2-1-4.7A11 11 0 0 1 20 9.2c6 0 10.8 5 10.8 11.1q0 2.4-1 4.7M20 3.3V5m16.7 15H35M5 20H3.3M31.8 8.2l-1.2 1.2m-21.2 0L8.2 8.2m16 24q2.4-1.1 2.5-3.7 0-.7-.7-.8H14a1 1 0 0 0-.8.9c.2 1.5.7 2.7 2.5 3.6m8.4 0h-8.4m8.4 0c-.2 3.2-1.1 4.5-4.2 4.5-3.2 0-4-1.6-4.2-4.5"/>
        </svg>
      );
      case 'acceptOffer': return (
        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="none" viewBox="0 0 24 24">
          <path fill="currentColor" d="M12 22q-1 0-1.7-.9l-1.4-1.8-.2-.1h-.4c-4 0-6.3-1-6.3-6.3V8.3Q2 2 8.3 2h7.4q6.1 0 6.2 6.3v4.6q0 6.2-6.2 6.3H15l-1.4 2q-.7.8-1.6.8M8.3 3.4q-5-.1-5 4.9v4.6c0 4.2 1.5 4.9 5 4.9h.4q.8 0 1.3.6l1.4 1.9q.6.6 1.1 0l1.4-1.9q.5-.6 1.3-.6h.5q5 0 4.9-4.9V8.3q0-5-5-5z"/>
          <path fill="currentColor" d="M16.6 9H7.3a1 1 0 0 1-.7-.7q.1-.7.7-.7h9.3q.6 0 .7.7t-.7.7m-3.7 4.6H7.3a1 1 0 0 1-.7-.7q.1-.7.7-.7H13q.7 0 .7.7t-.7.7"/>
        </svg>
      );
      default: return (
        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="none" viewBox="0 0 40 40">
          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M10.2 25q-1-2.2-1-4.7A11 11 0 0 1 20 9.2c6 0 10.8 5 10.8 11.1q0 2.4-1 4.7M20 3.3V5m16.7 15H35M5 20H3.3M31.8 8.2l-1.2 1.2m-21.2 0L8.2 8.2m16 24q2.4-1.1 2.5-3.7 0-.7-.7-.8H14a1 1 0 0 0-.8.9c.2 1.5.7 2.7 2.5 3.6m8.4 0h-8.4m8.4 0c-.2 3.2-1.1 4.5-4.2 4.5-3.2 0-4-1.6-4.2-4.5"/>
        </svg>
      );
    }
  };

// ---------------------------------------------------------------

  return (
    <div className={styles.mainContainer}>

      {/* Новые уведомления */}
      <section className={styles.section}>
        <header className={styles.sectionHeader}>
          <p className='h-2'
          >
            Новые уведомления
          </p>
          {unreadNotifications.length > 0 && (
            <button
              type='button'
              onClick={handleMarkAllRead}
              className={`${styles.listButton} h-4`}
            >
              Прочитать все
            </button>
          )}
        </header>

        {unreadNotifications.length === 0 ? (
          <div className={styles.emptyState}>
            <p className='h-body'
            >
              Нет новых уведомлений
            </p>
          </div>
        ) : (
          <ul className={styles.list}>
            {unreadNotifications.map(notification => (
              <li
                key={notification.id}
                className={styles.notificationItem}
              >
                <header className={styles.header}>
                  <div className={styles.content}>
                    {getIcon(notification.type)}
                    <div className={styles.message}>
                      <p className='h-body'
                      >
                        {notification.title}
                      </p>
                      <p className='h-caption'
                      >
                        {notification.message}
                      </p>
                    </div>
                  </div>
                  <div className={`${styles.time} h-body`}>
                    {formatDate(notification.created_at)}
                  </div>
                </header>

                <NavLink
                  to={notification.link || '#'}
                  className={`${styles.link} h-body`}
                  onClick={() => handleNotificationClick(notification.id, notification.link)}
                >
                  Перейти
                </NavLink>
              </li>
            ))}
          </ul>
        )}
      </section>

      {/* Просмотренные уведомления */}
      <section className={styles.section}>
        <header className={styles.sectionHeader}>
          <p className='h-2'
          >
            Просмотренные
          </p>
          {readNotifications.length > 0 && (
            <button
              type='button'
              onClick={handleClearRead}
              className={`${styles.listButton} h-4`}
            >
              Очистить
            </button>
          )}
        </header>

        {readNotifications.length === 0 ? (
          <div className={styles.emptyState}>
            <span>
              Нет просмотренных уведомлений
            </span>
          </div>
        ) : (
          <ul className={styles.list}>
            {readNotifications.map(notification => (
              <li
                key={notification.id}
                className={styles.notificationItem}
              >
                <header className={styles.header}>
                  <div className={styles.content}>
                    {getIcon(notification.type)}
                    <div className={styles.message}>
                      <p className='h-body'
                      >
                        {notification.title}
                      </p>
                      <p className='h-caption'
                      >
                        {notification.message}
                      </p>
                    </div>
                  </div>
                  <div className={`${styles.time} h-body`}>
                    {formatDate(notification.created_at)}
                  </div>
                </header>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}