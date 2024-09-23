import Head from 'next/head';

interface SearchPageSEOProps {
  title: string;
  description: string;
  keywords?: string;
  url: string;
  image?: string;
}

export const SearchPageSEO: React.FC<SearchPageSEOProps> = ({
  title,
  description,
  keywords,
  url,
  image,
}) => {
  return (
    <Head>
      <title>{`${title} | ТехПульс`}</title>
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content="website" />
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

export default SearchPageSEO;
