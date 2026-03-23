import { useImageUrls } from '@/hooks/useImageUrls';
import type { GalleryUIProps } from './type';
import styles from './Gallery.module.css';
import { useState } from 'react';


export function GalleryUI({
  images
}: GalleryUIProps) {

  const [activeIndex, setActiveIndex] = useState(0);
  const imageUrls = useImageUrls(images);

  if (!imageUrls.length) return null;

// ---------------------------------------------------------------

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + imageUrls.length) % imageUrls.length);
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % imageUrls.length);
  };

// ---------------------------------------------------------------

  const MAX_VISIBLE_THUMBS = 3;
  const visibleThumbnails = imageUrls.slice(0, MAX_VISIBLE_THUMBS);
  const remainingCount = imageUrls.length - MAX_VISIBLE_THUMBS;
  const showMoreOverlay = remainingCount > 0;

// ---------------------------------------------------------------

  return (
    <div className={styles.gallery}>
      {/* Основное изображение */}
      <div className={styles.mainImageWrapper}>
        <img
          src={imageUrls[activeIndex]}
          alt=""
          className={styles.mainImage}
        />
        {imageUrls.length > 1 && (
          <>
            <button className={styles.prev} onClick={handlePrev} type="button">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 6 11">
                <path fill="currentColor" d="M4.83 10.67q.18 0 .33-.14a.46.46 0 0 0 0-.65L1.14 5.87a.76.76 0 0 1 0-1.07L5.16.79a.46.46 0 0 0 0-.66.46.46 0 0 0-.66 0l-4 4.02a1.7 1.7 0 0 0 0 2.37l4 4.01q.15.14.33.14"/>
              </svg>
            </button>
            <button className={styles.next} onClick={handleNext} type="button">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 6 11">
                <path fill="currentColor" d="M.46 10.67a.5.5 0 0 1-.33-.14.46.46 0 0 1 0-.65l4.02-4.01a.77.77 0 0 0 0-1.07L.13.79a.46.46 0 0 1 0-.66.46.46 0 0 1 .66 0l4 4.02a1.7 1.7 0 0 1 0 2.37l-4 4.01q-.15.14-.33.14"/>
              </svg>
            </button>
          </>
        )}
      </div>

      {/* Вертикальные миниатюры */}
      {imageUrls.length > 1 && (
        <div
          className={styles.thumbnailsWrapper}
        >
          {visibleThumbnails.map((url, idx) => {
            const isLast = idx === MAX_VISIBLE_THUMBS - 1;

            return (
              <button
                key={url}
                className={styles.thumb}
                onClick={() => setActiveIndex(idx)}
                type="button"
              >
                <img src={url} alt="" />
                {isLast && showMoreOverlay && (
                  <>
                    <span className={styles.moreOverlay}></span>
                    <span className={styles.count}>+{remainingCount}</span>
                  </>

                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}