import type { IUser, WantToLearnSkill, TGender, AvatarInput, CanTeachSkillInput } from "./types";

export type LoginCredentials = {
  email: string;
  password: string;
}

// ---------------------------------------------------------------

export type RegisterData = {
  email: string;
  password: string;
  name: string;
  location: string;
  age: number;
  about: string;
  gender: TGender;
  avatar?: AvatarInput | null;        // ← File для загрузки
  canTeach: CanTeachSkillInput;       // ← File[] для загрузки
  wantToLearn: Omit<WantToLearnSkill, 'id'>[];
}

// ---------------------------------------------------------------

export type AuthResponse = {
  user: IUser;
  accessToken: string;
  refreshToken: string;
}