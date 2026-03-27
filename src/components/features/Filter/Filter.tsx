import { clearSearch, selectSearchQuery } from '@/services/slices/searchSlice';
import { APP_CATEGORIES, APP_SUBCATEGORIES } from '@/constants/skills';
import { FiltersPanelUI } from '@/components/ui/FiltersPanel';
import { useDispatch, useSelector } from '@/services/store';
import { useCallback } from 'react';
import {
  selectActiveFiltersCount,
  selectHasActiveFilters,
  selectAvailableCities,
  resetFilters,
  selectFilters,
  setFilters
} from '@/services/slices/filterSlice';

// ---------------------------------------------------------------

export function Filter() {

  const dispatch = useDispatch();
  const filters = useSelector(selectFilters);
  const hasActiveFilters = useSelector(selectHasActiveFilters);
  const activeFiltersCount = useSelector(selectActiveFiltersCount);
  const searchQuery = useSelector(selectSearchQuery);
  const availableCities = useSelector(selectAvailableCities);
  const showResetButton = hasActiveFilters;

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