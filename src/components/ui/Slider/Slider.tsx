import { useEffect, useRef, useState } from 'react';
import type { SliderUIProps } from './type';
import styles from './Slider.module.css';

// ---------------------------------------------------------------

export function SliderUI({
  children
}: SliderUIProps) {

  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const hasChildren = Array.isArray(children) ? children.length > 0 : !!children;

// ---------------------------------------------------------------
  const checkScrollButtons = () => {
    const container = scrollContainerRef.current;
    if (container) {
      setCanScrollLeft(container.scrollLeft > 0);
      setCanScrollRight(
        container.scrollLeft < container.scrollWidth - container.clientWidth - 10
      );
    }
  };

// ---------------------------------------------------------------

  useEffect(() => {
    checkScrollButtons();
    window.addEventListener('resize', checkScrollButtons);
    return () => window.removeEventListener('resize', checkScrollButtons);
  }, [children]);

  // ---------------------------------------------------------------

  const scroll = (direction: 'left' | 'right') => {
    const container = scrollContainerRef.current;
    if (container) {
      const scrollAmount = container.clientWidth * 0.5;
      container.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
      setTimeout(checkScrollButtons, 300);
    }
  };

// ---------------------------------------------------------------

  if (!hasChildren) {
    return null;
  }

// ---------------------------------------------------------------

  return (
    <div className={styles.sliderMainContainer}>
      {/* Кнопка "Назад" */}
      {canScrollLeft && (
        <button
          className={`${styles.sliderButton} ${styles.sliderButtonLeft}`}
          onClick={() => scroll('left')}
          aria-label="Предыдущие"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      )}

      {/* Контейнер */}
      <div
        className={styles.slidesContainer}
        ref={scrollContainerRef}
        onScroll={checkScrollButtons}
      >
        {children}
      </div>

      {/* Кнопка "Вперёд" */}
      {canScrollRight && (
        <button
          className={`${styles.sliderButton} ${styles.sliderButtonRight}`}
          onClick={() => scroll('right')}
          aria-label="Следующие"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      )}
    </div>
  );
}