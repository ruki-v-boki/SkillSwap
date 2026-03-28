import { differenceInYears } from 'date-fns';

// ---------------------------------------------------------------

export const validateEmail = (value: string): string | undefined => {
  if (value.trim() === '') return 'Email обязателен';
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!emailRegex.test(value)) return 'Введите корректный email (только латиница)';
  return undefined;
};

export const isEmailValid = (value: string): boolean => {
  if (value === '') return false;
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(value);
};

// ---------------------------------------------------------------

export const validatePassword = (value: string): string | undefined => {
  if (value === '') return 'Пароль обязателен';
  if (value.length < 8) return 'Пароль должен быть не менее 8 символов';
  return undefined;
};

export const isPasswordValid = (value: string): boolean => {
  if (value === '') return false;
  return value.length >= 8;
};

// ---------------------------------------------------------------

export const validateAge = (value: number): string | undefined => {
  if (value === 0) return 'Возраст обязателен';
  if (value < 18) return 'Вам должно быть больше 17 лет';
  if (value > 120) return 'Введите корректный возраст';
  return undefined;
};

export const validateBirthDate = (value: string | null, minAge = 18, maxAge = 100): string | undefined => {
  if (!value) return 'Укажите дату рождения';
  const birthDate = new Date(value);
  if (isNaN(birthDate.getTime())) return 'Некорректная дата';
  const age = differenceInYears(new Date(), birthDate);
  if (age < minAge) return `Вам должно быть ${minAge} лет или больше`;
  if (age > maxAge) return `Проверьте корректность даты (максимум ${maxAge} лет)`;
  return undefined;
};

// ---------------------------------------------------------------

export const validateName = (value: string): string | undefined => {
  if (value.trim() === '') return 'Имя обязательно';
  if (value.length < 2) return 'Имя должно быть не менее 2 символов';
  return undefined;
};

export const validateLocation = (value: string): string | undefined => {
  if (value === '') return 'Выберите город';
  return undefined;
};

export const validateAbout = (value: string): string | undefined => {
  if (value.length > 500) return 'Описание не должно превышать 500 символов';
  return undefined;
};

export const validateDescription = (value: string): string | undefined => {
  if (value.trim() === '') return 'Описание обязательно';
  if (value.length < 20) return 'Описание должно быть не менее 20 символов';
  return undefined;
};

export const validateRequired = (value: string, fieldName: string = 'Поле'): string | undefined => {
  if (value.trim() === '') return `${fieldName} обязательно`;
  return undefined;
};
// ---------------------------------------------------------------

export const validateCategories = (categories: string[]): string | undefined => {
  if (categories.length === 0) return 'Выберите хотя бы одну категорию';
  return undefined;
};

export const validateCategoryId = (value: string): string | undefined => {
  if (value === '') return 'Выберите категорию';
  return undefined;
};

// ---------------------------------------------------------------

export const validateSubcategories = (skills: string[]): string | undefined => {
  if (skills.length === 0) return 'Выберите хотя бы один навык';
  return undefined;
};

export const validateSubcategoryId = (value: string): string | undefined => {
  if (value === '') return 'Выберите подкатегорию';
  return undefined;
};

export const validateSkillName = (value: string): string | undefined => {
  if (value.trim() === '') return 'Название навыка обязательно';
  if (value.length < 3) return 'Название должно быть не менее 3 символов';
  return undefined;
};