import type { WantToLearnSkill, TGender, AvatarInput, CanTeachSkillInput, TCity } from '@/types/types';
import { createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '@/services/store';
import type { RegisterData } from '@/types/auth';
import { authAPI } from '@/services/api';
import { authSlice } from './authSlice';

// ---------------------------------------------------------------

const baseInitialState = {
  step1: {
    email: '',
    password: '',
  },
  step2: {
    avatar: null as AvatarInput | null,
    name: '',
    age: 0,
    birthDate: null,
    gender: 'any' as TGender,
    location: '' as TCity,
    selectedCategories: [] as string[],
    wantToLearn: [] as Omit<WantToLearnSkill, 'id'>[],
  },
  step3: {
    canTeach: {
      categoryId: '',
      subcategoryId: '',
      customName: '',
      description: '',
      images: [] as File[],
    } as CanTeachSkillInput,
  },
  currentStep: 1,
};

interface RegisterState {
  step1: typeof baseInitialState.step1;
  step2: typeof baseInitialState.step2;
  step3: typeof baseInitialState.step3;
  currentStep: number;
  isLoading: boolean;
  error: string | null;
}

// ---------------------------------------------------------------

export const registerUser = createAsyncThunk(
  'register/registerUser',
  async (_, { getState, rejectWithValue, dispatch }) => {
    const state = getState() as RootState;
    const registerData = selectRegisterData(state);

    try {
      const response = await authAPI.register(registerData);
      localStorage.removeItem('registerForm');

      dispatch(authSlice.actions.setUserId(response.user.id));

      // return response;
      return { success: true, user: response.user };
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Ошибка регистрации');
    }
  }
);

// ---------------------------------------------------------------

const saveToLocalStorage = (state: Omit<RegisterState, 'isLoading' | 'error'>) => {
  try {
    const toSave = {
      step1: state.step1,
      step2: {
        ...state.step2,
        avatar: null,
      },
      step3: {
        canTeach: {
          categoryId: state.step3.canTeach.categoryId,
          subcategoryId: state.step3.canTeach.subcategoryId,
          customName: state.step3.canTeach.customName,
          description: state.step3.canTeach.description,
          images: [],
        },
      },
      currentStep: state.currentStep,
    };
    localStorage.setItem('registerForm', JSON.stringify(toSave));
  } catch (error) {
    console.error('Не удалось сохранить данные регистрации:', error);
  }
};

// ---------------------------------------------------------------

const loadInitialState = (): Omit<RegisterState, 'isLoading' | 'error'> => {
  try {
    const saved = localStorage.getItem('registerForm');
    if (saved) {
      const parsed = JSON.parse(saved);
      return {
        ...baseInitialState,
        ...parsed,
        step2: {
          ...baseInitialState.step2,
          ...parsed.step2,
          avatar: null,
        },
        step3: {
          canTeach: {
            ...baseInitialState.step3.canTeach,
            ...parsed.step3?.canTeach,
            images: [],
          },
        },
      };
    }
  } catch (error) {
    console.error('Не удалось загрузить данные регистрации:', error);
  }
  return baseInitialState;
};

// ---------------------------------------------------------------

const initialState: RegisterState = {
  ...loadInitialState(),
  isLoading: false,
  error: null,
};

// ---------------------------------------------------------------

export const registerSlice = createSlice({
  name: 'register',
  initialState,
  reducers: {
    updateStep1: (state, action: PayloadAction<Partial<RegisterState['step1']>>) => {
      state.step1 = { ...state.step1, ...action.payload };
      saveToLocalStorage(state);
    },
    updateStep2: (state, action: PayloadAction<Partial<RegisterState['step2']>>) => {
      state.step2 = { ...state.step2, ...action.payload };
      saveToLocalStorage(state);
    },
    updateStep3: (state, action: PayloadAction<Partial<RegisterState['step3']['canTeach']>>) => {
      state.step3.canTeach = { ...state.step3.canTeach, ...action.payload };
      saveToLocalStorage(state);
    },
    // ---------------------------------------------------------------
    setCurrentStep: (state, action: PayloadAction<number>) => {
      state.currentStep = action.payload;
      saveToLocalStorage(state);
    },
    nextStep: (state) => {
      state.currentStep = Math.min(state.currentStep + 1, 3);
      saveToLocalStorage(state);
    },
    prevStep: (state) => {
      state.currentStep = Math.max(state.currentStep - 1, 1);
      saveToLocalStorage(state);
    },
    // ---------------------------------------------------------------
    clearStep2: (state) => {
      state.step2 = baseInitialState.step2;
      saveToLocalStorage(state);
    },
    clearStep3: (state) => {
      state.step3 = baseInitialState.step3;
      saveToLocalStorage(state);
    },
    clearError: (state) => {
      state.error = null;
    },
    // ---------------------------------------------------------------
    resetRegister: (state) => {
      localStorage.removeItem('registerForm');
      state.step1 = baseInitialState.step1;
      state.step2 = baseInitialState.step2;
      state.step3 = baseInitialState.step3;
      state.currentStep = 1;
      state.isLoading = false;
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state) => {
        state.isLoading = false;
        localStorage.removeItem('registerForm');
        state.step1 = baseInitialState.step1;
        state.step2 = baseInitialState.step2;
        state.step3 = baseInitialState.step3;
        state.currentStep = 1;
        state.error = null;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = (action.payload ?? 'Ошибка регистрации') as string;
      });
  },
});

// ---------------------------------------------------------------
// Actions
export const {
  updateStep1,
  updateStep2,
  updateStep3,
  setCurrentStep,
  nextStep,
  prevStep,
  clearStep2,
  clearStep3,
  resetRegister,
  clearError,
} = registerSlice.actions;

// ---------------------------------------------------------------
// Selectors
export const selectRegisterStep1 = (state: RootState) => state.register.step1;
export const selectRegisterStep2 = (state: RootState) => state.register.step2;
export const selectRegisterStep3 = (state: RootState) => state.register.step3.canTeach;
export const selectCurrentStep = (state: RootState) => state.register.currentStep;
export const selectRegisterIsLoading = (state: RootState) => state.register.isLoading;
export const selectRegisterError = (state: RootState) => state.register.error;


export const selectRegisterData = (state: RootState): RegisterData => {
  const {
    step1,
    step2,
    step3
  } = state.register;

  return {
    // step 1
    email: step1.email,
    password: step1.password,

    // step 2
    avatar: step2.avatar,
    name: step2.name,
    age: step2.age,
    birthDate: step2.birthDate,
    gender: step2.gender,
    location: step2.location,
    wantToLearn: step2.wantToLearn,

    // step 3
    canTeach: {
      categoryId: step3.canTeach.categoryId,
      subcategoryId: step3.canTeach.subcategoryId,
      customName: step3.canTeach.customName,
      description: step3.canTeach.description,
      images: step3.canTeach.images,
    },
  };
};