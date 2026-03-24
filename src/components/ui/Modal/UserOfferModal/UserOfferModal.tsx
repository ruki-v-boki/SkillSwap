import { useSelector } from 'react-redux';
import { OfferDetailsUI } from '../../OfferDetails';
// import { selectUser } from '@/services/slices/auth/authSlice';
import { useParams } from 'react-router-dom';
import { selectAllUsers } from '@/services/slices/userSlice';
import styles from './UserOfferModal.module.css';
// import type { UserOfferModalProps } from './type';


export function UserOfferModal() {
  // const user = useSelector(selectUser)
  const allUsers = useSelector(selectAllUsers);
  const { id } = useParams();
  const user = allUsers.find(u => u.id === id);

  return (
    <div className={styles.userOfferModalWrapper}>
      <div className={styles.header}>
        <h2 className='h-2'>Ваше предложение</h2>
        <p className='h-caption'>Пожалуйста, проверьте и подтвердите правильность данных</p>
      </div>
      {user && (
        <OfferDetailsUI
          user={user}
          variant='modal'
        />
      )}
    </div>

  )
}