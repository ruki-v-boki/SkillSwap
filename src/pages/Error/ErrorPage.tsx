import { Button } from '@/components/ui/Button';
import styles from './ErrorPage.module.css';
import error404 from '@/assets/icons/error404.svg';
import error500 from '@/assets/icons/error500.svg';
import { useNavigate } from 'react-router-dom';
import type { ErrorPageProps } from './type';


export function ErrorPageUI({
  type = '404',
  title,
  message
}:ErrorPageProps) {
  const navigate = useNavigate()

  const config = {
    '404': {
      image: error404,
      title: title || 'Страница не найдена :(',
      message: message || 'К сожалению, эта страница недоступна. Вернитесь на главную страницу или попробуйте позже'
    },
    '500': {
      image: error500,
      title: title || 'На сервере произошла ошибка',
      message: message || 'Попробуйте позже или вернитесь на главную страницу'
    },
    'error': {
      image: error500,
      title: title || 'Произошла ошибка',
      message: message || 'Попробуйте перезагрузить страницу или вернуться позже'
    }
  };

  const currentConfig = config[type] || config.error;

  return (
    <div className={styles.container}>
      <img 
        src={currentConfig.image}
        alt={currentConfig.title}
        className={styles.image}
      />

      <div className={styles.content}>
        <div className={styles.description}>
          <h2 className={`${styles.title} h-2`}>{currentConfig.title}</h2>
          <p className={`${styles.text} h-body`}>{currentConfig.message}</p>
        </div>
        
        <div className={styles.buttonsBox}>
          <Button
            variant='outline'
            type='button'
            onClick={() => console.log('Сообщить об ошибке')}
            fullWidth
          >
            Сообщить об ошибке
          </Button>
          <Button
            variant='prime'
            type='button'
            onClick={() => navigate('/home')}
            fullWidth
          >
            На главную
          </Button>
        </div>
      </div>
    </div>
  );
}