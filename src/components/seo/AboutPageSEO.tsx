import { MetaTags } from '@/components/seo';

const NEXT_PUBLIC_SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

export const AboutPageSEO: React.FC = () => (
  <>
    <MetaTags
      title="О нас | ТехПульс"
      description="Узнайте больше о команде ТехПульс и нашей миссии."
      url={`${NEXT_PUBLIC_SITE_URL}/about`}
      image={`${NEXT_PUBLIC_SITE_URL}/png/logo-color.png`}
      type="website"
    />
    <script type="application/ld+json">
      {JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'Organization',
        name: 'TechPulse',
        url: NEXT_PUBLIC_SITE_URL,
        logo: {
          '@type': 'ImageObject',
          url: `${NEXT_PUBLIC_SITE_URL}/png/logo-color.png`,
        },
        contactPoint: {
          '@type': 'ContactPoint',
          email: 'info@techpulse.com',
          contactType: 'customer service',
          areaServed: 'RU',
          availableLanguage: 'Russian',
        },
        sameAs: ['https://t.me/tekhulse'],
      })}
    </script>
  </>
);

export default AboutPageSEO;
