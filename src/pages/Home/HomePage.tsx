import { Filter } from "@/components/features/Filter";
import { CatalogUI } from "@/components/ui/Catalog";
import { APP_CATEGORIES, APP_SUBCATEGORIES } from "@/mock/skills";
import { MOCK_USERS } from "@/mock/users";
import {
  resetFilters,
  selectAllUsers,
  selectCities,
  selectFilteredUsers,
  selectHasActiveFilters,
  setError,
  setUsers
} from "@/services/slices/filter/filterSlice";
import { useDispatch, useSelector } from "@/services/store";
import { useEffect } from "react";
import styles from './HomePage.module.css'


export function HomePage() {

  const dispatch = useDispatch();
  const allUsers = useSelector(selectAllUsers);
  const filteredUsers = useSelector(selectFilteredUsers);
  const cities = useSelector(selectCities);
  const hasActiveFilters = useSelector(selectHasActiveFilters);

// ---------------------------------------------------------------

  useEffect(() => {
    try {
      dispatch(setUsers(MOCK_USERS));
    } catch (error) {
      dispatch(setError('Ошибка загрузки пользователей'));
    }
  }, [dispatch]);

// ---------------------------------------------------------------

  const handleResetFilters = () => {
    dispatch(resetFilters());
  };

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

      <main className={styles.catalogContainer}>
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