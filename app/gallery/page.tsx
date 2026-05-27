import type { Metadata } from 'next';
import GalleryClient from './GalleryClient';
import { getSiteData } from '@/lib/data';

export const revalidate = 0;

export async function generateMetadata(): Promise<Metadata> {
  let seo: any = {};
  try {
    const filePath = path.join(process.cwd(), 'data', 'content.json');
    const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    seo = data.pages?.gallery?.seo || {};
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
  try {
    const filePath = path.join(process.cwd(), 'data', 'content.json');
    const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    contentData = data.pages?.gallery?.content || {};
  } catch (e) {
    console.error(e);
  }

  return <GalleryClient contentData={contentData} />;
}
