import { registerSlice } from './slices/register/registerSlice';
import { searchSlice } from './slices/search/searchSlice';
import { filterSlice } from './slices/filter/filterSlice';
import { usersSlice } from './slices/users/userSlice';
import { authSlice } from './slices/auth/authSlice';
import { combineSlices } from '@reduxjs/toolkit';


const rootReducer = combineSlices({
  register: registerSlice.reducer,
  filter: filterSlice.reducer,
  search: searchSlice.reducer,
  users: usersSlice.reducer,
  auth: authSlice.reducer,
});

export default rootReducer;