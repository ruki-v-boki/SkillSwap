import { useCallback, memo } from 'react';
import styles from './FiltersPanel.module.css';
import {
  FILTER_MODE_OPTIONS,
  GENDER_OPTIONS,
  type AuthorGender,
  type FilterMode,
  type FiltersPanelUIProps
} from './type';
import { RadioGroupUI } from './RadioGroup';
import { SkillsSectionUI } from './SkillsSection';
import { CitiesSectionUI } from './CitiesSection';
import { Button } from '../Button';


export const FiltersPanelUI = memo(function FiltersPanelUI({
  value,
  categories,
  subcategories,
  cities,
  onChange,
  onReset,
  activeFiltersCount = 0,
  'data-testid': dataTestId
}: FiltersPanelUIProps) {

  const handleModeChange = useCallback((mode: string) => {
    onChange({ ...value, mode: mode as FilterMode });
  }, [onChange, value]);

// ---------------------------------------------------------------

  const handleGenderChange = useCallback((gender: string) => {
    onChange({ ...value, authorGender: gender as AuthorGender });
  }, [onChange, value]);

// ---------------------------------------------------------------

  const handleSkillsChange = useCallback((
    selectedCategories: string[],
    selectedSkills: string[]
  ) => {
    onChange({
      ...value,
      selectedCategories,
      selectedSkills 
    });
  }, [onChange, value]);

// ---------------------------------------------------------------

  const handleCitiesChange = useCallback((selectedCities: string[]) => {
    onChange({ ...value, selectedCities });
  }, [onChange, value]);

// ---------------------------------------------------------------

  return (
    <div className={styles.filtersPanelContainer} data-testid={dataTestId}>
      <header className={styles.header}>
        <h2 className={`${styles.title} h-2`}>
          Фильтры
          {activeFiltersCount > 0 && (
            <span className={styles.badge}>({activeFiltersCount})</span>
          )}
        </h2>
        {onReset && (
          <Button
            onClick={onReset}
            variant='link'
            className={styles.resetButton}
            aria-label="Сбросить все фильтры"
          >
            Сбросить
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
              <path fill="currentColor" d="m16.7 8.3-8.4 8.5q-.6.4-1.1 0a1 1 0 0 1 0-1l8.5-8.6q.6-.5 1 0t0 1"/>
              <path fill="currentColor" d="M16.7 16.8q-.4.4-1 0L7.2 8.3a1 1 0 0 1 0-1q.6-.6 1 0l8.5 8.4q.4.6 0 1"/>
            </svg>
          </Button>
        )}
      </header>

      <section className={styles.section}>
        <RadioGroupUI
          name="filterMode"
          options={FILTER_MODE_OPTIONS}
          value={value.mode}
          onChange={handleModeChange}
          data-testid="filters-mode"
        />
      </section>

      <section className={styles.section}>
        <h3 className={`${styles.sectionTitle} h-3`}>Навыки</h3>
        <SkillsSectionUI
          categories={categories}
          subcategories={subcategories}
          onChange={handleSkillsChange}
          dataTestId="filters-skills"
          selectedCategories={value.selectedCategories}
          selectedSkills={value.selectedSkills}
        />
      </section>

      <section className={styles.section}>
        <h3 className={`${styles.sectionTitle} h-3`}>Пол автора</h3>
        <RadioGroupUI
          name="authorGender"
          options={GENDER_OPTIONS}
          value={value.authorGender}
          onChange={handleGenderChange}
          data-testid="filters-gender"
        />
      </section>

      <section className={styles.section}>
        <h3 className={`${styles.sectionTitle} h-3`}>Город</h3>
        <CitiesSectionUI
          cities={cities}
          value={value}
          onChange={handleCitiesChange}
        />
      </section>
    </div>
  );
});