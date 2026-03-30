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