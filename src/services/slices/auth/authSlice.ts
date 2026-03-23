import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { IUser } from '@/types/types';
import type { RootState } from '@/services/store';
import { authAPI } from '@/services/api';
import type { LoginCredentials, RegisterData, AuthResponse } from '@/types/auth';
import type { PayloadAction } from '@reduxjs/toolkit';
import { supabase } from '@/services/supabase/client';

type TAuthState = {
  user: IUser | null;
  isAuthChecked: boolean;
  isLoading: boolean;
  error: string | null;
};

export const initialState: TAuthState = {
  user: null,
  isAuthChecked: false,
  isLoading: false,
  error: null
};

// ---------------------------------------------------------------

export const getUser = createAsyncThunk(
  'auth/getUser',
  async (_, { getState }) => {
    const state = getState() as RootState;
    const userId = state.auth.user?.id;

    if (!userId) {
      throw new Error('User ID not found');
    }

    const user = await authAPI.getUserProfile(userId);
    return { user };
  }
);

// ---------------------------------------------------------------

export const updateUser = createAsyncThunk(
  'auth/updateUser',
  async (userData: Partial<IUser>, { getState }) => {
    const state = getState() as RootState;
    const userId = state.auth.user?.id;

    if (!userId) {
      throw new Error('User ID not found');
    }

    const updatedUser = await authAPI.updateUser(userId, userData);
    return { user: updatedUser };
  }
);

// ---------------------------------------------------------------

export const register = createAsyncThunk(
  'auth/register',
  async (userData: RegisterData) => {
    const response = await authAPI.register(userData);
    return response;
  }
);

// ---------------------------------------------------------------

export const login = createAsyncThunk(
  'auth/login',
  async (credentials: LoginCredentials) => {
    const response = await authAPI.login(credentials);
    return response;
  }
);

// ---------------------------------------------------------------

export const logout = createAsyncThunk('auth/logout', async () => {
  await authAPI.logout();
  return null;
});

// ---------------------------------------------------------------

export const checkAuth = createAsyncThunk(
  'auth/checkAuth',
  async (_, { dispatch }) => {
    // Supabase автоматически управляет сессией
    // Проверяем через API, есть ли активная сессия
    try {
      // Пытаемся получить текущего пользователя
      // const { data: { session } } = await import('@/services/supabase/client').then(m => m.supabase.auth.getSession());
      const { data: { session } } = await supabase.auth.getSession();

      if (session?.user) {
        // Если сессия есть, получаем профиль
        await dispatch(getUser()).unwrap();
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
    }
  },
  extraReducers: (builder) => {
    builder
      // ------ ПОЛЬЗОВАТЕЛЬ ------
      .addCase(getUser.pending, (state) => {
        state.error = null;
        state.isLoading = true;
      })
      .addCase(
        getUser.fulfilled,
        (state, action: PayloadAction<{ user: IUser }>) => {
          state.isLoading = false;
          state.user = action.payload.user;
          state.isAuthChecked = true;
        }
      )
      .addCase(getUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Ошибка загрузки данных пользователя';
      })

      // ------ ОБНОВЛЕНИЕ ПОЛЬЗОВАТЕЛЯ ------
      .addCase(updateUser.pending, (state) => {
        state.error = null;
        state.isLoading = true;
      })
      .addCase(
        updateUser.fulfilled,
        (state, action: PayloadAction<{ user: IUser }>) => {
          state.isLoading = false;
          state.user = action.payload.user;
        }
      )
      .addCase(updateUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Ошибка обновления данных';
      })

      // ------ ПРОВЕРКА АВТОРИЗАЦИИ ------
      .addCase(checkAuth.pending, (state) => {
        state.error = null;
        state.isLoading = true;
      })
      .addCase(checkAuth.fulfilled, (state) => {
        state.isLoading = false;
        state.isAuthChecked = true;
      })
      .addCase(checkAuth.rejected, (state, action) => {
        state.isLoading = false;
        state.isAuthChecked = true;
        state.error = action.error.message || 'Ошибка проверки авторизации';
      })

      // ------ РЕГИСТРАЦИЯ ------
      .addCase(register.pending, (state) => {
        state.error = null;
        state.isLoading = true;
      })
      .addCase(
        register.fulfilled,
        (state, action: PayloadAction<AuthResponse>) => {
          state.isLoading = false;
          state.user = action.payload.user;
        }
      )
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Ошибка регистрации';
      })

      // ------ ВХОД ------
      .addCase(login.pending, (state) => {
        state.error = null;
        state.isLoading = true;
      })
      .addCase(
        login.fulfilled,
        (state, action: PayloadAction<AuthResponse>) => {
          state.isLoading = false;
          state.user = action.payload.user;
        }
      )
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Ошибка входа';
      })

      // ------ ВЫХОД ------
      .addCase(logout.pending, (state) => {
        state.error = null;
        state.isLoading = true;
      })
      .addCase(logout.fulfilled, (state) => {
        state.isLoading = false;
        state.user = null;
      })
      .addCase(logout.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Ошибка выхода';
      });
  }
});

// ---------------------------------------------------------------
// Actions:
export const {
  setAuthChecked,
  clearAuthError
} = authSlice.actions;

// ---------------------------------------------------------------
// Selectors:
export const selectUser = (state: RootState) => state.auth.user;
export const selectIsAuthChecked = (state: RootState) => state.auth.isAuthChecked;
export const selectIsAuthLoading = (state: RootState) => state.auth.isLoading;
export const selectAuthError = (state: RootState) => state.auth.error;