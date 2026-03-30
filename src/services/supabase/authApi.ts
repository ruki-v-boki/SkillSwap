import type { LoginCredentials, AuthResponse } from '@/types/auth';
import { getUserWithSkills, updateUserInDB } from './userHelpers';
import type { RegisterData } from '@/types/register';
import type { IUser } from '@/types/types';
import { supabase } from './client';

// ---------------------------------------------------------------

export class SupabaseAuthAPI {

// --------------- Refresh Token ---------------

  async refreshToken(refreshToken: string): Promise<{ accessToken: string }> {
    const { data, error } = await supabase.auth.refreshSession({
      refresh_token: refreshToken,
    });
    if (error) throw new Error(error.message);
    return { accessToken: data.session?.access_token || '' };
  }

// --------------- Login ---------------

  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: credentials.email,
      password: credentials.password,
    });

    if (error) {
      throw new Error(error.message)
    };

    const user = await this.getUserProfile(data.user.id);

    return {
      user,
      accessToken: data.session.access_token,
      refreshToken: data.session.refresh_token,
    };
  }

// --------------- Register ---------------

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
    if (!authData.user) throw new Error('Регистрация не удалась :(');

    const userId = authData.user.id;

    // 2. Загружаем аватар (если есть)
    let avatarUrl: string | null = null;
    if (data.avatar?.file) {
      try {
        avatarUrl = await this.uploadAvatar(userId, data.avatar.file);
      } catch (uploadError) {
        console.error('Ошибка загрузки аватара:', uploadError);
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
        birth_date: data.birthDate || null,
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
        console.error('Ошибка загрузки изображений:', uploadError);
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

// --------------- Logout ---------------

  async logout(): Promise<void> {
    const { error } = await supabase.auth.signOut();
    if (error) {
      throw new Error(error.message);
    }
  }

// --------------- Get User Profile ---------------

  async getUserProfile(userId: string): Promise<IUser> {
    return getUserWithSkills(userId);
  }

// --------------- Update User ---------------

  async updateUser(userId: string, data: Partial<IUser>): Promise<IUser> {
    await updateUserInDB(userId, data);
    return getUserWithSkills(userId);
  }

// --------------- Upload Avatar ---------------

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

// --------------- Upload Images ---------------

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
}

export const supabaseAuthAPI = new SupabaseAuthAPI();