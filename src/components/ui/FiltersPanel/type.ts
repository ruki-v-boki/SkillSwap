import type { Category, Subcategory } from '@/types/types'

export type FilterMode = 'all' | 'learn' | 'teach';
export type AuthorGender = 'any' | 'male' | 'female';

export interface FiltersPanelUIState {
  mode: FilterMode;
  selectedSkills: string[];
  selectedCategories: string[];
  authorGender: AuthorGender;
  selectedCities: string[];
}

export interface FiltersPanelUIProps {
  value: FiltersPanelUIState;
  categories: Category[];
  subcategories: Subcategory[];
  cities: string[];
  onChange: (next: FiltersPanelUIState) => void;
  onReset?: () => void;
  activeFiltersCount?: number,
  className?: string;
  'data-testid'?: string;
}

export const FILTER_MODE_OPTIONS = [
  { value: 'all', label: 'Всё' },
  { value: 'learn', label: 'Хочу научиться' },
  { value: 'teach', label: 'Могу научить' },
] as const;

export const GENDER_OPTIONS = [
  { value: 'any', label: 'Не имеет значения' },
  { value: 'male', label: 'Мужской' },
  { value: 'female', label: 'Женский' },
] as const;