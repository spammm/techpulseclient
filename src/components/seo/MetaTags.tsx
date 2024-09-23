import Head from 'next/head';

interface MetaTagsProps {
  title: string;
  description: string;
  keywords?: string;
  authorName?: string;
  url: string;
  image?: string;
  type?: 'article' | 'website';
}

export const MetaTags: React.FC<MetaTagsProps> = ({
  title,
  description,
  keywords,
  authorName,
  url,
  image,
  type = 'website',
}) => {
  return (
    <Head>
      <title>{`${title} | ТехПульс`}</title>
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      {authorName && <meta name="author" content={authorName} />}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={type} />
      <meta property="og:url" content={url} />
      {image && <meta property="og:image" content={image} />}
      <meta property="og:site_name" content="ТехПульс" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      {image && <meta name="twitter:image" content={image} />}
    </Head>
  );
};

export default MetaTags;
