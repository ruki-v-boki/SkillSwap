import { useState } from 'react';
import styles from './CatalogSection.module.css'
import type { CatalogSectionUIProps } from '../../CatalogSection/type';
import { Button } from '../../Button';
import { ChevronIcon } from '../../ChevronIcon';
import { CardUI } from '../../Card';


export function CatalogSectionUI({
  users,
  title,
  visibleCardsValue,
}: CatalogSectionUIProps) {
  const [showAll, setShowAll] = useState(false);

// ---------------------------------------------------------------

  const visibleUsers = visibleCardsValue === undefined
    ? users
    : (showAll ? users : users.slice(0, visibleCardsValue));
  const hasMoreCards = visibleCardsValue !== undefined && users.length > visibleCardsValue;
  const buttonText = showAll ? 'Скрыть все' : 'Смотреть все';

// ---------------------------------------------------------------

  const handleButtonClick = () => {
    setShowAll(!showAll);
  };

// ---------------------------------------------------------------

  return (
    <section className={styles.section}>
      <div className={styles.sectionHeader}>
        <h2 className={`${styles.sectionTitle} h-1`}>{title}</h2>
        {hasMoreCards && (
          <Button
          type='button'
          variant='base'
          onClick={handleButtonClick}
          >
            {buttonText}
            <ChevronIcon rotate={-90} open={showAll} />
          </Button>
        )}
      </div>

      <div className={styles.cardsContainer}>
        {visibleUsers.map(user => (
          <CardUI
            key={user.id}
            user={user}
            type="catalog"
          />
        ))}
      </div>
    </section>
  )
}