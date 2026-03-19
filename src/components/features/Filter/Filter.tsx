import { useCallback } from 'react';
import { FiltersPanelUI } from '@/components/ui/FiltersPanel';
import { useDispatch, useSelector } from '@/services/store';
import {
  resetFilters,
  selectFilters,
  selectHasActiveFilters,
  setFilters,
  selectActiveFiltersCount,
} from '@/services/slices/filter/filterSlice';
import {
  clearSearch,
  selectSearchQuery,
} from '@/services/slices/search/searchSlice';
import type { FilterProps } from './type';

export function Filter({
  categories,
  subcategories,
  cities,
  className,
  'data-testid': dataTestId
}: FilterProps) {

  const dispatch = useDispatch();
  const filters = useSelector(selectFilters);
  const hasActiveFilters = useSelector(selectHasActiveFilters);
  const activeFiltersCount = useSelector(selectActiveFiltersCount);
  const searchQuery = useSelector(selectSearchQuery);

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
      categories={categories}
      subcategories={subcategories}
      cities={cities}
      onChange={handleChange}
      onReset={showResetButton ? handleReset : undefined}
      activeFiltersCount={activeFiltersCount}
      className={className}
      data-testid={dataTestId}
    />
  );
}