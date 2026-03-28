import { APP_CATEGORIES, APP_SUBCATEGORIES } from "@/constants/skills";
import { CATEGORY_CONFIG } from "@/constants/category";
import type { CategoryId, IUser } from "@/types/types";
import { differenceInYears } from 'date-fns';

// ---------------------------------------------------------------

export const calculateAgeFromDate = (birthDate: string | null): number => {
  if (!birthDate) return 0;
  const date = new Date(birthDate);
  if (isNaN(date.getTime())) return 0;
  return differenceInYears(new Date(), date);
};

export const getAgeWord = (age: number): string => {
  const lastDigit = age % 10;
  const lastTwoDigits = age % 100;

  if (lastTwoDigits >= 11 && lastTwoDigits <= 14) {
    return 'лет';
  }
  if (lastDigit === 1) {
    return 'год';
  }
  if (lastDigit >= 2 && lastDigit <= 4) {
    return 'года';
  }
  return 'лет';
};

// ---------------------------------------------------------------

export const getUserRating = (user: IUser): number => user.likedBy?.length || 0;

// ---------------------------------------------------------------

export const getCategoryById = (id: string) => {
  return APP_CATEGORIES.find(c => c.id === id);
};

export const getCategoryName = (id: string) => {
  return APP_CATEGORIES.find(c => c.id === id)?.name || id;
};

export const getCategoriesWithSubcategories = () => {
  return APP_CATEGORIES.map(category => ({
    ...category,
    subcategories: getSubcategoriesByCategoryId(category.id)
  }));
};

export const getCategoryConfig = (categoryId: string) => {
  if (Object.hasOwn(CATEGORY_CONFIG, categoryId)) {
    return CATEGORY_CONFIG[categoryId as keyof typeof CATEGORY_CONFIG];
  }
  return {
    colorClass: 'default',
    icon: '',
    label: categoryId
  };
};

export const getCategoryColorClass = (categoryId: string): string => {
  const keys = Object.keys(CATEGORY_CONFIG) as CategoryId[];
  if (keys.includes(categoryId as CategoryId)) {
    return CATEGORY_CONFIG[categoryId as CategoryId].colorClass;
  }
  return 'default';
};

// ---------------------------------------------------------------

export const getSubcategoryById = (id: string) => {
  return APP_SUBCATEGORIES.find(s => s.id === id);
};

export const getSubcategoriesByCategoryId = (categoryId: string) => {
  return APP_SUBCATEGORIES.filter(s => s.categoryId === categoryId);
};

export const getSubcategoryName = (id: string) => {
  return APP_SUBCATEGORIES.find(s => s.id === id)?.name || id;
};

export const getSubcategoryOptions = (categoryId: string) => {
  return APP_SUBCATEGORIES
    .filter(sub => sub.categoryId === categoryId)
    .map(sub => ({
      value: sub.id,
      label: sub.name,
    }));
};

export const getSubcategoryOptionsForMultiple = (categoryIds: string[]) => {
  if (categoryIds.length === 0) return [];

  const subcategories = APP_SUBCATEGORIES.filter(sub => 
    categoryIds.includes(sub.categoryId)
  );

  // Убираем дубликаты по id
  const uniqueSubcategories = subcategories.filter((sub, index, self) => 
    index === self.findIndex(s => s.id === sub.id)
  );

  return uniqueSubcategories.map(sub => ({
    value: sub.id,
    label: sub.name,
  }));
};