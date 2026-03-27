import { OfferDetailsUI } from '../../OfferDetails';
import type { UserOfferModalProps } from './type';
import styles from './UserOfferModal.module.css';

// ---------------------------------------------------------------

export function UserOfferModal({
  previewData,
  onConfirm,
  onEdit
}: UserOfferModalProps) {

  return (
    <div className={styles.userOfferModalWrapper}>
      <div className={styles.header}>
        <h2 className='h-2'>Ваше предложение</h2>
        <p className='h-caption'>Пожалуйста, проверьте и подтвердите правильность данных</p>
      </div>
      <OfferDetailsUI
        previewData={previewData}
        variant='modal'
        onEdit={onEdit}
        onConfirm={onConfirm}
      />
    </div>
  );
}