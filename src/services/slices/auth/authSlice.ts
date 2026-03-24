import type { LoginCredentials, RegisterData } from '@/types/auth';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { supabase } from '@/services/supabase/client';
import type { RootState } from '@/services/store';
import { getAllUsers } from '../users/userSlice';
import type { IUser } from '@/types/types';
import { authAPI } from '@/services/api';


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
  async (userId: string) => {
    const user = await authAPI.getUserProfile(userId);
    return user;
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
    return updatedUser;
  }
);

// ---------------------------------------------------------------

export const updateUserEmail = createAsyncThunk(
  'auth/updateUserEmail',
  async (newEmail: string, { getState, rejectWithValue }) => {
    const state = getState() as RootState;
    const userId = state.auth.user?.id;

    if (!userId) {
      throw new Error('User ID not found');
    }

    try {
      const { error: authError } = await supabase.auth.updateUser({
        email: newEmail
      });

      if (authError) throw new Error(authError.message);

      const { error: dbError } = await supabase
        .from('users')
        .update({ email: newEmail })
        .eq('id', userId);

      if (dbError) throw new Error(dbError.message);

      const updatedUser = await authAPI.getUserProfile(userId);
      return updatedUser;

    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Ошибка обновления email');
    }
  }
);

// ---------------------------------------------------------------

export const register = createAsyncThunk(
  'auth/register',
  async (userData: RegisterData, { dispatch }) => {
    const response = await authAPI.register(userData);
    await dispatch(getAllUsers());
    return response.user;
  }
);

// ---------------------------------------------------------------

export const login = createAsyncThunk(
  'auth/login',
  async (credentials: LoginCredentials, { dispatch }) => {
    const response = await authAPI.login(credentials);
    await dispatch(getAllUsers());
    return response.user;
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
  async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();

      if (session?.user) {
        const user = await authAPI.getUserProfile(session.user.id);
        return user;
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
        (state, action: PayloadAction<IUser>) => {
          state.isLoading = false;
          state.user = action.payload;
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
        (state, action: PayloadAction<IUser>) => {
          state.isLoading = false;
          state.user = action.payload;
        }
      )
      .addCase(updateUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Ошибка обновления данных';
      })
      // ------ ОБНОВЛЕНИЕ EMAIL ------
      .addCase(updateUserEmail.pending, (state) => {
        state.error = null;
        state.isLoading = true;
      })
      .addCase(
        updateUserEmail.fulfilled,
        (state, action: PayloadAction<IUser>) => {
          state.isLoading = false;
          state.user = action.payload;
        }
      )
      .addCase(updateUserEmail.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Ошибка обновления email';
      })
      // ------ ПРОВЕРКА АВТОРИЗАЦИИ ------
      .addCase(checkAuth.pending, (state) => {
        state.error = null;
        state.isLoading = true;
      })
      .addCase(
        checkAuth.fulfilled,
        (state, action: PayloadAction<IUser | null>) => {
          state.isLoading = false;
          state.isAuthChecked = true;
          if (action.payload) {
            state.user = action.payload;
          }
        }
      )
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
        (state, action: PayloadAction<IUser>) => {
          state.isLoading = false;
          state.user = action.payload;
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
        (state, action: PayloadAction<IUser>) => {
          state.isLoading = false;
          state.user = action.payload;
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