import { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const secret = req.headers['x-sitemap-secret'];

  if (!secret || secret !== process.env.NEXT_PUBLIC_SITEMAP_SECRET) {
    return res.status(403).json({ error: 'Forbidden' });
  }

  res.status(200).json({ message: 'Sitemap cache is disabled' });
}
