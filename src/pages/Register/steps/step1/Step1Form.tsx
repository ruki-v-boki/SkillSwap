import { LoginForm } from '@/components/ui/LoginForm';
import type { LoginCredentials } from '@/types/auth';
import type { Step1FormProps } from './type';
import styles from './Step1Form.module.css';

// ---------------------------------------------------------------

export function Step1Form({
  initialData,
  onSubmit
}: Step1FormProps) {

  const handleLoginClick = (credentials: LoginCredentials) => {
    onSubmit(credentials);
  };

// ---------------------------------------------------------------

  return (
    <div className={styles.formContainer}>
      <LoginForm
        variant="registerPage"
        onGoogleClick={() => console.log('google button clicked')}
        onAppleClick={() => console.log('apple button clicked')}
        onLoginClick={handleLoginClick}
        isLoading={false}
        loginError={null}
        initialEmail={initialData?.email}
        initialPassword={initialData?.password}
      />
    </div>
  );
}