import { searchSlice } from './slices/search/searchSlice';
import { filterSlice } from './slices/filter/filterSlice';
import { usersSlice } from './slices/users/userSlice';
import { authSlice } from './slices/auth/authSlice';
import { combineSlices } from '@reduxjs/toolkit';
import { uiSlice } from './slices/ui/uiSlice';
import { registerSlice } from './slices/register/registerSlice';


const rootReducer = combineSlices({
  filter: filterSlice.reducer,
  search: searchSlice.reducer,
  users: usersSlice.reducer,
  register: registerSlice.reducer,
  auth: authSlice.reducer,
  ui: uiSlice.reducer,
});

export default rootReducer;