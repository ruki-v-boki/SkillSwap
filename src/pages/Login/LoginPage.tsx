import { login, selectIsAuthLoading, selectAuthError } from '@/services/slices/auth/authSlice';
import { useDispatch, useSelector } from '@/services/store';
import { FormHintUI } from '@/components/ui/FormHint';
import { LoginForm } from '@/components/ui/LoginForm';
import lamp from '@/assets/icons/light-bulb.svg';
import { useNavigate } from 'react-router-dom';
import styles from './LoginPage.module.css';


export function LoginPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isAuthLoading = useSelector(selectIsAuthLoading);
  const error = useSelector(selectAuthError);

// ---------------------------------------------------------------

  const handleLogin = async (
    data: {
      email: string;
      password: string
    }) => {
      try {
        const result = await dispatch(login(data)).unwrap();
        console.log('Login success:', result.user);
        navigate('/');
      } catch (err) {
        console.error('Login failed:', err);
      }
  };

// ---------------------------------------------------------------

  const handleRegisterClick = () => {
    navigate('/auth/register');
  };

// ---------------------------------------------------------------

  return (
    <div className={styles.loginPage}>
      <div className={`${styles.loginPageTitle} h-2`}>Вход</div>

      <main className={styles.loginPageMain}>
        <div className={styles.formContainer}>
          <LoginForm
            variant='loginPage'
            onGoogleClick={() => console.log('googleButton clicked')}
            onAppleClick={() => console.log('appleButton clicked')}
            onLoginClick={handleLogin}
            onRegisterClick={handleRegisterClick}
            isLoading={isAuthLoading}
            loginError={error}
          />
        </div>
        <FormHintUI
          image={lamp}
          title="С возвращением в SkillSwap!"
          text="Обменивайтесь знаниями и навыками с другими людьми"
        />
      </main>
    </div>
  );
}