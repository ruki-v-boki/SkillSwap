import { selectAllUsers, toggleLike } from '@/services/slices/userSlice';
import { selectExchangeLoading } from '@/services/slices/exchangeSlice';
import { SocialButtonsUI } from '@/components/ui/SocialButtons';
import { OfferDetailsUI } from '@/components/ui/OfferDetails';
import { useDispatch, useSelector } from '@/services/store';
import { selectUserId } from '@/services/slices/authSlice';
import { useNavigate, useParams } from 'react-router-dom';
import { SliderUI } from '@/components/ui/Slider';
import { Loader } from '@/components/ui/Loader';
import { CardUI } from '@/components/ui/Card';
import styles from './OfferPage.module.css';

// ---------------------------------------------------------------

export function OfferPage() {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  const allUsers = useSelector(selectAllUsers);
  const currentUserId = useSelector(selectUserId);
  const isExchangeLoading = useSelector(selectExchangeLoading);

  const offerAuthor = allUsers.find(author => author.id === id);
  const isLiked = currentUserId ? offerAuthor?.likedBy?.includes(currentUserId) || false : false;

// ---------------------------------------------------------------

  const similarUsers = allUsers.filter(u =>
    u.id !== offerAuthor?.id &&
    u.canTeach?.categoryId === offerAuthor?.canTeach?.categoryId
  );

// ---------------------------------------------------------------

  const handleFavoriteClick = async () => {
    if (!currentUserId) {
      navigate('/login', {
        state: { from: location.pathname }
      });
      return;
    }

    if (!offerAuthor?.id || isExchangeLoading) return;

    try {
      await dispatch(toggleLike({
        currentUserId,
        targetUserId: offerAuthor.id,
      })).unwrap();
    } catch (error) {
      console.error('Не удалось переключить лайк:', error);
    };
  }

// ---------------------------------------------------------------

  if (!offerAuthor) {
    return <Loader />
  }

// ---------------------------------------------------------------

  return (
    <div className={styles.offerPageContainer}>

      <main className={styles.offerSection}>
        <section className={styles.offerCardWrapper}>
          <CardUI
            user={offerAuthor}
            styleType='profile'
          />
        </section>

        <section className={styles.offerDetailsWrapper}>
          <SocialButtonsUI
            onFavoriteClick={handleFavoriteClick}
            isLiked={isLiked}
            onShareClick={() => console.log('share button clicked')}
            onMoreClick={() => console.log('more button clicked')}
            className={styles.socials}
          />
          <OfferDetailsUI
            user={offerAuthor}
            variant='offerPage'
          />
        </section>
      </main>

      <section className={styles.offersSimilarSection}>
        <h2
          className={`${styles.offerSimilarTitle} h-2`}
        >
          Похожие предложения
        </h2>

        {similarUsers.length > 0 ? (
          <SliderUI>
            {similarUsers.map(similarUser => (
              <div
                key={similarUser.id}
                className={styles.cardWrapper}
              >
                <CardUI
                  user={similarUser}
                  styleType='catalog'
                />
              </div>
            ))}
          </SliderUI>
        ) : (
          <p
            className={`${styles.noResults} h-body`}
          >
            Нет похожих предложений :(
          </p>
        )}
      </section>
    </div>
  );
}