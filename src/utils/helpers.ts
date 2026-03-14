import { APP_CATEGORIES, APP_SUBCATEGORIES } from "@/mock/skills";

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

// Получить категорию по ID
export const getCategoryById = (id: string) => {
  return APP_CATEGORIES.find(c => c.id === id);
};

// Получить подкатегорию по ID
export const getSubcategoryById = (id: string) => {
  return APP_SUBCATEGORIES.find(s => s.id === id);
};

// Получить название подкатегории для отображения
export const getSubcategoryName = (id: string) => {
  return APP_SUBCATEGORIES.find(s => s.id === id)?.name || id;
};

// Получить название категории для отображения
export const getCategoryName = (id: string) => {
  return APP_CATEGORIES.find(c => c.id === id)?.name || id;
};

// Получить все подкатегории для категории
export const getSubcategoriesByCategoryId = (categoryId: string) => {
  return APP_SUBCATEGORIES.filter(s => s.categoryId === categoryId);
};

// Получить все категории с их подкатегориями (для формы)
export const getCategoriesWithSubcategories = () => {
  return APP_CATEGORIES.map(category => ({
    ...category,
    subcategories: getSubcategoriesByCategoryId(category.id)
  }));
};