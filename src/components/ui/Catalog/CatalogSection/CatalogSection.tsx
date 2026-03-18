import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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
        <motion.h2
          className={`${styles.sectionTitle} h-1`}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
        >
          {title}
        </motion.h2>

        <div className={styles.buttonsContainer}>
          {hasActiveFilters && (
              <Button
                type='button'
                variant='base'
                onClick={handleSortClick}
                className={`${styles.sortButton} ${sortByNew ? styles.active : ''}`}
              >
                <motion.img
                  src={sortIcon}
                  alt="sort"
                  animate={{ rotate: sortByNew ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                />
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
      </div>

      <motion.div
        className={styles.cardsContainer}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.9 }}
      >
          {visibleUsers.map((user) => (
            <CardUI
              key={user.id}
              user={user}
              type='catalog'
            />
          ))}
      </motion.div>
    </section>
  )
}