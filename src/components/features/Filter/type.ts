import type { FiltersPanelUIProps } from "@/components/ui/FiltersPanel/type";

export type FilterProps = {
  categories: FiltersPanelUIProps['categories'];
  subcategories: FiltersPanelUIProps['subcategories'];
  cities: string[];
  className?: string;
  'data-testid'?: string;
}

export type FilterMode = 'all' | 'teach' | 'learn';

export type FiltersState = {
  mode: FilterMode;
  selectedCategories: string[];
  selectedSkills: string[];
  authorGender: 'any' | 'male' | 'female';
  selectedCities: string[];
}