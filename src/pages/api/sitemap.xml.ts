import { NextApiRequest, NextApiResponse } from 'next';
import cache from 'memory-cache';
import { getPublishedPosts } from '@/api/postsApi';

interface SitemapEntry {
  loc: string;
  lastmod?: string;
  changefreq?: string;
  priority?: string;
}

async function generateSitemap(): Promise<string> {
  let page = 1;
  let hasMore = true;
  const postUrls: SitemapEntry[] = [];

  while (hasMore) {
    const { posts, totalPages } = await getPublishedPosts(page, [], 100);
    const postPageUrls: SitemapEntry[] = posts.map((post) => ({
      loc: `${process.env.NEXT_PUBLIC_SITE_URL}/news/${post.url}`,
      lastmod: new Date(post.updatedAt).toISOString().split('T')[0],
      changefreq: 'monthly',
      priority: '0.7',
    }));
    postUrls.push(...postPageUrls);

    if (page >= totalPages) {
      hasMore = false;
    } else {
      page++;
    }
  }

  const staticPages: SitemapEntry[] = [
    {
      loc: `${process.env.NEXT_PUBLIC_SITE_URL}`,
      changefreq: 'hourly',
      priority: '1.0',
    },
    {
      loc: `${process.env.NEXT_PUBLIC_SITE_URL}/about`,
      changefreq: 'yearly',
      priority: '0.8',
    },
    {
      loc: `${process.env.NEXT_PUBLIC_SITE_URL}/news`,
      changefreq: 'hourly',
      priority: '0.9',
    },
    {
      loc: `${process.env.NEXT_PUBLIC_SITE_URL}/search`,
      changefreq: 'monthly',
      priority: '0.9',
    },
  ];

  const allPages = [...staticPages, ...postUrls];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    ${allPages
      .map(({ loc, lastmod, changefreq, priority }) => {
        return `
        <url>
          <loc>${loc}</loc>
          ${lastmod ? `<lastmod>${lastmod}</lastmod>` : ''}
          ${changefreq ? `<changefreq>${changefreq}</changefreq>` : ''}
          ${priority ? `<priority>${priority}</priority>` : ''}
        </url>
      `;
      })
      .join('')}
  </urlset>`;

  return sitemap;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const cachedSitemap = cache.get('sitemap');
    if (cachedSitemap) {
      res.setHeader('Content-Type', 'application/xml');
      return res.status(200).send(cachedSitemap);
    }

    // Генерируем новый sitemap
    const sitemap = await generateSitemap();

    // Кэшируем результат на сутки
    cache.put('sitemap', sitemap, 1000 * 60 * 60 * 24);

    res.setHeader('Content-Type', 'application/xml');
    res.status(200).send(sitemap);
  } catch (error) {
    console.error('Failed to serve sitemap:', error);
    res.status(500).json({ error: 'Failed to serve sitemap' });
  }
}
