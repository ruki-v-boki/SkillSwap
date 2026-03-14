import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { IUser } from '@/types/types';
import type { RootState } from '@/services/store';
import { deleteCookie, getCookie, setCookie } from '@/utils/cookie';
import { getUserApi, loginUserApi, logoutApi, registerUserApi, updateUserApi, type TAuthResponse, type TUserResponse } from '@/utils/api';
import type { PayloadAction } from '@reduxjs/toolkit';

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

// ------------------------------------------------------------

export const getUser = createAsyncThunk('auth/getUser', getUserApi);
export const updateUser = createAsyncThunk('auth/updateUser', updateUserApi);

export const register = createAsyncThunk(
  'auth/register',
  async (userData: { email: string; password: string; name: string }) => {
    const response = await registerUserApi(userData);
    setCookie('accessToken', response.accessToken);
    localStorage.setItem('refreshToken', response.refreshToken);
    return response;
  }
);

export const login = createAsyncThunk(
  'auth/login',
  async (credentials: { email: string; password: string }) => {
    const response = await loginUserApi(credentials);
    setCookie('accessToken', response.accessToken);
    localStorage.setItem('refreshToken', response.refreshToken);
    return response;
  }
);

export const logout = createAsyncThunk('auth/logout', async () => {
  await logoutApi();
  deleteCookie('accessToken');
  localStorage.removeItem('refreshToken');
  return null;
});

export const checkAuth = createAsyncThunk(
  'auth/checkAuth',
  async (_, { dispatch }) => {
    const accessToken = getCookie('accessToken');
    const refreshToken = localStorage.getItem('refreshToken');

    if (accessToken && refreshToken) {
      try {
        await dispatch(getUser()).unwrap();
      } catch (error) {
        deleteCookie('accessToken');
        localStorage.removeItem('refreshToken');
      }
    }
    return null;
  }
);

// ------------------------------------------------------------

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuthChecked: (state) => {
      state.isAuthChecked = true;
    },
    clearError: (state) => {
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
        (state, action: PayloadAction<TUserResponse>) => {
          state.isLoading = false;
          state.user = action.payload.user;
          state.isAuthChecked = true;
        }
      )
      .addCase(getUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error =
          action.error.message || 'Ошибка загрузки данных пользователя';
      })

      // ------ ОБНОВЛЕНИЕ ПОЛЬЗОВАТЕЛЯ ------
      .addCase(updateUser.pending, (state) => {
        state.error = null;
        state.isLoading = true;
      })
      .addCase(
        updateUser.fulfilled,
        (state, action: PayloadAction<TUserResponse>) => {
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
        (state, action: PayloadAction<TAuthResponse>) => {
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
        (state, action: PayloadAction<TAuthResponse>) => {
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

// actions:
export const { setAuthChecked, clearError } = authSlice.actions;
// selectors:
export const selectUser = (state: RootState) => state.auth.user;
export const selectIsAuthChecked = (state: RootState) => state.auth.isAuthChecked;
export const selectIsLoading = (state: RootState) => state.auth.isLoading;
export const selectError = (state: RootState) => state.auth.error;
