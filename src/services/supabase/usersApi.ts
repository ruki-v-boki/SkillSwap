import { getUserWithSkills, transformToIUser, updateUserInDB } from './userHelpers';
import type { SupabaseProfile, SupabaseSkill } from './types';
import type { IUsersAPI } from '../api/types';
import type { IUser } from '@/types/types';
import { supabase } from './client';

// ---------------------------------------------------------------

export class SupabaseUsersAPI implements IUsersAPI {

// --------------- Get All Users ---------------

  async getAllUsers(): Promise<IUser[]> {

    // 1. Получаем всех пользователей
    const { data: users, error: usersError } = await supabase
      .from('users')
      .select('id, email, name, location, age, birth_date, about, gender, avatar_url, liked_by, created_at');

    if (usersError) throw new Error(usersError.message);

    // 2. Получаем все навыки
    const { data: skills, error: skillsError } = await supabase
      .from('skills')
      .select('*');

    if (skillsError) throw new Error(skillsError.message);

    // 3. Группируем навыки по пользователям
    const skillsByUser = new Map<string, SupabaseSkill[]>();
    for (const skill of skills || []) {
      if (!skillsByUser.has(skill.user_id)) {
        skillsByUser.set(skill.user_id, []);
      }
      skillsByUser.get(skill.user_id)!.push(skill);
    }

    // 4. Трансформируем
    const transformedUsers: IUser[] = [];
    for (const user of users || []) {
      const userSkills = skillsByUser.get(user.id) || [];
      const teachSkillRaw = userSkills.find(s => s.type === 'teach');
      const teachSkill = teachSkillRaw ? {
        id: teachSkillRaw.id,
        categoryId: teachSkillRaw.category_id,
        subcategoryId: teachSkillRaw.subcategory_id,
        customName: teachSkillRaw.custom_name || '',
        description: teachSkillRaw.description || undefined,
        images: teachSkillRaw.images || [],
      } : undefined;

      const learnSkills = userSkills
        .filter(s => s.type === 'learn')
        .map(s => ({
          id: s.id,
          categoryId: s.category_id,
          subcategoryId: s.subcategory_id,
        }));

      transformedUsers.push(transformToIUser(
        user as SupabaseProfile,
        teachSkill,
        learnSkills
      ));
    }

    return transformedUsers;
  }

// --------------- Get User By Id ---------------

  async getUserById(id: string): Promise<IUser> {
    return getUserWithSkills(id);
  }

// --------------- Update User ---------------

  async updateUser(id: string, data: Partial<IUser>): Promise<IUser> {
    await updateUserInDB(id, data);
    return getUserWithSkills(id);
  }

// --------------- Toggle Like ---------------

  async toggleLike(currentUserId: string, targetUserId: string): Promise<boolean> {
    const { data: targetUser, error: fetchError } = await supabase
      .from('users')
      .select('liked_by')
      .eq('id', targetUserId)
      .single();

    if (fetchError) throw new Error(fetchError.message);

    const currentLikes: string[] = targetUser.liked_by || [];
    const wasLiked = currentLikes.includes(currentUserId);

    const newLikes = wasLiked
      ? currentLikes.filter((id: string) => id !== currentUserId)
      : [...currentLikes, currentUserId];

    const { error: updateError } = await supabase
      .from('users')
      .update({ liked_by: newLikes })
      .eq('id', targetUserId);

    if (updateError) throw new Error(updateError.message);

    const newState = !wasLiked;

    return newState;
  }
}