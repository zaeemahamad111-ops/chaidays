import type { Metadata } from 'next';
import VisitClient from './VisitClient';
import { getSiteData } from '@/lib/data';

export const revalidate = 0;

export async function generateMetadata(): Promise<Metadata> {
  let seo: any = {};
  try {
    const data = await getSiteData();
      seo = data?.pages?.visit?.seo || {};
  } catch (e) {}

  return {
    title: seo.title || 'Visit Us',
    description: seo.description || 'Find Chai Days at Stone Harbor.',
    keywords: seo.keywords || [],
    openGraph: { title: seo.title || 'Visit Us | Chai Days', url: seo.canonical || 'https://chaidays.com/visit' },
  };
}

export default async function VisitPage() {
  let contentData: any = {};
  let outlets: any[] = [];
  try {
    const data = await getSiteData();
    contentData = data?.pages?.visit?.content || {};
    outlets = data?.outlets || [];
  } catch (e) {
    console.error(e);
  }

  return <VisitClient contentData={contentData} outlets={outlets} />;
}
