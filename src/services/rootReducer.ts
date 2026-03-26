import { notificationsSlice } from './slices/notificationsSlice';
import { registerSlice } from './slices/registerSlice';
import { searchSlice } from './slices/searchSlice';
import { filterSlice } from './slices/filterSlice';
import { combineSlices } from '@reduxjs/toolkit';
import { usersSlice } from './slices/userSlice';
import { authSlice } from './slices/authSlice';


const rootReducer = combineSlices({
  notifications: notificationsSlice.reducer,
  register: registerSlice.reducer,
  filter: filterSlice.reducer,
  search: searchSlice.reducer,
  users: usersSlice.reducer,
  auth: authSlice.reducer,
});

export default rootReducer;