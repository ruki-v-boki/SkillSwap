import { usersFilter } from '@/components/features/Filter/filters/usersFilter';
import type { FiltersState } from '@/components/features/Filter/filters/type';
import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '@/services/store';


const initialFilters: FiltersState = {
  mode: 'all',
  selectedCategories: [],
  selectedSkills: [],
  authorGender: 'any',
  selectedCities: []
};

interface FilterState {
  filters: FiltersState;
}

const initialState: FilterState = {
  filters: initialFilters
};

// ---------------------------------------------------------------

export const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setFilters: (state, action: PayloadAction<Partial<FiltersState>>) => {
      state.filters = {
        ...state.filters,
        ...action.payload
      };
    },
    addSkill: (state, action: PayloadAction<string>) => {
      const skillId = action.payload;
      if (!state.filters.selectedSkills.includes(skillId)) {
        state.filters.selectedSkills.push(skillId);
      }
    },
    addSkillWithCategory: (state, action: PayloadAction<{ skillId: string; categoryId: string }>) => {
      const { skillId, categoryId } = action.payload;

      if (!state.filters.selectedSkills.includes(skillId)) {
        state.filters.selectedSkills.push(skillId);
      }

      if (categoryId && !state.filters.selectedCategories.includes(categoryId)) {
        state.filters.selectedCategories.push(categoryId);
      }
    },
    removeSkill: (state, action: PayloadAction<string>) => {
      state.filters.selectedSkills = state.filters.selectedSkills.filter(id => id !== action.payload);
    },
    resetFilters: (state) => {
      state.filters = initialFilters;
    },
    clearCategoryFilters: (state) => {
      state.filters.selectedCategories = [];
    },
    clearSkillFilters: (state) => {
      state.filters.selectedSkills = [];
    },
    clearCityFilters: (state) => {
      state.filters.selectedCities = [];
    },
    setMode: (state, action: PayloadAction<FilterState['filters']['mode']>) => {
      state.filters.mode = action.payload;
    },
    setGender: (state, action: PayloadAction<FilterState['filters']['authorGender']>) => {
      state.filters.authorGender = action.payload;
    },
    setCities: (state, action: PayloadAction<string[]>) => {
      state.filters.selectedCities = action.payload;
    }
  }
});

// ---------------------------------------------------------------

// Actions
export const {
  setFilters,
  addSkill,
  addSkillWithCategory,
  removeSkill,
  resetFilters,
  clearCategoryFilters,
  clearSkillFilters,
  clearCityFilters,
  setMode,
  setGender,
  setCities
} = filterSlice.actions;

// ---------------------------------------------------------------

// Selectors
export const selectFilters = (state: RootState) => state.filter.filters;
export const selectSelectedSkills = (state: RootState) => state.filter.filters.selectedSkills;
export const selectSelectedCategories = (state: RootState) => state.filter.filters.selectedCategories;

// ---------------------------------------------------------------

export const selectFilteredUsers = (state: RootState) => {
  const users = state.users.allUsers;
  const filters = selectFilters(state);
  return usersFilter(users, filters);
};

// ---------------------------------------------------------------

export const selectAvailableCities = (state: RootState) => {
  const users = state.users.allUsers;
  return [...new Set(users.map(user => user.location))];
};

// ---------------------------------------------------------------

export const selectHasActiveFilters = (state: RootState) => {
  const filters = selectFilters(state);
  return (
    filters.mode !== 'all' ||
    filters.selectedSkills.length > 0 ||
    filters.selectedCategories.length > 0 ||
    filters.authorGender !== 'any' ||
    filters.selectedCities.length > 0
  );
};

// ---------------------------------------------------------------

export const selectActiveFiltersCount = (state: RootState) => {
  const filters = selectFilters(state);
  let count = 0;
  if (filters.mode !== 'all') count++;
  if (filters.selectedCategories.length > 0) count += filters.selectedCategories.length;
  if (filters.selectedSkills.length > 0) count += filters.selectedSkills.length;
  if (filters.authorGender !== 'any') count++;
  if (filters.selectedCities.length > 0) count += filters.selectedCities.length;
  return count;
};