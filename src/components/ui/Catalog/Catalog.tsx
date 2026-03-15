import { useMemo } from 'react';
import styles from './Catalog.module.css';
import type { CatalogUIProps } from './type';
import { CatalogSectionUI } from './CatalogSection';
import noResultsIcon from '@/assets/icons/noResults.svg'
import { Button } from '../Button';


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

  if (hasFilters) {
    if (users.length === 0) {
      return (
        <div className={styles.noResults}>
          <p className={`h-1`}>Сейчас подходящих предложений не найдено :( </p>
          <img src={noResultsIcon} alt="Ничего не найдено" className={styles.noResultsImage}/>
          <p className={`h-3`}>но мы верим что они появятся в будущем :) а пока, измените параметры поиска...</p>
          {onResetFilters && (
            <Button
              type='button'
              variant='prime'
              onClick={onResetFilters}
              >
                ...или сбросьте все фильтры!
              </Button>
          )}
        </div>
      );
    }

// ---------------------------------------------------------------

    return (
        <CatalogSectionUI
          title={`Подходящие предложения: ${users.length}`}
          users={users}
          visibleCardsValue={users.length}
      />
    );
  }

// ---------------------------------------------------------------

  return (
    <>
      <CatalogSectionUI
        title="Популярное"
        users={popularUsers}
        visibleCardsValue={3}
      />
      <CatalogSectionUI
        title="Новое"
        users={newUsers}
        visibleCardsValue={3}
      />
      <CatalogSectionUI
        title="Рекомендуемое"
        users={allUsers}
        visibleCardsValue={3}
      />
    </>
  );
}