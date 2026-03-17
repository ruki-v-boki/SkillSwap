import { useState } from 'react';
import styles from './CatalogSection.module.css'
import type { CatalogSectionUIProps } from './type'
import { ChevronIcon } from '../../ChevronIcon';
import { Button } from '../../Button';
import { CardUI } from '../../Card';
import sortIcon from '@/assets/icons/sort.svg'
import { selectHasActiveFilters } from '@/services/slices/filter/filterSlice';
import { useSelector } from '@/services/store';


export function CatalogSectionUI({
  users,
  title,
  visibleCardsValue,
}: CatalogSectionUIProps) {

  const [showAll, setShowAll] = useState(false);
  const [sortByNew, setSortByNew] = useState(false);
  const hasMoreCards = visibleCardsValue !== undefined && users.length > visibleCardsValue;
  const hasActiveFilters = useSelector(selectHasActiveFilters);
  const showAllButtonText = showAll ? 'Скрыть все' : 'Смотреть все';

// ---------------------------------------------------------------

  const sortedUsers = sortByNew 
    ? [...users].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    : users;

// ---------------------------------------------------------------

  const visibleUsers = visibleCardsValue === undefined
    ? users
    : (showAll ? sortedUsers : sortedUsers.slice(0, visibleCardsValue));

// ---------------------------------------------------------------

  const handleShowAllClick = () => {
    setShowAll(!showAll);
  };

  const handleSortClick = () => {
    setSortByNew(!sortByNew);
  };

// ---------------------------------------------------------------

  return (
    <section className={styles.section}>
      <div className={styles.sectionHeader}>
        <h2 className={`${styles.sectionTitle} h-1`}>{title}</h2>
        {hasActiveFilters && (
          <Button
            type='button'
            variant='base'
            onClick={handleSortClick}
            className={`${styles.sortButton} ${sortByNew ? styles.active : ''}`}
          >
            <img src={sortIcon} />
            Сначала новые
          </Button>
        )}
        {hasMoreCards && (
          <Button
            type='button'
            variant='base'
            onClick={handleShowAllClick}
            className={styles.showMoreButton}
          >
            {showAllButtonText}
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