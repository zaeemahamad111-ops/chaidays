import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://chaidays.com';
  const pages = ['', '/about', '/menu', '/gallery', '/experience', '/visit'];

  return pages.map((path) => ({
    url: `${baseUrl}${path}`,
    lastModified: new Date('2025-05-05'),
    changeFrequency: 'monthly' as const,
    priority: path === '' ? 1 : 0.8,
  }));
}
