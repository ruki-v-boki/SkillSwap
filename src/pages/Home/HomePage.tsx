import { useEffect } from 'react';
import { useDispatch, useSelector } from '@/services/store';
import {
  setUsers,
  setError,
  setLoading,
  resetFilters,
  selectCities,
  selectAllUsers,
  selectIsLoading,
  selectFilteredUsers,
  selectHasActiveFilters,
} from '@/services/slices/filter/filterSlice';
import { usersAPI } from '@/services/api';
import styles from './HomePage.module.css';
import { CatalogUI } from "@/components/ui/Catalog";
import { Filter } from "@/components/features/Filter";
import { APP_CATEGORIES, APP_SUBCATEGORIES } from "@/constants/skills";
import { ActiveFilters } from "@/components/features/ActiveFilters/ActiveFilters";


export function HomePage() {
  const dispatch = useDispatch();
  const allUsers = useSelector(selectAllUsers);
  const filteredUsers = useSelector(selectFilteredUsers);
  const cities = useSelector(selectCities);
  const hasActiveFilters = useSelector(selectHasActiveFilters);
  const isLoading = useSelector(selectIsLoading);

// ---------------------------------------------------------------

  useEffect(() => {
    const loadUsers = async () => {
      dispatch(setLoading(true));
      dispatch(setError(null));

      try {
        const users = await usersAPI.getAllUsers();
        dispatch(setUsers(users));
      } catch (error) {
        console.error('Error loading users:', error);
        dispatch(setError('Ошибка загрузки пользователей'));
      } finally {
        dispatch(setLoading(false));
      }
    };
    loadUsers();
  }, [dispatch]);

// ---------------------------------------------------------------

  const handleResetFilters = () => {
    dispatch(resetFilters());
  };

// ---------------------------------------------------------------

  if (isLoading) {
    return <div className={styles.loading}>Загрузка...</div>; // TO-DO: здесь будет компонент лоадера
  }

// ---------------------------------------------------------------

  return (
    <div className={styles.homePageContainer}>
      <aside className={styles.aside}>
        <Filter
          categories={APP_CATEGORIES}
          subcategories={APP_SUBCATEGORIES}
          cities={cities}
        />
      </aside>

      <main className={styles.homePageCatalog}>
        <ActiveFilters />
        <CatalogUI
          users={filteredUsers}
          hasFilters={hasActiveFilters}
          onResetFilters={handleResetFilters}
          allUsers={allUsers}
        />
      </main>
    </div>
  );
}