import likeActive from '@/assets/icons/LikeActive.svg';
import type { LikeButtonUIProps } from './type';
import styles from './LikeButton.module.css';
import like from '@/assets/icons/like.svg';


export function LikeButtonUI({
  isLiked,
  onClick
}: LikeButtonUIProps) {
  return (
    <button
      className={styles.likeButton}
      type='button'
      onClick={onClick}
      aria-label={isLiked ? 'Убрать лайк' : 'Поставить лайк'}
    >
      <img
        src={isLiked ? likeActive : like}
        className={styles.likeIcon}
        alt=''
        aria-hidden='true'
      />
    </button>
  );
}