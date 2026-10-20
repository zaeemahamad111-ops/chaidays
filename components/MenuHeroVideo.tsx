'use client';
import { useEffect, useRef, useState } from 'react';
import ScrollNavigation from '@/components/ScrollNavigation';

export type HeroData = {
  desktopVideoUrl?: string;
  mobileVideoUrl?: string;
  secondaryVideoUrl?: string;
  topTextSmall?: string;
  topTextLarge?: string;
  brandTextSmall?: string;
  brandTextLarge?: string;
};

interface MenuHeroVideoProps {
  heroData?: HeroData;
  contentData?: {
    heroTitle?: string;
    heroSubtitle?: string;
    heroDesc?: string;
    heroVideo?: string;
  };
}

export default function MenuHeroVideo({ heroData, contentData }: MenuHeroVideoProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoReady, setVideoReady] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // 1. Mobile media query detection
  useEffect(() => {
    const mql = window.matchMedia('(max-width: 767px)');
    const update = (matches: boolean) => setIsMobile(matches);
    update(mql.matches);
    const handler = (e: MediaQueryListEvent) => update(e.matches);
    mql.addEventListener('change', handler);
    return () => mql.removeEventListener('change', handler);
  }, []);

  // 2. IntersectionObserver to pause/play video when in viewport
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        const v = videoRef.current;
        if (!v) return;
        if (entry.isIntersecting) {
          v.playbackRate = 0.95;
          v.play().catch(() => {});
        } else {
          v.pause();
        }
      },
      { threshold: 0.25 }
    );
    obs.observe(section);
    return () => obs.disconnect();
  }, []);

  // 3. Video load detection with fallback
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    setVideoReady(false);

    const markReady = () => setVideoReady(true);
    if (video.readyState >= 2) {
      setVideoReady(true);
    } else {
      video.addEventListener('loadeddata', markReady, { once: true });
    }
    const fallback = setTimeout(() => setVideoReady(true), 2500);
    return () => {
      video.removeEventListener('loadeddata', markReady);
      clearTimeout(fallback);
    };
  }, [isMobile]);

  const videoSrc = isMobile
    ? (contentData?.heroVideo || heroData?.mobileVideoUrl || '/hero-final-mobile.mp4')
    : (contentData?.heroVideo || heroData?.desktopVideoUrl || '/hero-final-web.mp4');

  return (
    <section
      ref={sectionRef}
      className="relative w-full overflow-hidden bg-[#0a0806] flex items-center justify-center"
      style={{ height: '100dvh', minHeight: '600px' }}
    >
      {/* Video with scale & smooth opacity matching landing page */}
      <video
        ref={videoRef}
        src={videoSrc}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        disablePictureInPicture
        className="absolute inset-0 w-full h-full object-cover z-10"
        style={{
          opacity: videoReady ? 1 : 0,
          transition: 'opacity 0.8s ease',
          transform: 'scale(1.1)',
          transformOrigin: 'center'
        }}
      />

      {/* Loading Spinner */}
      {!videoReady && (
        <div className="absolute inset-0 z-10 bg-[#0a0806] flex items-center justify-center">
          <div className="w-8 h-8 border border-white/10 border-t-white/40 rounded-full animate-spin" />
        </div>
      )}

      {/* Atmospheric Overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/20 to-black/70 pointer-events-none z-20" />
      <div className="absolute inset-0 bg-black/15 pointer-events-none z-20" />

      {/* Centered Typography matching Landing Hero */}
      <div className="relative z-30 text-center px-6 max-w-[1440px] mx-auto flex flex-col items-center">
        <p
          className="font-sans text-[9px] md:text-[10px] tracking-[0.6em] uppercase text-[#e8c8a0]/85 mb-5 font-medium"
          dangerouslySetInnerHTML={{
            __html: contentData?.heroSubtitle || 'CULINARY ARTISTRY',
          }}
        />

        <h1
          className="font-serif italic text-[3.2rem] md:text-[5.5rem] lg:text-[7.5rem] text-white leading-[1.0] tracking-tight"
          style={{ textShadow: '0 4px 40px rgba(0,0,0,0.85)' }}
          dangerouslySetInnerHTML={{
            __html: contentData?.heroTitle || 'The Menu',
          }}
        />

        <div className="w-14 h-px bg-[#c9874a]/60 my-6" />

        <p
          className="font-sans text-base md:text-xl text-white/85 max-w-xl mx-auto font-light leading-relaxed"
          style={{ textShadow: '0 2px 20px rgba(0,0,0,0.7)' }}
          dangerouslySetInnerHTML={{
            __html:
              contentData?.heroDesc ||
              'A harmonious symphony of heritage spices, rare tea leaves, and intentional gastronomy.',
          }}
        />
      </div>

      {/* Scroll indicator & back-to-top */}
      <ScrollNavigation />
    </section>
  );
}
