import styles from './ProfileNavList.module.css';
import { NavLink } from 'react-router-dom';

// ---------------------------------------------------------------

export function ProfileNavListUI() {

  return (
      <ul className={styles.navList}>
        <li>
          <NavLink
            to={'/profile/requests'}
            className={({ isActive }) => isActive ? `${styles.navLink} ${styles.isActive}` : styles.navLink}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
              <path fill="currentColor" d="M16.7 20.2H7.3Q2.2 20 2 15V8.3Q2.2 3.2 7.3 3h9.4q5.1.2 5.3 5.3V15q-.2 5.2-5.3 5.3M7.3 4.4q-3.9 0-3.9 4v6.5q0 4 4 4h9.3q3.9 0 3.9-4V8.3q0-3.9-4-3.9z"/>
              <path fill="currentColor" d="M12 12.4q-1.2 0-2.2-.7L7 9.4a.7.7 0 0 1 .9-1.1l2.9 2.3c.7.6 1.9.6 2.6 0l3-2.3q.4-.4.9 0 .3.7-.1 1l-3 2.4q-.8.7-2.1.7"/>
            </svg>
            <p className='h-body'>Заявки</p>
          </NavLink>
        </li>

        <li>
          <NavLink
            to={'/profile/exchanges'}
            className={({ isActive }) => isActive ? `${styles.navLink} ${styles.isActive}` : styles.navLink}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
              <path fill="currentColor" d="M12 22q-1 0-1.7-.9l-1.4-1.8-.2-.1h-.4c-4 0-6.3-1-6.3-6.3V8.3Q2 2 8.3 2h7.4q6.1 0 6.2 6.3v4.6q0 6.2-6.2 6.3H15l-1.4 2q-.7.8-1.6.8M8.3 3.4q-5-.1-5 4.9v4.6c0 4.2 1.5 4.9 5 4.9h.4q.8 0 1.3.6l1.4 1.9q.6.6 1.1 0l1.4-1.9q.5-.6 1.3-.6h.5q5 0 4.9-4.9V8.3q0-5-5-5z"/>
              <path fill="currentColor" d="M16.6 9H7.3a1 1 0 0 1-.7-.7q.1-.7.7-.7h9.3q.6 0 .7.7t-.7.7m-3.7 4.6H7.3a1 1 0 0 1-.7-.7q.1-.7.7-.7H13q.7 0 .7.7t-.7.7"/>
            </svg>
            <p className='h-body'>Мои обмены</p>
          </NavLink>
        </li>

        <li>
          <NavLink
            to={'/profile/favourites'}
            className={({ isActive }) => isActive ? `${styles.navLink} ${styles.isActive}` : styles.navLink}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
              <path fill="currentColor" d="M12 21q-.5 0-.8-.2C7.6 19.6 2 15.3 2 9a5.9 5.9 0 0 1 10-4.2q1.7-1.6 4.1-1.7A6 6 0 0 1 22 8.9c0 6.4-5.6 10.7-9.2 12zM7.9 4.4c-2.5 0-4.5 2-4.5 4.5 0 6.4 6.1 9.9 8.3 10.6h.7c2-.7 8.2-4.2 8.2-10.6 0-2.5-2-4.5-4.5-4.5q-2.2 0-3.5 1.8-.6.6-1.1 0a4 4 0 0 0-3.6-1.8"/>
            </svg>
            <p className='h-body'>Избранное</p>
          </NavLink>
        </li>

        <li>
          <NavLink
            to={'/profile/my-skills'}
            className={({ isActive }) => isActive ? `${styles.navLink} ${styles.isActive}` : styles.navLink}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M6 15q-.5-1.3-.5-2.8c0-3.7 3-6.7 6.5-6.7 3.6 0 6.5 3 6.5 6.7q0 1.6-.6 2.8M12 2v1m10 9h-1M3 12H2m17-7-.6.6m-12.8 0L5 5m9.6 14.4q1.4-.6 1.5-2.2 0-.5-.4-.5H8.5l-.5.5q0 1.5 1.5 2.2m5 0h-5m5 0q0 2.9-2.5 2.7c-2 0-2.4-1-2.5-2.7"/>
            </svg>
            <p className='h-body'>Мои навыки</p>
          </NavLink>
        </li>

        <li>
          <NavLink
            to={'/profile'}
            className={({ isActive }) => isActive ? `${styles.navLink} ${styles.isActive}` : styles.navLink}
            end
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
              <path fill="currentColor" d="M11.99 12.698a5.356 5.356 0 0 1-5.35-5.35C6.64 4.4 9.04 2 11.99 2c2.948 0 5.348 2.4 5.348 5.349s-2.4 5.349-5.349 5.349m0-9.303A3.96 3.96 0 0 0 8.035 7.35a3.96 3.96 0 0 0 3.954 3.953 3.96 3.96 0 0 0 3.953-3.953 3.96 3.96 0 0 0-3.953-3.954M19.98 22a.703.703 0 0 1-.698-.697c0-3.21-3.274-5.814-7.293-5.814-4.018 0-7.293 2.605-7.293 5.814a.703.703 0 0 1-.698.698.703.703 0 0 1-.697-.698c0-3.972 3.897-7.21 8.688-7.21 4.79 0 8.688 3.238 8.688 7.21a.703.703 0 0 1-.697.698"/>
            </svg>
            <p className='h-body'>Личные данные</p>
          </NavLink>
        </li>
      </ul>
  )
}