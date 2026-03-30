import type { IUser } from "./types";

// ---------------------------------------------------------------

export type LoginCredentials = {
  email: string;
  password: string;
}

// ---------------------------------------------------------------

export type AuthResponse = {
  user: IUser;
  accessToken: string;
  refreshToken: string;
}