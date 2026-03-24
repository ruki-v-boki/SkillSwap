import { registerSlice } from './slices/registerSlice';
import { searchSlice } from './slices/searchSlice';
import { filterSlice } from './slices/filterSlice';
import { usersSlice } from './slices/userSlice';
import { authSlice } from './slices/authSlice';
import { combineSlices } from '@reduxjs/toolkit';


const rootReducer = combineSlices({
  register: registerSlice.reducer,
  filter: filterSlice.reducer,
  search: searchSlice.reducer,
  users: usersSlice.reducer,
  auth: authSlice.reducer,
});

export default rootReducer;