export const TEST_NOTIFICATIONS = {
  unread: [
    {
      id: '1',
      type: 'offer',
      title: 'Новое предложение',
      message: 'Татьяна предлагает вам обмен',
      createdAt: new Date(Date.now() - 1000 * 60 * 5).toISOString(), // 5 минут назад
      link: '/offer/123',
    },
    {
      id: '2',
      type: 'acceptOffer',
      title: 'Предложение принято',
      message: 'Николай принял ваш обмен',
      createdAt: new Date(Date.now() - 1000 * 60 * 30).toISOString(), // 30 минут назад
      link: '/exchange/456',
    },
    {
      id: '3',
      type: 'offer',
      title: 'Новое предложение',
      message: 'Татьяна предлагает вам обмен',
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(), // 2 часа назад
      link: '/offer/789',
    },
  ],
  read: [
    {
      id: '4',
      type: 'offer',
      title: 'Предложение',
      message: 'Иван предлагает вам обмен',
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(), // вчера
      link: '/offer/111',
    },
    {
      id: '5',
      type: 'acceptOffer',
      title: 'Предложение принято!',
      message: 'Ольга приняла ваше предложение',
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString(), // 2 дня назад
      link: '/exchange/222',
    },
  ],
};