import { usersFilter } from "@/components/features/Filter/filters/usersFilter";
import type { RootState } from "@/services/store";
import type { FiltersState, IUser } from "@/types/types";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";


const initialFilters: FiltersState = {
  mode: 'all',
  selectedCategories: [],
  selectedSkills: [],
  authorGender: 'any',
  selectedCities: []
};

interface filterState {
  users: IUser[];
  filters: FiltersState;
  error: string | null;
}

const initialState: filterState = {
  users: [],
  filters: initialFilters,
  error: null
};

// ---------------------------------------------------------------

export const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setUsers: (state, action: PayloadAction<IUser[]>) => {
      state.users = action.payload;
    },
    setFilters: (state, action: PayloadAction<Partial<FiltersState>>) => {
      state.filters = {
        ...state.filters,
        ...action.payload
      };
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
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    }
  }
});

// ---------------------------------------------------------------

// actions
export const {
  setUsers,
  setFilters,
  resetFilters,
  clearCategoryFilters,
  clearSkillFilters,
  clearCityFilters,
  setError
} = filterSlice.actions;

// selectors
export const selectAllUsers = (state: RootState) => state.filter.users;
export const selectFilters = (state: RootState) => state.filter.filters;
export const selectError = (state: RootState) => state.filter.error;

// ---------------------------------------------------------------

export const selectFilteredUsers = (state: RootState) => {
  const users = selectAllUsers(state);
  const filters = selectFilters(state);

  return usersFilter(users, filters);
};

// ---------------------------------------------------------------

export const selectCities = (state: RootState) => {
  const users = selectAllUsers(state);

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

// ---------------------------------------------------------------

export const selectFiltersDescription = (state: RootState) => {
  const filters = selectFilters(state);

  const parts = [];
  if (filters.mode !== 'all') parts.push(`режим: ${filters.mode}`);
  if (filters.selectedCategories.length > 0) parts.push(`категории: ${filters.selectedCategories.length}`);
  if (filters.selectedSkills.length > 0) parts.push(`навыки: ${filters.selectedSkills.length}`);
  if (filters.authorGender !== 'any') parts.push(`пол: ${filters.authorGender}`);
  if (filters.selectedCities.length > 0) parts.push(`города: ${filters.selectedCities.length}`);

  return parts.join(', ') || 'нет фильтров';
};