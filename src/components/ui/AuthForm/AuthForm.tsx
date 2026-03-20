import { Button } from '../Button';
import styles from './AuthForm.module.css';
import type { AuthFormUIProps } from './type';
import googleIcon from '@/assets/icons/Google.svg';
import appleIcon from '@/assets/icons/Apple.svg';
import { Input } from '../Input';
import { NavLink } from 'react-router-dom';


export function AuthFormUI ({ type }:AuthFormUIProps) {

  return (
    <div className={styles.authFormContainer}>
      <div className={styles.oAuthButtonsBox}>
        <Button
          type='button'
          variant='outline'
          fullWidth
          onClick={() => console.log('кнопка "Продлжить с Google" кликнута')}
          className={`${styles.oAuthButton} h-body`}
        >
          <img src={googleIcon} alt="google" className={styles.oAuthButtonIcon} />
          Продлжить с Google
        </Button>
        <Button
          type='button'
          variant='outline'
          fullWidth
          onClick={() => console.log('кнопка "Продлжить с Apple" кликнута')}
          className={`${styles.oAuthButton} h-body`}
        >
          <img src={appleIcon} alt="apple" className={styles.oAuthButtonIcon} />
          Продлжить с Apple
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

      <div className={styles.formButtonsBox}>
        <Button
          type="submit"
          variant="prime"
          fullWidth
          onClick={
            type==='login'
            ? () => console.log('кнопка "войти" кликнута')
            : () => console.log('кнопка "далее" кликнута')
          }
        >
          {type === 'login' ? 'Войти' : 'Далее'}
        </Button>
        {type === 'login' && (
          <NavLink
            to={'/auth/register'}
            className={`${styles.registerLink} h-body`}
          >
            Зарегистрироваться
            </NavLink>
        )}
      </div>
    </div>
  )
}