import type { ExchangeModalUIProps } from './type';
import styles from './ExchangeModal.module.css';
import { Button } from '../../Button';

// ---------------------------------------------------------------

export function ExchangeModalUI ({
  onConfirm
}: ExchangeModalUIProps) {

  return (
    <div className={styles.exchangeModalContainer}>

      <div className={styles.content}>
        <svg className={styles.icon} xmlns="http://www.w3.org/2000/svg" width="100" height="100" fill="none" viewBox="0 0 100 100">
          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M14.7 60.39c-.8 5.22 2.76 8.85 7.13 10.66 16.73 6.94 40.02 6.94 56.76 0 4.36-1.8 7.93-5.44 7.13-10.66-.49-3.22-2.91-5.89-4.71-8.5-2.35-3.47-2.58-7.24-2.59-11.26A28.16 28.16 0 0 0 50.21 12.5a28.17 28.17 0 0 0-28.22 28.13c0 4.02-.23 7.8-2.59 11.26-1.8 2.61-4.21 5.28-4.7 8.5"/>
          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M35.2 76.25a15.4 15.4 0 0 0 15 11.25c7.23 0 13.29-4.78 15-11.25"/>
        </svg>

        <div className={styles.textBox}>
          <h2 className={`${styles.title} h-2`}>
            Вы предложили обмен
          </h2>
          <p className={`${styles.text} h-body`}>
            Теперь дождитесь подтверждения. Вам придёт уведомление
          </p>
        </div>
      </div>

      <Button
        type='button'
        variant='prime'
        onClick={onConfirm}
        fullWidth
      >
        Готово
      </Button>
    </div>
  )
}