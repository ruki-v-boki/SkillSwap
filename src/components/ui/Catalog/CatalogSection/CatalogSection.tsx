import { selectHasActiveFilters } from '@/services/slices/filter/filterSlice';
import type { CatalogSectionUIProps } from './type';
import styles from './CatalogSection.module.css';
import { ChevronIcon } from '../../ChevronIcon';
import { useSelector } from '@/services/store';
import { motion } from 'framer-motion';
import { Button } from '../../Button';
import { CardUI } from '../../Card';
import { useState } from 'react';


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
                <motion.svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="none"
                    viewBox="0 0 24 24"
                    animate={{ rotate: sortByNew ? -180 : 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                  >
                    <path fill="currentColor" d="M10.6 7.8q-.3 0-.5-.2l-3-3-3 3q-.4.5-.9 0a1 1 0 0 1 0-1l3.4-3.4a1 1 0 0 1 1 0l3.5 3.4q.3.6 0 1-.3.3-.5.2"/>
                    <path fill="currentColor" d="M7.1 21a1 1 0 0 1-.7-.7V3.7q0-.7.7-.7t.7.7v16.6q0 .6-.7.7m9.8 0q-.3 0-.5-.2l-3.5-3.4a1 1 0 0 1 0-1q.6-.5 1 0l3 3 3-3q.4-.5.9 0t0 1l-3.4 3.4z"/>
                    <path fill="currentColor" d="M16.9 21a1 1 0 0 1-.7-.7V3.7q0-.7.7-.7t.7.7v16.6q0 .6-.7.7"/>
                  </motion.svg>
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