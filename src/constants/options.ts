import { APP_CATEGORIES } from './skills';
import { CITIES } from './cities';

// ---------------------------------------------------------------

export const GENDER_OPTIONS: { value: string; label: string }[] = [
  { value: 'male', label: 'Мужской' },
  { value: 'female', label: 'Женский' },
  { value: 'any', label: 'Не указан' },
];

// ---------------------------------------------------------------

export const CITY_OPTIONS: { value: string; label: string }[] = CITIES.map(city => ({
  value: city,
  label: city
}));

// ---------------------------------------------------------------

export const CATEGORY_OPTIONS: { value: string; label: string }[] = APP_CATEGORIES.map(category => ({
  value: category.id,
  label: category.name,
}));

// ---------------------------------------------------------------

export const FILTER_MODE_OPTIONS: { value: string; label: string }[] = [
  { value: 'all', label: 'Всё' },
  { value: 'learn', label: 'Хочу научиться' },
  { value: 'teach', label: 'Могу научить' },
];

// ---------------------------------------------------------------

export const MONTHS = [
  'Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь',
  'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'
];