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
    description: seo.description || 'Browse the Chai Days visual journal.',
    keywords: seo.keywords || [],
    openGraph: { title: seo.title || 'Visual Journal | Chai Days', url: seo.canonical || 'https://chaidays.com/gallery' },
  };
}

export default async function GalleryPage() {
  let contentData: any = {};
  let gallery: any[] = [];
  try {
    const data = await getSiteData();
    contentData = data?.pages?.gallery?.content || {};
    gallery = data?.gallery || [];
  } catch (e) {
    console.error(e);
  }

  return <GalleryClient contentData={contentData} initialGallery={gallery} />;
}
