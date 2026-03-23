import { selectAllUsers } from '@/services/slices/users/userSlice';
import { OfferDetailsUI } from '@/components/ui/OfferDetails';
import { SliderUI } from '@/components/ui/Slider';
import { CardUI } from '@/components/ui/Card';
import { useParams } from 'react-router-dom';
import styles from './OfferPage.module.css';
import { useSelector } from 'react-redux';
import { SocialButtonsUI } from '@/components/ui/SocialButtons';


export function OfferPage() {
  const allUsers = useSelector(selectAllUsers);
  const { id } = useParams();
  const user = allUsers.find(u => u.id === id);

  const similarUsers = allUsers.filter(u =>
    u.id !== user?.id &&
    u.canTeach?.categoryId === user?.canTeach?.categoryId
  );

  return (
    <div className={styles.offerPageContainer}>
      {user && (
        <main className={styles.offerSection}>
          <CardUI user={user} styleType='profile' />
          <div className={styles.offerDetailsWrapper}>
            <SocialButtonsUI
              onFavoriteClick={() => console.log('favorite button clicked')}
              onShareClick={() => console.log('share button clicked')}
              onMoreClick={() => console.log('more button clicked')}
              className={styles.socials}
            />
            <OfferDetailsUI user={user} variant='offerPage' />
          </div>
        </main>
      )}

      <section className={styles.offersSimilar}>
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
          <p className={styles.noResults}>Нет похожих предложений :(</p>
        )}
      </section>
    </div>
  );
}