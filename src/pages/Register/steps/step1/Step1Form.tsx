import { LoginForm } from '@/components/ui/LoginForm';
import type { Step1FormProps } from './type';
import styles from './Step1Form.module.css';


export function Step1Form({
  initialData,
  onSubmit
}: Step1FormProps) {

  const handleLoginClick = (data: { email: string; password: string }) => {
    onSubmit(data);
  };

// ---------------------------------------------------------------

  return (
    <div className={styles.formContainer}>
      <LoginForm
        variant="registerPage"
        onGoogleClick={() => console.log('google button clicked')}
        onAppleClick={() => console.log('apple button clicked')}
        onLoginClick={handleLoginClick}
        onRegisterClick={() => {}}
        isLoading={false}
        loginError={null}
        initialEmail={initialData?.email}
        initialPassword={initialData?.password}
      />
    </div>
  );
}