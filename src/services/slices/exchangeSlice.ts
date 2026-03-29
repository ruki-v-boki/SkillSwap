import type { ExchangeOffer, CreateExchangeOffer, RespondToExchange } from '@/types/exchange';
import { createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit';
import { supabase } from '@/services/supabase/client';
import { exchangeAPI } from '../supabase/exchangeApi';
import type { IUser } from '@/types/types';
import type { RootState } from '../store';

// ---------------------------------------------------------------

type ExchangeState = {
  myOffers: ExchangeOffer[];
  pendingIncoming: ExchangeOffer[];
  isLoading: boolean;
  error: string | null;
}

const initialState: ExchangeState = {
  myOffers: [],
  pendingIncoming: [],
  isLoading: false,
  error: null,
};

// ---------------------------------------------------------------

async function sendNotification(data: {
  userId: string;
  fromUserId: string;
  type: 'offer' | 'acceptOffer';
  title: string;
  message: string;
  link?: string;
}) {
  try {
    const { error } = await supabase.from('notifications').insert({
      user_id: data.userId,
      from_user_id: data.fromUserId,
      type: data.type,
      title: data.title,
      message: data.message,
      link: data.link,
      is_read: false,
    });
    if (error) console.error('Notification error:', error);
  } catch (error) {
    console.error('Failed to send notification:', error);
  }
}

// ---------------------------------------------------------------

export const createExchangeOffer = createAsyncThunk(
  'exchange/create',
  async ({ fromUser, data }: {
    fromUser: IUser;
    data: CreateExchangeOffer;
  }, { rejectWithValue }) => {
    try {
      const offer = await exchangeAPI.createOffer(fromUser.id, data);

      await sendNotification({
        userId: data.toUserId,
        fromUserId: fromUser.id,
        type: 'offer',
        title: 'Новое предложение обмена',
        message: `${fromUser.name} предлагает вам обмен навыками`,
        link: `/offer/${fromUser.id}`,
      });

      return offer;
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Ошибка создания предложения');
    }
  }
);

// ---------------------------------------------------------------

export const respondToExchange = createAsyncThunk(
  'exchange/respond',
  async ({ userId, data, fromUser }: { userId: string; data: RespondToExchange; fromUser: IUser }, { rejectWithValue }) => {
    try {
      const offer = await exchangeAPI.respondToOffer(userId, data);

      await sendNotification({
        userId: offer.fromUserId,
        fromUserId: userId,
        type: 'acceptOffer',
        title: data.status === 'accepted' ? 'Предложение принято' : 'Предложение отклонено',
        message: `${fromUser.name} ${data.status === 'accepted' ? 'принял' : 'отклонил'} ваше предложение`,
        link: `/offer/${userId}`,
      });

      return offer;
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Ошибка ответа на предложение');
    }
  }
);

// ---------------------------------------------------------------

export const fetchMyOffers = createAsyncThunk(
  'exchange/fetchMyOffers',
  async (userId: string, { rejectWithValue }) => {
    try {
      return await exchangeAPI.getUserOffers(userId);
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Ошибка загрузки предложений');
    }
  }
);

// ---------------------------------------------------------------

export const fetchPendingIncoming = createAsyncThunk(
  'exchange/fetchPendingIncoming',
  async (userId: string, { rejectWithValue }) => {
    try {
      return await exchangeAPI.getPendingIncomingOffers(userId);
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Ошибка загрузки входящих');
    }
  }
);

// ---------------------------------------------------------------

export const exchangeSlice = createSlice({
  name: 'exchange',
  initialState,
  reducers: {
    clearExchangeError: (state) => {
      state.error = null;
    },
    resetExchange: () => initialState,
  },
  extraReducers: (builder) => {
    builder
  // ---------------------------------------------------------------
      .addCase(createExchangeOffer.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createExchangeOffer.fulfilled, (state, action: PayloadAction<ExchangeOffer>) => {
        state.isLoading = false;
        state.myOffers.unshift(action.payload);
      })
      .addCase(createExchangeOffer.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
  // ---------------------------------------------------------------
      .addCase(respondToExchange.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(respondToExchange.fulfilled, (state, action: PayloadAction<ExchangeOffer>) => {
        state.isLoading = false;
        state.myOffers = state.myOffers.map(o => o.id === action.payload.id ? action.payload : o);
        state.pendingIncoming = state.pendingIncoming.filter(o => o.id !== action.payload.id);
      })
      .addCase(respondToExchange.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
  // ---------------------------------------------------------------
      .addCase(fetchMyOffers.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchMyOffers.fulfilled, (state, action: PayloadAction<ExchangeOffer[]>) => {
        state.isLoading = false;
        state.myOffers = action.payload;
      })
      .addCase(fetchMyOffers.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
  // ---------------------------------------------------------------
      .addCase(fetchPendingIncoming.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchPendingIncoming.fulfilled, (state, action: PayloadAction<ExchangeOffer[]>) => {
        state.isLoading = false;
        state.pendingIncoming = action.payload;
      })
      .addCase(fetchPendingIncoming.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

// ---------------------------------------------------------------
// Actions
export const {
  clearExchangeError,
  resetExchange
} = exchangeSlice.actions;

// ---------------------------------------------------------------
// Selectors
export const selectMyOffers = (state: RootState) => state.exchange?.myOffers ?? [];
export const selectPendingIncoming = (state: RootState) => state.exchange?.pendingIncoming ?? [];
export const selectExchangeLoading = (state: RootState) => state.exchange?.isLoading ?? false;
export const selectExchangeError = (state: RootState) => state.exchange?.error ?? null;