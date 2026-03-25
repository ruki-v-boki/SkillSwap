import { selectFilteredUsers, selectHasActiveFilters } from '@/services/slices/filterSlice';
import { containerVariants, noResultsVariants, sectionVariants } from './framerMotion';
import { resetFilters } from '@/services/slices/filterSlice';
import { selectAllUsers } from '@/services/slices/userSlice';
import { CatalogSectionUI } from '../../ui/CatalogSection';
import noResultsIcon from '@/assets/icons/noResults.svg';
import { getUserRating } from '@/utils/helpers';
import { useSelector } from '@/services/store';
import { useDispatch } from '@/services/store';
import styles from './Catalog.module.css';
import { Button } from '../../ui/Button';
import { motion } from 'framer-motion';
import { useMemo } from 'react';


export function Catalog() {
  const dispatch = useDispatch();
  const allUsers = useSelector(selectAllUsers);
  const filteredUsers = useSelector(selectFilteredUsers);
  const hasFilters = useSelector(selectHasActiveFilters);

// ---------------------------------------------------------------

  const popularUsers = useMemo(() => {
    return [...allUsers].sort((a, b) =>
      getUserRating(b) - getUserRating(a)
    );
  }, [allUsers]);

// ---------------------------------------------------------------

  const newUsers = useMemo(() => {
    return [...allUsers].sort((a, b) =>
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  }, [allUsers]);

// ---------------------------------------------------------------

  const handleResetFilters = () => {
    dispatch(resetFilters());
  };

// ---------------------------------------------------------------

  if (hasFilters) {

    if (filteredUsers.length === 0) {
      return (
        <motion.div
          className={styles.noResults}
          variants={noResultsVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
        >
          <motion.p
            className={`h-1`}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            Сейчас подходящих предложений не найдено :(
          </motion.p>

          <motion.img
            src={noResultsIcon} 
            alt="Ничего не найдено" 
            className={styles.noResultsImage}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, type: "spring" as const }}
          />

          <motion.p
            className={`h-3`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            но мы верим что они появятся в будущем :) а пока, измените параметры поиска...
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
          >
            <Button
              type='button'
              variant='prime'
              onClick={handleResetFilters}
            >
              ...или сбросьте все фильтры!
            </Button>
          </motion.div>
        </motion.div>
      );
    }

  // ---------------------------------------------------------------

    return (
      <motion.div
        variants={sectionVariants}
        initial="hidden"
        animate="visible"
        exit="hidden"
      >
        <CatalogSectionUI
          title={`Подходящие предложения: ${filteredUsers.length}`}
          users={filteredUsers}
          visibleCardsValue={filteredUsers.length}
          containerVariants={containerVariants}
        />
      </motion.div>
    );
  }

// ---------------------------------------------------------------

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      exit="hidden"
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: {
            staggerChildren: 0.2
          }
        }
      }}
    >
      <motion.div variants={sectionVariants}>
        <CatalogSectionUI
          title="Популярное"
          users={popularUsers}
          visibleCardsValue={3}
          containerVariants={containerVariants}
        />
      </motion.div>
      
      <motion.div variants={sectionVariants}>
        <CatalogSectionUI
          title="Новое"
          users={newUsers}
          visibleCardsValue={3}
          containerVariants={containerVariants}
        />
      </motion.div>
      
      <motion.div variants={sectionVariants}>
        <CatalogSectionUI
          title="Рекомендуемое"
          users={allUsers}
          visibleCardsValue={3}
          containerVariants={containerVariants}
        />
      </motion.div>
    </motion.div>
  );
}