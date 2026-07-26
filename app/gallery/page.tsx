import type { Metadata } from 'next';
import GalleryClient from './GalleryClient';
import { getSiteData } from '@/lib/data';

export const revalidate = 0;

export async function generateMetadata(): Promise<Metadata> {
  let seo: any = {};
  try {
    const data = await getSiteData();
    seo = data?.pages?.gallery?.seo || {};
  } catch (e) {}

  return {
    title: seo.title || 'Visual Journal',
    description: seo.description || 'Browse the Chai Days visual journal — beautiful moments from our chai cafés across Bengaluru. Sips, spaces, and stories from Koramangala, BTM Layout, Bellandur, Haralur & Electronic City.',
    keywords: seo.keywords || ['chai days gallery', 'chai café photos', 'bengaluru café interiors', 'chai days photos', 'café vibes bengaluru'],
    alternates: { canonical: seo.canonical || 'https://chaidays.vercel.app/gallery' },
    openGraph: {
      title: seo.title || 'Visual Journal | Chai Days — Bengaluru',
      description: seo.description || 'Beautiful chai moments, cozy interiors, and artisan beverages from Chai Days cafés across Bengaluru.',
      url: seo.canonical || 'https://chaidays.vercel.app/gallery',
      images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: 'Chai Days Visual Journal — Bengaluru' }],
    },
    twitter: {
      card: 'summary_large_image',
      title: seo.title || 'Visual Journal | Chai Days',
      description: seo.description || 'Beautiful chai moments and cozy interiors from Chai Days Bengaluru.',
    },
  };
}

export default async function GalleryPage() {
  let contentData: any = {};
  try {
    const data = await getSiteData();
    contentData = data?.pages?.gallery?.content || {};
  } catch (e) {
    console.error(e);
  }

  return <GalleryClient contentData={contentData} />;
}
