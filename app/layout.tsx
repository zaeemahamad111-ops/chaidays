import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SplashScreen from "@/components/SplashScreen";
import { getSiteData } from '@/lib/data';

const BASE_URL = 'https://chaidays.vercel.app';

export async function generateMetadata(): Promise<Metadata> {
  let seo = {
    title: 'Chai Days | Best Chai Café in Bengaluru',
    description: 'Chai Days is Bengaluru\'s premium artisan chai café — handcrafted masala chai, specialty teas, and cozy spaces at Koramangala, BTM Layout, Bellandur, Haralur & Electronic City.',
    keywords: [
      'chai café bengaluru', 'best chai in bengaluru', 'masala chai bengaluru',
      'chai days koramangala', 'chai days btm layout', 'chai days bellandur',
      'chai days electronic city', 'artisan tea café bengaluru', 'tea house bengaluru',
      'specialty chai', 'café near me bengaluru', 'chai days haralur',
    ]
  };

  try {
    const data = await getSiteData();
    if (data?.seo) seo = { ...seo, ...data.seo };
  } catch (error) {
    console.error("Error loading SEO data:", error);
  }

  return {
    metadataBase: new URL(BASE_URL),
    title: {
      default: seo.title,
      template: '%s | Chai Days — Bengaluru\'s Premier Chai Café',
    },
    description: seo.description,
    keywords: seo.keywords,
    authors: [{ name: 'Chai Days', url: BASE_URL }],
    creator: 'Chai Days',
    publisher: 'Chai Days',
    category: 'Food & Beverage',
    alternates: {
      canonical: BASE_URL,
    },
    openGraph: {
      type: 'website',
      locale: 'en_IN',
      url: BASE_URL,
      siteName: 'Chai Days',
      title: seo.title,
      description: seo.description,
      images: [
        {
          url: `${BASE_URL}/og-image.jpg`,
          secureUrl: `${BASE_URL}/og-image.jpg`,
          width: 1200,
          height: 630,
          alt: 'Chai Days — Bengaluru\'s Best Artisan Chai Café',
          type: 'image/jpeg',
        }
      ],
    },
    twitter: {
      card: 'summary_large_image',
      site: '@chaidaysofficial',
      creator: '@chaidaysofficial',
      title: seo.title,
      description: seo.description,
      images: [`${BASE_URL}/og-image.jpg`],
    },
    robots: {
      index: true,
      follow: true,
      nocache: false,
      googleBot: {
        index: true,
        follow: true,
        noimageindex: false,
        'max-image-preview': 'large',
        'max-snippet': -1,
        'max-video-preview': -1,
      },
    },
    verification: {
      google: 'chai-days-google-site-verification',
    },
    other: {
      'geo.region': 'IN-KA',
      'geo.placename': 'Bengaluru, Karnataka, India',
      'geo.position': '12.9716;77.5946',
      'ICBM': '12.9716, 77.5946',
    },
  };
}

