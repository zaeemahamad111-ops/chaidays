'use client';
import { useEffect, useRef, useState, useCallback } from 'react';
import Link from 'next/link';

export default function HeroVideo() {
  const sectionRef  = useRef<HTMLElement>(null);
  const videoRef    = useRef<HTMLVideoElement>(null);
  const pausedAtEnd = useRef(false);
  const canPlayRef  = useRef(false);    // true after splash clears
  const visibleRef  = useRef(false);    // true when section in viewport

  const [videoReady,     setVideoReady]     = useState(false);
  const [isMobile,       setIsMobile]       = useState(false);
  const [introTextStage, setIntroTextStage] = useState<'top' | 'brand'>('top');

  // ── 1. Detect mobile ─────────────────────────────────────────
  useEffect(() => {
    const mql = window.matchMedia('(max-width: 767px)');
    setIsMobile(mql.matches);
    const h = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mql.addEventListener('change', h);
    return () => mql.removeEventListener('change', h);
  }, []);

  // ── 2. Allow play only after splash screen clears (~3s) ──────
  useEffect(() => {
    const t = setTimeout(() => {
      canPlayRef.current = true;
      // If section was already visible, start now
      if (visibleRef.current) {
        const v = videoRef.current;
        if (v) {
          v.playbackRate = 0.95;
          v.play().catch(() => {});
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
        const v = videoRef.current;
        if (!v) return;
        if (entry.isIntersecting && canPlayRef.current) {
          v.playbackRate = 0.95;
          v.play().catch(() => {});
        } else if (!entry.isIntersecting) {
          v.pause();
        }
      },
      { threshold: 0.5 }
    );
    obs.observe(section);
    return () => obs.disconnect();
  }, []);

  // ── 4. Video ready detection ──────────────────────────────────
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    setVideoReady(false); // reset on re-render
    pausedAtEnd.current = false;

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

  // ── 5. Time-based text transitions + end-freeze + scroll ─────
  const handleTimeUpdate = useCallback(() => {
    const video = videoRef.current;
    if (!video || !video.duration) return;

    // Both videos are ~8s long. We shift text at ~3.2s (40% through).
    const shiftAt = 3.2;
    if (video.currentTime >= shiftAt && introTextStage === 'top') {
      setIntroTextStage('brand');
    }

    // Freeze last frame for 0.5s then scroll
    if (video.currentTime >= video.duration - 0.15 && !pausedAtEnd.current) {
      pausedAtEnd.current = true;
      video.pause();
      setTimeout(() => window.scrollBy({ top: window.innerHeight, behavior: 'smooth' }), 500);
    }
  }, [introTextStage]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const onEnded = () => {
      if (!pausedAtEnd.current) {
        pausedAtEnd.current = true;
        setTimeout(() => window.scrollBy({ top: window.innerHeight, behavior: 'smooth' }), 500);
      }
    };
    video.addEventListener('timeupdate', handleTimeUpdate);
    video.addEventListener('ended',      onEnded);
    return () => {
      video.removeEventListener('timeupdate', handleTimeUpdate);
      video.removeEventListener('ended',      onEnded);
    };
  }, [handleTimeUpdate]);

  return (
    <section
      ref={sectionRef}
      className="relative w-full overflow-hidden bg-[#0a0806]"
      style={{ height: '100dvh', minHeight: '600px' }}
    >
      {/* ── Video — NO autoPlay, controlled purely by IntersectionObserver ── */}
      <video
        ref={videoRef}
        muted
        playsInline
        preload="auto"
        disablePictureInPicture
        className="absolute inset-0 w-full h-full object-cover z-10"
        style={{ opacity: videoReady ? 1 : 0, transition: 'opacity 0.8s ease' }}
      >
        {/* Source set without re-mounting the element */}
        <source src={isMobile ? '/hero-final-mobile.mp4' : '/hero-final-web.mp4'} type="video/mp4" />
      </video>

      {/* Loading spinner */}
      {!videoReady && (
        <div className="absolute inset-0 z-10 bg-[#0a0806] flex items-center justify-center">
          <div className="w-8 h-8 border border-white/10 border-t-white/40 rounded-full animate-spin" />
        </div>
      )}

      {/* Gradients for text legibility */}
      <div className="absolute inset-0 z-20 bg-gradient-to-b from-black/50 via-transparent to-black/70 pointer-events-none" />
      <div className="absolute inset-0 z-20 bg-gradient-to-r from-black/40 via-transparent to-transparent pointer-events-none" />

      {/* ─────────────────────────────────────────────────────────
          PHASE: TOP — "Crafted Slow. Savoured Long."
          Positioned at top of frame (over top-view of cup)
      ───────────────────────────────────────────────────────── */}
      <div
        className="absolute top-[12%] inset-x-0 z-30 flex flex-col items-center text-center px-8 pointer-events-none"
        style={{
          opacity: introTextStage === 'top' ? 1 : 0,
          transform: introTextStage === 'top' ? 'translateY(0) scale(1)' : 'translateY(-20px) scale(0.97)',
          filter: introTextStage === 'top' ? 'blur(0px)' : 'blur(3px)',
          transition: 'opacity 1.2s ease, transform 1.2s ease, filter 1.2s ease',
        }}
      >
        <p className="font-sans text-[9px] md:text-[10px] tracking-[0.6em] uppercase text-[#e8c8a0]/75 mb-5 font-medium">
          A CHAI DAYS RITUAL
        </p>
        <h2
          className="font-serif italic text-[2.6rem] md:text-[4.5rem] lg:text-[5.5rem] text-white leading-[1.1] tracking-tight"
          style={{ textShadow: '0 4px 40px rgba(0,0,0,0.8)' }}
        >
          Crafted Slow.<br />Savoured Long.
        </h2>
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
          Positioned at bottom — cup stays visible above
      ───────────────────────────────────────────────────────── */}
      <div
        className="absolute bottom-[3%] md:bottom-[8%] left-6 md:left-16 lg:left-24 z-30 pointer-events-auto"
        style={{
          opacity: introTextStage === 'brand' ? 1 : 0,
          transform: introTextStage === 'brand' ? 'translateX(0)' : 'translateX(30px)',
          filter: introTextStage === 'brand' ? 'blur(0px)' : 'blur(3px)',
          transition: 'opacity 1.3s ease, transform 1.3s ease, filter 1.3s ease',
        }}
      >
        <p className="font-sans text-[9px] tracking-[0.55em] uppercase text-[#e8c8a0]/70 mb-3 md:mb-5 font-medium">
          SINCE 2020 · INDIA
        </p>
        <h1
          className="font-serif italic text-[3.2rem] md:text-[6rem] lg:text-[8rem] text-white leading-[0.9] mb-5 md:mb-8"
          style={{ textShadow: '0 4px 40px rgba(0,0,0,0.6)' }}
        >
          Chai<br />Days
        </h1>
        <div className="flex items-center gap-4 md:gap-6">
          <Link
            href="/menu"
            className="inline-flex items-center gap-2 bg-[#8D4F00] hover:bg-[#7a4300] text-white px-6 md:px-8 py-3 md:py-3.5 font-sans text-[10px] font-bold tracking-[0.25em] uppercase transition-all duration-500 shadow-2xl"
          >
            Explore Menu <span className="text-[#e8c8a0]">→</span>
          </Link>
          <Link
            href="/experience"
            className="font-sans text-[10px] font-semibold tracking-[0.25em] uppercase text-white/55 hover:text-white border-b border-white/20 hover:border-white pb-0.5 transition-all duration-500"
          >
            Our Story
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
