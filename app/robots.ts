import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/cms', '/api/', '/_next/'],
      },
      {
        userAgent: 'Googlebot',
        allow: '/',
        disallow: ['/cms', '/api/'],
      },
    ],
    sitemap: 'https://chaidays.vercel.app/sitemap.xml',
    host: 'https://chaidays.vercel.app',
  };
}
