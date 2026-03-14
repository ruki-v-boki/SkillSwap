import type { RootState } from '@/services/store';
import { createSlice } from '@reduxjs/toolkit';

type TUiState = {
  isNavOpen: boolean;
  isDarkTheme: boolean;
  isNotificationMenuOpen: boolean;
  isProfileMenuOpen: boolean;
  activeModal: | null;
}

const initialState:TUiState = {
    isNavOpen: false,
    isDarkTheme: false,
    isNotificationMenuOpen: false,
    isProfileMenuOpen: false,
    activeModal: null,
  }


export const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    toggleNav: (state) => {
      state.isNavOpen = !state.isNavOpen;
    },
    toggleTheme: (state) => {
      state.isDarkTheme = !state.isDarkTheme;
    },
    toggleNotificationMenu: (state) => {
      state.isNotificationMenuOpen = !state.isNotificationMenuOpen;
    },
    toggleProfileMenu: (state) => {
      state.isProfileMenuOpen = !state.isProfileMenuOpen;
    },
    openModal: (state, action) => {
      state.activeModal = action.payload;
    },
    closeModal: (state) => {
      state.activeModal = null;
    },
  },
});

// actions
export const {
  toggleNav,
  toggleProfileMenu,
  toggleTheme,
  toggleNotificationMenu,
  openModal,
  closeModal
} = uiSlice.actions;

// selectors
export const selectIsNavOpen = (state: RootState) => state.ui.isNavOpen;
export const selectIsProfileMenuOpen = (state: RootState) => state.ui.isProfileMenuOpen;
export const selectIsNotificationMenuOpen = (state: RootState) => state.ui.isNotificationMenuOpen;
export const selectIsDarkTheme = (state: RootState) => state.ui.isDarkTheme;
export const selectActiveModal = (state: RootState) => state.ui.activeModal;