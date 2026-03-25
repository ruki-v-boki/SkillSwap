import { useDispatch, useSelector } from '@/services/store';
import styles from './FavouritesPage.module.css';
import { selectFavouriteUsers, toggleLike } from '@/services/slices/userSlice';
import { OfferDetailsUI } from '@/components/ui/OfferDetails';
import { getAgeWord } from '@/utils/helpers';
import { SocialButtonsUI } from '@/components/ui/SocialButtons';
import { selectUserId } from '@/services/slices/authSlice';
import { useState } from 'react';
import { CatalogSectionUI } from '@/components/ui/CatalogSection';


export function FavouritesPage() {
  const favouriteUsers = useSelector(selectFavouriteUsers);
  const currentUserId = useSelector(selectUserId);
  const [pendingLikeId, setPendingLikeId] = useState<string | null>(null);
  const dispatch = useDispatch();
  const title = 'Избранное (более подробное)';

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

  if (favouriteUsers.length === 0) {
    return (
      <div className={styles.emptyState}>
        <h2>У вас пока нет избранных пользователей</h2>
        <p>Добавляйте пользователей в избранное, чтобы не потерять их!</p>
      </div>
    );
  }

  return (
    <main className={styles.favouritesPage}>
      {/* Вариант: 1 */}
      <CatalogSectionUI
        title='Избранное (вариант отображения)'
        users={favouriteUsers}
        visibleCardsValue={3}
      />
      {/* Вариант: 2 */}
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