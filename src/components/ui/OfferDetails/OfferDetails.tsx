import { createExchangeOffer, selectExchangeLoading, selectMyOffers } from '@/services/slices/exchangeSlice';
import { getCategoryName, getSubcategoryName } from '@/utils/helpers';
import { selectCurrentUser } from '@/services/slices/userSlice';
import { useDispatch, useSelector } from '@/services/store';
import { ExchangeModalUI } from '../Modal/ExchangeModal';
import type { OfferDetailsUIProps } from './type';
import styles from './OfferDetails.module.css';
import { useNavigate } from 'react-router-dom';
import { GalleryUI } from '../Gallery';
import { Button } from '../Button';
import { ModalUI } from '../Modal';
import { useState } from 'react';

// ---------------------------------------------------------------

export function OfferDetailsUI({
  previewData,
  user,
  variant,
  onEdit,
  onConfirm
}: OfferDetailsUIProps) {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const currentUser = useSelector(selectCurrentUser);
  const isSubmitting = useSelector(selectExchangeLoading);
  const myOffers = useSelector(selectMyOffers);

  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);

  const isPreview = !!previewData;
  const data = previewData || user;

// ---------------------------------------------------------------

  const existingOffer = user && currentUser
    ? myOffers.find(offer => 
        offer.fromUserId === currentUser.id &&
        offer.toUserId === user.id && 
        offer.status === 'pending'
      )
    : null;

  const hasActiveOffer = !!existingOffer;

// ---------------------------------------------------------------

  const categoryId = isPreview 
    ? previewData.canTeach.categoryId
    : user!.canTeach.categoryId;

  const subcategoryId = isPreview
    ? previewData.canTeach.subcategoryId
    : user!.canTeach.subcategoryId;

  const categoryName = getCategoryName(categoryId);
  const subcategoryName = getSubcategoryName(subcategoryId);

// ---------------------------------------------------------------

  const customName = isPreview
    ? previewData.canTeach.customName
    : user!.canTeach.customName;
    
  const description = isPreview
    ? previewData.canTeach.description || ''
    : user!.canTeach.description || '';
    
  const images = isPreview
    ? previewData.canTeach.images?.map(file => URL.createObjectURL(file))
    : user!.canTeach.images || [];

// ---------------------------------------------------------------

  const handleOfferClick = async () => {
    if (!currentUser) {
      navigate('/login');
      return;
    }

    if (hasActiveOffer || isSubmitting) return;

    try {
      await dispatch(createExchangeOffer({
        fromUser: currentUser,
        data: {
          toUserId: user!.id,
          message: undefined,
        }
      })).unwrap();

      setIsSuccessModalOpen(true);
    } catch (error) {
      console.error('Ошибка отправки предложения:', error);
    }
  };

// ---------------------------------------------------------------

  if (!data) return null;

// ---------------------------------------------------------------

  return (
    <>
      <div className={variant === 'offerPage'
        ? `${styles.offerDetailsContainer}`
        : `${styles.offerDetailsContainer} ${styles.offerDetailsContainerModal}`}
      >
        <div className={styles.content}>
          <div className={styles.titleBox}>
            <h2 className={`${styles.title} h-1`}>
              {customName}
            </h2>
            <span className={`${styles.tags} h-caption`}>
              {categoryName} / {subcategoryName}
            </span>
          </div>

          <div className={`${styles.description} h-body`}>
            {description}
          </div>

          {variant === 'modal' ? (
            <div className={styles.buttonsBox}>
              <Button
                variant='outline'
                onClick={onEdit}
                fullWidth
              >
                Редактировать
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                  <path fill="currentColor" d="M6 19q-.8 0-1.4-.6-.7-.7-.6-1.9l.3-3q.1-1 .8-1.8l7.7-8.1q3-3 6-.2 3 3 .2 6l-7.7 8.1q-.8.6-1.7 1l-3 .4zm9.8-15.6q-1 0-2 1.1l-7.7 8.2q-.3.3-.4 1l-.3 3q0 .4.2.7t.7.1l3-.5q.5-.1 1-.5l7.6-8.1c1.2-1.2 1.6-2.4 0-4q-1.2-1-2-1"/>
                  <path fill="currentColor" d="M17.2 11H17c-3-.4-5.3-2.6-5.7-5.5q0-.6.5-.8.7 0 .9.6a5 5 0 0 0 4.4 4.2q.6.1.7.8-.1.6-.7.6M20.6 22H3.7a1 1 0 0 1-.7-.7q0-.6.7-.7h16.9q.6 0 .7.7t-.7.7"/>
                </svg>
              </Button>

              <Button
                variant='prime'
                onClick={onConfirm}
                fullWidth
              >
                Готово
              </Button>
            </div>
          ) : (
            <div
              className={`
                ${styles.buttonsBox}
                ${styles.buttonsBoxOfferPage}
              `}
            >
              <Button
                type='button'
                variant={hasActiveOffer ? 'outline' : 'prime'}
                fullWidth
                onClick={handleOfferClick}
                disabled={hasActiveOffer || isSubmitting}
              >
                {hasActiveOffer ? (
                  <>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                      <path fill="currentColor" d="M12 22a10 10 0 1 1 .02-20.02A10 10 0 0 1 12 22m0-18.6a8.61 8.61 0 0 0 0 17.2 8.62 8.62 0 0 0 0-17.2"/>
                      <path fill="currentColor" d="M15.45 15.66a.6.6 0 0 1-.35-.1l-2.89-1.73a2.7 2.7 0 0 1-1.24-2.2v-3.8c0-.39.31-.7.7-.7s.7.31.7.7v3.8c0 .34.27.83.56 1l2.88 1.72c.34.2.44.63.25.96a.7.7 0 0 1-.6.35"/>
                    </svg>
                    Обмен предложен
                  </>
                ) : (
                  'Предложить обмен'
                )}
              </Button>
            </div>
          )}
        </div>

        <div className={styles.offerDetailsGallery}>
          <GalleryUI images={images} />
        </div>
      </div>

      {isSuccessModalOpen && (
        <ModalUI onClose={() => setIsSuccessModalOpen(false)}>
          <ExchangeModalUI onConfirm={() => setIsSuccessModalOpen(false)} />
        </ModalUI>
      )}
    </>
  );
}