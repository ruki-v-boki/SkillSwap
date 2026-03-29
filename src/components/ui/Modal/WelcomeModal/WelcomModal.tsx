import type { WelcomeModalUIProps } from './type';
import styles from './WelcomeModal.module.css';
import { Button } from '../../Button';

// ---------------------------------------------------------------

export function WelcomeModalUI ({
  onClose
}: WelcomeModalUIProps) {

  return (
    <div className={styles.welcomeModalContainer}>

      <div className={styles.content}>
        <svg className={styles.icon} xmlns="http://www.w3.org/2000/svg" width="100" height="100" fill="none" viewBox="0 0 100 100">
          <path stroke="currentColor" strokeWidth="1.5" d="M87.5 50a37.5 37.5 0 1 1-75 0 37.5 37.5 0 0 1 75 0Z"/>
          <path stroke="currentColor" strokeLinecap="round" strokeWidth="1.5" d="m36.85 50.84 6.5 6.5a4.87 4.87 0 0 0 6.9 0L64.68 42.9"/>
        </svg>

        <div className={styles.textBox}>
          <h2 className={`${styles.title} h-2`}>Ваше предложение создано</h2>
          <p className={`${styles.text} h-body`}>Теперь вы можете предложить обмен</p>
        </div>
      </div>

      <Button
        type='button'
        variant='prime'
        onClick={onClose}
        fullWidth
      >
        Готово
      </Button>
    </div>
  )
}