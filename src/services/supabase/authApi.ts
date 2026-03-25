import type { LoginCredentials, RegisterData, AuthResponse } from '@/types/auth';
import type { IUser, CanTeachSkill, WantToLearnSkill } from '@/types/types';
import { transformToIUser, type SupabaseProfile } from './types';
import { supabase } from './client';


export class SupabaseAuthAPI {

  // Загрузка одного файла (аватар)
  private async uploadAvatar(userId: string, file: File): Promise<string> {
    const fileName = `${userId}/avatar_${Date.now()}_${file.name}`;

    const { error: uploadError } = await supabase.storage
      .from('avatars')
      .upload(fileName, file, {
        cacheControl: '3600',
        upsert: false,
      });

    if (uploadError) {
      throw new Error(`Ошибка загрузки аватара: ${uploadError.message}`);
    }

    const { data: urlData } = supabase.storage
      .from('avatars')
      .getPublicUrl(fileName);

    return urlData.publicUrl;
  }

// ---------------------------------------------------------------

  // Загрузка нескольких файлов (навыки)
  private async uploadImages(userId: string, files: File[]): Promise<string[]> {
    const urls: string[] = [];

    for (const file of files) {
      const fileName = `${userId}/${Date.now()}_${file.name}`;

      const { error: uploadError } = await supabase.storage
        .from('skill-images')
        .upload(fileName, file, {
          cacheControl: '3600',
          upsert: false,
        });

      if (uploadError) {
        console.error('Upload error:', uploadError);
        throw new Error(`Ошибка загрузки изображения: ${uploadError.message}`);
      }

      const { data: urlData } = supabase.storage
        .from('skill-images')
        .getPublicUrl(fileName);

      urls.push(urlData.publicUrl);
    }

    return urls;
  }

// ---------------------------------------------------------------

  async getUserProfile(userId: string): Promise<IUser> {
    // Получаем данные пользователя
    const { data: userData, error: userError } = await supabase
      .from('users')
      .select('id, email, name, location, age, about, gender, avatar_url, liked_by, created_at')
      .eq('id', userId)
      // .single();
      .maybeSingle()

    if (userError) throw new Error(userError.message);

    // Получаем все навыки пользователя
    const { data: skillsData, error: skillsError } = await supabase
      .from('skills')
      .select('*')
      .eq('user_id', userId);

    if (skillsError) throw new Error(skillsError.message);

    // Находим навык "могу научить"
    const teachSkillRaw = skillsData.find(s => s.type === 'teach');
    const teachSkill: CanTeachSkill | undefined = teachSkillRaw ? {
      id: teachSkillRaw.id,
      categoryId: teachSkillRaw.category_id,
      subcategoryId: teachSkillRaw.subcategory_id,
      customName: teachSkillRaw.custom_name || '',
      description: teachSkillRaw.description || undefined,
      images: teachSkillRaw.images || [],
    } : undefined;

    // Находим навыки "хочу научиться"
    const learnSkills: WantToLearnSkill[] = skillsData
      .filter(s => s.type === 'learn')
      .map(s => ({
        id: s.id,
        categoryId: s.category_id,
        subcategoryId: s.subcategory_id,
      }));
    return transformToIUser(userData as SupabaseProfile, teachSkill, learnSkills);
  }

// ---------------------------------------------------------------

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

    const userId = authData.user.id;

    // 2. Загружаем аватар (если есть)
    let avatarUrl: string | null = null;
    if (data.avatar?.file) {
      try {
        avatarUrl = await this.uploadAvatar(userId, data.avatar.file);
      } catch (uploadError) {
        console.error('Avatar upload failed:', uploadError);
      }
    }

    // 3. Создаем профиль в таблице users
    const { error: profileError } = await supabase
      .from('users')
      .insert({
        id: userId,
        email: data.email,
        name: data.name,
        location: data.location || '',
        age: data.age || 0,
        about: data.about || '',
        gender: data.gender || 'any',
        avatar_url: avatarUrl,
      });

    if (profileError) throw new Error(profileError.message);

    // 4. Загружаем изображения навыка в Storage
    let imageUrls: string[] = [];
    if (data.canTeach.images && data.canTeach.images.length > 0) {
      try {
        imageUrls = await this.uploadImages(userId, data.canTeach.images);
      } catch (uploadError) {
        console.error('Image upload failed:', uploadError);
      }
    }

    // 5. Добавляем навык "могу научить"
    const { error: teachError } = await supabase
      .from('skills')
      .insert({
        user_id: userId,
        type: 'teach',
        category_id: data.canTeach.categoryId,
        subcategory_id: data.canTeach.subcategoryId,
        custom_name: data.canTeach.customName,
        description: data.canTeach.description || null,
        images: imageUrls,
      });

    if (teachError) throw new Error(teachError.message);

    // 6. Добавляем навыки "хочу научиться"
    if (data.wantToLearn && data.wantToLearn.length > 0) {
      for (const skill of data.wantToLearn) {
        const { error: learnError } = await supabase
          .from('skills')
          .insert({
            user_id: userId,
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

    // 7. Получаем сессию
    const { data: sessionData } = await supabase.auth.getSession();

    // 8. Получаем профиль пользователя
    const user = await this.getUserProfile(userId);

    return {
      user,
      accessToken: sessionData.session?.access_token || '',
      refreshToken: sessionData.session?.refresh_token || '',
    };
  }

// ---------------------------------------------------------------

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

// ---------------------------------------------------------------

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
        liked_by: data.likedBy,
      })
      .eq('id', userId);

    if (error) throw new Error(error.message);

    return this.getUserProfile(userId);
  }

// ---------------------------------------------------------------

  async refreshToken(refreshToken: string): Promise<{ accessToken: string }> {
    const { data, error } = await supabase.auth.refreshSession({
      refresh_token: refreshToken,
    });

    if (error) throw new Error(error.message);

    return { accessToken: data.session?.access_token || '' };
  }

// ---------------------------------------------------------------

  async logout(): Promise<void> {
    console.log('🔍 authAPI.logout called');
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error('❌ Logout error:', error);
      throw new Error(error.message);
    }
    console.log('✅ Logout successful');
  }
}

export const supabaseAuthAPI = new SupabaseAuthAPI();