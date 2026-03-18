import { useMemo } from 'react';

import styles from './Catalog.module.css';
import type { CatalogUIProps } from './type';
import { CatalogSectionUI } from './CatalogSection';
import noResultsIcon from '@/assets/icons/noResults.svg'
import { Button } from '../Button';
import { type Variants, motion } from 'framer-motion';

// Варианты анимации для контейнера с карточками
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1
    }
  }
};

// Варианты анимации для отдельной карточки
// const cardVariants: Variants = {
//   hidden: { 
//     opacity: 0,
//     y: 20,
//     scale: 0.95
//   },
//   visible: { 
//     opacity: 1,
//     y: 0,
//     scale: 1,
//     transition: {
//       type: "spring" as const,
//       stiffness: 100,
//       damping: 12
//     }
//   },
//   exit: {
//     opacity: 0,
//     y: -20,
//     scale: 0.95,
//     transition: {
//       duration: 0.2
//     }
//   }
// };

// Варианты для появления секций
const sectionVariants: Variants = {
  hidden: { 
    opacity: 0,
    x: -20
  },
  visible: { 
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.4
    }
  }
};

export function CatalogUI({
  users,
  hasFilters,
  onResetFilters,
  allUsers
}: CatalogUIProps) {

  const newUsers = useMemo(() => {
    return [...allUsers].sort((a, b) =>
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  }, [allUsers]);

// ---------------------------------------------------------------

  const popularUsers = useMemo(() => {
    return [...allUsers].sort((a, b) =>
      (b.rating || 0) - (a.rating || 0)
    );
  }, [allUsers]);

// ---------------------------------------------------------------

  // Анимация для сообщения об отсутствии результатов
  const noResultsVariants: Variants = {
    hidden: { 
      opacity: 0,
      scale: 0.8
    },
    visible: { 
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        type: "spring" as const
      }
    }
  };

// ---------------------------------------------------------------

  if (hasFilters) {
    if (users.length === 0) {
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
          
          {onResetFilters && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
            >
              <Button
                type='button'
                variant='prime'
                onClick={onResetFilters}
              >
                ...или сбросьте все фильтры!
              </Button>
            </motion.div>
          )}
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
          title={`Подходящие предложения: ${users.length}`}
          users={users}
          visibleCardsValue={users.length}
          containerVariants={containerVariants}
          // cardVariants={cardVariants}
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
          // cardVariants={cardVariants}
        />
      </motion.div>
      
      <motion.div variants={sectionVariants}>
        <CatalogSectionUI
          title="Новое"
          users={newUsers}
          visibleCardsValue={3}
          containerVariants={containerVariants}
          // cardVariants={cardVariants}
        />
      </motion.div>
      
      <motion.div variants={sectionVariants}>
        <CatalogSectionUI
          title="Рекомендуемое"
          users={allUsers}
          visibleCardsValue={3}
          containerVariants={containerVariants}
          // cardVariants={cardVariants}
        />
      </motion.div>
    </motion.div>
  );
}