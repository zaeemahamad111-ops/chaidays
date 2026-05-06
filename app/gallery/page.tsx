import type { Metadata } from 'next';
import GalleryClient from './GalleryClient';

export const metadata: Metadata = {
  title: 'Visual Journal',
  description: 'Browse the Chai Days visual journal — intimate moments of artisan chai rituals, curated café spaces, and handcrafted desserts.',
  openGraph: { title: 'Visual Journal | Chai Days', url: 'https://chaidays.com/gallery' },
};

export default function GalleryPage() {
  return <GalleryClient />;
}
