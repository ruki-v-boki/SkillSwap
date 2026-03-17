import { categoryConfig } from "@/constants/category";
import { APP_CATEGORIES, APP_SUBCATEGORIES } from "@/constants/skills";

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

// ------------- КАТЕГОРИИ ----------- 

export const getCategoryById = (id: string) => {
  return APP_CATEGORIES.find(c => c.id === id);
};

export const getSubcategoryById = (id: string) => {
  return APP_SUBCATEGORIES.find(s => s.id === id);
};

export const getCategoryName = (id: string) => {
  return APP_CATEGORIES.find(c => c.id === id)?.name || id;
};

export const getSubcategoryName = (id: string) => {
  return APP_SUBCATEGORIES.find(s => s.id === id)?.name || id;
};


export const getSubcategoriesByCategoryId = (categoryId: string) => {
  return APP_SUBCATEGORIES.filter(s => s.categoryId === categoryId);
};

export const getCategoriesWithSubcategories = () => {
  return APP_CATEGORIES.map(category => ({
    ...category,
    subcategories: getSubcategoriesByCategoryId(category.id)
  }));
};

export const getCategoryConfig = (categoryId: string) => {
  if (Object.hasOwn(categoryConfig, categoryId)) {
    return categoryConfig[categoryId as keyof typeof categoryConfig];
  }
  
  return {
    colorClass: 'default',
    icon: '',
    label: categoryId
  };
};