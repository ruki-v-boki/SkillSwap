import { useCallback, useEffect, useRef } from 'react';
import styles from './SearchSuggestions.module.css';

interface SearchSuggestionsProps {
  query: string;
  results: Array<{ id: string; name: string; categoryId: string }>;
  onSelect: (skillId: string, skillName: string) => void;
  selectedSkills: string[];
  selectedIndex: number;
  onClose: () => void;
}

export function SearchSuggestions({
  query,
  results,
  onSelect,
  selectedSkills,
  selectedIndex,
  onClose
}: SearchSuggestionsProps) {

  const listRef = useRef<HTMLDivElement>(null);

// ---------------------------------------------------------------

  useEffect(() => {
    if (selectedIndex >= 0 && listRef.current) {
      const selectedButton = listRef.current.querySelectorAll('button')[selectedIndex];
      if (selectedButton) {
        selectedButton.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
      }
    }
  }, [selectedIndex]);

// ---------------------------------------------------------------

  const handleClick = (
    skillId: string,
    skillName: string
  ) => {
    onSelect(skillId, skillName)
  };

// ---------------------------------------------------------------

  const handleContainerBlur = useCallback(() => {
    setTimeout(() => {
      if (listRef.current && !listRef.current.contains(document.activeElement)) {
        onClose();
      }
    }, 0);
  }, [onClose]);

// ---------------------------------------------------------------

  if (results.length === 0) {
    return (
      <div className={styles.suggestionsContainer}>
        <div className={styles.emptyMessage}>
          {query && `По запросу "${query}" ничего не найдено`}
        </div>
      </div>
    );
  }

// ---------------------------------------------------------------

  return (
    <div
      className={styles.suggestionsContainer}
      onBlur={handleContainerBlur}
      tabIndex={-1}
    >
      <div
        className={styles.suggestionsList}
        ref={listRef}
      >
        {results.map((skill, index) => {
          const isSelected = selectedSkills.includes(skill.id);
          return (
            <button
              key={skill.id}
              className={`
                ${styles.suggestionItem}
                ${selectedIndex === index ? styles.selected : ''}
                ${isSelected ? styles.alreadySelected : ''}
              `}
              onClick={() => handleClick(skill.id, skill.name)}
              data-skill-id={skill.id}
              data-skill-name={skill.name}
              data-index={index}
              type="button"
              disabled={isSelected}
              tabIndex={0}
            >
              <span className="h-body">{skill.name}</span>

              {isSelected && (
                <span className={styles.selectedBadde}>(выбрано)</span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}