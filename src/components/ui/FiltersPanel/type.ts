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
  activeFiltersCount?: number;
  className?: string;
  searchQuery?: string;
  'data-testid'?: string;
}