import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { supabase } from '@/services/supabase/client';
import type { LoginCredentials } from '@/types/auth';
import type { RootState } from '@/services/store';
import { authAPI } from '@/services/api';
import { usersSlice } from './userSlice';

// ---------------------------------------------------------------

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

export const checkAuth = createAsyncThunk(
  'auth/checkAuth',
  async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user) {
        const userId = session.user.id;

        const { data: profile, error } = await supabase
          .from('users')
          .select('id')
          .eq('id', userId)
          .maybeSingle();
        console.error('Ошибка проверки авторизации', error)

        if (!profile) {
          await supabase.auth.signOut();

          // Очищаем localStorage на всякий случай
          localStorage.removeItem('token');
          localStorage.removeItem('userId');
          
          return null;
        }

        return userId;
      }
    } catch (error) {
      console.error('Check auth error:', error);
      await supabase.auth.signOut();
    }
    return null;
  }
);

// ---------------------------------------------------------------

export const login = createAsyncThunk(
  'auth/login',
  async (credentials: LoginCredentials) => {
    const response = await authAPI.login(credentials);
    return response.user.id;
  }
);

// ---------------------------------------------------------------

export const logout = createAsyncThunk(
  'auth/logout',
  async (_, { dispatch }) => {
    dispatch(setUserId(''));
    await authAPI.logout();
    dispatch(usersSlice.actions.clearCurrentUser());
    return null;
});


// ---------------------------------------------------------------

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUserId: (state, action: PayloadAction<string>) => {
      state.userId = action.payload;
    },
    setAuthChecked: (state) => {
      state.isAuthChecked = true;
    },
    clearAuthError: (state) => {
      state.error = initialState.error;
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
// ---------------------------------------------------------------
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
// ---------------------------------------------------------------
      .addCase(logout.pending, (state) => {
        state.error = null;
        state.isLoading = true;
      })
      .addCase(logout.fulfilled, (state) => {
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
// Actions
export const {
  setUserId,
  setAuthChecked,
  clearAuthError
} = authSlice.actions;

// ---------------------------------------------------------------
// Selectors
export const selectUserId = (state: RootState) => state.auth.userId;
export const selectIsAuthChecked = (state: RootState) => state.auth.isAuthChecked;
export const selectIsAuthLoading = (state: RootState) => state.auth.isLoading;
export const selectAuthError = (state: RootState) => state.auth.error;