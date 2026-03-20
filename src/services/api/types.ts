import type { IUser } from '@/types/types';
import type { LoginCredentials, RegisterData, AuthResponse } from '@/types/auth';

export interface IAuthAPI {
  login(credentials: LoginCredentials): Promise<AuthResponse>;
  register(data: RegisterData): Promise<AuthResponse>;
  getUserProfile(userId: string): Promise<IUser>;
  updateUser(userId: string, data: Partial<IUser>): Promise<IUser>;
  refreshToken(refreshToken: string): Promise<{ accessToken: string }>;
  logout(): Promise<void>;
}

export interface IUsersAPI {
  getAllUsers(): Promise<IUser[]>;
  getUserById(id: string): Promise<IUser>;
  updateUser(id: string, data: Partial<IUser>): Promise<IUser>;
}