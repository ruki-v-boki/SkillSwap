import type { IUser, CanTeachSkill, WantToLearnSkill, TGender } from "./types";

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
  avatar?: string | null;
  canTeach: Omit<CanTeachSkill, 'id'>;
  wantToLearn: Omit<WantToLearnSkill, 'id'>[];
}

// ---------------------------------------------------------------

export type AuthResponse = {
  user: IUser;
  accessToken: string;
  refreshToken: string;
}