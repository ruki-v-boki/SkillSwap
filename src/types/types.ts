import type { CATEGORY_CONFIG } from "@/constants/category";
import type { CITIES } from "@/constants/cities";

// ---------------------------------------------------------------

export type TGender = 'male' | 'female' | 'any'
export type TCity = typeof CITIES[number];
export type TNotifications = 'offer' | 'acceptOffer';

// ---------------------------------------------------------------

export type IUser = {
  id: string;
  email?: string;
  name: string;
  location: TCity;
  age: number;
  birthDate: string | null;
  about: string;
  gender: TGender;
  createdAt: string;
  avatar?: string;
  likedBy: string[];
  canTeach: CanTeachSkill;
  wantToLearn: WantToLearnSkill[];
}

// ---------------------------------------------------------------

export type Category = {
  id: string;
  name: string;
}

export type Subcategory = {
  id: string;
  name: string;
  categoryId: string;
}

export type CategoryId = keyof typeof CATEGORY_CONFIG;

// ---------------------------------------------------------------

export type WantToLearnSkill = {
  id: string;
  categoryId: string;
  subcategoryId: string;
}

// Для отображения (после загрузки)
export type CanTeachSkill = {
  id: string;
  categoryId: string;
  subcategoryId: string;
  customName: string;
  description?: string;
  images?: string[]; // ← URL
}

// Для регистрации (до загрузки)
export type CanTeachSkillInput = Omit<CanTeachSkill, 'id' | 'images'> & {
  images: File[];  // ← файлы для загрузки
}

// ---------------------------------------------------------------
// Для аватара (до загрузки)
export type AvatarInput = {
  file: File;
  preview: string;
} | null;