import { useEffect } from 'react';
import { useDispatch, useSelector } from '@/services/store';
import { useDebounce } from './useDebounce';
import { APP_SUBCATEGORIES } from '@/constants/skills';
import { selectSearchQuery } from '@/services/slices/search/searchSlice';
import { selectSkillFromSearch } from '@/services/slices/search/searchThunks';


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