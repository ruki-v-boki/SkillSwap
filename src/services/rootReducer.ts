import { combineSlices } from '@reduxjs/toolkit';
import { searchSlice } from './slices/search/searchSlice';
import { uiSlice } from './slices/ui/uiSlice';
import { authSlice } from './slices/auth/authSlice';

const rootReducer = combineSlices(
  uiSlice,
  searchSlice,
  authSlice,
);

export default rootReducer;