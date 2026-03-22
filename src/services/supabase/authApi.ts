import { supabase } from './client';
import { transformToIUser, type SupabaseProfile } from './types';
import type { LoginCredentials, RegisterData, AuthResponse } from '@/types/auth';
import type { IUser } from '@/types/types';

export class SupabaseAuthAPI {


  async register(data: RegisterData): Promise<AuthResponse> {
    // 1. Регистрация в Supabase Auth
    const { data: authData, error: signUpError } = await supabase.auth.signUp({
      email: data.email,
      password: data.password,
      options: {
        data: {
          name: data.name,
        }
      }
    });

    if (signUpError) throw new Error(signUpError.message);
    if (!authData.user) throw new Error('Registration failed');

    // 2. Создаем профиль в таблице users (со всеми новыми полями)
    const { error: profileError } = await supabase
      .from('users')
      .insert({
        id: authData.user.id,
        name: data.name,
        location: data.location || '',
        age: data.age || 0,
        about: data.about || '',
        gender: data.gender || 'any',
        avatar_url: data.avatar || null,
        rating: 0,
      });

    if (profileError) throw new Error(profileError.message);

    // 3. Добавляем навык "могу научить" (с описанием и фото)
    const { error: teachError } = await supabase
      .from('skills')
      .insert({
        user_id: authData.user.id,
        type: 'teach',
        category_id: data.canTeach.categoryId,
        subcategory_id: data.canTeach.subcategoryId,
        custom_name: data.canTeach.customName,
        description: data.canTeach.description || null,
        images: data.canTeach.images || [],
      });

    if (teachError) throw new Error(teachError.message);

    // 4. Добавляем навыки "хочу научиться"
    if (data.wantToLearn && data.wantToLearn.length > 0) {
      for (const skill of data.wantToLearn) {
        const { error: learnError } = await supabase
          .from('skills')
          .insert({
            user_id: authData.user.id,
            type: 'learn',
            category_id: skill.categoryId,
            subcategory_id: skill.subcategoryId,
            custom_name: null,
            description: null,
            images: null,
          });

        if (learnError) throw new Error(learnError.message);
      }
    }

    // 5. Получаем сессию
    const { data: sessionData } = await supabase.auth.getSession();

    // 6. Получаем профиль пользователя
    const user = await this.getUserProfile(authData.user.id);

    return {
      user,
      accessToken: sessionData.session?.access_token || '',
      refreshToken: sessionData.session?.refresh_token || '',
    };
}

  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: credentials.email,
      password: credentials.password,
    });

    if (error) throw new Error(error.message);

    const user = await this.getUserProfile(data.user.id);

    return {
      user,
      accessToken: data.session.access_token,
      refreshToken: data.session.refresh_token,
    };
  }

  async getUserProfile(userId: string): Promise<IUser> {
    const { data: userData, error: userError } = await supabase
      .from('users')
      .select('id, name, location, age, about, gender, avatar_url, rating, created_at')
      .eq('id', userId)
      .single();

    if (userError) throw new Error(userError.message);

    const { data: skillsData, error: skillsError } = await supabase
      .from('skills')
      .select('*')
      .eq('user_id', userId);

    if (skillsError) throw new Error(skillsError.message);

    const teachSkillRaw = skillsData.find(s => s.type === 'teach');
    const teachSkill = teachSkillRaw ? {
      id: teachSkillRaw.id,
      categoryId: teachSkillRaw.category_id,
      subcategoryId: teachSkillRaw.subcategory_id,
      customName: teachSkillRaw.custom_name || '',
    } : undefined;

    const learnSkills = skillsData
      .filter(s => s.type === 'learn')
      .map(s => ({
        id: s.id,
        categoryId: s.category_id,
        subcategoryId: s.subcategory_id,
      }));

    return transformToIUser(userData as SupabaseProfile, teachSkill, learnSkills);
  }

  async updateUser(userId: string, data: Partial<IUser>): Promise<IUser> {
    const { error } = await supabase
      .from('users')
      .update({
        name: data.name,
        location: data.location,
        age: data.age,
        about: data.about,
        gender: data.gender,
        avatar_url: data.avatar,
        rating: data.rating,
      })
      .eq('id', userId);

    if (error) throw new Error(error.message);

    return this.getUserProfile(userId);
  }

  async refreshToken(refreshToken: string): Promise<{ accessToken: string }> {
    const { data, error } = await supabase.auth.refreshSession({
      refresh_token: refreshToken,
    });

    if (error) throw new Error(error.message);

    return { accessToken: data.session?.access_token || '' };
  }

  async logout(): Promise<void> {
    const { error } = await supabase.auth.signOut();
    if (error) throw new Error(error.message);
  }
}

export const supabaseAuthAPI = new SupabaseAuthAPI();