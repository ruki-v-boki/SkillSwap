import { createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit';
import type { IUser } from '@/types/types';
import type { RootState } from '@/services/store';
import { usersAPI } from '@/services/api';


interface IUserState {
  allUsers: IUser[];
  currentUser: IUser | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: IUserState = {
  allUsers: [],
  currentUser: null,
  isLoading: false,
  error: null
};

// ---------------------------------------------------------------

export const getAllUsers = createAsyncThunk(
  'user/getAllUsers',
  async (_, { rejectWithValue }) => {
    try {
      const users = await usersAPI.getAllUsers();
      return users;
    } catch (error) {
      return rejectWithValue('Ошибка загрузки всех пользователей');
    }
  }
);

// ---------------------------------------------------------------

export const getCurrentUser = createAsyncThunk(
  'user/getCurrentUser',
  async (userId: string, { rejectWithValue }) => {
    try {
      const user = await usersAPI.getUserById(userId);
      return user;
    } catch (error) {
      return rejectWithValue('Ошибка загрузки профиля');
    }
  }
);

// ---------------------------------------------------------------

export const updateCurrentUser = createAsyncThunk(
  'user/updateCurrentUser',
  async ({ userId, data }: { userId: string; data: Partial<IUser> }, { rejectWithValue }) => {
    try {
      const updatedUser = await usersAPI.updateUser(userId, data);
      return updatedUser;
    } catch (error) {
      return rejectWithValue('Ошибка обновления профиля');
    }
  }
);

// ---------------------------------------------------------------

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setAllUsers: (state, action: PayloadAction<IUser[]>) => {
      state.allUsers = action.payload;
    },
    setCurrentUser: (state, action: PayloadAction<IUser | null>) => {
      state.currentUser = action.payload;
    },
    clearCurrentUser: (state) => {
      state.currentUser = null;
    },
    clearUserError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // -------------------- All Users
      .addCase(getAllUsers.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getAllUsers.fulfilled, (state, action: PayloadAction<IUser[]>) => {
        state.isLoading = false;
        state.allUsers = action.payload;
      })
      .addCase(getAllUsers.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string || 'Ошибка загрузки всех пользователей';
      })

      // -------------------- Current User
      .addCase(getCurrentUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getCurrentUser.fulfilled, (state, action: PayloadAction<IUser>) => {
        state.isLoading = false;
        state.currentUser = action.payload;
      })
      .addCase(getCurrentUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string || 'Ошибка загрузки профиля';
      })

      // -------------------- Update Current User
      .addCase(updateCurrentUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateCurrentUser.fulfilled, (state, action: PayloadAction<IUser>) => {
        state.isLoading = false;
        state.currentUser = action.payload;

        // Также обновляем пользователя в allUsers, если он там есть
        const index = state.allUsers.findIndex(u => u.id === action.payload.id);
        if (index !== -1) {
          state.allUsers[index] = action.payload;
        }
      })
      .addCase(updateCurrentUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string || 'Ошибка обновления профиля';
      });
  }
});

// ---------------------------------------------------------------

// Actions
export const {
  setAllUsers,
  setCurrentUser,
  clearCurrentUser,
  clearUserError,
} = usersSlice.actions;

// ---------------------------------------------------------------

// Selectors
export const selectAllUsers = (state: RootState) => state.users.allUsers;
export const selectCurrentUser = (state: RootState) => state.users.currentUser;
export const selectUserIsLoading = (state: RootState) => state.users.isLoading;
export const selectUserError = (state: RootState) => state.users.error;