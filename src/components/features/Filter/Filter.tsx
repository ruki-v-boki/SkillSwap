import { useCallback } from 'react';
import { FiltersPanelUI } from '@/components/ui/FiltersPanel';
import { useDispatch, useSelector } from '@/services/store';
import {
  resetFilters,
  selectFilters,
  selectHasActiveFilters,
  setFilters,
  selectAvailableCities,
  selectActiveFiltersCount,
} from '@/services/slices/filterSlice';
import { clearSearch, selectSearchQuery } from '@/services/slices/searchSlice';
import { APP_CATEGORIES, APP_SUBCATEGORIES } from '@/constants/skills';


export function Filter() {
  const dispatch = useDispatch();
  const filters = useSelector(selectFilters);
  const hasActiveFilters = useSelector(selectHasActiveFilters);
  const activeFiltersCount = useSelector(selectActiveFiltersCount);
  const searchQuery = useSelector(selectSearchQuery);
  const availableCities = useSelector(selectAvailableCities);

  // ---------------------------------------------------------------

  const handleChange = useCallback((newFilters: typeof filters) => {

    if (newFilters.selectedCategories.length === 1 &&
        newFilters.selectedSkills.length === 0 &&
        filters.selectedCategories.length === 0 &&
        filters.selectedSkills.length > 0) {
      return;
    }

    dispatch(setFilters(newFilters));
  }, [dispatch, filters]);

  // ---------------------------------------------------------------

  const handleReset = useCallback(() => {
    dispatch(resetFilters());

    if (searchQuery) {
      dispatch(clearSearch());
    }
  }, [dispatch, searchQuery]);

  // ---------------------------------------------------------------

  const showResetButton = hasActiveFilters;

  // ---------------------------------------------------------------

  return (
    <FiltersPanelUI
      value={filters}
      categories={APP_CATEGORIES}
      subcategories={APP_SUBCATEGORIES}
      cities={availableCities}
      onChange={handleChange}
      onReset={showResetButton ? handleReset : undefined}
      activeFiltersCount={activeFiltersCount}
    />
  );
}