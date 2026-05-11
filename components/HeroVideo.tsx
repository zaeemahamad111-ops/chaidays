'use client';
import { useEffect, useRef, useState, useCallback } from 'react';
import Link from 'next/link';

export default function HeroVideo() {
  const sectionRef  = useRef<HTMLElement>(null);
  const videoRef    = useRef<HTMLVideoElement>(null);
  const pausedAtEnd = useRef(false);

  const [videoReady,     setVideoReady]     = useState(false);
  const [videoStarted,   setVideoStarted]   = useState(false);
  const [introTextStage, setIntroTextStage] = useState<'center' | 'left'>('center');
  const [videoSrc, setVideoSrc] = useState('/hero-v3-intro.mp4');

  // Pick the right video src based on screen size
  useEffect(() => {
    const mql = window.matchMedia('(max-width: 767px)');
    setVideoSrc(mql.matches ? '/hero-v3-intro-mobile.mp4' : '/hero-v3-intro.mp4');
    const h = (e: MediaQueryListEvent) => setVideoSrc(e.matches ? '/hero-v3-intro-mobile.mp4' : '/hero-v3-intro.mp4');
    mql.addEventListener('change', h);
    return () => mql.removeEventListener('change', h);
  }, []);

  // ── Make video visible as soon as any data is available ───────
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const markReady = () => setVideoReady(true);

    // If already loaded from preload cache, mark ready immediately
    if (video.readyState >= 2) {
      setVideoReady(true);
    } else {
      video.addEventListener('loadeddata', markReady, { once: true });
    }

    // Safety fallback: force visible after 1s regardless
    const fallback = setTimeout(() => setVideoReady(true), 1000);

    return () => {
      video.removeEventListener('loadeddata', markReady);
      clearTimeout(fallback);
    };
  }, []);

  // ── IntersectionObserver: play only when hero is visible ──────
  // (and after splash screen is gone — 3s)
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    let splashTimer: ReturnType<typeof setTimeout>;

    const tryPlay = () => {
      if (videoStarted) return;
      const video = videoRef.current;
      if (!video) return;
      setVideoStarted(true);
      video.playbackRate = 0.95;
      video.play().catch(() => {});
    };

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Wait for splash to finish, then play
          splashTimer = setTimeout(tryPlay, 3000);
        } else {
          clearTimeout(splashTimer);
          videoRef.current?.pause();
        }
      },
      { threshold: 0.1 } // lower threshold — easier to trigger
    );

    obs.observe(section);
    return () => {
      obs.disconnect();
      clearTimeout(splashTimer);
    };
  }, [videoStarted]);

  // ── Timeupdate: text stage + last-frame freeze + scroll ───────
  const handleTimeUpdate = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;

    if (video.currentTime > 2.5 && introTextStage === 'center') {
      setIntroTextStage('left');
    }

    // Freeze 0.15s before end, then scroll
    if (video.duration && video.currentTime >= video.duration - 0.15 && !pausedAtEnd.current) {
      pausedAtEnd.current = true;
      video.pause();
      setTimeout(() => {
        window.scrollBy({ top: window.innerHeight, behavior: 'smooth' });
      }, 500);
    }
  }, [introTextStage]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const onEnded = () => {
      if (!pausedAtEnd.current) {
        pausedAtEnd.current = true;
        setTimeout(() => {
          window.scrollBy({ top: window.innerHeight, behavior: 'smooth' });
        }, 500);
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
      {/* ── Video ── */}
      <video
        ref={videoRef}
        src={videoSrc}
        muted
        playsInline
        preload="auto"
        disablePictureInPicture
        className="absolute inset-0 w-full h-full object-cover z-10"
        style={{
          opacity: videoReady ? 1 : 0,
          transition: 'opacity 1s ease',
        }}
      />

      {/* Loading spinner — shown until first frame is decoded */}
      {!videoReady && (
        <div className="absolute inset-0 z-10 bg-[#0a0806] flex items-center justify-center">
          <div className="w-10 h-10 border border-white/10 border-t-white/50 rounded-full animate-spin" />
        </div>
      )}

      {/* ── Gradient guards ── */}
      <div className="absolute inset-0 z-20 bg-gradient-to-t from-black/65 via-black/5 to-black/35 pointer-events-none" />
      <div className="absolute inset-0 z-20 bg-gradient-to-r from-black/55 via-transparent to-transparent pointer-events-none" />

      {/* ── Text Overlay ── */}
      <div className="absolute inset-0 z-30 flex flex-col items-center justify-center px-8 pointer-events-none">

        {/* Phase A — Centered poetic tagline */}
        <div
          className={`text-center transition-all duration-[1.4s] ease-in-out ${
            introTextStage === 'center'
              ? 'opacity-100 translate-y-0 blur-none'
              : 'opacity-0 -translate-y-6 blur-[2px]'
          }`}
        >
          <p className="font-sans text-[9px] md:text-[10px] tracking-[0.55em] uppercase text-[#e8c8a0]/80 mb-6 font-medium">
            A CHAI DAYS RITUAL
          </p>
          <h2
            className="font-serif italic text-5xl md:text-[5.5rem] lg:text-[6.5rem] text-white leading-[1.05] tracking-tight"
            style={{ textShadow: '0 8px 60px rgba(0,0,0,0.7)' }}
          >
            Crafted Slow.<br />Savoured Long.
          </h2>
          <div
            className="mx-auto mt-8 bg-[#c9874a]/60"
            style={{
              height: '1px',
              width: introTextStage === 'center' ? '60px' : '0px',
              transition: 'width 1.2s ease 0.4s',
            }}
          />
        </div>

        {/* Phase B — Left-aligned brand reveal */}
        <div
          className={`absolute left-8 md:left-16 lg:left-24 bottom-[20%] pointer-events-auto transition-all duration-[1.4s] ease-in-out ${
            introTextStage === 'left'
              ? 'opacity-100 translate-x-0 blur-none'
              : 'opacity-0 translate-x-10 blur-[2px]'
          }`}
        >
          <p className="font-sans text-[9px] tracking-[0.55em] uppercase text-[#e8c8a0]/70 mb-5 font-medium">
            SINCE 2020 · INDIA
          </p>
          <h1
            className="font-serif italic text-[5rem] md:text-[7rem] lg:text-[9rem] text-white leading-[0.88] mb-10"
            style={{ textShadow: '0 6px 50px rgba(0,0,0,0.5)' }}
          >
            Chai<br />Days
          </h1>
          <div className="flex items-center gap-6">
            <Link
              href="/menu"
              className="inline-flex items-center gap-3 bg-[#8D4F00] hover:bg-[#7a4300] text-white px-8 py-3.5 font-sans text-[10px] font-bold tracking-[0.25em] uppercase transition-all duration-500 shadow-2xl"
            >
              Explore Menu <span className="text-[#e8c8a0]">→</span>
            </Link>
            <Link
              href="/experience"
              className="font-sans text-[10px] font-semibold tracking-[0.25em] uppercase text-white/60 hover:text-white border-b border-white/20 hover:border-white pb-0.5 transition-all duration-500"
            >
              Our Story
            </Link>
          </div>
        </div>
      </div>

      {/* ── Scroll hint ── */}
      <div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-2"
        style={{
          opacity: introTextStage === 'left' ? 0.45 : 0,
          transition: 'opacity 1s 0.5s ease',
        }}
      >
        <span className="font-sans text-[8px] tracking-[0.4em] uppercase text-white/50">Scroll</span>
        <div
          className="w-px h-8 bg-white/30"
          style={{ animation: 'scrollPulse 2s ease-in-out infinite' }}
        />
      </div>

    </section>
  );
}
