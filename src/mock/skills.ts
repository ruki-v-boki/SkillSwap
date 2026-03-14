import type { Category, Subcategory } from "@/types/types";


// КАТЕГОРИИ
export const APP_CATEGORIES: Category[] = [
  { 
    id: 'business', 
    name: 'Бизнес и карьера' 
  },
  { 
    id: 'creativity', 
    name: 'Творчество и искусство' 
  },
  { 
    id: 'languages', 
    name: 'Иностранные языки' 
  },
  { 
    id: 'education', 
    name: 'Образование и развитие' 
  },
  { 
    id: 'home', 
    name: 'Дом и уют' 
  },
  { 
    id: 'health', 
    name: 'Здоровье и лайфстайл' 
  }
];

// ПОДКАТЕГОРИИ
export const APP_SUBCATEGORIES: Subcategory[] = [
  // ---------- Бизнес и карьера ----------
  { 
    id: 'entrepreneurship', 
    name: 'Предпринимательство', 
    categoryId: 'business' 
  },
  { 
    id: 'project-management', 
    name: 'Проектное управление', 
    categoryId: 'business' 
  },
  { 
    id: 'time-management', 
    name: 'Тайм-менеджмент', 
    categoryId: 'business' 
  },
  { 
    id: 'resume', 
    name: 'Резюме и собеседование', 
    categoryId: 'business' 
  },
  { 
    id: 'personal-brand', 
    name: 'Личный бренд', 
    categoryId: 'business' 
  },
  { 
    id: 'sales', 
    name: 'Продажи и переговоры', 
    categoryId: 'business' 
  },
  { 
    id: 'marketing', 
    name: 'Маркетинг и реклама', 
    categoryId: 'business' 
  },
  { 
    id: 'team-management', 
    name: 'Управление командой', 
    categoryId: 'business' 
  },

  // ---------- Творчество и искусство ----------
  { 
    id: 'drawing', 
    name: 'Рисование и иллюстрация', 
    categoryId: 'creativity' 
  },
  { 
    id: 'photography', 
    name: 'Фотография', 
    categoryId: 'creativity' 
  },
  { 
    id: 'video-editing', 
    name: 'Видеомонтаж', 
    categoryId: 'creativity' 
  },
  { 
    id: 'music', 
    name: 'Музыка и звук', 
    categoryId: 'creativity' 
  },
  { 
    id: 'acting', 
    name: 'Актёрское мастерство', 
    categoryId: 'creativity' 
  },
  { 
    id: 'creative-writing', 
    name: 'Креативное письмо', 
    categoryId: 'creativity' 
  },
  { 
    id: 'art-therapy', 
    name: 'Арт-терапия', 
    categoryId: 'creativity' 
  },
  { 
    id: 'diy', 
    name: 'Декор и DIY', 
    categoryId: 'creativity' 
  },

  // ---------- Иностранные языки ----------
  { 
    id: 'english', 
    name: 'Английский', 
    categoryId: 'languages' 
  },
  { 
    id: 'french', 
    name: 'Французский', 
    categoryId: 'languages' 
  },
  { 
    id: 'spanish', 
    name: 'Испанский', 
    categoryId: 'languages' 
  },
  { 
    id: 'german', 
    name: 'Немецкий', 
    categoryId: 'languages' 
  },
  { 
    id: 'chinese', 
    name: 'Китайский', 
    categoryId: 'languages' 
  },
  { 
    id: 'japanese', 
    name: 'Японский', 
    categoryId: 'languages' 
  },
  { 
    id: 'exam-prep', 
    name: 'Подготовка к экзаменам (IELTS, TOEFL)', 
    categoryId: 'languages' 
  },

  // ---------- Образование и развитие ----------
  { 
    id: 'personal-development', 
    name: 'Личностное развитие', 
    categoryId: 'education' 
  },
  { 
    id: 'learning-skills', 
    name: 'Навыки обучения', 
    categoryId: 'education' 
  },
  { 
    id: 'cognitive-techniques', 
    name: 'Когнитивные техники', 
    categoryId: 'education' 
  },
  { 
    id: 'speed-reading', 
    name: 'Скорочтение', 
    categoryId: 'education' 
  },
  { 
    id: 'teaching-skills', 
    name: 'Навыки преподавания', 
    categoryId: 'education' 
  },
  { 
    id: 'coaching', 
    name: 'Коучинг', 
    categoryId: 'education' 
  },

  // ---------- Дом и уют ----------
  { 
    id: 'cleaning', 
    name: 'Уборка и организация', 
    categoryId: 'home' 
  },
  { 
    id: 'home-finance', 
    name: 'Домашние финансы', 
    categoryId: 'home' 
  },
  { 
    id: 'cooking', 
    name: 'Приготовление еды', 
    categoryId: 'home' 
  },
  { 
    id: 'plants', 
    name: 'Домашние растения', 
    categoryId: 'home' 
  },
  { 
    id: 'repair', 
    name: 'Ремонт', 
    categoryId: 'home' 
  },
  { 
    id: 'storage', 
    name: 'Хранение вещей', 
    categoryId: 'home' 
  },

  // ---------- Здоровье и лайфстайл ----------
  { 
    id: 'yoga', 
    name: 'Йога и медитация', 
    categoryId: 'health' 
  },
  { 
    id: 'nutrition', 
    name: 'Питание и ЗОЖ', 
    categoryId: 'health' 
  },
  { 
    id: 'mental-health', 
    name: 'Ментальное здоровье', 
    categoryId: 'health' 
  },
  { 
    id: 'mindfulness', 
    name: 'Осознанность', 
    categoryId: 'health' 
  },
  { 
    id: 'fitness', 
    name: 'Физические тренировки', 
    categoryId: 'health' 
  },
  { 
    id: 'sleep', 
    name: 'Сон и восстановление', 
    categoryId: 'health' 
  },
  { 
    id: 'work-life-balance', 
    name: 'Баланс жизни и работы', 
    categoryId: 'health' 
  }
];