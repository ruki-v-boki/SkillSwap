import { Button } from '../Button';
import styles from './AuthForm.module.css';
import type { AuthFormUIProps } from './type';
import googleIcon from '@/assets/icons/Google.svg';
import appleIcon from '@/assets/icons/Apple.svg';
import { Input } from '../Input';
import { AuthButtonsUI } from '../AuthButtons';
import { useNavigate } from 'react-router-dom';


export function AuthFormUI ({ variant }:AuthFormUIProps) {
  const navigate = useNavigate();

  return (
    <div className={styles.authFormContainer}>
      <div className={styles.oAuthButtonsBox}>
        <Button
          type='button'
          variant='outline'
          fullWidth
          onClick={() => console.log('кнопка "Продолжить с Google" кликнута')}
          className={`${styles.oAuthButton} h-body`}
        >
          <img src={googleIcon} alt="google" className={styles.oAuthButtonIcon} />
          Продолжить с Google
        </Button>
        <Button
          type='button'
          variant='outline'
          fullWidth
          onClick={() => console.log('кнопка "Продолжить с Apple" кликнута')}
          className={`${styles.oAuthButton} h-body`}
        >
          <img src={appleIcon} alt="apple" className={styles.oAuthButtonIcon} />
          Продолжить с Apple
        </Button>
      </div>

      <div className={`${styles.breakWord} h-body`}>или</div>

      <form action="" className={`${styles.formBox}`}>
        <Input
          type="email"
          name="email"
          id="email"
          label="Email"
          placeholder="Введите email"
          required
          error=""
          helper=""
          className={styles.formInput}
        />

        <Input
          type="password"
          name="password"
          id="password"
          label="Пароль"
          placeholder="Введите ваш пароль"
          required
          error=""
          helper=""
          className={styles.formInput}
        />
      </form>
      {variant === 'login' && (
        <AuthButtonsUI
          variant='form'
          onLoginClick={() => console.log('login from form')}
          onRegisterClick={() => navigate('/auth/register')}
        />
      )}
      {variant === 'register' && (
        <Button
            type='button'
            variant='prime'
            fullWidth
            className={styles.registerNextButton}
            onClick={() => console.log('nextButton clicked')}
          >
            Далее
          </Button>
      )}
    </div>
  )
}