import type { IUser, CanTeachSkill, WantToLearnSkill, TGender } from '@/types/types';

// Тип для ответа от Supabase (без email, так как email не входит в IUser)
export type SupabaseProfile = {
  id: string;
  name: string;
  location: string;
  age: number;
  about: string;
  gender: TGender;
  avatar_url: string | null;
  rating: number;
  created_at: string;
};

// ---------------------------------------------------------------

// Тип навыка в Supabase
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

// Трансформер: SupabaseProfile → IUser
export const transformToIUser = (
  supabaseUser: SupabaseProfile,
  teachSkill?: CanTeachSkill,
  learnSkills?: WantToLearnSkill[]
): IUser => {
  return {
    id: supabaseUser.id,
    name: supabaseUser.name,
    location: supabaseUser.location,
    age: supabaseUser.age,
    about: supabaseUser.about,
    gender: supabaseUser.gender,
    createdAt: supabaseUser.created_at,
    avatar: supabaseUser.avatar_url || undefined,
    rating: supabaseUser.rating,
    canTeach: teachSkill || {
      id: '',
      categoryId: '',
      subcategoryId: '',
      customName: '',
      description: '',
      images: []
    },
    wantToLearn: learnSkills || [],
    likedBy: [],
  };
};
