import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SplashScreen from "@/components/SplashScreen";

export const metadata: Metadata = {
  metadataBase: new URL('https://chaidays.com'),
  title: {
    default: 'Chai Days | The Art of the Modern Ritual',
    template: '%s | Chai Days',
  },
  description:
    'Chai Days is a premium artisan tea café dedicated to the slow sip — hand-ground blends, curated atmospheres, and intentional rituals in every cup.',
  keywords: ['chai', 'artisan tea', 'luxury café', 'slow living', 'masala chai', 'tea house'],
  authors: [{ name: 'Chai Days' }],
  creator: 'Chai Days',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://chaidays.com',
    siteName: 'Chai Days',
    title: 'Chai Days | The Art of the Modern Ritual',
    description:
      'A sanctuary of slow sips and intentional moments. Premium artisan chai and curated café experiences.',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: 'Chai Days — The Art of the Modern Ritual' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Chai Days | The Art of the Modern Ritual',
    description: 'A sanctuary of slow sips and intentional moments.',
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large' },
  },
};

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
        {/* Preload hero video for faster first paint */}
        <link rel="preload" as="video" href="/hero.mp4" type="video/mp4" />
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
        <SplashScreen />
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
