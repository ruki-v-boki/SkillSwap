import { MockAuthAPI, MockUsersAPI } from './mockApi';
import { SupabaseAuthAPI, SupabaseUsersAPI } from '@/services/supabase';

const USE_MOCKS = import.meta.env.VITE_USE_MOCKS === 'true';

// Auth API
export const authAPI = USE_MOCKS
  ? new MockAuthAPI()
  : new SupabaseAuthAPI();

// Users API
export const usersAPI = USE_MOCKS
  ? new MockUsersAPI()
  : new SupabaseUsersAPI();