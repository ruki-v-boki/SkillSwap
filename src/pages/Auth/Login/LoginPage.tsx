import { FormHintUI } from '@/components/ui/FormHint';
import styles from './LoginPage.module.css';
import lamp from '@/assets/icons/light-bulb.svg';


export function LoginPage() {


  return (
    <div className={styles.loginPage}>
      <div className={`${styles.loginPageTitle} h-2`}>Вход</div>

      <main className={styles.main}>
        <div>Login FORM</div>
        {/* <AuthForm type='register' /> */}
        <FormHintUI
          image={lamp}
          title='С возвращением в SkillSwap!'
          text='Обменивайтесь знаниями и навыками с другими людьми'
        />

      </main>

    </div>
  )
}