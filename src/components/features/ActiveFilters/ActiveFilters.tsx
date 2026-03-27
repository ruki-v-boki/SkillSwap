import { selectFilters, setFilters } from '@/services/slices/filterSlice';
import { ActiveFilterTagUI } from '@/components/ui/ActiveFilterTag';
import { useDispatch, useSelector } from '@/services/store';
import styles from './ActiveFilters.module.css';
import {
  getSubcategoriesByCategoryId,
  getSubcategoryName,
  getSubcategoryById,
  getCategoryName,
} from '@/utils/helpers';

// ---------------------------------------------------------------

export function ActiveFilters() {

  const dispatch = useDispatch();
  const filters = useSelector(selectFilters);

// ---------------------------------------------------------------

  const modeLabels = {
    learn: 'Хочу научиться',
    teach: 'Могу научить'
  };

  const genderLabels = {
    male: 'Мужской',
    female: 'Женский'
  };

// ---------------------------------------------------------------

  const handleRemoveMode = () => {
    dispatch(setFilters({ mode: 'all' }));
  };

// ---------------------------------------------------------------

  const handleRemoveCategory = (categoryId: string) => {
    const categorySubs = getSubcategoriesByCategoryId(categoryId).map(sub => sub.id);
    dispatch(setFilters({
      selectedCategories: filters.selectedCategories.filter(id => id !== categoryId),
      selectedSkills: filters.selectedSkills.filter(id => !categorySubs.includes(id))
    }));
  };

// ---------------------------------------------------------------

  const handleRemoveSkill = (skillId: string) => {
    dispatch(setFilters({
      selectedSkills: filters.selectedSkills.filter(id => id !== skillId) 
    }));
  };

// ---------------------------------------------------------------

  const handleRemoveGender = () => {
    dispatch(setFilters({ authorGender: 'any' }));
  };

// ---------------------------------------------------------------

  const handleRemoveCity = (city: string) => {
    dispatch(setFilters({
      selectedCities: filters.selectedCities.filter(c => c !== city)
    }));
  };

// ---------------------------------------------------------------

  const activeFilters = [
    // ------- Режим -------
    ...(filters.mode !== 'all' ? [{
      id: 'mode',
      label: modeLabels[filters.mode],
      categoryId: undefined,
      onRemove: handleRemoveMode
    }] : []),

    // -------- Категории ------
    ...filters.selectedCategories.map(catId => ({
      id: `cat-${catId}`,
      label: getCategoryName(catId),
      categoryId: catId,
      onRemove: () => handleRemoveCategory(catId)
    })),

    // ------- Навыки -------
    ...filters.selectedSkills.map(skillId => {
      const subcategory = getSubcategoryById(skillId);
      return {
        id: `skill-${skillId}`,
        label: getSubcategoryName(skillId),
        categoryId: subcategory?.categoryId,
        onRemove: () => handleRemoveSkill(skillId)
      };
    }),

    // ------- Пол -------
    ...(filters.authorGender !== 'any' ? [{
      id: 'gender',
      label: genderLabels[filters.authorGender],
      categoryId: undefined,
      onRemove: handleRemoveGender
    }] : []),

    // ------- Города -------
    ...filters.selectedCities.map(city => ({
      id: `city-${city}`,
      label: city,
      categoryId: undefined,
      onRemove: () => handleRemoveCity(city)
    })),
  ];

// ---------------------------------------------------------------

  if (filters.mode === 'all' &&
      !filters.selectedCategories.length &&
      !filters.selectedSkills.length &&
      filters.authorGender === 'any' &&
      !filters.selectedCities.length) {
    return null;
  }

  if (activeFilters.length === 0) return null;

// ---------------------------------------------------------------

  return (
    <div className={styles.filtersList}>
      {activeFilters.map(filter => (
        <ActiveFilterTagUI
          key={filter.id}
          label={filter.label}
          categoryId={filter.categoryId}
          onRemove={filter.onRemove}
        />
      ))}
    </div>
  );
}