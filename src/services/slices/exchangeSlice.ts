import type { ExchangeOffer, CreateExchangeOffer, RespondToExchange } from '@/types/exchange';
import { createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit';
import { exchangeAPI } from '../supabase/exchangeApi';
import type { IUser } from '@/types/types';
import type { RootState } from '../store';

// ---------------------------------------------------------------

type ExchangeState = {
  myOffers: ExchangeOffer[];
  pendingIncoming: ExchangeOffer[];
  isLoading: boolean;
  error: string | null;
};

const initialState: ExchangeState = {
  myOffers: [],
  pendingIncoming: [],
  isLoading: false,
  error: null,
};

// ---------------------------------------------------------------

type CreateExchangeOfferArgs = {
  fromUser: IUser;
  data: CreateExchangeOffer;
};

export const createExchangeOffer = createAsyncThunk<
  ExchangeOffer,
  CreateExchangeOfferArgs,
  { rejectValue: string }
>(
  'exchange/create',
  async ({ fromUser, data }, { rejectWithValue }) => {
    try {
      const offer = await exchangeAPI.createOffer(fromUser.id, data);
      return offer;
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Ошибка создания предложения');
    }
  }
);

// ---------------------------------------------------------------

type RespondToExchangeArgs = {
  userId: string;
  data: RespondToExchange;
  fromUser: IUser;
};

export const respondToExchange = createAsyncThunk<
  ExchangeOffer,
  RespondToExchangeArgs,
  { rejectValue: string }
>(
  'exchange/respond',
  async ({ userId, data }, { rejectWithValue }) => {
    try {
      const offer = await exchangeAPI.respondToOffer(userId, data);
      return offer;
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Ошибка ответа на предложение');
    }
  }
);

// ---------------------------------------------------------------

export const fetchMyOffers = createAsyncThunk<
  ExchangeOffer[],
  string,
  { rejectValue: string }
>(
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

export const fetchPendingIncoming = createAsyncThunk<
  ExchangeOffer[],
  string,
  { rejectValue: string }
>(
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
      // -------------------- createExchangeOffer --------------------
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
      // -------------------- respondToExchange --------------------
      .addCase(respondToExchange.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(respondToExchange.fulfilled, (state, action: PayloadAction<ExchangeOffer>) => {
        state.isLoading = false;
        state.myOffers = state.myOffers.map(offer => 
          offer.id === action.payload.id ? action.payload : offer
        );
        if (action.payload.status !== 'pending') {
          state.pendingIncoming = state.pendingIncoming.filter(offer => offer.id !== action.payload.id);
        }
      })
      .addCase(respondToExchange.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      // -------------------- fetchMyOffers --------------------
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
      // -------------------- fetchPendingIncoming --------------------
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