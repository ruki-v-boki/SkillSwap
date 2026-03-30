import { createSlice, createAsyncThunk, type PayloadAction, createSelector } from '@reduxjs/toolkit';
import { supabase } from '@/services/supabase/client';
import type { RootState } from '@/services/store';
import type { IUser } from '@/types/types';
import { usersAPI } from '@/services/api';

// ---------------------------------------------------------------

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
      return rejectWithValue(error instanceof Error ? error.message : 'Ошибка загрузки всех пользователей');
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
      return rejectWithValue(error instanceof Error ? error.message : 'Ошибка загрузки профиля');
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
      return rejectWithValue(error instanceof Error ? error.message : 'Ошибка обновления профиля');
    }
  }
);

// ---------------------------------------------------------------

export const updateUserEmail = createAsyncThunk(
  'user/updateUserEmail',
  async ({ userId, newEmail }: { userId: string; newEmail: string }, { rejectWithValue }) => {
    try {
      const { error: authError } = await supabase.auth.updateUser({ email: newEmail });
      if (authError) throw new Error(authError.message);

      const { error: dbError } = await supabase
        .from('users')
        .update({ email: newEmail })
        .eq('id', userId);
      if (dbError) throw new Error(dbError.message);

      const updatedUser = await usersAPI.getUserById(userId);
      return updatedUser;
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Ошибка обновления email');
    }
  }
);

// ---------------------------------------------------------------

export const uploadAvatar = createAsyncThunk(
  'user/uploadAvatar',
  async ({ userId, file }: { userId: string; file: File }, { rejectWithValue }) => {
    try {
      const fileName = `${userId}/avatar_${Date.now()}_${file.name}`;
      const { error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(fileName, file);
      if (uploadError) throw new Error(uploadError.message);

      const { data: urlData } = supabase.storage.from('avatars').getPublicUrl(fileName);
      const updatedUser = await usersAPI.updateUser(userId, { avatar: urlData.publicUrl });
      return updatedUser;
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Ошибка загрузки аватара');
    }
  }
);

// ---------------------------------------------------------------

export const toggleLike = createAsyncThunk(
  'user/toggleLike',
  async ({ currentUserId, targetUserId }: { currentUserId: string; targetUserId: string }, { rejectWithValue }) => {
    try {
      const isLiked = await usersAPI.toggleLike(currentUserId, targetUserId);
      return { targetUserId, currentUserId, isLiked };
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Ошибка при изменении лайка');
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
    clearUsersError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // -------------------- getAllUsers --------------------
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
      // -------------------- getCurrentUser --------------------
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
      // -------------------- updateCurrentUser --------------------
      .addCase(updateCurrentUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateCurrentUser.fulfilled, (state, action: PayloadAction<IUser>) => {
        state.isLoading = false;
        state.currentUser = action.payload;
        const index = state.allUsers.findIndex(u => u.id === action.payload.id);
        if (index !== -1) state.allUsers[index] = action.payload;
      })
      .addCase(updateCurrentUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string || 'Ошибка обновления профиля';
      })
      // -------------------- updateUserEmail --------------------
      .addCase(updateUserEmail.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateUserEmail.fulfilled, (state, action: PayloadAction<IUser>) => {
        state.isLoading = false;
        state.currentUser = action.payload;
        const index = state.allUsers.findIndex(u => u.id === action.payload.id);
        if (index !== -1) state.allUsers[index] = action.payload;
      })
      .addCase(updateUserEmail.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string || 'Ошибка обновления email';
      })
      // -------------------- uploadAvatar --------------------
      .addCase(uploadAvatar.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(uploadAvatar.fulfilled, (state, action: PayloadAction<IUser>) => {
        state.isLoading = false;
        state.currentUser = action.payload;
        const index = state.allUsers.findIndex(u => u.id === action.payload.id);
        if (index !== -1) state.allUsers[index] = action.payload;
      })
      .addCase(uploadAvatar.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string || 'Ошибка загрузки аватара';
      })
      // -------------------- toggleLike --------------------
      .addCase(toggleLike.pending, (state) => {
        state.error = null;
      })
      .addCase(toggleLike.fulfilled, (state, action) => {
        const { targetUserId, currentUserId, isLiked } = action.payload;

        // Обновляем в allUsers
        const targetUser = state.allUsers.find(u => u.id === targetUserId);
        if (targetUser) {
          if (isLiked) {
            if (!targetUser.likedBy?.includes(currentUserId)) {
              targetUser.likedBy = [...(targetUser.likedBy || []), currentUserId];
            }
          } else {
            targetUser.likedBy = targetUser.likedBy?.filter(id => id !== currentUserId) || [];
          }
        }
        // Обновляем currentUser, если это он
        if (state.currentUser?.id === targetUserId) {
          if (isLiked) {
            if (!state.currentUser.likedBy?.includes(currentUserId)) {
              state.currentUser.likedBy = [...(state.currentUser.likedBy || []), currentUserId];
            }
          } else {
            state.currentUser.likedBy = state.currentUser.likedBy?.filter(id => id !== currentUserId) || [];
          }
        }
      })
      .addCase(toggleLike.rejected, (state, action) => {
        state.error = action.payload as string || 'Ошибка при изменении лайка';
      })
      // ---------------------------------------------------------------
      .addCase('auth/logout/fulfilled', (state) => { // чтобы не импортировать logout из authSlice и не создавать циклических зависимостей
        state.currentUser = null;
        state.isLoading = false;
        state.error = null;
      });
  }
});

// ---------------------------------------------------------------
// Actions
export const {
  setAllUsers,
  setCurrentUser,
  clearCurrentUser,
  clearUsersError
} = usersSlice.actions;

// ---------------------------------------------------------------
// Selectors
export const selectAllUsers = (state: RootState) => state.users.allUsers;
export const selectCurrentUser = (state: RootState) => state.users.currentUser;
export const selectCurrentUserIsLoading = (state: RootState) => state.users.isLoading;
export const selectCurrentUserError = (state: RootState) => state.users.error;


export const selectFavouriteUsers = createSelector(
  [selectAllUsers, selectCurrentUser],
  (allUsers, currentUser) => {
    if (!currentUser?.id) return [];
    return allUsers.filter(user => user.likedBy?.includes(currentUser.id));
  }
)