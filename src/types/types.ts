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

// ------------ НАВЫКИ ------------
export type SkillsCatalog = {
  categories: Category[];
  subcategories: Subcategory[];
}

export type BaseSkill = {
  categoryId: string;
  subcategoryId: string;
}

export type WantToLearnSkill = BaseSkill & {
  id: string;
}

export type CanTeachSkill = BaseSkill & {
  id: string;
  customName: string;
}