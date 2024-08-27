import { NextApiRequest, NextApiResponse } from 'next';
import cache from 'memory-cache';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const secret = req.headers['x-sitemap-secret'];

  if (!secret || secret !== process.env.NEXT_PUBLIC_SITEMAP_SECRETT) {
    return res.status(403).json({ error: 'Forbidden' });
  }

  cache.del('sitemap');

  res.status(200).json({ message: 'Sitemap cache cleared' });
}
