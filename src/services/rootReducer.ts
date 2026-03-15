import { combineSlices } from '@reduxjs/toolkit';
import { searchSlice } from './slices/search/searchSlice';
import { uiSlice } from './slices/ui/uiSlice';
import { authSlice } from './slices/auth/authSlice';
import { filterSlice } from './slices/filter/filterSlice';


const rootReducer = combineSlices(
  uiSlice,
  searchSlice,
  authSlice,
  filterSlice,
);

export default rootReducer;