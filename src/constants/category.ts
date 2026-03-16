import BusinessIcon from '@/assets/icons/categories/business.svg';
import CreativityIcon from '@/assets/icons/categories/creativity.svg';
import LanguagesIcon from '@/assets/icons/categories/languages.svg';
import EducationIcon from '@/assets/icons/categories/education.svg';
import HomeIcon from '@/assets/icons/categories/home.svg';
import HealthIcon from '@/assets/icons/categories/health.svg';

export const categoryConfig: Record<string, {
  colorClass: string;
  icon: string;
  label: string;
}> = {
  business: {
    colorClass: 'business',
    icon: BusinessIcon,
    label: 'Бизнес и карьера'
  },
  creativity: {
    colorClass: 'creativity',
    icon: CreativityIcon,
    label: 'Творчество и искусство'
  },
  languages: {
    colorClass: 'languages',
    icon: LanguagesIcon,
    label: 'Иностранные языки'
  },
  education: {
    colorClass: 'education',
    icon: EducationIcon,
    label: 'Образование и развитие'
  },
  home: {
    colorClass: 'home',
    icon: HomeIcon,
    label: 'Дом и уют'
  },
  health: {
    colorClass: 'health',
    icon: HealthIcon,
    label: 'Здоровье и лайфстайл'
  }
};