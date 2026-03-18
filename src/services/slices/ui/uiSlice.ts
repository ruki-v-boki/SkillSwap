import type { RootState } from '@/services/store';
import { createSlice } from '@reduxjs/toolkit';


type TUiState = {
  isDarkTheme: boolean;
  activeModal: | null;
}

const initialState:TUiState = {
    isDarkTheme: false,
    activeModal: null,
  }

// ---------------------------------------------------------------

export const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    toggleTheme: (state) => {
      state.isDarkTheme = !state.isDarkTheme;
    },
    openModal: (state, action) => {
      state.activeModal = action.payload;
    },
    closeModal: (state) => {
      state.activeModal = null;
    },
  },
});

// ---------------------------------------------------------------

// actions
export const {
  toggleTheme,
  openModal,
  closeModal
} = uiSlice.actions;

// selectors
export const selectIsDarkTheme = (state: RootState) => state.ui.isDarkTheme;
export const selectActiveModal = (state: RootState) => state.ui.activeModal;