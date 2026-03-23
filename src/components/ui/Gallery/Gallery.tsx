import { useState } from 'react';
import styles from './Gallery.module.css';
import { useImageUrls } from '@/hooks/useImageUrls';


export type GalleryProps = {
  images: File[] | string[];
  alt?: string;
}

export function Gallery({ images, alt = 'Изображение' }: GalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const imageUrls = useImageUrls(images);

  if (!imageUrls.length) return null;

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + imageUrls.length) % imageUrls.length);
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % imageUrls.length);
  };

  return (
    <div className={styles.gallery}>
      <div className={styles.mainImageWrapper}>
        <img
          src={imageUrls[activeIndex]}
          alt={alt}
          className={styles.mainImage}
        />
        
        {imageUrls.length > 1 && (
          <>
            <button className={styles.prev} onClick={handlePrev} type="button">
              ‹
            </button>
            <button className={styles.next} onClick={handleNext} type="button">
              ›
            </button>
          </>
        )}
      </div>

      {imageUrls.length > 1 && (
        <div className={styles.thumbnails}>
          {imageUrls.map((url, idx) => (
            <button
              key={url}
              className={`${styles.thumb} ${idx === activeIndex ? styles.active : ''}`}
              onClick={() => setActiveIndex(idx)}
              type="button"
            >
              <img src={url} alt="" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}