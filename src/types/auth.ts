import type { IUser, CanTeachSkill, WantToLearnSkill } from "./types";

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  email: string;
  password: string;
  name: string;
  canTeach: Omit<CanTeachSkill, 'id'>;
  wantToLearn: Omit<WantToLearnSkill, 'id'>[];
}

export interface AuthResponse {
  user: IUser;
  accessToken: string;
  refreshToken: string;
}