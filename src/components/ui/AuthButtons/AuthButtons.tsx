import { Button } from '../Button';
import styles from './AuthButtons.module.css';
import type { AuthButtonsUIProps } from './type';


export function AuthButtonsUI({
  variant,
  onLoginClick,
  onRegisterClick
}: AuthButtonsUIProps) {

  const isHeader = variant === 'header';
  const containerClass = isHeader
    ? styles.authButtonsBoxHeader
    : styles.authButtonsBoxForm;

  return (
    <div className={containerClass}>
      <Button
        type={isHeader ? "button" : "submit"}
        variant={isHeader ? "outline" : "prime"}
        // onClick={isHeader ? onLoginClick : undefined}
        onClick={onLoginClick}
        className={`${isHeader && styles.loginButtonHeader} h-body`}
      >
        Войти
      </Button>

      <Button
        type="button"
        variant={isHeader ? "prime" : "link"}
        onClick={onRegisterClick}
        className={`${isHeader && styles.registerButtonHeader} h-body`}
      >
        Зарегистрироваться
      </Button>
    </div>
  );
}