import { createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit';
import type { Notification } from '@/types/notifications';
import { supabase } from '@/services/supabase/client';
import type { RootState } from '@/services/store';

// ---------------------------------------------------------------

interface NotificationsState {
  notifications: Notification[];
  unreadCount: number;
  isNotificationsLoading: boolean;
  notificationsError: string | null;
}

const initialState: NotificationsState = {
  notifications: [],
  unreadCount: 0,
  isNotificationsLoading: false,
  notificationsError: null,
};

// ---------------------------------------------------------------

export const sendNotification = createAsyncThunk<
  Notification,
  {
    toUserId: string;
    fromUserId: string;
    type: 'offer' | 'acceptOffer';
    title: string;
    message: string;
    link?: string;
  },
  { rejectValue: string }
>(
  'notifications/send',
  async (input, { rejectWithValue }) => {
    try {
      const { data: result, error } = await supabase
        .from('notifications')
        .insert({
          user_id: input.toUserId,
          from_user_id: input.fromUserId,
          type: input.type,
          title: input.title,
          message: input.message,
          link: input.link,
          is_read: false,
        })
        .select()
        .single();

      if (error) throw new Error(error.message);

      return result as Notification;
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Ошибка отправки уведомления');
    }
  }
);

// ---------------------------------------------------------------

export const getAllNotifications = createAsyncThunk(
  'notifications/getAll',
  async (userId: string, { rejectWithValue }) => {
    try {
      const { data, error } = await supabase
        .from('notifications')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false })
        .limit(50);

      if (error) throw new Error(error.message);

      return data as Notification[];
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Ошибка загрузки уведомлений');
    }
  }
);

// ---------------------------------------------------------------

export const markAsRead = createAsyncThunk(
  'notifications/markAsRead',
  async (notificationId: string, { rejectWithValue }) => {
    try {
      const { error } = await supabase
        .from('notifications')
        .update({ is_read: true })
        .eq('id', notificationId);

      if (error) throw new Error(error.message);

      return notificationId;
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Ошибка');
    }
  }
);

// ---------------------------------------------------------------

export const markAllAsRead = createAsyncThunk(
  'notifications/markAllAsRead',
  async (userId: string, { rejectWithValue }) => {
    try {
      const { error } = await supabase
        .from('notifications')
        .update({ is_read: true })
        .eq('user_id', userId)
        .eq('is_read', false);

      if (error) throw new Error(error.message);

      return true;
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Ошибка');
    }
  }
);

// ---------------------------------------------------------------

export const notificationsSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    addNotification: (state, action: PayloadAction<Notification>) => {
      state.notifications.unshift(action.payload);
      if (!action.payload.is_read) {
        state.unreadCount++;
      }
    },
    clearNotifications: (state) => {
      state.notifications = [];
      state.unreadCount = 0;
    },
    clearError: (state) => {
      state.notificationsError = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // -------------------- getAllNotifications --------------------
      .addCase(getAllNotifications.pending, (state) => {
        state.isNotificationsLoading = true;
        state.notificationsError = null;
      })
      .addCase(getAllNotifications.fulfilled, (state, action: PayloadAction<Notification[]>) => {
        state.isNotificationsLoading = false;
        state.notifications = action.payload;
        state.unreadCount = action.payload.filter(n => !n.is_read).length;
      })
      .addCase(getAllNotifications.rejected, (state, action) => {
        state.isNotificationsLoading = false;
        state.notificationsError = action.payload as string;
      })
      // -------------------- markAsRead --------------------
      .addCase(markAsRead.fulfilled, (state, action: PayloadAction<string>) => {
        const notification = state.notifications.find(n => n.id === action.payload);

        if (notification && !notification.is_read) {
          notification.is_read = true;
          state.unreadCount = Math.max(0, state.unreadCount - 1);
        }
      })
      // -------------------- markAllAsRead --------------------
      .addCase(markAllAsRead.fulfilled, (state) => {
        state.notifications.forEach(n => { n.is_read = true; });
        state.unreadCount = 0;
      })
  }
});

// ---------------------------------------------------------------
// Actions
export const {
  addNotification,
  clearNotifications,
  clearError
} = notificationsSlice.actions;

// ---------------------------------------------------------------
// Selectors
export const selectNotifications = (state: RootState) => state.notifications.notifications;
export const selectUnreadCount = (state: RootState) => state.notifications.unreadCount;
export const selectIsNotificationsLoading = (state: RootState) => state.notifications.isNotificationsLoading;
export const selectNotificationsError = (state: RootState) => state.notifications.notificationsError;