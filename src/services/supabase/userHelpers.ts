import type { CanTeachSkill, IUser, WantToLearnSkill } from "@/types/types";
import { type SupabaseProfile } from "./types";
import { supabase } from "./client";

// ---------------------------------------------------------------

export const transformToIUser = (
  supabaseUser: SupabaseProfile,
  teachSkill?: CanTeachSkill,
  learnSkills?: WantToLearnSkill[]
): IUser => {
  return {
    id: supabaseUser.id,
    email: supabaseUser.email,
    name: supabaseUser.name,
    location: supabaseUser.location,
    age: supabaseUser.age,
    birthDate: supabaseUser.birth_date || null,
    about: supabaseUser.about,
    gender: supabaseUser.gender,
    createdAt: supabaseUser.created_at,
    avatar: supabaseUser.avatar_url || undefined,
    likedBy: supabaseUser.liked_by || [],
    canTeach: teachSkill || {
      id: '',
      categoryId: '',
      subcategoryId: '',
      customName: '',
      description: '',
      images: []
    },
    wantToLearn: learnSkills || [],
  };
};

// ---------------------------------------------------------------

export async function getUserWithSkills(userId: string): Promise<IUser> {

  // 1. Получаем данные пользователя
  const { data: userData, error: userError } = await supabase
    .from('users')
    .select('id, email, name, location, age, birth_date, about, gender, avatar_url, liked_by, created_at')
    .eq('id', userId)
    .maybeSingle();

  if (userError) throw new Error(userError.message);
  if (!userData) throw new Error(`Пользователь с id ${userId} не найден`);

  // 2. Получаем навыки
  const { data: skillsData, error: skillsError } = await supabase
    .from('skills')
    .select('*')
    .eq('user_id', userId);

  if (skillsError) throw new Error(skillsError.message);

  // 3. Разделяем teach/learn навыки
  const teachSkillRaw = skillsData?.find(s => s.type === 'teach');
  const teachSkill: CanTeachSkill | undefined = teachSkillRaw ? {
    id: teachSkillRaw.id,
    categoryId: teachSkillRaw.category_id,
    subcategoryId: teachSkillRaw.subcategory_id,
    customName: teachSkillRaw.custom_name || '',
    description: teachSkillRaw.description || undefined,
    images: teachSkillRaw.images || [],
  } : undefined;

    const learnSkills: WantToLearnSkill[] = (skillsData || [])
    .filter(s => s.type === 'learn')
    .map(s => ({
      id: s.id,
      categoryId: s.category_id,
      subcategoryId: s.subcategory_id,
    }));

  // 4. Трансформируем в IUser
  return transformToIUser(userData as SupabaseProfile, teachSkill, learnSkills);
}

// ---------------------------------------------------------------

export async function updateUserInDB(userId: string, data: Partial<IUser>): Promise<void> {
  const { error } = await supabase
    .from('users')
    .update({
      name: data.name,
      location: data.location,
      age: data.age,
      birth_date: data.birthDate,
      about: data.about,
      gender: data.gender,
      avatar_url: data.avatar,
      liked_by: data.likedBy,
    })
    .eq('id', userId);

  if (error) throw new Error(error.message);
}