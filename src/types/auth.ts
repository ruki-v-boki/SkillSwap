import type { IUser, CanTeachSkill, WantToLearnSkill, TGender } from "./types";

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
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

export interface AuthResponse {
  user: IUser;
  accessToken: string;
  refreshToken: string;
}