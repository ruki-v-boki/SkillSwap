export type FilterMode = 'all' | 'teach' | 'learn';

export type FiltersState = {
  mode: FilterMode;
  selectedCategories: string[];
  selectedSkills: string[];
  authorGender: 'any' | 'male' | 'female';
  selectedCities: string[];
}