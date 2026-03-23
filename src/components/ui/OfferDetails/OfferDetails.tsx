import { getCategoryName, getSubcategoryName } from '@/utils/helpers';
import type { OfferDetailsUIProps } from './type';
import styles from './OfferDetails.module.css';
import { GalleryUI } from '../Gallery';
import { Button } from '../Button';


export function OfferDetailsUI({
  user,
  variant
}: OfferDetailsUIProps) {

  const categoryName = getCategoryName(user.canTeach.categoryId);
  const subcategoryName = getSubcategoryName(user.canTeach.subcategoryId);

  return (
    <div className={styles.offerDetailsContainer}>
      <div className={styles.content}>

        <div className={styles.titleBox}>
          <h2 className={`${styles.title} h-1`}>
            {user.canTeach.customName}
          </h2>
          <span className={`${styles.tags} h-caption`}>
            {categoryName} / {subcategoryName}
          </span>
        </div>

        <div className={`${styles.description} h-body`}>
          {user.about}
        </div>

        {variant === 'modal' ? (
          <div className={styles.buttonsBox}>
            <Button
              variant='outline'
              fullWidth
            >
              Редактировать
            </Button>
            <Button
              variant='prime'
              fullWidth
            >
              Готово
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                <path fill="currentColor" d="M6 19q-.8 0-1.4-.6-.7-.7-.6-1.9l.3-3q.1-1 .8-1.8l7.7-8.1q3-3 6-.2 3 3 .2 6l-7.7 8.1q-.8.6-1.7 1l-3 .4zm9.8-15.6q-1 0-2 1.1l-7.7 8.2q-.3.3-.4 1l-.3 3q0 .4.2.7t.7.1l3-.5q.5-.1 1-.5l7.6-8.1c1.2-1.2 1.6-2.4 0-4q-1.2-1-2-1"/>
                <path fill="currentColor" d="M17.2 11H17c-3-.4-5.3-2.6-5.7-5.5q0-.6.5-.8.7 0 .9.6a5 5 0 0 0 4.4 4.2q.6.1.7.8-.1.6-.7.6M20.6 22H3.7a1 1 0 0 1-.7-.7q0-.6.7-.7h16.9q.6 0 .7.7t-.7.7"/>
              </svg>
            </Button>
          </div>
        ) : (
          <div className={`${styles.buttonsBox} ${styles.buttonsBoxOfferPage}`}>
            <Button
              variant='prime'
              fullWidth
            >
              Предложить обмен
            </Button>
          </div>
        )}
      </div>

      <div className={styles.offerDetailsGallery}>
        <GalleryUI
          images={user.canTeach.images || []}
        />
      </div>
    </div>
  )
}