import { createAsyncThunk, createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { APP_SUBCATEGORIES } from "@/constants/skills";
import { addSkillWithCategory } from "./filterSlice";
import type { RootState } from "@/services/store";

// ---------------------------------------------------------------

export interface SearchResult {
  id: string;
  name: string;
  categoryId: string;
}

interface SearchState {
  query: string;
  results: SearchResult[];
  selectedIndex: number;
  isOpen: boolean;
}

const initialResults: SearchResult[] = APP_SUBCATEGORIES.map(skill => ({
  id: skill.id,
  name: skill.name,
  categoryId: skill.categoryId
}));

const initialState: SearchState = {
  query: '',
  results: initialResults,
  selectedIndex: -1,
  isOpen: false
};

// ---------------------------------------------------------------

export const selectSkillFromSearch = createAsyncThunk(
  'search/selectSkill',
  async (skillId: string, { dispatch }) => {

    const skill = APP_SUBCATEGORIES.find(s => s.id === skillId);

    if (skill) {
      dispatch(addSkillWithCategory({
        skillId,
        categoryId: skill.categoryId
      }));
    } else {
      dispatch(addSkillWithCategory({ skillId, categoryId: '' }));
    }

    dispatch(clearSearch());
    dispatch(setIsOpen(false));

    return skillId;
  }
);

// ---------------------------------------------------------------

export const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setQuery: (state, action: PayloadAction<string>) => {
      state.query = action.payload;

      if (!action.payload) {
        state.results = initialResults;
        return;
      }

      const lowerQuery = action.payload.toLowerCase().trim();
      state.results = initialResults.filter(skill => 
        skill.name.toLowerCase().includes(lowerQuery)
      );
    },
    setSelectedIndex: (state, action: PayloadAction<number>) => {
      state.selectedIndex = action.payload;
    },
    setIsOpen: (state, action: PayloadAction<boolean>) => {
      state.isOpen = action.payload;
    },
    // ---------------------------------------------------------------
    clearSearch: (state) => {
      state.query = '';
      state.results = initialResults;
      state.selectedIndex = -1;
    },
    resetSearch: () => initialState
  }
});

// ---------------------------------------------------------------
// Actions
export const {
  setQuery,
  setSelectedIndex,
  setIsOpen,
  clearSearch,
  resetSearch
} = searchSlice.actions;

// ---------------------------------------------------------------
// Selectors
export const selectSearchQuery = (state: RootState) => state.search.query;
export const selectSearchResults = (state: RootState) => state.search.results;
export const selectSelectedIndex = (state: RootState) => state.search.selectedIndex;
export const selectIsSearchOpen = (state: RootState) => state.search.isOpen;