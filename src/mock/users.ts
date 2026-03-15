import type { IUser } from "@/types/types";


export const MOCK_USERS: IUser[] = [
  // ========== БИЗНЕС И КАРЬЕРА ==========
  {
    id: 'user1',
    name: 'Алексей',
    location: 'Москва',
    age: 35,
    about: 'Бизнес-тренер и предприниматель. Помогаю запускать стартапы с нуля.',
    avatar: 'https://i.pinimg.com/736x/bf/00/bd/bf00bd9059e7878787893fa3e174bffd.jpg',
    rating: 42,
    gender: 'male',
    createdAt: '2024-03-15T10:30:00Z',
    canTeach: {
      id: 'skill1',
      categoryId: 'business',
      subcategoryId: 'entrepreneurship',
      customName: 'Стартапы'
    },
    wantToLearn: [
      { id: 'learn1', categoryId: 'languages', subcategoryId: 'english' },
      { id: 'learn2', categoryId: 'creativity', subcategoryId: 'music' },
      { id: 'learn3', categoryId: 'languages', subcategoryId: 'spanish' },
      { id: 'learn4', categoryId: 'health', subcategoryId: 'yoga' }
    ]
  },
  {
    id: 'user2',
    name: 'Екатерина',
    location: 'Санкт-Петербург',
    age: 32,
    about: 'Project Manager в IT. Обучаю проектному управлению и Agile.',
    avatar: 'https://i.pinimg.com/videos/thumbnails/originals/a0/a0/a9/a0a0a92d972e0891c1662fe3cc97ddac.0000000.jpg',
    rating: 38,
    gender: 'female',
    createdAt: '2024-05-22T14:45:00Z',
    canTeach: {
      id: 'skill2',
      categoryId: 'business',
      subcategoryId: 'project-management',
      customName: 'Agile'
    },
    wantToLearn: [
      { id: 'learn3', categoryId: 'languages', subcategoryId: 'spanish' },
      { id: 'learn4', categoryId: 'health', subcategoryId: 'yoga' },
      { id: 'learn1', categoryId: 'languages', subcategoryId: 'english' },
      { id: 'learn2', categoryId: 'creativity', subcategoryId: 'music' },
      { id: 'learn3', categoryId: 'languages', subcategoryId: 'spanish' },
      { id: 'learn4', categoryId: 'health', subcategoryId: 'yoga' }
    ]
  },
  {
    id: 'user3',
    name: 'Дмитрий',
    location: 'Новосибирск',
    age: 29,
    about: 'Эксперт по тайм-менеджменту и личной эффективности.',
    avatar: 'https://img.freepik.com/free-photo/adorable-cat-lifestyle_23-2151593350.jpg?semt=ais_hybrid&w=740',
    rating: 27,
    gender: 'male',
    createdAt: '2024-07-10T09:15:00Z',
    canTeach: {
      id: 'skill3',
      categoryId: 'business',
      subcategoryId: 'time-management',
      customName: 'Тайм-менеджмент'
    },
    wantToLearn: [
      { id: 'learn5', categoryId: 'education', subcategoryId: 'cognitive-techniques' }
    ]
  },
  {
    id: 'user4',
    name: 'Наталья',
    location: 'Казань',
    age: 31,
    about: 'HR-специалист. Помогаю с резюме и подготовкой к собеседованиям.',
    avatar: 'https://i.ytimg.com/vi/BDT3cHRyvCU/oardefault.jpg?sqp=-oaymwEkCJUDENAFSFqQAgHyq4qpAxMIARUAAAAAJQAAyEI9AICiQ3gB&amp;rs=AOn4CLAnDwX5phD_QwN4FM0Yq0fL-6abAg',
    rating: 31,
    gender: 'female',
    createdAt: '2024-09-05T16:20:00Z',
    canTeach: {
      id: 'skill4',
      categoryId: 'business',
      subcategoryId: 'resume',
      customName: 'Резюме'
    },
    wantToLearn: [
      { id: 'learn6', categoryId: 'home', subcategoryId: 'cooking' },
      { id: 'learn7', categoryId: 'languages', subcategoryId: 'german' }
    ]
  },
  {
    id: 'user5',
    name: 'Максим',
    location: 'Краснодар',
    age: 28,
    about: 'Специалист по личному бренду и SMM.',
    avatar: 'https://i.ytimg.com/vi/hgU4ApVb01Y/maxresdefault.jpg?sqp=-oaymwEmCIAKENAF8quKqQMa8AEB-AHUBoAC4AOKAgwIABABGGUgZShlMA8=&amp;rs=AOn4CLC_o8Xi1YeWj2W7qoVSmCjcEWpPEw',
    rating: 24,
    gender: 'male',
    createdAt: '2024-11-18T11:30:00Z',
    canTeach: {
      id: 'skill5',
      categoryId: 'business',
      subcategoryId: 'personal-brand',
      customName: 'Личный бренд'
    },
    wantToLearn: [
      { id: 'learn8', categoryId: 'creativity', subcategoryId: 'photography' }
    ]
  },
  {
    id: 'user6',
    name: 'Ирина',
    location: 'Екатеринбург',
    age: 34,
    about: 'Эксперт по продажам и переговорам. Тренирую навыки убеждения.',
    avatar: 'https://i.ytimg.com/vi/hgU4ApVb01Y/maxresdefault.jpg?sqp=-oaymwEmCIAKENAF8quKqQMa8AEB-AHUBoAC4AOKAgwIABABGGUgZShlMA8=&amp;rs=AOn4CLC_o8Xi1YeWj2W7qoVSmCjcEWpPEw',
    rating: 45,
    gender: 'female',
    createdAt: '2025-01-12T13:40:00Z',
    canTeach: {
      id: 'skill6',
      categoryId: 'business',
      subcategoryId: 'sales',
      customName: 'Продажи'
    },
    wantToLearn: [
      { id: 'learn9', categoryId: 'health', subcategoryId: 'mental-health' }
    ]
  },
  {
    id: 'user7',
    name: 'Павел',
    location: 'Ростов-на-Дону',
    age: 37,
    about: 'Директор по маркетингу. Обучаю стратегиям продвижения.',
    avatar: 'https://i.pinimg.com/736x/bf/00/bd/bf00bd9059e7878787893fa3e174bffd.jpg',
    rating: 41,
    gender: 'male',
    createdAt: '2025-03-28T08:50:00Z',
    canTeach: {
      id: 'skill7',
      categoryId: 'business',
      subcategoryId: 'marketing',
      customName: 'Маркетинг'
    },
    wantToLearn: [
      { id: 'learn10', categoryId: 'languages', subcategoryId: 'chinese' },
      { id: 'learn11', categoryId: 'creativity', subcategoryId: 'video-editing' }
    ]
  },
  {
    id: 'user8',
    name: 'Анна',
    location: 'Нижний Новгород',
    age: 33,
    about: 'Team Lead с опытом управления распределенными командами.',
    avatar: 'https://i.pinimg.com/videos/thumbnails/originals/a0/a0/a9/a0a0a92d972e0891c1662fe3cc97ddac.0000000.jpg',
    rating: 36,
    gender: 'female',
    createdAt: '2025-06-14T17:25:00Z',
    canTeach: {
      id: 'skill8',
      categoryId: 'business',
      subcategoryId: 'team-management',
      customName: 'Управление командой'
    },
    wantToLearn: [
      { id: 'learn12', categoryId: 'education', subcategoryId: 'coaching' }
    ]
  },

  // ========== ТВОРЧЕСТВО И ИСКУССТВО ==========
  {
    id: 'user9',
    name: 'Виктория',
    location: 'Москва',
    age: 27,
    about: 'Художник-иллюстратор. Работаю в digital и традиционных техниках.',
    avatar: 'https://img.freepik.com/free-photo/adorable-cat-lifestyle_23-2151593350.jpg?semt=ais_hybrid&w=740',
    rating: 29,
    gender: 'female',
    createdAt: '2024-04-02T12:10:00Z',
    canTeach: {
      id: 'skill9',
      categoryId: 'creativity',
      subcategoryId: 'drawing',
      customName: 'Иллюстрация'
    },
    wantToLearn: [
      { id: 'learn13', categoryId: 'business', subcategoryId: 'personal-brand' }
    ]
  },
  {
    id: 'user10',
    name: 'Сергей',
    location: 'Санкт-Петербург',
    age: 31,
    about: 'Профессиональный фотограф. Специализация - портрет и предметка.',
    avatar: 'https://i.ytimg.com/vi/BDT3cHRyvCU/oardefault.jpg?sqp=-oaymwEkCJUDENAFSFqQAgHyq4qpAxMIARUAAAAAJQAAyEI9AICiQ3gB&amp;rs=AOn4CLAnDwX5phD_QwN4FM0Yq0fL-6abAg',
    rating: 48,
    gender: 'male',
    createdAt: '2024-06-19T15:05:00Z',
    canTeach: {
      id: 'skill10',
      categoryId: 'creativity',
      subcategoryId: 'photography',
      customName: 'Портрет'
    },
    wantToLearn: [
      { id: 'learn14', categoryId: 'home', subcategoryId: 'plants' },
      { id: 'learn15', categoryId: 'languages', subcategoryId: 'italian' }
    ]
  },
  {
    id: 'user11',
    name: 'Кирилл',
    location: 'Казань',
    age: 26,
    about: 'Видеомонтажер. Работаю в Adobe Premiere Pro и DaVinci Resolve.',
    avatar: 'https://i.ytimg.com/vi/hgU4ApVb01Y/maxresdefault.jpg?sqp=-oaymwEmCIAKENAF8quKqQMa8AEB-AHUBoAC4AOKAgwIABABGGUgZShlMA8=&amp;rs=AOn4CLC_o8Xi1YeWj2W7qoVSmCjcEWpPEw',
    rating: 23,
    gender: 'male',
    createdAt: '2024-08-24T10:35:00Z',
    canTeach: {
      id: 'skill11',
      categoryId: 'creativity',
      subcategoryId: 'video-editing',
      customName: 'Видеомонтаж'
    },
    wantToLearn: [
      { id: 'learn16', categoryId: 'creativity', subcategoryId: 'music' },
      { id: 'learn17', categoryId: 'business', subcategoryId: 'marketing' }
    ]
  },
  {
    id: 'user12',
    name: 'Алина',
    location: 'Новосибирск',
    age: 24,
    about: 'Музыкант и вокалистка. Обучаю игре на гитаре и вокалу.',
    avatar: 'https://i.ytimg.com/vi/hgU4ApVb01Y/maxresdefault.jpg?sqp=-oaymwEmCIAKENAF8quKqQMa8AEB-AHUBoAC4AOKAgwIABABGGUgZShlMA8=&amp;rs=AOn4CLC_o8Xi1YeWj2W7qoVSmCjcEWpPEw',
    rating: 32,
    gender: 'female',
    createdAt: '2024-11-07T19:50:00Z',
    canTeach: {
      id: 'skill12',
      categoryId: 'creativity',
      subcategoryId: 'music',
      customName: 'Гитара'
    },
    wantToLearn: [
      { id: 'learn18', categoryId: 'education', subcategoryId: 'learning-skills' }
    ]
  },
  {
    id: 'user13',
    name: 'Дарья',
    location: 'Екатеринбург',
    age: 29,
    about: 'Актриса театра и кино. Преподаю актерское мастерство и сценическую речь.',
    avatar: 'https://i.pinimg.com/736x/bf/00/bd/bf00bd9059e7878787893fa3e174bffd.jpg',
    rating: 37,
    gender: 'female',
    createdAt: '2025-01-30T14:15:00Z',
    canTeach: {
      id: 'skill13',
      categoryId: 'creativity',
      subcategoryId: 'acting',
      customName: 'Актерское мастерство'
    },
    wantToLearn: [
      { id: 'learn19', categoryId: 'health', subcategoryId: 'mindfulness' },
      { id: 'learn20', categoryId: 'languages', subcategoryId: 'french' }
    ]
  },
  {
    id: 'user14',
    name: 'Егор',
    location: 'Красноярск',
    age: 30,
    about: 'Писатель и копирайтер. Обучаю креативному письму и сторителлингу.',
    avatar: 'https://i.pinimg.com/videos/thumbnails/originals/a0/a0/a9/a0a0a92d972e0891c1662fe3cc97ddac.0000000.jpg',
    rating: 26,
    gender: 'male',
    createdAt: '2025-04-12T09:40:00Z',
    canTeach: {
      id: 'skill14',
      categoryId: 'creativity',
      subcategoryId: 'creative-writing',
      customName: 'Сторителлинг'
    },
    wantToLearn: [
      { id: 'learn21', categoryId: 'business', subcategoryId: 'entrepreneurship' }
    ]
  },
  {
    id: 'user15',
    name: 'Ольга',
    location: 'Воронеж',
    age: 35,
    about: 'Арт-терапевт. Помогаю через творчество справляться со стрессом.',
    avatar: 'https://img.freepik.com/free-photo/adorable-cat-lifestyle_23-2151593350.jpg?semt=ais_hybrid&w=740',
    rating: 33,
    gender: 'female',
    createdAt: '2025-06-25T18:20:00Z',
    canTeach: {
      id: 'skill15',
      categoryId: 'creativity',
      subcategoryId: 'art-therapy',
      customName: 'Арт-терапия'
    },
    wantToLearn: [
      { id: 'learn22', categoryId: 'health', subcategoryId: 'mental-health' },
      { id: 'learn23', categoryId: 'home', subcategoryId: 'plants' }
    ]
  },
  {
    id: 'user16',
    name: 'Татьяна',
    location: 'Самара',
    age: 28,
    about: 'Мастер hand-made. Создаю декор и учу DIY.',
    avatar: 'https://i.ytimg.com/vi/BDT3cHRyvCU/oardefault.jpg?sqp=-oaymwEkCJUDENAFSFqQAgHyq4qpAxMIARUAAAAAJQAAyEI9AICiQ3gB&amp;rs=AOn4CLAnDwX5phD_QwN4FM0Yq0fL-6abAg',
    rating: 22,
    gender: 'female',
    createdAt: '2025-09-08T11:55:00Z',
    canTeach: {
      id: 'skill16',
      categoryId: 'creativity',
      subcategoryId: 'diy',
      customName: 'DIY'
    },
    wantToLearn: [
      { id: 'learn24', categoryId: 'business', subcategoryId: 'sales' }
    ]
  },

  // ========== ИНОСТРАННЫЕ ЯЗЫКИ ==========
  {
    id: 'user17',
    name: 'Елена',
    location: 'Москва',
    age: 29,
    about: 'Преподаватель английского с опытом 7 лет. Готовлю к IELTS.',
    avatar: 'https://i.ytimg.com/vi/hgU4ApVb01Y/maxresdefault.jpg?sqp=-oaymwEmCIAKENAF8quKqQMa8AEB-AHUBoAC4AOKAgwIABABGGUgZShlMA8=&amp;rs=AOn4CLC_o8Xi1YeWj2W7qoVSmCjcEWpPEw',
    rating: 51,
    gender: 'female',
    createdAt: '2024-02-14T08:30:00Z',
    canTeach: {
      id: 'skill17',
      categoryId: 'languages',
      subcategoryId: 'english',
      customName: 'Английский'
    },
    wantToLearn: [
      { id: 'learn25', categoryId: 'education', subcategoryId: 'teaching-skills' }
    ]
  },
  {
    id: 'user18',
    name: 'Марина',
    location: 'Санкт-Петербург',
    age: 32,
    about: 'Переводчик и преподаватель французского. Жила во Франции.',
    avatar: 'https://i.ytimg.com/vi/hgU4ApVb01Y/maxresdefault.jpg?sqp=-oaymwEmCIAKENAF8quKqQMa8AEB-AHUBoAC4AOKAgwIABABGGUgZShlMA8=&amp;rs=AOn4CLC_o8Xi1YeWj2W7qoVSmCjcEWpPEw',
    rating: 39,
    gender: 'female',
    createdAt: '2024-04-27T13:20:00Z',
    canTeach: {
      id: 'skill18',
      categoryId: 'languages',
      subcategoryId: 'french',
      customName: 'Французский'
    },
    wantToLearn: [
      { id: 'learn26', categoryId: 'creativity', subcategoryId: 'drawing' }
    ]
  },
  {
    id: 'user19',
    name: 'Карлос',
    location: 'Казань',
    age: 34,
    about: 'Носитель испанского языка. Преподаю испанский и латиноамериканскую культуру.',
    avatar: 'https://i.pinimg.com/736x/bf/00/bd/bf00bd9059e7878787893fa3e174bffd.jpg',
    rating: 47,
    gender: 'male',
    createdAt: '2024-07-03T10:45:00Z',
    canTeach: {
      id: 'skill19',
      categoryId: 'languages',
      subcategoryId: 'spanish',
      customName: 'Испанский'
    },
    wantToLearn: [
      { id: 'learn27', categoryId: 'business', subcategoryId: 'marketing' },
      { id: 'learn28', categoryId: 'home', subcategoryId: 'cooking' }
    ]
  },
  {
    id: 'user20',
    name: 'Анна',
    location: 'Новосибирск',
    age: 27,
    about: 'Преподаватель немецкого языка. Готовлю к Goethe-Zertifikat.',
    avatar: 'https://i.pinimg.com/videos/thumbnails/originals/a0/a0/a9/a0a0a92d972e0891c1662fe3cc97ddac.0000000.jpg',
    rating: 35,
    gender: 'female',
    createdAt: '2024-09-15T16:35:00Z',
    canTeach: {
      id: 'skill20',
      categoryId: 'languages',
      subcategoryId: 'german',
      customName: 'Немецкий'
    },
    wantToLearn: [
      { id: 'learn29', categoryId: 'health', subcategoryId: 'fitness' }
    ]
  },
  {
    id: 'user21',
    name: 'Иван',
    location: 'Владивосток',
    age: 30,
    about: 'Китаист. Жил в Пекине 3 года. Обучаю разговорному китайскому.',
    avatar: 'https://img.freepik.com/free-photo/adorable-cat-lifestyle_23-2151593350.jpg?semt=ais_hybrid&w=740',
    rating: 41,
    gender: 'male',
    createdAt: '2024-12-01T12:15:00Z',
    canTeach: {
      id: 'skill21',
      categoryId: 'languages',
      subcategoryId: 'chinese',
      customName: 'Китайский'
    },
    wantToLearn: [
      { id: 'learn30', categoryId: 'business', subcategoryId: 'entrepreneurship' }
    ]
  },
  {
    id: 'user22',
    name: 'Юлия',
    location: 'Екатеринбург',
    age: 26,
    about: 'Японист. Преподаю японский язык и готовлю к JLPT.',
    avatar: 'https://i.ytimg.com/vi/BDT3cHRyvCU/oardefault.jpg?sqp=-oaymwEkCJUDENAFSFqQAgHyq4qpAxMIARUAAAAAJQAAyEI9AICiQ3gB&amp;rs=AOn4CLAnDwX5phD_QwN4FM0Yq0fL-6abAg',
    rating: 33,
    gender: 'female',
    createdAt: '2025-02-18T19:10:00Z',
    canTeach: {
      id: 'skill22',
      categoryId: 'languages',
      subcategoryId: 'japanese',
      customName: 'Японский'
    },
    wantToLearn: [
      { id: 'learn32', categoryId: 'creativity', subcategoryId: 'drawing' }
    ]
  },
  {
    id: 'user23',
    name: 'Майкл',
    location: 'Москва',
    age: 38,
    about: 'Носитель английского. Эксперт по подготовке к TOEFL и IELTS.',
    avatar: 'https://i.ytimg.com/vi/hgU4ApVb01Y/maxresdefault.jpg?sqp=-oaymwEmCIAKENAF8quKqQMa8AEB-AHUBoAC4AOKAgwIABABGGUgZShlMA8=&amp;rs=AOn4CLC_o8Xi1YeWj2W7qoVSmCjcEWpPEw',
    rating: 54,
    gender: 'male',
    createdAt: '2025-05-09T14:50:00Z',
    canTeach: {
      id: 'skill23',
      categoryId: 'languages',
      subcategoryId: 'exam-prep',
      customName: 'IELTS/TOEFL'
    },
    wantToLearn: [
      { id: 'learn33', categoryId: 'education', subcategoryId: 'teaching-skills' },
      { id: 'learn34', categoryId: 'health', subcategoryId: 'nutrition' }
    ]
  },

  // ========== ОБРАЗОВАНИЕ И РАЗВИТИЕ ==========
  {
    id: 'user24',
    name: 'Светлана',
    location: 'Москва',
    age: 36,
    about: 'Коуч и психолог. Помогаю в личностном развитии и самореализации.',
    avatar: 'https://i.ytimg.com/vi/hgU4ApVb01Y/maxresdefault.jpg?sqp=-oaymwEmCIAKENAF8quKqQMa8AEB-AHUBoAC4AOKAgwIABABGGUgZShlMA8=&amp;rs=AOn4CLC_o8Xi1YeWj2W7qoVSmCjcEWpPEw',
    rating: 44,
    gender: 'female',
    createdAt: '2024-03-08T11:25:00Z',
    canTeach: {
      id: 'skill24',
      categoryId: 'education',
      subcategoryId: 'personal-development',
      customName: 'Личностный рост'
    },
    wantToLearn: [
      { id: 'learn35', categoryId: 'creativity', subcategoryId: 'art-therapy' }
    ]
  },
  {
    id: 'user25',
    name: 'Николай',
    location: 'Санкт-Петербург',
    age: 29,
    about: 'Специалист по эффективному обучению. Помогаю учиться быстрее.',
    avatar: 'https://i.pinimg.com/736x/bf/00/bd/bf00bd9059e7878787893fa3e174bffd.jpg',
    rating: 38,
    gender: 'male',
    createdAt: '2024-05-30T17:45:00Z',
    canTeach: {
      id: 'skill25',
      categoryId: 'education',
      subcategoryId: 'learning-skills',
      customName: 'Эффективное обучение'
    },
    wantToLearn: [
      { id: 'learn36', categoryId: 'languages', subcategoryId: 'german' },
      { id: 'learn37', categoryId: 'home', subcategoryId: 'repair' }
    ]
  },
  {
    id: 'user26',
    name: 'Евгения',
    location: 'Казань',
    age: 33,
    about: 'Нейропсихолог. Обучаю когнитивным техникам и мнемотехнике.',
    avatar: 'https://i.pinimg.com/videos/thumbnails/originals/a0/a0/a9/a0a0a92d972e0891c1662fe3cc97ddac.0000000.jpg',
    rating: 41,
    gender: 'female',
    createdAt: '2024-08-11T09:55:00Z',
    canTeach: {
      id: 'skill26',
      categoryId: 'education',
      subcategoryId: 'cognitive-techniques',
      customName: 'Когнитивные техники'
    },
    wantToLearn: [
      { id: 'learn38', categoryId: 'health', subcategoryId: 'yoga' }
    ]
  },
  {
    id: 'user27',
    name: 'Артем',
    location: 'Новосибирск',
    age: 31,
    about: 'Тренер по скорочтению и развитию памяти.',
    avatar: 'https://img.freepik.com/free-photo/adorable-cat-lifestyle_23-2151593350.jpg?semt=ais_hybrid&w=740',
    rating: 36,
    gender: 'male',
    createdAt: '2024-10-22T14:30:00Z',
    canTeach: {
      id: 'skill27',
      categoryId: 'education',
      subcategoryId: 'speed-reading',
      customName: 'Скорочтение'
    },
    wantToLearn: [
      { id: 'learn39', categoryId: 'creativity', subcategoryId: 'photography' }
    ]
  },
  {
    id: 'user28',
    name: 'Тамара',
    location: 'Екатеринбург',
    age: 45,
    about: 'Педагог с 20-летним стажем. Обучаю методикам преподавания.',
    avatar: 'https://i.ytimg.com/vi/BDT3cHRyvCU/oardefault.jpg?sqp=-oaymwEkCJUDENAFSFqQAgHyq4qpAxMIARUAAAAAJQAAyEI9AICiQ3gB&amp;rs=AOn4CLAnDwX5phD_QwN4FM0Yq0fL-6abAg',
    rating: 52,
    gender: 'female',
    createdAt: '2025-01-05T12:40:00Z',
    canTeach: {
      id: 'skill28',
      categoryId: 'education',
      subcategoryId: 'teaching-skills',
      customName: 'Методика преподавания'
    },
    wantToLearn: [
      { id: 'learn40', categoryId: 'languages', subcategoryId: 'english' }
    ]
  },
  {
    id: 'user29',
    name: 'Роман',
    location: 'Краснодар',
    age: 39,
    about: 'Профессиональный коуч (ICF). Помогаю в достижении целей.',
    avatar: 'https://i.ytimg.com/vi/hgU4ApVb01Y/maxresdefault.jpg?sqp=-oaymwEmCIAKENAF8quKqQMa8AEB-AHUBoAC4AOKAgwIABABGGUgZShlMA8=&amp;rs=AOn4CLC_o8Xi1YeWj2W7qoVSmCjcEWpPEw',
    rating: 43,
    gender: 'male',
    createdAt: '2025-03-19T16:15:00Z',
    canTeach: {
      id: 'skill29',
      categoryId: 'education',
      subcategoryId: 'coaching',
      customName: 'Коучинг'
    },
    wantToLearn: [
      { id: 'learn41', categoryId: 'business', subcategoryId: 'entrepreneurship' },
      { id: 'learn42', categoryId: 'health', subcategoryId: 'mindfulness' }
    ]
  },

  // ========== ДОМ И УЮТ ==========
  {
    id: 'user30',
    name: 'Надежда',
    location: 'Москва',
    age: 42,
    about: 'Эксперт по организации пространства. Помогаю с уборкой и систематизацией.',
    avatar: 'https://i.ytimg.com/vi/hgU4ApVb01Y/maxresdefault.jpg?sqp=-oaymwEmCIAKENAF8quKqQMa8AEB-AHUBoAC4AOKAgwIABABGGUgZShlMA8=&amp;rs=AOn4CLC_o8Xi1YeWj2W7qoVSmCjcEWpPEw',
    rating: 39,
    gender: 'female',
    createdAt: '2024-04-09T10:20:00Z',
    canTeach: {
      id: 'skill30',
      categoryId: 'home',
      subcategoryId: 'cleaning',
      customName: 'Организация пространства'
    },
    wantToLearn: [
      { id: 'learn43', categoryId: 'home', subcategoryId: 'plants' }
    ]
  },
  {
    id: 'user31',
    name: 'Виктор',
    location: 'Санкт-Петербург',
    age: 38,
    about: 'Финансовый консультант. Обучаю управлению личными финансами.',
    avatar: 'https://i.pinimg.com/736x/bf/00/bd/bf00bd9059e7878787893fa3e174bffd.jpg',
    rating: 44,
    gender: 'male',
    createdAt: '2024-06-25T15:50:00Z',
    canTeach: {
      id: 'skill31',
      categoryId: 'home',
      subcategoryId: 'home-finance',
      customName: 'Личные финансы'
    },
    wantToLearn: [
      { id: 'learn44', categoryId: 'business', subcategoryId: 'investments' }
    ]
  },
  {
    id: 'user32',
    name: 'Мария',
    location: 'Казань',
    age: 31,
    about: 'Шеф-повар. Обучаю приготовлению блюд разных кухонь мира.',
    avatar: 'https://i.pinimg.com/videos/thumbnails/originals/a0/a0/a9/a0a0a92d972e0891c1662fe3cc97ddac.0000000.jpg',
    rating: 47,
    gender: 'female',
    createdAt: '2024-09-13T18:05:00Z',
    canTeach: {
      id: 'skill32',
      categoryId: 'home',
      subcategoryId: 'cooking',
      customName: 'Кулинария'
    },
    wantToLearn: [
      { id: 'learn45', categoryId: 'creativity', subcategoryId: 'photography' },
      { id: 'learn46', categoryId: 'health', subcategoryId: 'nutrition' }
    ]
  },
  {
    id: 'user33',
    name: 'Елена',
    location: 'Новосибирск',
    age: 29,
    about: 'Ботаник и коллекционер редких растений.',
    avatar: 'https://img.freepik.com/free-photo/adorable-cat-lifestyle_23-2151593350.jpg?semt=ais_hybrid&w=740',
    rating: 35,
    gender: 'female',
    createdAt: '2024-11-28T13:30:00Z',
    canTeach: {
      id: 'skill33',
      categoryId: 'home',
      subcategoryId: 'plants',
      customName: 'Растения'
    },
    wantToLearn: [
      { id: 'learn47', categoryId: 'home', subcategoryId: 'diy' }
    ]
  },
  {
    id: 'user34',
    name: 'Григорий',
    location: 'Екатеринбург',
    age: 45,
    about: 'Мастер на все руки. Помогаю с ремонтом и строительством.',
    avatar: 'https://i.ytimg.com/vi/BDT3cHRyvCU/oardefault.jpg?sqp=-oaymwEkCJUDENAFSFqQAgHyq4qpAxMIARUAAAAAJQAAyEI9AICiQ3gB&amp;rs=AOn4CLAnDwX5phD_QwN4FM0Yq0fL-6abAg',
    rating: 48,
    gender: 'male',
    createdAt: '2025-02-10T11:40:00Z',
    canTeach: {
      id: 'skill34',
      categoryId: 'home',
      subcategoryId: 'repair',
      customName: 'Ремонт'
    },
    wantToLearn: [
      { id: 'learn48', categoryId: 'business', subcategoryId: 'entrepreneurship' }
    ]
  },
  {
    id: 'user35',
    name: 'Алиса',
    location: 'Краснодар',
    age: 27,
    about: 'Организатор пространства. Помогаю с хранением вещей и зонированием.',
    avatar: 'https://i.ytimg.com/vi/hgU4ApVb01Y/maxresdefault.jpg?sqp=-oaymwEmCIAKENAF8quKqQMa8AEB-AHUBoAC4AOKAgwIABABGGUgZShlMA8=&amp;rs=AOn4CLC_o8Xi1YeWj2W7qoVSmCjcEWpPEw',
    rating: 32,
    gender: 'female',
    createdAt: '2025-04-18T09:25:00Z',
    canTeach: {
      id: 'skill35',
      categoryId: 'home',
      subcategoryId: 'storage',
      customName: 'Хранение'
    },
    wantToLearn: [
      { id: 'learn49', categoryId: 'creativity', subcategoryId: 'diy' },
      { id: 'learn50', categoryId: 'home', subcategoryId: 'cleaning' }
    ]
  },

  // ========== ЗДОРОВЬЕ И ЛАЙФСТАЙЛ ==========
  {
    id: 'user36',
    name: 'Ирина',
    location: 'Москва',
    age: 34,
    about: 'Инструктор по йоге и медитации. Провожу ретриты.',
    avatar: 'https://i.ytimg.com/vi/hgU4ApVb01Y/maxresdefault.jpg?sqp=-oaymwEmCIAKENAF8quKqQMa8AEB-AHUBoAC4AOKAgwIABABGGUgZShlMA8=&amp;rs=AOn4CLC_o8Xi1YeWj2W7qoVSmCjcEWpPEw',
    rating: 46,
    gender: 'female',
    createdAt: '2024-03-21T08:55:00Z',
    canTeach: {
      id: 'skill36',
      categoryId: 'health',
      subcategoryId: 'yoga',
      customName: 'Йога'
    },
    wantToLearn: [
      { id: 'learn51', categoryId: 'education', subcategoryId: 'coaching' }
    ]
  },
  {
    id: 'user37',
    name: 'Денис',
    location: 'Санкт-Петербург',
    age: 33,
    about: 'Нутрициолог. Помогаю выстроить здоровое питание.',
    avatar: 'https://i.pinimg.com/736x/bf/00/bd/bf00bd9059e7878787893fa3e174bffd.jpg',
    rating: 41,
    gender: 'male',
    createdAt: '2024-05-17T14:35:00Z',
    canTeach: {
      id: 'skill37',
      categoryId: 'health',
      subcategoryId: 'nutrition',
      customName: 'Нутрициология'
    },
    wantToLearn: [
      { id: 'learn52', categoryId: 'home', subcategoryId: 'cooking' },
      { id: 'learn53', categoryId: 'health', subcategoryId: 'fitness' }
    ]
  },
  {
    id: 'user38',
    name: 'Антон',
    location: 'Казань',
    age: 36,
    about: 'Психолог-консультант. Помогаю с ментальным здоровьем и выгоранием.',
    avatar: 'https://i.pinimg.com/videos/thumbnails/originals/a0/a0/a9/a0a0a92d972e0891c1662fe3cc97ddac.0000000.jpg',
    rating: 49,
    gender: 'male',
    createdAt: '2024-07-29T19:45:00Z',
    canTeach: {
      id: 'skill38',
      categoryId: 'health',
      subcategoryId: 'mental-health',
      customName: 'Ментальное здоровье'
    },
    wantToLearn: [
      { id: 'learn54', categoryId: 'creativity', subcategoryId: 'art-therapy' },
      { id: 'learn55', categoryId: 'health', subcategoryId: 'mindfulness' }
    ]
  },
  {
    id: 'user39',
    name: 'Ксения',
    location: 'Новосибирск',
    age: 30,
    about: 'Преподаватель осознанности и медитации. Практикую майндфулнес.',
    avatar: 'https://img.freepik.com/free-photo/adorable-cat-lifestyle_23-2151593350.jpg?semt=ais_hybrid&w=740',
    rating: 38,
    gender: 'female',
    createdAt: '2024-10-11T12:10:00Z',
    canTeach: {
      id: 'skill39',
      categoryId: 'health',
      subcategoryId: 'mindfulness',
      customName: 'Майндфулнес'
    },
    wantToLearn: [
      { id: 'learn56', categoryId: 'languages', subcategoryId: 'sanskrit' }
    ]
  },
  {
    id: 'user40',
    name: 'Максим',
    location: 'Екатеринбург',
    age: 29,
    about: 'Фитнес-тренер. Специализация - функциональный тренинг.',
    avatar: 'https://i.ytimg.com/vi/BDT3cHRyvCU/oardefault.jpg?sqp=-oaymwEkCJUDENAFSFqQAgHyq4qpAxMIARUAAAAAJQAAyEI9AICiQ3gB&amp;rs=AOn4CLAnDwX5phD_QwN4FM0Yq0fL-6abAg',
    rating: 42,
    gender: 'male',
    createdAt: '2025-01-22T17:30:00Z',
    canTeach: {
      id: 'skill40',
      categoryId: 'health',
      subcategoryId: 'fitness',
      customName: 'Фитнес'
    },
    wantToLearn: [
      { id: 'learn57', categoryId: 'health', subcategoryId: 'nutrition' },
      { id: 'learn58', categoryId: 'business', subcategoryId: 'personal-brand' }
    ]
  },
  {
    id: 'user41',
    name: 'Евгения',
    location: 'Сочи',
    age: 32,
    about: 'Сомнолог. Помогаю наладить сон и восстановление.',
    avatar: 'https://i.ytimg.com/vi/hgU4ApVb01Y/maxresdefault.jpg?sqp=-oaymwEmCIAKENAF8quKqQMa8AEB-AHUBoAC4AOKAgwIABABGGUgZShlMA8=&amp;rs=AOn4CLC_o8Xi1YeWj2W7qoVSmCjcEWpPEw',
    rating: 37,
    gender: 'female',
    createdAt: '2025-04-04T15:20:00Z',
    canTeach: {
      id: 'skill41',
      categoryId: 'health',
      subcategoryId: 'sleep',
      customName: 'Сон'
    },
    wantToLearn: [
      { id: 'learn59', categoryId: 'health', subcategoryId: 'yoga' },
      { id: 'learn60', categoryId: 'home', subcategoryId: 'plants' }
    ]
  },
  {
    id: 'user42',
    name: 'Анастасия',
    location: 'Москва',
    age: 35,
    about: 'Коуч по балансу жизни и работы. Помогаю найти гармонию.',
    avatar: 'https://i.ytimg.com/vi/hgU4ApVb01Y/maxresdefault.jpg?sqp=-oaymwEmCIAKENAF8quKqQMa8AEB-AHUBoAC4AOKAgwIABABGGUgZShlMA8=&amp;rs=AOn4CLC_o8Xi1YeWj2W7qoVSmCjcEWpPEw',
    rating: 40,
    gender: 'female',
    createdAt: '2025-06-30T10:50:00Z',
    canTeach: {
      id: 'skill42',
      categoryId: 'health',
      subcategoryId: 'work-life-balance',
      customName: 'Баланс'
    },
    wantToLearn: [
      { id: 'learn61', categoryId: 'education', subcategoryId: 'coaching' },
      { id: 'learn62', categoryId: 'creativity', subcategoryId: 'music' }
    ]
  },
    {
    id: 'user43',
    name: 'Анна',
    location: 'Москва',
    age: 35,
    about: 'Коуч по балансу жизни и работы. Помогаю найти гармонию.',
    avatar: 'https://i.ytimg.com/vi/hgU4ApVb01Y/maxresdefault.jpg?sqp=-oaymwEmCIAKENAF8quKqQMa8AEB-AHUBoAC4AOKAgwIABABGGUgZShlMA8=&amp;rs=AOn4CLC_o8Xi1YeWj2W7qoVSmCjcEWpPEw',
    rating: 40,
    gender: 'female',
    createdAt: '2025-06-30T10:50:00Z',
    canTeach: {
      id: 'skill42',
      categoryId: 'health',
      subcategoryId: 'work-life-balance',
      customName: 'Баланс'
    },
    wantToLearn: [
      { id: 'learn61', categoryId: 'education', subcategoryId: 'coaching' },
      { id: 'learn62', categoryId: 'creativity', subcategoryId: 'music' }
    ]
  },
    {
    id: 'user44',
    name: 'Лиза',
    location: 'Москва',
    age: 35,
    about: 'Коуч по балансу жизни и работы. Помогаю найти гармонию.',
    avatar: 'https://i.ytimg.com/vi/hgU4ApVb01Y/maxresdefault.jpg?sqp=-oaymwEmCIAKENAF8quKqQMa8AEB-AHUBoAC4AOKAgwIABABGGUgZShlMA8=&amp;rs=AOn4CLC_o8Xi1YeWj2W7qoVSmCjcEWpPEw',
    rating: 40,
    gender: 'female',
    createdAt: '2025-06-30T10:50:00Z',
    canTeach: {
      id: 'skill42',
      categoryId: 'health',
      subcategoryId: 'work-life-balance',
      customName: 'Баланс'
    },
    wantToLearn: [
      { id: 'learn61', categoryId: 'education', subcategoryId: 'coaching' },
      { id: 'learn62', categoryId: 'creativity', subcategoryId: 'music' }
    ]
  }
];