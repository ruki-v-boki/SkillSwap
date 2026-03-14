export type TGender = 'male' | 'female' | 'any'

export interface IUser {
  id: string;
  name: string;
  location: string;
  age: number;
  about: string;
  gender: TGender;
  createdAt: string;
  avatar?: string;
  rating?: number;
  likedBy?: string[]; // id пользователей поставивших лайк
  /** Навыки, которым могу научить */
  canTeach: CanTeachSkill;
  /** Навыки, которым хочу научиться */
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
  categoryId: string; // ID родительской категории
}

// ------------ НАВЫКИ ------------
export type SkillsCatalog = {
  categories: Category[];
  subcategories: Subcategory[];
}

// Базовый навык (ссылки на справочники)
export type BaseSkill = {
  categoryId: string; // ID из справочника категорий
  subcategoryId: string; // ID из справочника подкатегорий
}

export type WantToLearnSkill = BaseSkill & {
  id: string;
}

export type CanTeachSkill = BaseSkill & {
  id: string;
  customName: string; // название, которое придумал юзер
}
