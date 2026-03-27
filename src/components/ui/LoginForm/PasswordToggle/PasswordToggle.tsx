import type { PasswordToggleProps } from './type';
import styles from './PasswordToggle.module.css';
import { useState } from 'react';

// ---------------------------------------------------------------

export function PasswordToggle({
  onToggle
}: PasswordToggleProps) {

  const [show, setShow] = useState(false);

// ---------------------------------------------------------------

  const handleClick = () => {
    const newShow = !show;
    setShow(newShow);
    onToggle(newShow);
  };

// ---------------------------------------------------------------

  return (
    <button
      type="button"
      className={styles.passwordToggle}
      onClick={handleClick}
      aria-label={show ? 'Скрыть пароль' : 'Показать пароль'}
    >
      {show ? (
        // Иконка "глаз закрытый"
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M2 2L22 22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          <path d="M6.7 6.7C4.2 8.3 2.5 10.8 2 12c1 2 4 8 10 8 2.1 0 3.9-.6 5.4-1.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          <path d="M15.8 12.5c.1-.2.2-.3.2-.5 0-2.2-1.8-4-4-4-.2 0-.3 0-.5.1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          <path d="M12 8c-2.2 0-4 1.8-4 4 0 .2 0 .4.1.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        </svg>
      ) : (
        // Иконка "глаз открытый"
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" stroke="currentColor" strokeWidth="1.5" fill="none"/>
          <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.5" fill="none"/>
        </svg>
      )}
    </button>
  );
}