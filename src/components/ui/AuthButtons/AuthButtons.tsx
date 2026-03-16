import styles from './AuthButtons.module.css';
import { useNavigate } from 'react-router-dom';
import type { AuthButtonsUIProps } from './type';
import { Button } from '../Button';


export function AuthButtonsUI({ variant }: AuthButtonsUIProps) {
  const navigate = useNavigate();

  const containerClass = variant === 'profile'
    ? styles.authButtonsBoxProfile
    : styles.authButtonsBoxForm;

  return (
    <div className={containerClass}>
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
  );
}