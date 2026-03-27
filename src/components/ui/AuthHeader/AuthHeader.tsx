import { Button } from '@/components/ui/Button';
import { useNavigate } from 'react-router-dom';
import { LogoUI } from '@/components/ui/Logo';
import styles from './AuthHeader.module.css';

// ---------------------------------------------------------------

export function AuthHeaderUI() {

  const navigate = useNavigate()

// ---------------------------------------------------------------

  const onCloseButtonClick = () => {
    navigate('/')
  }

// ---------------------------------------------------------------

  return (
      <header className={styles.header}>
        <LogoUI />
        <Button
          variant='base'
          type='button'
          onClick={onCloseButtonClick}
          className={styles.closeButton}
        >
          Закрыть
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
            <path fill="currentColor" d="m16.7 8.3-8.4 8.5q-.6.4-1.1 0a1 1 0 0 1 0-1l8.5-8.6q.6-.5 1 0t0 1"/>
            <path fill="currentColor" d="M16.7 16.8q-.4.4-1 0L7.2 8.3a1 1 0 0 1 0-1q.6-.6 1 0l8.5 8.4q.4.6 0 1"/>
          </svg>
        </Button>
      </header>
  )
}