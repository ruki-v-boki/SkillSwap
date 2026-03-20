import { FormHintUI } from '@/components/ui/FormHint';
import styles from './LoginPage.module.css';
import lamp from '@/assets/icons/light-bulb.svg';
import { AuthFormUI } from '@/components/ui/AuthForm';


export function LoginPage() {


  return (
    <div className={styles.loginPage}>
      <div className={`${styles.loginPageTitle} h-2`}>Вход</div>

      <main className={styles.loginPageMain}>
        <AuthFormUI type='login' />
        <FormHintUI
          image={lamp}
          title='С возвращением в SkillSwap!'
          text='Обменивайтесь знаниями и навыками с другими людьми'
        />

      </main>

    </div>
  )
}