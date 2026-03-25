import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { supabase } from '@/services/supabase/client';
import type { RootState } from '@/services/store';
import type { LoginCredentials } from '@/types/auth';
import { authAPI } from '@/services/api';
import { usersSlice } from './userSlice';

type TAuthState = {
  userId: string | null;
  isAuthChecked: boolean;
  isLoading: boolean;
  error: string | null;
};

export const initialState: TAuthState = {
  userId: null,
  isAuthChecked: false,
  isLoading: false,
  error: null
};

// ---------------------------------------------------------------

export const login = createAsyncThunk(
  'auth/login',
  async (credentials: LoginCredentials) => {
    const response = await authAPI.login(credentials);
    return response.user.id;
  }
);

// ---------------------------------------------------------------

export const logout = createAsyncThunk('auth/logout', async (_, { dispatch }) => {
  console.log('🔍 logout thunk started');

  dispatch(setUserId(''));
  await authAPI.logout();
  
  console.log('🔍 Очищаем userId и currentUser');
  dispatch(usersSlice.actions.clearCurrentUser());

  console.log('🔍 logout thunk finished');
  return null;
});

// ---------------------------------------------------------------

export const checkAuth = createAsyncThunk(
  'auth/checkAuth',
  async () => {
    console.log('🔍 checkAuth called');
    try {
      const { data: { session } } = await supabase.auth.getSession();
      console.log('🔍 session:', session);
      if (session?.user) {
        console.log('🔍 session found, userId:', session.user.id);
        return session.user.id;
      }
    } catch (error) {
      console.error('Check auth error:', error);
    }
    return null;
  }
);

// ---------------------------------------------------------------

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuthChecked: (state) => {
      state.isAuthChecked = true;
    },
    clearAuthError: (state) => {
      state.error = initialState.error;
    },
    setUserId: (state, action: PayloadAction<string>) => {
      state.userId = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(checkAuth.pending, (state) => {
        state.error = null;
        state.isLoading = true;
      })
      .addCase(checkAuth.fulfilled, (state, action: PayloadAction<string | null>) => {
        state.isLoading = false;
        state.isAuthChecked = true;
        state.userId = action.payload;
      })
      .addCase(checkAuth.rejected, (state, action) => {
        state.isLoading = false;
        state.isAuthChecked = true;
        state.error = action.error.message || 'Ошибка проверки авторизации';
      })
      .addCase(login.pending, (state) => {
        state.error = null;
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, action: PayloadAction<string>) => {
        state.isLoading = false;
        state.userId = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Ошибка входа';
      })
      .addCase(logout.pending, (state) => {
        state.error = null;
        state.isLoading = true;
      })
      .addCase(logout.fulfilled, (state) => {
        console.log('🔍 logout.fulfilled - очищаем userId');
        state.isLoading = false;
        state.userId = null;
      })
      .addCase(logout.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Ошибка выхода';
      });
  }
});

// ---------------------------------------------------------------

export const { setAuthChecked, clearAuthError, setUserId } = authSlice.actions;

// ---------------------------------------------------------------

export const selectUserId = (state: RootState) => state.auth.userId;
export const selectIsAuthChecked = (state: RootState) => state.auth.isAuthChecked;
export const selectIsAuthLoading = (state: RootState) => state.auth.isLoading;
export const selectAuthError = (state: RootState) => state.auth.error;