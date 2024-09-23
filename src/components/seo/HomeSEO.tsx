import { MetaTags } from '@/components/seo'; // Импортируем компонент MetaTags

export const HomeSEO: React.FC = () => {
  const NEXT_PUBLIC_SITE_URL =
    process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

  return (
    <MetaTags
      title="Портал технических новостей"
      description="Ваш источник последних технических новостей и будущих разработок"
      keywords="технологии, новости, разработки, гаджеты, IT, новости технологий, последние технологии, самые новые технологии"
      url={NEXT_PUBLIC_SITE_URL}
      image={`${NEXT_PUBLIC_SITE_URL}/android-chrome-192x192.png`}
      type="website"
    />
  );
};

export default HomeSEO;
