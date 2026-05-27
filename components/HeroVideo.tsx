'use client';
import { useEffect, useRef, useState, useCallback } from 'react';
import Link from 'next/link';

export type HeroData = {
  desktopVideoUrl?: string;
  mobileVideoUrl?: string;
  secondaryVideoUrl?: string;
  topTextSmall?: string;
  topTextLarge?: string;
  brandTextSmall?: string;
  brandTextLarge?: string;
  cta1Text?: string;
  cta1Link?: string;
  cta2Text?: string;
  cta2Link?: string;
};

export default function HeroVideo({ heroData }: { heroData?: HeroData }) {
  const sectionRef = useRef<HTMLElement>(null);
  const chaiVideoRef = useRef<HTMLVideoElement>(null);
  const canPlayRef  = useRef(false);    // true after splash clears
  const visibleRef  = useRef(false);    // true when section in viewport

  const [videoReady,     setVideoReady]     = useState(false);
  const [isMobile,       setIsMobile]       = useState(false);
  const [introTextStage, setIntroTextStage] = useState<'top' | 'brand'>('top');

  // ── 1. Detect mobile and set initial text stage ──────────────
  useEffect(() => {
    const mql = window.matchMedia('(max-width: 767px)');
    const update = (matches: boolean) => {
      setIsMobile(matches);
      setIntroTextStage('top');
    };
    update(mql.matches);
    const h = (e: MediaQueryListEvent) => update(e.matches);
    mql.addEventListener('change', h);
    return () => mql.removeEventListener('change', h);
  }, []);

  // ── 2. Allow play only after splash screen clears (~3s) ──────
  useEffect(() => {
    const t = setTimeout(() => {
      canPlayRef.current = true;
      if (visibleRef.current) {
        const vChai = chaiVideoRef.current;
        if (vChai) {
          vChai.playbackRate = 0.95;
          vChai.play().catch(() => {});
        }
      }
    }, 3000);
    return () => clearTimeout(t);
  }, []);

  // ── 3. IntersectionObserver — play only when hero is in view ─
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        visibleRef.current = entry.isIntersecting;
        const vChai = chaiVideoRef.current;
        if (!vChai) return;
        
        if (entry.isIntersecting && canPlayRef.current) {
          vChai.playbackRate = 0.95;
          vChai.play().catch(() => {});
        } else if (!entry.isIntersecting) {
          vChai.pause();
        }
      },
      { threshold: 0.5 }
    );
    obs.observe(section);
    return () => obs.disconnect();
  }, []);

  // ── 4. Video ready detection ───
  useEffect(() => {
    const video = chaiVideoRef.current;
    if (!video) return;
    setVideoReady(false);

    const markReady = () => setVideoReady(true);
    if (video.readyState >= 2) {
      setVideoReady(true);
    } else {
      video.addEventListener('loadeddata', markReady, { once: true });
    }
    // Hard fallback — show video after 2s regardless
    const fallback = setTimeout(() => setVideoReady(true), 2000);
    return () => {
      video.removeEventListener('loadeddata', markReady);
      clearTimeout(fallback);
    };
  }, []);

  // ── 5. Time-based text transitions ─────
  const handleTimeUpdateChai = useCallback(() => {
    const video = chaiVideoRef.current;
    if (!video) return;

    // The camera angle changes rapidly in the new video.
    const shiftAt = 1.2;
    if (video.currentTime >= shiftAt && introTextStage === 'top') {
      setIntroTextStage('brand');
    }
  }, [introTextStage]);

  useEffect(() => {
    const vChai = chaiVideoRef.current;
    if (!vChai) return;
    vChai.addEventListener('timeupdate', handleTimeUpdateChai);
    return () => {
      vChai.removeEventListener('timeupdate', handleTimeUpdateChai);
    };
  }, [handleTimeUpdateChai]);

  return (
    <section
      ref={sectionRef}
      className="relative w-full overflow-hidden bg-[#0a0806]"
      style={{ height: '100dvh', minHeight: '600px' }}
    >
      {/* ── Video (Chai) ── */}
      <video
        ref={chaiVideoRef}
        src={isMobile ? (heroData?.mobileVideoUrl || '/hero-final-mobile.mp4') : (heroData?.desktopVideoUrl || '/hero-final-web.mp4')}
        muted
        playsInline
        preload="auto"
        disablePictureInPicture
        loop
        className="absolute inset-0 w-full h-full object-cover z-10"
        style={{ 
          opacity: videoReady ? 1 : 0, 
          transition: 'opacity 0.8s ease',
          transform: 'scale(1.1)', // Scales up slightly to crop the watermark
          transformOrigin: 'center'
        }}
      />

      {/* Loading spinner */}
      {!videoReady && (
        <div className="absolute inset-0 z-10 bg-[#0a0806] flex items-center justify-center">
          <div className="w-8 h-8 border border-white/10 border-t-white/40 rounded-full animate-spin" />
        </div>
      )}

      {/* ─────────────────────────────────────────────────────────
          PHASE: TOP — "Crafted Slow. Savoured Long."
      ───────────────────────────────────────────────────────── */}
      <div
        className="absolute top-[38%] md:top-[42%] inset-x-0 z-30 flex flex-col items-center text-center px-8 pointer-events-none"
        style={{
          opacity: introTextStage === 'top' ? 1 : 0,
          transform: introTextStage === 'top' ? 'translateY(0) scale(1)' : 'translateY(-20px) scale(0.97)',
          filter: introTextStage === 'top' ? 'blur(0px)' : 'blur(3px)',
          transition: 'opacity 1.2s ease, transform 1.2s ease, filter 1.2s ease',
        }}
      >
        <p className="font-sans text-[9px] md:text-[10px] tracking-[0.6em] uppercase text-[#e8c8a0]/75 mb-5 font-medium" dangerouslySetInnerHTML={{ __html: heroData?.topTextSmall || "A CHAI DAYS RITUAL" }} />
        <h2
          className="font-serif italic text-[2.6rem] md:text-[4.5rem] lg:text-[5.5rem] text-white leading-[1.1] tracking-tight"
          style={{ textShadow: '0 4px 40px rgba(0,0,0,0.8)' }}
          dangerouslySetInnerHTML={{ __html: heroData?.topTextLarge || "Crafted Slow.<br />Savoured Long." }}
        />
        <div
          className="mt-6 bg-[#c9874a]/50"
          style={{
            height: '1px',
            width: introTextStage === 'top' ? '50px' : '0px',
            transition: 'width 1.4s ease 0.5s',
          }}
        />
      </div>

      {/* ─────────────────────────────────────────────────────────
          PHASE: BRAND — "Chai Days" + CTAs
      ───────────────────────────────────────────────────────── */}
      <div
        className="absolute top-[55%] md:top-[42%] left-6 md:left-16 lg:left-24 z-30 pointer-events-auto"
        style={{
          opacity: introTextStage === 'brand' ? 1 : 0,
          transform: introTextStage === 'brand' ? 'translateX(0)' : 'translateX(30px)',
          filter: introTextStage === 'brand' ? 'blur(0px)' : 'blur(3px)',
          transition: 'opacity 1.3s ease, transform 1.3s ease, filter 1.3s ease',
        }}
      >
        <p className="font-sans text-[9px] tracking-[0.55em] uppercase text-[#e8c8a0]/70 mb-3 md:mb-5 font-medium" dangerouslySetInnerHTML={{ __html: heroData?.brandTextSmall || "SINCE 2020 · INDIA" }} />
        <h1
          className="font-serif italic text-[3.2rem] md:text-[6rem] lg:text-[8rem] text-white leading-[0.9] mb-5 md:mb-8"
          style={{ textShadow: '0 4px 40px rgba(0,0,0,0.6)' }}
          dangerouslySetInnerHTML={{ __html: heroData?.brandTextLarge || "Chai<br />Days" }}
        />
        <div className="flex items-center gap-4 md:gap-6">
          <Link
            href={heroData?.cta1Link || "/menu"}
            className="inline-flex items-center gap-2 bg-[#8D4F00] hover:bg-[#7a4300] text-white px-6 md:px-8 py-3 md:py-3.5 font-sans text-[10px] font-bold tracking-[0.25em] uppercase transition-all duration-500 shadow-2xl"
          >
            {heroData?.cta1Text || "Explore Menu"} <span className="text-[#e8c8a0]">→</span>
          </Link>
          <Link
            href={heroData?.cta2Link || "/experience"}
            className="font-sans text-[10px] font-semibold tracking-[0.25em] uppercase text-white/55 hover:text-white border-b border-white/20 hover:border-white pb-0.5 transition-all duration-500"
          >
            {heroData?.cta2Text || "Our Story"}
          </Link>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        className="absolute bottom-7 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-2"
        style={{
          opacity: introTextStage === 'brand' ? 0.4 : 0,
          transition: 'opacity 1s 0.8s ease',
          pointerEvents: 'none',
        }}
      >
        <div className="w-px h-7 bg-white/40" />
        <span className="font-sans text-[7px] tracking-[0.4em] uppercase text-white/40">scroll</span>
      </div>
    </section>
  );
}
