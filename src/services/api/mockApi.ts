import type { IAuthAPI, IUsersAPI } from './types';
import type { LoginCredentials, RegisterData, AuthResponse } from '@/types/auth';
import type { IUser } from '@/types/types';
import { MOCK_USERS } from '@/mock/users';

const generateMockToken = () => 'mock-jwt-token-' + Date.now();

export class MockAuthAPI implements IAuthAPI {
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    await new Promise(resolve => setTimeout(resolve, 500));

    if (credentials.email === 'demo@demo.com' && credentials.password === 'demo123') {
      return {
        user: MOCK_USERS[0],
        accessToken: generateMockToken(),
        refreshToken: generateMockToken(),
      };
    }
    throw new Error('Неверный email или пароль');
  }

  async register(data: RegisterData): Promise<AuthResponse> {
    await new Promise(resolve => setTimeout(resolve, 500));

    const newUser: IUser = {
      id: String(MOCK_USERS.length + 1),
      name: data.name,
      location: '',
      age: 0,
      about: '',
      gender: 'male',
      createdAt: new Date().toISOString(),
      rating: 0,
      canTeach: {
        id: `teach-${Date.now()}`,
        categoryId: data.canTeach.categoryId,
        subcategoryId: data.canTeach.subcategoryId,
        customName: data.canTeach.customName,
      },
      wantToLearn: data.wantToLearn.map((skill, index) => ({
        id: `learn-${Date.now()}-${index}`,
        categoryId: skill.categoryId,
        subcategoryId: skill.subcategoryId,
      })),
      likedBy: [],
    };

    return {
      user: newUser,
      accessToken: generateMockToken(),
      refreshToken: generateMockToken(),
    };
  }

  async getUserProfile(userId: string): Promise<IUser> {
    await new Promise(resolve => setTimeout(resolve, 300));
    const user = MOCK_USERS.find(u => u.id === userId);
    if (!user) throw new Error('User not found');
    return user;
  }

  async updateUser(userId: string, data: Partial<IUser>): Promise<IUser> {
    await new Promise(resolve => setTimeout(resolve, 300));
    const userIndex = MOCK_USERS.findIndex(u => u.id === userId);
    if (userIndex === -1) throw new Error('User not found');
    
    const updatedUser = { ...MOCK_USERS[userIndex], ...data };
    MOCK_USERS[userIndex] = updatedUser;
    return updatedUser;
  }

  async refreshToken(_refreshToken: string): Promise<{ accessToken: string }> {
    await new Promise(resolve => setTimeout(resolve, 300));
    return { accessToken: generateMockToken() };
  }

  async logout(): Promise<void> {
    await new Promise(resolve => setTimeout(resolve, 200));
  }
}

export class MockUsersAPI implements IUsersAPI {
  async getAllUsers(): Promise<IUser[]> {
    await new Promise(resolve => setTimeout(resolve, 300));
    return MOCK_USERS;
  }

  async getUserById(id: string): Promise<IUser> {
    await new Promise(resolve => setTimeout(resolve, 200));
    const user = MOCK_USERS.find(u => u.id === id);
    if (!user) throw new Error('User not found');
    return user;
  }

  async updateUser(id: string, data: Partial<IUser>): Promise<IUser> {
    await new Promise(resolve => setTimeout(resolve, 300));
    const userIndex = MOCK_USERS.findIndex(u => u.id === id);
    if (userIndex === -1) throw new Error('User not found');
    
    const updatedUser = { ...MOCK_USERS[userIndex], ...data };
    MOCK_USERS[userIndex] = updatedUser;
    return updatedUser;
  }
}