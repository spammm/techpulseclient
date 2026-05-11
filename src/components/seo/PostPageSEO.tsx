import { MetaTags } from '@/components/seo';
import Script from 'next/script';

interface PostPageSEOProps {
  title: string;
  description: string;
  keywords?: string;
  url: string;
  image?: string;
  authorName?: string;
  publishedAt: string;
  modifiedAt?: string;
  tags?: string[];
}

export const PostPageSEO: React.FC<PostPageSEOProps> = ({
  title,
  description,
  keywords,
  url,
  image,
  authorName,
  publishedAt,
  modifiedAt,
  tags = [],
}) => {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
  const fallbackImage = `${siteUrl}/png/logo-color.png`;
  const articleImage = image || fallbackImage;
  const publisherLogo = `${siteUrl}/logo-color-192x192.png`;

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'NewsArticle',
    headline: title,
    description,
    image: [articleImage],
    url,
    datePublished: publishedAt,
    dateModified: modifiedAt || publishedAt,
    inLanguage: 'ru-RU',
    keywords: tags.length > 0 ? tags.join(', ') : keywords,
    articleSection: tags,
    author: {
      '@type': 'Person',
      name: authorName || 'Редакция TechPulse',
    },
    publisher: {
      '@type': 'Organization',
      name: 'TechPulse',
      alternateName: 'ТехПульс',
      url: siteUrl,
      logo: {
        '@type': 'ImageObject',
        url: publisherLogo,
        width: 192,
        height: 192,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': url,
    },
  };

  return (
    <>
      <MetaTags
        title={title}
        description={description}
        keywords={keywords}
        url={url}
        authorName={authorName}
        type="article"
        image={articleImage}
        publishedAt={publishedAt}
        modifiedAt={modifiedAt || publishedAt}
        tags={tags}
      />
      <Script
        type="application/ld+json"
        id="structured-data"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
    </>
  );
};

export default PostPageSEO;
