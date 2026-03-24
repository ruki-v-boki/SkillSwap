import { selectSearchQuery, selectSkillFromSearch } from '@/services/slices/searchSlice';
import { useDispatch, useSelector } from '@/services/store';
import { APP_SUBCATEGORIES } from '@/constants/skills';
import { useDebounce } from './useDebounce';
import { useEffect } from 'react';


export function useSkillSearchSync() {
  const dispatch = useDispatch();
  const searchQuery = useSelector(selectSearchQuery);
  const debouncedQuery = useDebounce(searchQuery, 500);

// ---------------------------------------------------------------

  useEffect(() => {
    if (debouncedQuery.length >= 2) {

      const exactMatch = APP_SUBCATEGORIES.find(
        skill => skill.name.toLowerCase() === debouncedQuery.toLowerCase().trim()
      );

      if (exactMatch) {
        dispatch(selectSkillFromSearch(exactMatch.id));
      }
    }
  }, [debouncedQuery, dispatch]);
}