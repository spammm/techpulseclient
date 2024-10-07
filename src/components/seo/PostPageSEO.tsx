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
}

export const PostPageSEO: React.FC<PostPageSEOProps> = ({
  title,
  description,
  keywords,
  url,
  image,
  authorName,
  publishedAt,
}) => {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'NewsArticle',
    headline: title,
    image: image || '/png/logo-color.png',
    url: url,
    datePublished: publishedAt,
    dateModified: publishedAt,
    author: {
      '@type': 'Person',
      name: authorName || 'John Doe',
    },
    publisher: {
      '@type': 'Organization',
      name: 'ТехПульс',
      url: process.env.NEXT_PUBLIC_SITE_URL,
      logo: {
        '@type': 'ImageObject',
        url: image || '/png/logo-color.png',
      },
    },
    description: description,
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
        image={image || '/png/logo-color.png'}
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
