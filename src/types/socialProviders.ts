// Общие интерфейсы для всех провайдеров
interface BaseProfile {
  email?: string;
  name?: string;
  picture?: string;
}

// Интерфейс для VK профиля
export interface VKProfile {
  response: Array<{
    id: number;
    first_name: string;
    last_name: string;
    photo_100: string;
    can_access_closed?: boolean;
    is_closed?: boolean;
  }>;
}

// Интерфейс для Google профиля
export interface GoogleProfile extends BaseProfile {
  given_name: string;
  family_name: string;
  picture: string;
}

// Интерфейс для Yandex профиля
export interface YandexProfile extends BaseProfile {
  first_name: string;
  last_name: string;
  real_name?: string;
  display_name?: string;
  default_email: string;
  emails: string[];
}
