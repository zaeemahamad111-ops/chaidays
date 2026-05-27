import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SplashScreen from "@/components/SplashScreen";

import { getSiteData } from '@/lib/data';

export async function generateMetadata(): Promise<Metadata> {
  let seo = {
    title: 'Chai Days | The Art of the Modern Ritual',
    description: 'Chai Days is a premium artisan tea café dedicated to the slow sip — hand-ground blends, curated atmospheres, and intentional rituals in every cup.',
    keywords: ['chai', 'artisan tea', 'luxury café', 'slow living', 'masala chai', 'tea house']
  };

  try {
    const data = await getSiteData();
    if (data?.seo) seo = data.seo;
  } catch (error) {
    console.error("Error loading SEO data:", error);
  }

  return {
    metadataBase: new URL('https://chaidays.com'),
    title: {
      default: seo.title,
      template: '%s | Chai Days',
    },
    description: seo.description,
    keywords: seo.keywords,
    authors: [{ name: 'Chai Days' }],
    creator: 'Chai Days',
    openGraph: {
      type: 'website',
      locale: 'en_US',
      url: 'https://chaidays.com',
      siteName: 'Chai Days',
      title: seo.title,
      description: seo.description,
      images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: 'Chai Days — The Art of the Modern Ritual' }],
    },
    twitter: {
      card: 'summary_large_image',
      title: seo.title,
      description: seo.description,
      images: ['/og-image.jpg'],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true, 'max-image-preview': 'large' },
    },
  };
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
        {/* Fonts – preconnect for speed, actual load via CSS */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* Preload chai intro video for faster first paint */}
        <link rel="preload" as="video" href="/hero-final-web.mp4" type="video/mp4" media="(min-width: 768px)" />
        <link rel="preload" as="video" href="/hero-final-mobile.mp4" type="video/mp4" media="(max-width: 767px)" />
        {/* Preload logo for splash screen */}
        <link rel="preload" as="image" href="/chaidays-logo-splash.png" />
        {/* Critical fonts inline so no render blocking */}
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "Chai Days",
              "url": "https://chaidays.com",
              "logo": "https://chaidays.com/chaidays-logo-splash.png",
              "description": "A premium artisan tea café dedicated to the slow sip.",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "124 Ritual Lane, Spiced Quarter",
                "addressLocality": "London",
                "postalCode": "EC1V 4PW",
                "addressCountry": "UK"
              }
            })
          }}
        />
        <SplashScreen />
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
