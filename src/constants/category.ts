import CreativityIcon from '@/assets/icons/categories/creativity.svg';
import LanguagesIcon from '@/assets/icons/categories/languages.svg';
import EducationIcon from '@/assets/icons/categories/education.svg';
import BusinessIcon from '@/assets/icons/categories/business.svg';
import HealthIcon from '@/assets/icons/categories/health.svg';
import HomeIcon from '@/assets/icons/categories/home.svg';
import type { CategoryId } from '@/types/types';

// ---------------------------------------------------------------

export const CATEGORY_CONFIG = {
  business: {
    colorClass: 'business',
    icon: BusinessIcon,
    label: 'Бизнес и карьера',
    id: 'business'
  },
  creativity: {
    colorClass: 'creativity',
    icon: CreativityIcon,
    label: 'Творчество и искусство',
    id: 'creativity'
  },
  languages: {
    colorClass: 'languages',
    icon: LanguagesIcon,
    label: 'Иностранные языки',
    id: 'languages'
  },
  education: {
    colorClass: 'education',
    icon: EducationIcon,
    label: 'Образование и развитие',
    id: 'education'
  },
  home: {
    colorClass: 'home',
    icon: HomeIcon,
    label: 'Дом и уют',
    id: 'home'
  },
  health: {
    colorClass: 'health',
    icon: HealthIcon,
    label: 'Здоровье и лайфстайл',
    id: 'health'
  },
  plus: {
    colorClass: 'plus',
    icon: null,
    label: 'Плюс',
    id: 'plus'
  }
} as const;

// ---------------------------------------------------------------

export const CATEGORIES_FROM_CONFIG = Object.values(CATEGORY_CONFIG)
  .filter(cat => cat.id !== 'plus')
  .map(({ id, label }) => ({ id, name: label })) as { id: CategoryId; name: string }[];