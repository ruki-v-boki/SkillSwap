import { FormHintUI } from '@/components/ui/FormHint';
import styles from './RegisterPage.module.css';
import lamp from '@/assets/icons/light-bulb.svg';
import { AuthFormUI } from '@/components/ui/AuthForm';


export function RegisterPage() {


  return (
    <div className={styles.registerPage}>
      <div className={styles.registerPageSteps}>шаги</div>
      <main className={styles.registerPageMain}>
        <AuthFormUI variant='register' />
        <FormHintUI
          image={lamp}
          title='Добро пожаловать в SkillSwap!'
          text='Присоединяйтесь к SkillSwap и обменивайтесь знаниями и навыками с другими людьми'
        />
      </main>
    </div>
  )
}