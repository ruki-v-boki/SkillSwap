import type { TCity } from "@/constants/cities";

export type TGender = 'male' | 'female' | 'any'

export interface IUser {
  id: string;
  email?: string;
  name: string;
  location: TCity;
  age: number;
  about: string;
  gender: TGender;
  createdAt: string;
  avatar?: string;
  rating?: number;
  likedBy?: string[];
  canTeach: CanTeachSkill;
  wantToLearn: WantToLearnSkill[];
}

// ------------ КАТЕГОРИЯ ------------
export type Category = {
  id: string;
  name: string;
}

export type Subcategory = {
  id: string;
  name: string;
  categoryId: string;
}

// // ------------ НАВЫКИ ------------
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

// Для аватара (до загрузки)
export type AvatarInput = {
  file: File;
  preview: string;
} | null;