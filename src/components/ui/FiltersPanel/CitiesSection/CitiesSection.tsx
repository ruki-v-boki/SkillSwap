import { useState } from 'react';
import styles from './CitiesSection.module.css';
import type { CitiesSectionProps } from './type';
import { Button } from '../../Button';
import { ChevronIcon } from '../../ChevronIcon';


export function CitiesSectionUI({
  cities,
  value,
  onChange
}: CitiesSectionProps ) {

  const [showAll, setShowAll] = useState(false);
  const displayedCities = showAll ? cities : cities.slice(0, 5);
  const hasMoreCities = cities.length > 5;

// ---------------------------------------------------------------

  const toggleShowAll = () => {
    setShowAll(prev => !prev);
  };

// ---------------------------------------------------------------

  return (
    <div className={styles.container}>
      <div className={styles.citiesList}>
        {displayedCities.map(city => (
          <div key={city} className={styles.cityItem}>
            <input
              type="checkbox"
              id={city}
              className={`checkbox`}
              checked={value.selectedCities.includes(city)}
              onChange={() => {
                const newSelected = value.selectedCities.includes(city)
                  ? value.selectedCities.filter(c => c !== city)
                  : [...value.selectedCities, city];
                onChange(newSelected);
              }}
            />
            <label htmlFor={city}>{city}</label>
          </div>
        ))}
      </div>
      {hasMoreCities && (
        <Button
          variant="link"
          onClick={toggleShowAll}
          className={styles.showAllButton}
        >
          {showAll ? 'Скрыть' : `Все города`}
          <ChevronIcon open={showAll}/>
        </Button>
      )}
    </div>
  );
}