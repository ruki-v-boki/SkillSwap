import { SearchSuggestions } from './SearchSuggestions/SearchSuggestions';
import { selectSelectedSkills } from '@/services/slices/filterSlice';
import { useState, useEffect, useCallback, useRef } from 'react';
import { useDispatch, useSelector } from '@/services/store';
import { useClickOutside } from '@/hooks/useClickOutside';
import { Input } from '@/components/ui/Input/Input';
import searchIcon from '@/assets/icons/search.svg';
import { useDebounce } from '@/hooks/useDebounce';
import { useNavigate } from 'react-router-dom';
import styles from './SearchInput.module.css';
import {
  setQuery,
  setIsOpen,
  setSelectedIndex,
  selectSearchQuery,
  selectIsSearchOpen,
  selectSearchResults,
  selectSelectedIndex,
  selectSkillFromSearch,
} from '@/services/slices/searchSlice';

// ---------------------------------------------------------------

export function SearchInput() {

  const dispatch = useDispatch();
  const globalSearchQuery = useSelector(selectSearchQuery);
  const searchResults = useSelector(selectSearchResults);
  const selectedIndex = useSelector(selectSelectedIndex);
  const isOpen = useSelector(selectIsSearchOpen);
  const selectedSkills = useSelector(selectSelectedSkills);
  const [inputValue, setInputValue] = useState(globalSearchQuery);
  const debouncedValue = useDebounce(inputValue, 300);
  const isSelectingRef = useRef(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate()

// ---------------------------------------------------------------

  useClickOutside(
    containerRef,
    () => {
      if (isOpen && !isSelectingRef.current) {
        dispatch(setIsOpen(false));
        dispatch(setSelectedIndex(-1));
      }
    },
    inputRef
  );

// ---------------------------------------------------------------

  useEffect(() => {
    if (isSelectingRef.current) return;

    if (debouncedValue !== globalSearchQuery) {
      dispatch(setQuery(debouncedValue));
    }

    if (isOpen && inputRef.current && document.activeElement !== inputRef.current) {
    inputRef.current.focus();
  }
  }, [globalSearchQuery, debouncedValue, isOpen, dispatch]);

// ---------------------------------------------------------------

  const handleFocus = useCallback(() => {
    dispatch(setIsOpen(true));
  }, [dispatch]);

// ---------------------------------------------------------------

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
    dispatch(setSelectedIndex(-1));
    dispatch(setIsOpen(true));
  }, [dispatch]);

// ---------------------------------------------------------------

  const handleSelectSuggestion = useCallback((
    skillId: string,
    skillName: string
  ) => {
    isSelectingRef.current = true;
    dispatch(selectSkillFromSearch(skillId));
    setInputValue(skillName);
    dispatch(setQuery(skillName));
    dispatch(setIsOpen(false));
    dispatch(setSelectedIndex(-1));
    inputRef.current?.blur();
    navigate('/home');

    if (inputRef.current) {
        inputRef.current.focus();
      }

    setTimeout(() => {
      isSelectingRef.current = false;
    }, 100);
  }, [dispatch]);

// ---------------------------------------------------------------

  const handleKeyDown = useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!isOpen && (e.key === 'ArrowDown' || e.key === 'ArrowUp')) {
      e.preventDefault();
      dispatch(setIsOpen(true));
      return;
    };

    switch (e.key) {
      case 'ArrowDown': {
        e.preventDefault();
        const next = selectedIndex + 1;
        if (next < searchResults.length) {
          dispatch(setSelectedIndex(next));
        } else if (selectedIndex === -1 && searchResults.length > 0) {
          dispatch(setSelectedIndex(0));
        }
        break;
      };

      case 'ArrowUp': {
        e.preventDefault();
        const prev = selectedIndex - 1;
        if (prev >= -1) {
          dispatch(setSelectedIndex(prev));
        }
        break;
      };

      case 'Enter': {
        e.preventDefault();
        if (selectedIndex >= 0 && searchResults[selectedIndex]) {
          const item = searchResults[selectedIndex];
          if (!selectedSkills.includes(item.id)) {
            handleSelectSuggestion(item.id, item.name);
          }
          dispatch(setIsOpen(false));
          dispatch(setSelectedIndex(-1));
        }
        break;
      };

      case 'Escape':
        e.preventDefault();
        dispatch(setIsOpen(false));
        dispatch(setSelectedIndex(-1));
        break;
    }
  }, [
     isOpen,
     selectedIndex,
     searchResults,
     inputValue,
     selectedSkills,
     dispatch,
     handleSelectSuggestion
  ]);

// ---------------------------------------------------------------

  return (
    <div
      className={styles.searchInputContainer}
      ref={containerRef}
    >
      <Input
        ref={inputRef}
        type="search"
        name='search'
        value={inputValue}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        onFocus={handleFocus}
        placeholder="Искать навык"
        className={styles.searchInput}
        leftIcon={<img src={searchIcon} />}
        hideLeftIconOnFocus={true}
      />

      {isOpen && (
          <SearchSuggestions
            query={inputValue}
            results={searchResults}
            onSelect={handleSelectSuggestion}
            selectedSkills={selectedSkills}
            selectedIndex={selectedIndex}
            onClose={() => {
              dispatch(setIsOpen(false));
              dispatch(setSelectedIndex(-1));
            }}
          />
        )
      }
    </div>
  );
};