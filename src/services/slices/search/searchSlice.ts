import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { RootState } from '@/services/store';


export const fetchSearchResults = createAsyncThunk(
  'search/fetchResults',
  async (query: string) => {
    const response = await fetch(`/api/skills/search?q=${query}`);
    return response.json();
  }
);

type SearchState = {
  query: string;
  results: any[];
  suggestions: string[];
  isLoading: boolean;
  error: string | null;
  history: string[];
};

const initialState: SearchState = {
  query: '',
  results: [],
  suggestions: [],
  isLoading: false,
  error: null,
  history: JSON.parse(localStorage.getItem('searchHistory') || '[]'),
};

export const searchSlice = createSlice({
  name: 'searchSlice',
  initialState,
  reducers: {
    setSearchQuery: (state, action) => {
      state.query = action.payload;
    },
    clearSearchResults: (state) => {
      state.results = [];
      state.suggestions = [];
    },
    addToHistory: (state, action) => {
      if (!state.history.includes(action.payload)) {
        state.history = [action.payload, ...state.history].slice(0, 5);
        localStorage.setItem('searchHistory', JSON.stringify(state.history));
      }
    },
    clearHistory: (state) => {
      state.history = [];
      localStorage.removeItem('searchHistory');
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSearchResults.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchSearchResults.fulfilled, (state, action) => {
        state.isLoading = false;
        state.results = action.payload;

        if (state.query) {
          searchSlice.caseReducers.addToHistory(state, {
            ...action,
            payload: state.query,
          });
        }
      })
      .addCase(fetchSearchResults.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Ошибка поиска';
      });
  },
});

export const {
  setSearchQuery,
  clearSearchResults,
  addToHistory,
  clearHistory
} = searchSlice.actions;

export const selectSearchQuery = (state: RootState) => state.searchSlice.query;
export const selectSearchResults = (state: RootState) => state.searchSlice.results;
export const selectSearchLoading = (state: RootState) => state.searchSlice.isLoading;
export const selectSearchHistory = (state: RootState) => state.searchSlice.history;