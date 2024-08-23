interface ItestMapping {
  [key: string]: {
    icon: string;
    displayName: string;
  };
}
export const tagsMapping: ItestMapping = {
  news: {
    icon: '/icons/news.svg',
    displayName: 'Новости',
  },
  industry: {
    icon: '/icons/industry.svg',
    displayName: 'Промышленность',
  },
  factory: {
    icon: '/icons/industry.svg',
    displayName: 'Барнаульский завод АТИ',
  },
  aviation: {
    icon: '/icons/aviation.svg',
    displayName: 'Авиация',
  },
  roselectronica: {
    icon: '/icons/electronics.svg',
    displayName: 'Росэлектроника',
  },
  transport: {
    icon: '/icons/transport.svg',
    displayName: 'Транспорт',
  },
  moscow: {
    icon: '/icons/town.svg',
    displayName: 'Москва',
  },
};
