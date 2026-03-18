import type { IUser } from "@/types/types";
import type { FiltersState } from "../type";


const getUserCategoriesByMode = (user: IUser, mode: FiltersState['mode']): string[] => {
  switch (mode) {
    case 'teach':
      return user.canTeach?.categoryId ? [user.canTeach.categoryId] : [];

    case 'learn':
      return user.wantToLearn.map(skill => skill.categoryId);

    case 'all':
    default:
      return [
        user.canTeach?.categoryId,
        ...user.wantToLearn.map(skill => skill.categoryId)
      ].filter((id): id is string => id !== undefined);
  }
};


export const categoryFilter = (user: IUser, filters: FiltersState): boolean => {
  const userCategories = getUserCategoriesByMode(user, filters.mode);

  if (filters.selectedCategories.length === 0) {
    return true;
  }

  if (userCategories.length === 0) {
    return false;
  }

  return userCategories.some(categoryId => 
    filters.selectedCategories.includes(categoryId)
  );
};


