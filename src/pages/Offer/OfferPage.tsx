import { selectAllUsers, toggleLike } from '@/services/slices/userSlice';
import { SocialButtonsUI } from '@/components/ui/SocialButtons';
import { OfferDetailsUI } from '@/components/ui/OfferDetails';
import { selectUserId } from '@/services/slices/authSlice';
import { useDispatch, useSelector } from '@/services/store';
import { SliderUI } from '@/components/ui/Slider';
import { CardUI } from '@/components/ui/Card';
import { useNavigate, useParams } from 'react-router-dom';
import styles from './OfferPage.module.css';
import { NotFoundPage } from '../Error';
import { useState } from 'react';

// ---------------------------------------------------------------

export function OfferPage() {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const allUsers = useSelector(selectAllUsers);
  const currentUserId = useSelector(selectUserId);
  const { id } = useParams();
  const user = allUsers.find(u => u.id === id);
  const [isPending, setIsPending] = useState(false);
  const isLiked = currentUserId ? user?.likedBy?.includes(currentUserId) || false : false;

// ---------------------------------------------------------------

  const handleFavoriteClick = async () => {
    if (!currentUserId) {
      navigate('/login', {
        state: { from: location.pathname }
      });
      return;
    }

    if (!user?.id || isPending) return;

    setIsPending(true);
    try {
      await dispatch(toggleLike({
        currentUserId,
        targetUserId: user.id,
      })).unwrap();
    } catch (error) {
      console.error('Failed to toggle like:', error);
    } finally {
      setIsPending(false);
    }
  };

// ---------------------------------------------------------------

  const similarUsers = allUsers.filter(u =>
    u.id !== user?.id &&
    u.canTeach?.categoryId === user?.canTeach?.categoryId
  );

// ---------------------------------------------------------------

  if (!user) {
    return <NotFoundPage />
  }

// ---------------------------------------------------------------

  return (
    <div className={styles.offerPageContainer}>

      <main className={styles.offerSection}>
        <div className={styles.offerCardWrapper}>
          <CardUI user={user} styleType='profile' onCardClick={()=>{}}/>
        </div>

        <div className={styles.offerDetailsWrapper}>
          <SocialButtonsUI
            onFavoriteClick={handleFavoriteClick}
            isLiked={isLiked}
            onShareClick={() => console.log('share button clicked')}
            onMoreClick={() => console.log('more button clicked')}
            className={styles.socials}
          />
          <OfferDetailsUI user={user} variant='offerPage' />
        </div>
      </main>

      <section className={styles.offersSimilarSection}>
        <h2 className={`${styles.offerSimilarTitle} h-2`}>Похожие предложения</h2>

        {similarUsers.length > 0 ? (
          <SliderUI>
            {similarUsers.map(similarUser => (
              <div key={similarUser.id} className={styles.cardWrapper}>
                <CardUI
                  user={similarUser}
                  styleType='catalog'
                />
              </div>
            ))}
          </SliderUI>
        ) : (
          <p className={`${styles.noResults} h-body`}>Нет похожих предложений :(</p>
        )}
      </section>
    </div>
  );
}