import {
  login,
  selectIsAuthLoading,
  selectAuthError,
  // selectUserId
} from '@/services/slices/authSlice';
import { useDispatch, useSelector } from '@/services/store';
import { FormHintUI } from '@/components/ui/FormHint';
import { LoginForm } from '@/components/ui/LoginForm';
import lamp from '@/assets/icons/light-bulb.svg';
import { useNavigate } from 'react-router-dom';
import styles from './LoginPage.module.css';
// import { useEffect } from 'react';
import { Loader } from '@/components/ui/Loader';
import { selectUserIsLoading } from '@/services/slices/userSlice';


export function LoginPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isAuthLoading = useSelector(selectIsAuthLoading);
  const isLoading = useSelector(selectUserIsLoading)
  const error = useSelector(selectAuthError);
  // const user = useSelector(selectUserId);

// ---------------------------------------------------------------

  // useEffect(() => {
  //   if (user) {
  //     navigate('/');
  //   }
  // }, [user, navigate]);

// ---------------------------------------------------------------

  const handleLogin = async (
    data: {
      email: string;
      password: string
    }) => {
      try {
        await dispatch(login(data)).unwrap();
        navigate('/profile');
        console.log('login success')
      } catch (err) {
        console.error('Login failed:', err);
      }
  };

// ---------------------------------------------------------------

  const handleRegisterClick = () => {
    navigate('/register');
  };

// ---------------------------------------------------------------

  if(isLoading) return <Loader />

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