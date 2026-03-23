import googleIcon from '@/assets/icons/Google.svg';
import { PasswordToggle } from './PasswordToggle';
import appleIcon from '@/assets/icons/Apple.svg';
import { AuthButtonsUI } from '../AuthButtons';
import type { LoginFormProps } from './type';
import styles from './LoginForm.module.css';
import { useState, useEffect } from 'react';
import { Button } from '../Button';
import { Input } from '../Input';


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

  const [email, setEmail] = useState(initialEmail);
  const [password, setPassword] = useState(initialPassword);
  const [showPassword, setShowPassword] = useState(false);
  const [emailError, setEmailError] = useState<string | undefined>();
  const [passwordError, setPasswordError] = useState<string | undefined>();
  const [attemptedSubmit, setAttemptedSubmit] = useState(false);

// ---------------------------------------------------------------

  const isEmailValid = (value: string): boolean => {
    if (value === '') return false;
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    return emailRegex.test(value);
  };

  const isPasswordValid = (value: string): boolean => {
    if (value === '') return false;
    return value.length >= 8;
  };

// ---------------------------------------------------------------

  const getEmailErrorMessage = (value: string): string | undefined => {
    if (!attemptedSubmit) return undefined;
    if (value === '') return 'Email обязателен';
    if (!isEmailValid(value)) return 'Введите корректный email (только латиница)';
    return undefined;
  };

  const getPasswordErrorMessage = (value: string): string | undefined => {
    if (!attemptedSubmit) return undefined;
    if (value === '') return 'Пароль обязателен';
    if (!isPasswordValid(value)) return 'Пароль должен быть не менее 8 символов';
    return undefined;
  };

// ---------------------------------------------------------------

  useEffect(() => {
    if (attemptedSubmit) {
      setEmailError(getEmailErrorMessage(email));
      setPasswordError(getPasswordErrorMessage(password));
    }
  }, [attemptedSubmit, email, password]);

// ---------------------------------------------------------------

  const handleEmailChange = (value: string) => {
    const normalized = value.trim().toLowerCase();
    setEmail(normalized);
    if (attemptedSubmit) {
      setEmailError(undefined);
    }
  };

  const handlePasswordChange = (value: string) => {
    setPassword(value);
    if (attemptedSubmit) {
      setPasswordError(undefined);
    }
  };

// ---------------------------------------------------------------

  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    setAttemptedSubmit(true);

    const emailValid = email !== '' && isEmailValid(email);
    const passwordValid = password !== '' && isPasswordValid(password);

    if (emailValid && passwordValid) {
      onLoginClick({ email, password });
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
          value={email}
          onChange={(e) => handleEmailChange(e.target.value)}
          error={emailError}
          isValid={email !== '' && isEmailValid(email)}
          required
          disabled={isLoading}
        />

        <Input
          type={showPassword ? 'text' : 'password'}
          name="password"
          id="password"
          label="Пароль"
          placeholder={variant === 'loginPage' ? "Введите ваш пароль" : "Придумайте надёжный пароль"}
          value={password}
          onChange={(e) => handlePasswordChange(e.target.value)}
          error={passwordError}
          isValid={password !== '' && isPasswordValid(password)}
          required
          disabled={isLoading}
          rightIcon={
            <PasswordToggle
              onToggle={(show) => setShowPassword(show)}
            />
          }
        />

        {loginError && <div className={styles.errorFormMessage}>Ошибка: {loginError}</div>}
        {variant === 'loginPage' && (
          <AuthButtonsUI
            variant='form'
            onLoginClick={() => {
              setAttemptedSubmit(true);
              const emailValid = email !== '' && isEmailValid(email);
              const passwordValid = password !== '' && isPasswordValid(password);

              if (emailValid && passwordValid) {
                onLoginClick({ email, password });
              }
            }}
            onRegisterClick={onRegisterClick}
          />
        )}
        {variant === 'registerPage' && (
          <Button
            type='submit'
            variant='prime'
            className={styles.registerNextButton}
            onClick={() => {
              setAttemptedSubmit(true);
              const emailValid = email !== '' && isEmailValid(email);
              const passwordValid = password !== '' && isPasswordValid(password);

              if (emailValid && passwordValid) {
                onLoginClick({ email, password });
              }
            }}
          >
            Далее
          </Button>
        )}
      </form>
    </div>
  );
}