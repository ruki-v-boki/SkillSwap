import { login, selectIsAuthLoading, selectAuthError } from '@/services/slices/authSlice';
import { selectUserIsLoading } from '@/services/slices/userSlice';
import { useDispatch, useSelector } from '@/services/store';
import { FormHintUI } from '@/components/ui/FormHint';
import { LoginForm } from '@/components/ui/LoginForm';
import lamp from '@/assets/icons/light-bulb.svg';
import { Loader } from '@/components/ui/Loader';
import { useNavigate } from 'react-router-dom';
import styles from './LoginPage.module.css';

// ---------------------------------------------------------------

export function LoginPage() {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isAuthLoading = useSelector(selectIsAuthLoading);
  const isUserLoading = useSelector(selectUserIsLoading)
  const error = useSelector(selectAuthError);

// ---------------------------------------------------------------

  const handleLogin = async (
    data: {
      email: string;
      password: string
    }) => {
      try {
        await dispatch(login(data)).unwrap();
        navigate('/profile');
      } catch (err) {
        console.error('Ошибка входа', err);
      }
  };

// ---------------------------------------------------------------

  const handleRegisterClick = () => {
    navigate('/register');
  };

// ---------------------------------------------------------------

  if(isUserLoading || isAuthLoading) return <Loader />

// ---------------------------------------------------------------

  return (
    <div className={styles.loginPage}>
      <h2 className={`${styles.loginPageTitle} h-2`}>Вход</h2>

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