import { NextApiRequest, NextApiResponse } from 'next';
import { getPublishedPosts } from '@/api/postsApi';

const RSS = (posts: any[]) => `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0" xmlns:turbo="http://turbo.yandex.ru">
<channel>
  <title>TechPulse</title>
  <link>${process.env.NEXT_PUBLIC_SITE_URL}</link>
  <description>Ваш источник последних технических новостей и будущих разработок</description>
  <language>ru</language>
  ${posts
    .map(
      (post) => `
    <item turbo="true">
      <title><![CDATA[${post.title}]]></title>
      <link>${process.env.NEXT_PUBLIC_SITE_URL}/news/${post.url}</link>
      <description><![CDATA[${
        post.description || post.content.substring(0, 200)
      }]]></description>
      <pubDate>${new Date(post.publishedAt).toUTCString()}</pubDate>
      <guid>${process.env.NEXT_PUBLIC_SITE_URL}/news/${post.url}</guid>
      <turbo:content><![CDATA[
        <header>
          <h1>${post.title}</h1>
        </header>
        ${post.content}
      ]]></turbo:content>
    </item>
  `
    )
    .join('')}
</channel>
</rss>`;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const posts = await getPublishedPosts(1, [], 100);
  const xml = RSS(posts.posts);

  res.setHeader('Content-Type', 'text/xml');
  res.setHeader('Cache-Control', 'public, max-age=3600, must-revalidate');

  res.status(200).send(xml);
}
