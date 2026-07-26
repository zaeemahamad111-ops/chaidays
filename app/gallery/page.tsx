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
  let galleryItems: any[] = [];
  try {
    const data = await getSiteData();
    contentData = data?.pages?.gallery?.content || {};
    galleryItems = data?.gallery || [];
  } catch (e) {
    console.error(e);
  }

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'CollectionPage',
        '@id': 'https://chaidays.vercel.app/gallery/#collectionpage',
        'url': 'https://chaidays.vercel.app/gallery',
        'name': 'Visual Journal | Chai Days — Bengaluru',
        'description': 'A curated visual journal of Chai Days cafés — beautiful spaces, artisan chai, and cozy moments across Bengaluru.',
        'inLanguage': 'en-IN',
        'breadcrumb': {
          '@type': 'BreadcrumbList',
          'itemListElement': [
            { '@type': 'ListItem', 'position': 1, 'name': 'Home', 'item': 'https://chaidays.vercel.app' },
            { '@type': 'ListItem', 'position': 2, 'name': 'Visual Journal', 'item': 'https://chaidays.vercel.app/gallery' },
          ],
        },
      },
      {
        '@type': 'ImageGallery',
        'name': 'Chai Days Visual Journal — Bengaluru',
        'description': 'Gallery of artisan chai beverages, café interiors, and cozy moments from Chai Days outlets across Bengaluru.',
        'url': 'https://chaidays.vercel.app/gallery',
        'author': { '@type': 'Organization', 'name': 'Chai Days' },
        'provider': { '@type': 'Organization', 'name': 'Chai Days', 'url': 'https://chaidays.vercel.app' },
        'about': {
          '@type': 'CafeOrCoffeeShop',
          'name': 'Chai Days',
          'url': 'https://chaidays.vercel.app',
          'servesCuisine': ['Indian Chai', 'Masala Chai', 'Tea', 'Coffee'],
          'address': {
            '@type': 'PostalAddress',
            'addressLocality': 'Bengaluru',
            'addressRegion': 'Karnataka',
            'addressCountry': 'IN',
          },
        },
        'hasPart': galleryItems.slice(0, 20).map((item: any, i: number) => ({
          '@type': 'ImageObject',
          'position': i + 1,
          'name': item.alt || item.label || `Chai Days — ${item.category || 'café'} photo`,
          'description': item.alt || `${item.category || 'Chai Days'} — artisan chai café in Bengaluru`,
          'url': item.img,
          'contentUrl': item.img,
          'thumbnail': item.img,
          'author': { '@type': 'Organization', 'name': 'Chai Days' },
          'copyrightHolder': { '@type': 'Organization', 'name': 'Chai Days' },
        })).filter((item: any) => item.url),
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <GalleryClient contentData={contentData} />
    </>
  );
}
