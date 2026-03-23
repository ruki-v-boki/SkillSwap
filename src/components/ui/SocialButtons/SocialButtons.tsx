import type { SocialButtonsUIProps } from './type';
import styles from './SocialButtons.module.css';


export function SocialButtonsUI({
  className,
  onFavoriteClick,
  onShareClick,
  onMoreClick
}: SocialButtonsUIProps) {
  return (
    <div className={className}>
      <button
        type='button'
        onClick={onFavoriteClick}
        className={styles.socialButton}
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
          <g clip-path="url(#a)">
            <path fill="currentColor" d="M12 21q-.5 0-.8-.2C7.6 19.6 2 15.3 2 9a5.9 5.9 0 0 1 10-4.2q1.7-1.6 4.1-1.7A6 6 0 0 1 22 8.9c0 6.4-5.6 10.7-9.2 12zM7.9 4.4c-2.5 0-4.5 2-4.5 4.5 0 6.4 6.1 9.9 8.3 10.6h.7c2-.7 8.2-4.2 8.2-10.6 0-2.5-2-4.5-4.5-4.5q-2.2 0-3.5 1.8-.6.6-1.1 0a4 4 0 0 0-3.6-1.8"/>
          </g>
          <defs>
            <clipPath id="a">
              <path fill="none" d="M0 0h24v24H0z"/>
            </clipPath>
          </defs>
        </svg>
      </button>
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