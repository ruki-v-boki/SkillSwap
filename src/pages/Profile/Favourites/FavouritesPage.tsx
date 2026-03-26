import { selectFavouriteUsers, toggleLike } from '@/services/slices/userSlice';
import { SocialButtonsUI } from '@/components/ui/SocialButtons';
import { OfferDetailsUI } from '@/components/ui/OfferDetails';
import { useDispatch, useSelector } from '@/services/store';
import { selectUserId } from '@/services/slices/authSlice';
import styles from './FavouritesPage.module.css';
import { Button } from '@/components/ui/Button';
import { useNavigate } from 'react-router-dom';
import { getAgeWord } from '@/utils/helpers';
import { useState } from 'react';


export function FavouritesPage() {
  const favouriteUsers = useSelector(selectFavouriteUsers);
  const currentUserId = useSelector(selectUserId);
  const [pendingLikeId, setPendingLikeId] = useState<string | null>(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const title = 'Избранное';

// ---------------------------------------------------------------

  const handleLikeClick = async (targetUserId: string) => {
    if (!currentUserId || pendingLikeId === targetUserId) return;

    setPendingLikeId(targetUserId);
    try {
      await dispatch(toggleLike({
        currentUserId,
        targetUserId,
      })).unwrap();
    } catch (error) {
      console.error('Failed to toggle like:', error);
    } finally {
      setPendingLikeId(null);
    }
  };

// ---------------------------------------------------------------

  if (favouriteUsers.length === 0) {
    return (
      <div className={styles.emptyState}>
        <div className={styles.emptyStateContent}>
          <h2 className='h-2'>У вас пока нет избранных пользователей</h2>
          <p className='h-body'>Добавляйте пользователей в избранное, чтобы не потерять их</p>
        </div>
        <Button
          type='button'
          variant='prime'
          onClick={() => navigate('/')}
          className={styles.emptyStateButton}
        >
          Перейти в каталог
          </Button>
      </div>
    );
  }

// ---------------------------------------------------------------

  return (
    <main className={styles.favouritesPage}>

      <h2 className='h-1'>{title}</h2>

      <div className={styles.favouritesGrid}>
        {favouriteUsers.map((user) => {
          const isLiked = user.likedBy?.includes(currentUserId || '') || false;
          return (
            <div key={user.id} className={styles.favouriteOfferWrapper}>
              <header className={styles.header}>
                <section className={styles.userBio}>
                  <div className={styles.avatarBox}>
                    <img
                      src={user.avatar}
                      alt={user.name}
                      className={styles.avatar}
                    />
                  </div>
                  <div className={styles.infoBox}>
                    <h2 className='h-2'>{user.name}</h2>
                    <p>{user.location}, {user.age} {getAgeWord(user.age)}</p>
                  </div>
                </section>
                <SocialButtonsUI
                  onFavoriteClick={() => handleLikeClick(user.id)}
                  isLiked={isLiked}
                  onShareClick={() => console.log('share button clicked')}
                  onMoreClick={() => console.log('more button clicked')}
                  className={styles.socials}
                />
              </header>
              <OfferDetailsUI
                user={user}
                variant="offerPage"
              />
            </div>
          );
        })}
      </div>
    </main>
  );
}