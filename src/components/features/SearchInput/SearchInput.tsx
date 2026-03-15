import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from '@/services/store';
import { Input } from '@/components/ui/Input/Input';
import {
  setSearchQuery,
  selectSearchQuery,
  fetchSearchResults,
  clearSearchResults
} from '@/services/slices/search/searchSlice';
import { useDebounce } from '@/hooks/useDebounce';
import styles from './SearchInput.module.css';
import { SearchSuggestions } from './SearchSuggestions/SearchSuggestions';

export function SearchInput() {
  const dispatch = useDispatch();
  const globalSearchQuery = useSelector(selectSearchQuery);
  const [localValue, setLocalValue] = useState(globalSearchQuery);
  const debouncedValue = useDebounce(localValue, 300);

  useEffect(() => {
    const abortController = new AbortController();

    if (debouncedValue !== globalSearchQuery) {
      dispatch(setSearchQuery(debouncedValue));

      if (debouncedValue.length >= 2) {
        dispatch(fetchSearchResults(debouncedValue));
      } else if (debouncedValue.length === 0) {
        dispatch(clearSearchResults());
      }
    }

    return () => {
      abortController.abort();
    };
  }, [debouncedValue, dispatch, globalSearchQuery]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocalValue(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && localValue.length >= 2) {
      dispatch(setSearchQuery(localValue));
      dispatch(fetchSearchResults(localValue));
    }
  };

  return (
    <div className={styles.searchInputContainer}>
      <Input
        type="search"
        name='search'
        value={localValue}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        placeholder="Искать навык"
        className={styles.searchInput}
        leftIcon={
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path 
              fill="#69735d" 
              d="M11.535 21.07C6.279 21.07 2 16.79 2 11.535 2 6.279 6.28 2 11.535 2c5.256 0 9.535 4.28 9.535 9.535 0 5.256-4.28 9.535-9.535 9.535m0-17.675c-4.493 0-8.14 3.656-8.14 8.14s3.647 8.14 8.14 8.14 8.14-3.656 8.14-8.14-3.647-8.14-8.14-8.14M21.302 22a.7.7 0 0 1-.493-.205l-1.86-1.86a.7.7 0 0 1 0-.987c.27-.27.716-.27.986 0l1.86 1.86c.27.27.27.717 0 .987a.7.7 0 0 1-.493.205"
            />
          </svg>
        }
        hideLeftIconOnFocus={true}
      />
      {localValue.length >= 2 && (
        <SearchSuggestions query={localValue} />
      )}
    </div>
  );
}