import type { RealtimeChannel, RealtimePostgresChangesPayload } from '@supabase/supabase-js';
import type { TNotifications } from '@/types/notifications';
import type { ExchangeStatus } from '@/types/exchange';
import type { TGender, TCity } from '@/types/types';

// ---------------------------------------------------------------

export type SupabaseProfile = {
  id: string;
  email: string;
  name: string;
  location: TCity;
  age: number;
  birth_date: string | null;
  about: string;
  gender: TGender;
  avatar_url: string | null;
  liked_by: string[];
  created_at: string;
};

// ---------------------------------------------------------------

export type SupabaseSkill = {
  id: string;
  user_id: string;
  type: 'teach' | 'learn';
  category_id: string;
  subcategory_id: string;
  custom_name: string | null;
  description: string | null;
  images: string[] | null;
};

// ---------------------------------------------------------------

export type SupabaseRealtimePayload<T> = RealtimePostgresChangesPayload<{
  [Key in keyof T]: T[Key];
}>;

export type SupabaseRealtimeChannel = RealtimeChannel;

// ---------------------------------------------------------------

export type SupabaseNotification = {
  id: string;
  user_id: string;
  from_user_id: string;
  type: TNotifications;
  title: string;
  message: string;
  link?: string;
  is_read: boolean;
  created_at: string;
};

// ---------------------------------------------------------------

export type SupabaseExchangeOffer = {
  id: string;
  from_user_id: string;
  to_user_id: string;
  status: ExchangeStatus;
  message?: string | null;
  created_at: string;
  updated_at: string;
};