// Build the full JSON-LD schema from live data
async function buildJsonLd() {
  let outlets: any[] = [];
  let socials: any = {};
  try {
    const data = await getSiteData();
    outlets = data?.outlets || [];
    socials = data?.socials || {};
  } catch (e) {}

  const sameAs = [
    socials.instagram,
    socials.linkedin,
    'https://www.zomato.com/bangalore/chai-days',
    'https://www.swiggy.com/restaurants/chai-days',
  ].filter(Boolean);

  // Build branch schemas from real outlet data
  const branches = outlets.map((outlet: any) => ({
    '@type': ['CafeOrCoffeeShop', 'Restaurant'],
    'name': outlet.name?.trim(),
    'description': `${outlet.name?.trim()} — Chai Days artisan chai café in Bengaluru. Serving handcrafted masala chai, specialty beverages, and snacks.`,
    'url': BASE_URL,
    'telephone': outlet.phone ? `+91${outlet.phone.replace(/\D/g, '').slice(-10)}` : undefined,
    'address': {
      '@type': 'PostalAddress',
      'streetAddress': outlet.address,
      'addressLocality': 'Bengaluru',
      'addressRegion': 'Karnataka',
      'postalCode': outlet.address?.match(/\d{6}/)?.[0] || '560001',
      'addressCountry': 'IN',
    },
    'openingHours': outlet.hours ? [outlet.hours.replace('Daily', 'Mo-Su').replace(':', '')] : ['Mo-Su 07:00-01:00'],
    'hasMap': outlet.mapUrl,
    'image': outlet.img || `${BASE_URL}/og-image.jpg`,
    'priceRange': '₹',
    'currenciesAccepted': 'INR',
    'paymentAccepted': 'Cash, Credit Card, UPI, Debit Card',
    'servesCuisine': ['Indian Chai', 'Tea', 'Masala Chai', 'Coffee', 'Beverages', 'Snacks'],
    'menu': `${BASE_URL}/menu`,
    'acceptsReservations': 'True',
  }));

  // Main organization + website schema
  const organizationSchema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': `${BASE_URL}/#organization`,
        'name': 'Chai Days',
        'url': BASE_URL,
        'logo': {
          '@type': 'ImageObject',
          'url': `${BASE_URL}/chaidays-logo-splash.png`,
          'width': 512,
          'height': 512,
        },
        'description': 'Chai Days is Bengaluru\'s premium artisan chai café chain, known for handcrafted masala chai, specialty beverages, and cozy welcoming spaces.',
        'foundingDate': '2020',
        'foundingLocation': 'Bengaluru, Karnataka, India',
        'numberOfEmployees': { '@type': 'QuantitativeValue', 'minValue': 10, 'maxValue': 100 },
        'areaServed': ['Koramangala', 'BTM Layout', 'Bellandur', 'Haralur', 'Electronic City', 'Bengaluru'],
        'sameAs': sameAs,
        'contactPoint': {
          '@type': 'ContactPoint',
          'telephone': '+91-9980094666',
          'contactType': 'customer service',
          'availableLanguage': ['English', 'Hindi', 'Kannada'],
        },
      },
      {
        '@type': 'WebSite',
        '@id': `${BASE_URL}/#website`,
        'url': BASE_URL,
        'name': 'Chai Days',
        'description': 'Bengaluru\'s premier artisan chai café',
        'publisher': { '@id': `${BASE_URL}/#organization` },
        'potentialAction': {
          '@type': 'SearchAction',
          'target': { '@type': 'EntryPoint', 'urlTemplate': `${BASE_URL}/menu?q={search_term_string}` },
          'query-input': 'required name=search_term_string',
        },
        'inLanguage': 'en-IN',
      },
      {
        '@type': 'WebPage',
        '@id': `${BASE_URL}/#webpage`,
        'url': BASE_URL,
        'name': 'Chai Days — Best Chai Café in Bengaluru',
        'isPartOf': { '@id': `${BASE_URL}/#website` },
        'about': { '@id': `${BASE_URL}/#organization` },
        'primaryImageOfPage': { '@type': 'ImageObject', 'url': `${BASE_URL}/og-image.jpg` },
        'inLanguage': 'en-IN',
        'breadcrumb': {
          '@type': 'BreadcrumbList',
          'itemListElement': [
            { '@type': 'ListItem', 'position': 1, 'name': 'Home', 'item': BASE_URL },
            { '@type': 'ListItem', 'position': 2, 'name': 'Menu', 'item': `${BASE_URL}/menu` },
            { '@type': 'ListItem', 'position': 3, 'name': 'Gallery', 'item': `${BASE_URL}/gallery` },
            { '@type': 'ListItem', 'position': 4, 'name': 'Experience', 'item': `${BASE_URL}/experience` },
            { '@type': 'ListItem', 'position': 5, 'name': 'About', 'item': `${BASE_URL}/about` },
            { '@type': 'ListItem', 'position': 6, 'name': 'Visit', 'item': `${BASE_URL}/visit` },
          ],
        },
      },
      {
        '@type': 'SiteNavigationElement',
        'name': ['Home', 'Menu', 'Gallery', 'Experience', 'About', 'Visit Us'],
        'url': [
          BASE_URL,
          `${BASE_URL}/menu`,
          `${BASE_URL}/gallery`,
          `${BASE_URL}/experience`,
          `${BASE_URL}/about`,
          `${BASE_URL}/visit`,
        ],
      },
      // All outlet branches
      ...branches,
      {
        '@type': 'FAQPage',
        'mainEntity': [
          {
            '@type': 'Question',
            'name': 'Where are Chai Days locations in Bengaluru?',
            'acceptedAnswer': {
              '@type': 'Answer',
              'text': 'Chai Days has multiple outlets in Bengaluru including Koramangala, BTM Layout, Bellandur (near Cessna Business Park), Haralur, and Electronic City.',
            },
          },
          {
            '@type': 'Question',
            'name': 'What are Chai Days opening hours?',
            'acceptedAnswer': {
              '@type': 'Answer',
              'text': 'Most Chai Days outlets are open daily from 7:00 AM to 1:00 AM. Electronic City opens at 7:30 AM and Haralur is open until 3:00 AM.',
            },
          },
          {
            '@type': 'Question',
            'name': 'What is Chai Days famous for?',
            'acceptedAnswer': {
              '@type': 'Answer',
              'text': 'Chai Days is famous for its handcrafted masala chai, signature chai blends, premium artisan tea beverages, and cozy café atmosphere across Bengaluru.',
            },
          },
          {
            '@type': 'Question',
            'name': 'Does Chai Days offer online ordering?',
            'acceptedAnswer': {
              '@type': 'Answer',
              'text': 'Yes, Chai Days is available on Zomato and Swiggy with over 50,000 successful online orders delivered.',
            },
          },
        ],
      },
    ],
  };

  return JSON.stringify(organizationSchema);
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = await buildJsonLd();

  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/chaidays-logo-splash.png" />
        {/* Fonts – preconnect for speed */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* DNS Prefetch for performance */}
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
        <link rel="dns-prefetch" href="https://pagitbjgyozdsurswbsj.supabase.co" />
        {/* Preload hero video */}
        <link rel="preload" as="video" href="/hero-final-web.mp4" type="video/mp4" media="(min-width: 768px)" />
        <link rel="preload" as="video" href="/hero-final-mobile.mp4" type="video/mp4" media="(max-width: 767px)" />
        {/* Preload logo for splash */}
        <link rel="preload" as="image" href="/chaidays-logo-splash.png" />
        {/* Critical fonts */}
        <link
          href="https://fonts.googleapis.com/css2?family=Noto+Serif:ital,wght@0,400;0,700;1,400&family=Manrope:wght@400;600;700&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-surface text-on-surface font-sans antialiased">
        {/* Rich Schema.org JSON-LD — multi-location LocalBusiness, WebSite, FAQPage */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: jsonLd }}
        />
        <SplashScreen />
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
