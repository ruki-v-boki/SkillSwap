import { FormHintUI } from '@/components/ui/FormHint';
import styles from './RegisterPage.module.css';
import lamp from '@/assets/icons/light-bulb.svg';


export function RegisterPage() {




  return (
    <div className={styles.registerPage}>

        {/* <AuthForm type='register' /> */}
        <div>Register FORM</div>
        <FormHintUI
          image={lamp}
          title='Добро пожаловать в SkillSwap!'
          text='Присоединяйтесь к SkillSwap и обменивайтесь знаниями и навыками с другими людьми'
        />


    </div>
  )
}