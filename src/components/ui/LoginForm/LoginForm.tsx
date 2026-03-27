import googleIcon from '@/assets/icons/google.svg';
import { PasswordToggle } from './PasswordToggle';
import appleIcon from '@/assets/icons/apple.svg';
import { AuthButtonsUI } from '../AuthButtons';
import type { LoginFormProps } from './type';
import styles from './LoginForm.module.css';
import { useForm } from '@/hooks/useForm';
import { useRef, useState } from 'react';
import { Button } from '../Button';
import { Input } from '../Input';
import {
  validatePassword,
  isPasswordValid,
  validateEmail,
  isEmailValid,
} from '@/utils/validators';

// ---------------------------------------------------------------

export function LoginForm({
  variant = 'loginPage',
  onGoogleClick,
  onAppleClick,
  onLoginClick,
  onRegisterClick,
  isLoading = false,
  loginError = null,
  initialEmail = '',
  initialPassword = '',
}: LoginFormProps) {

  const formRef = useRef<HTMLFormElement>(null);
  const [showPassword, setShowPassword] = useState(false);

// ---------------------------------------------------------------

  const {
      values,
      getError,
      handleChange,
      handleSubmit,
    } = useForm({
      initialValues: {
        email: initialEmail,
        password: initialPassword,
      },
      validators: {
        email: validateEmail,
        password: validatePassword,
      },
      onSubmit: (data) => {
        onLoginClick(data);
      },
    });

// ---------------------------------------------------------------

  const isEmailFieldValid = values.email !== '' && isEmailValid(values.email);
  const isPasswordFieldValid = values.password !== '' && isPasswordValid(values.password);

// ---------------------------------------------------------------

  const triggerSubmit = () => {
    if (formRef.current) {
      const event = new Event('submit', { bubbles: true, cancelable: true });
      formRef.current.dispatchEvent(event);
    }
  };

// ---------------------------------------------------------------

  return (
    <div className={styles.LoginFormContainer}>
      <div className={styles.oAuthButtonsBox}>
        <Button
          type='button'
          variant='outline'
          fullWidth
          onClick={onGoogleClick}
          className={`${styles.oAuthButton} h-body`}
          disabled={isLoading}
        >
          <img
            src={googleIcon}
            alt="иконка google"
            className={styles.oAuthButtonIcon}
            aria-hidden
          />
          Продолжить с Google
        </Button>
        <Button
          type='button'
          variant='outline'
          fullWidth
          onClick={onAppleClick}
          className={`${styles.oAuthButton} h-body`}
          disabled={isLoading}
        >
          <img
            src={appleIcon}
            alt="иконка apple"
            className={styles.oAuthButtonIcon}
            aria-hidden
          />
          Продолжить с Apple
        </Button>
      </div>

      <span className={`${styles.breakWord} h-body`}>или</span>

      <form
        onSubmit={handleSubmit}
        className={styles.formBox}
        noValidate
      >
        <Input
          type="email"
          name="email"
          id="email"
          label="Email"
          placeholder="Введите email"
          value={values.email}
          onChange={(e) => handleChange('email', e.target.value.trim().toLowerCase())}
          error={getError('email')}
          isValid={isEmailFieldValid}
          required
          disabled={isLoading}
        />

        <Input
          type={showPassword ? 'text' : 'password'}
          name="password"
          id="password"
          label="Пароль"
          placeholder={variant === 'loginPage' ? "Введите ваш пароль" : "Придумайте надёжный пароль"}
          value={values.password}
          onChange={(e) => handleChange('password', e.target.value)}
          error={getError('password')}
          isValid={isPasswordFieldValid}
          required
          disabled={isLoading}
          rightIcon={<PasswordToggle onToggle={setShowPassword} />}
        />

        {loginError && <div className={styles.errorFormMessage}>Ошибка входа: {loginError}</div>}

        {variant === 'loginPage' ? (
          <AuthButtonsUI
            variant='form'
            onLoginClick={triggerSubmit}
            onRegisterClick={onRegisterClick}
          />
        ) : (
          <Button
            type="submit"
            variant="prime"
            fullWidth
            className={styles.registerNextButton}
          >
            Далее
          </Button>
        )}
      </form>
    </div>
  );
}