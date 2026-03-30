export type LoginFormProps = {
  variant: 'loginPage' | 'registerPage';
  onGoogleClick: () => void;
  onAppleClick: () => void;
  onLoginClick: (data: { email: string; password: string }) => void;
  onRegisterClick?: () => void;
  isLoading?: boolean;
  loginError?: string | null;
  initialEmail?: string;
  initialPassword?: string;
}