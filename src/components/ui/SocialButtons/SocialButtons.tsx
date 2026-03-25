import type { SocialButtonsUIProps } from './type';
import styles from './SocialButtons.module.css';
import { LikeButtonUI } from '../LikeButtonUI';


export function SocialButtonsUI({
  className,
  onFavoriteClick,
  isLiked,
  onShareClick,
  onMoreClick
}: SocialButtonsUIProps) {
  return (
    <div className={className}>
      <LikeButtonUI
        isLiked={isLiked}
        onClick={onFavoriteClick}
      />
      {/* ------------------------------------------- */}
      <button
        type='button'
        onClick={onShareClick}
        className={styles.socialButton}
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
          <path stroke="currentColor" strokeLinejoin="round" strokeWidth="1.5" d="M17.5 8a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Zm-11 6.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z"/>
          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="m15 6.8-6.3 3.8m0 2.7 6.6 4"/>
          <path stroke="currentColor" strokeLinejoin="round" strokeWidth="1.5" d="M17.5 16a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5Z"/>
        </svg>
      </button>
      {/* ------------------------------------------- */}
      <button
        type='button'
        onClick={onMoreClick}
        className={styles.socialButton}
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
          <path fill="currentColor" d="M14.8 22H9.2Q2 22.2 2 14.8V9.2Q1.9 2 9.2 2h5.6q7.4-.1 7.2 7.2v5.6q.2 7.4-7.2 7.2M9.2 3.4C5 3.4 3.4 4.9 3.4 9.2v5.6c0 4.3 1.5 5.8 5.8 5.8h5.6c4.3 0 5.8-1.5 5.8-5.8V9.2c0-4.3-1.5-5.8-5.8-5.8z"/>
          <path fill="currentColor" d="M12 13a1 1 0 0 1-1-1q.1-.9 1-1 .9.1 1 1-.1.9-1 1m3.7 0a1 1 0 0 1-1-1q.1-.9 1-1 .9.1 1 1-.1.9-1 1m-7.4 0a1 1 0 0 1-1-1q.1-.9 1-1 .9.1 1 1-.1.9-1 1"/>
        </svg>
      </button>
    </div>
  )
}