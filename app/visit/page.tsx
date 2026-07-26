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
    description: seo.description || 'Find Chai Days near you in Bengaluru — outlets at Koramangala, BTM Layout, Bellandur (near Cessna Business Park), Haralur, and Electronic City. Open daily from 7 AM.',
    keywords: seo.keywords || [
      'chai days locations', 'chai café koramangala', 'chai café btm layout',
      'chai days bellandur', 'chai days haralur', 'chai days electronic city',
      'tea café bengaluru locations', 'chai shop near me bengaluru',
    ],
    alternates: { canonical: seo.canonical || 'https://chaidays.vercel.app/visit' },
    openGraph: {
      title: seo.title || 'Visit Us | Chai Days — Bengaluru',
      description: 'Multiple Chai Days outlets across Bengaluru — Koramangala, BTM Layout, Bellandur, Haralur & Electronic City. Open daily from 7 AM to 1 AM.',
      url: seo.canonical || 'https://chaidays.vercel.app/visit',
      images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: 'Visit Chai Days — Bengaluru Locations' }],
    },
    twitter: {
      card: 'summary_large_image',
      title: seo.title || 'Visit Us | Chai Days',
      description: 'Find your nearest Chai Days in Bengaluru. Open daily.',
    },
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

  // Build per-outlet LocalBusiness JSON-LD for Google Maps rich results
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    'name': 'Chai Days Outlets in Bengaluru',
    'description': 'All Chai Days café locations in Bengaluru, Karnataka, India.',
    'numberOfItems': outlets.length,
    'itemListElement': outlets.map((outlet: any, index: number) => ({
      '@type': 'ListItem',
      'position': index + 1,
      'item': {
        '@type': ['CafeOrCoffeeShop', 'Restaurant', 'LocalBusiness'],
        'name': outlet.name?.trim(),
        'description': `${outlet.name?.trim()} — Chai Days artisan chai café in Bengaluru serving handcrafted masala chai, specialty beverages, and snacks.`,
        'url': `https://chaidays.vercel.app/visit`,
        'telephone': outlet.phone ? `+91${outlet.phone.replace(/\D/g, '').slice(-10)}` : undefined,
        'image': outlet.img || 'https://chaidays.vercel.app/og-image.jpg',
        'address': {
          '@type': 'PostalAddress',
          'streetAddress': outlet.address,
          'addressLocality': 'Bengaluru',
          'addressRegion': 'Karnataka',
          'postalCode': outlet.address?.match(/\d{6}/)?.[0] || '560001',
          'addressCountry': 'IN',
        },
        'geo': {
          '@type': 'GeoCoordinates',
          'latitude': 12.9716,
          'longitude': 77.5946,
        },
        'hasMap': outlet.mapUrl,
        'openingHours': outlet.hours
          ? [outlet.hours.replace(/Daily\s*:?\s*/i, 'Mo-Su ').replace(/\s*–\s*/, '-')]
          : ['Mo-Su 07:00-01:00'],
        'priceRange': '₹',
        'servesCuisine': ['Indian Chai', 'Masala Chai', 'Tea', 'Coffee', 'Beverages'],
        'menu': 'https://chaidays.vercel.app/menu',
        'currenciesAccepted': 'INR',
        'paymentAccepted': 'Cash, Credit Card, UPI, Debit Card',
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <VisitClient contentData={contentData} outlets={outlets} />
    </>
  );
}
