'use client';
import { useEffect, useRef, useState, useCallback } from 'react';
import Link from 'next/link';

export default function HeroVideo() {
  const sectionRef  = useRef<HTMLElement>(null);
  const chaiVideoRef = useRef<HTMLVideoElement>(null);
  const pinkVideoRef = useRef<HTMLVideoElement>(null);
  const pausedAtEnd = useRef(false);
  const canPlayRef  = useRef(false);    // true after splash clears
  const visibleRef  = useRef(false);    // true when section in viewport

  const [videoReady,     setVideoReady]     = useState(false);
  const [isMobile,       setIsMobile]       = useState(false);
  const [introTextStage, setIntroTextStage] = useState<'top' | 'brand'>('top');
  const [currentVideo,   setCurrentVideo]   = useState<'chai' | 'pink'>('chai');

  // ── 1. Detect mobile and set initial text stage ──────────────
  useEffect(() => {
    const mql = window.matchMedia('(max-width: 767px)');
    const update = (matches: boolean) => {
      setIsMobile(matches);
      setIntroTextStage('top'); // Both mobile and desktop now start with 'top'
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
      // If section was already visible, start now
      if (visibleRef.current) {
        const vChai = chaiVideoRef.current;
        const vPink = pinkVideoRef.current;
        
        // Since we start with 'chai', we play the chai video
        if (vChai && currentVideo === 'chai') {
          vChai.playbackRate = 0.95;
          vChai.play().catch(() => {});
        } else if (vPink && currentVideo === 'pink') {
          vPink.playbackRate = 0.95;
          vPink.play().catch(() => {});
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
        const vPink = pinkVideoRef.current;
        if (!vChai || !vPink) return;
        
        if (entry.isIntersecting && canPlayRef.current) {
          // Play the currently active video
          if (currentVideo === 'chai') {
            vChai.playbackRate = 0.95;
            vChai.play().catch(() => {});
          } else {
            vPink.playbackRate = 0.95;
            vPink.play().catch(() => {});
          }
        } else if (!entry.isIntersecting) {
          vChai.pause();
          vPink.pause();
        }
      },
      { threshold: 0.5 }
    );
    obs.observe(section);
    return () => obs.disconnect();
  }, []);

  // ── 4. Video ready detection (only care about first video) ───
  useEffect(() => {
    const video = chaiVideoRef.current;
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
  const handleTimeUpdateChai = useCallback(() => {
    const video = chaiVideoRef.current;
    const vPink = pinkVideoRef.current;
    if (!video || !video.duration || !vPink) return;

    // The camera angle changes rapidly in the new video.
    const shiftAt = 1.2;
    if (video.currentTime >= shiftAt && introTextStage === 'top') {
      setIntroTextStage('brand');
    }

    // Switch to pink video at the end of chai video
    if (video.currentTime >= video.duration - 0.15 && currentVideo === 'chai') {
      video.pause();
      setCurrentVideo('pink');
      vPink.currentTime = 0;
      vPink.play().catch(() => {});
    }
  }, [introTextStage, currentVideo]);

  const handleTimeUpdatePink = useCallback(() => {
    const video = pinkVideoRef.current;
    if (!video || !video.duration) return;

    // Freeze last frame for 0.5s then scroll
    if (video.currentTime >= video.duration - 0.15 && !pausedAtEnd.current) {
      pausedAtEnd.current = true;
      video.pause();
      setTimeout(() => window.scrollBy({ top: window.innerHeight, behavior: 'smooth' }), 500);
    }
  }, []);

  useEffect(() => {
    const vChai = chaiVideoRef.current;
    const vPink = pinkVideoRef.current;
    if (!vChai || !vPink) return;

    vChai.addEventListener('timeupdate', handleTimeUpdateChai);
    vPink.addEventListener('timeupdate', handleTimeUpdatePink);
    
    return () => {
      vChai.removeEventListener('timeupdate', handleTimeUpdateChai);
      vPink.removeEventListener('timeupdate', handleTimeUpdatePink);
    };
  }, [handleTimeUpdateChai, handleTimeUpdatePink]);

  return (
    <section
      ref={sectionRef}
      className="relative w-full overflow-hidden bg-[#0a0806]"
      style={{ height: '100dvh', minHeight: '600px' }}
    >
      {/* ── Video 1 (Chai) ── */}
      <video
        ref={chaiVideoRef}
        src={isMobile ? '/hero-final-mobile.mp4' : '/hero-final-web.mp4'}
        muted
        playsInline
        preload="auto"
        disablePictureInPicture
        className="absolute inset-0 w-full h-full object-cover z-10"
        style={{ 
          opacity: (videoReady && currentVideo === 'chai') ? 1 : 0, 
          transition: 'opacity 0.8s ease',
          transform: 'scale(1.1)', // Scales up slightly to crop the watermark
          transformOrigin: 'center'
        }}
      />

      {/* ── Video 2 (Pink Drink) ── */}
      <video
        ref={pinkVideoRef}
        src="/hero.mp4"
        muted
        playsInline
        preload="auto"
        disablePictureInPicture
        className="absolute inset-0 w-full h-full object-cover z-10"
        style={{ 
          opacity: currentVideo === 'pink' ? 1 : 0, 
          transition: 'opacity 1.2s ease',
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
          Positioned in the center of the frame (inside the top-view cup)
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
        className="absolute top-[55%] md:top-[42%] left-6 md:left-16 lg:left-24 z-30 pointer-events-auto"
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
      {/* ── Manual Video Controls ── */}
      <div className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-40 flex flex-col gap-4">
        {currentVideo === 'chai' && (
          <button 
            onClick={() => {
              const vChai = chaiVideoRef.current;
              const vPink = pinkVideoRef.current;
              if (vChai) vChai.pause();
              setCurrentVideo('pink');
              if (vPink) {
                vPink.currentTime = 0;
                vPink.play().catch(()=>{});
              }
            }}
            className="w-10 h-10 md:w-12 md:h-12 rounded-full border border-white/20 bg-black/20 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/10 hover:scale-110 transition-all cursor-pointer group"
            aria-label="Skip to Pink Drink Video"
          >
            <svg className="w-5 h-5 md:w-6 md:h-6 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        )}
        {currentVideo === 'pink' && (
          <button 
            onClick={() => {
              const vChai = chaiVideoRef.current;
              const vPink = pinkVideoRef.current;
              if (vPink) vPink.pause();
              setCurrentVideo('chai');
              setIntroTextStage('brand'); // Keep brand text visible
              if (vChai) {
                vChai.currentTime = 0;
                vChai.play().catch(()=>{});
              }
            }}
            className="w-10 h-10 md:w-12 md:h-12 rounded-full border border-white/20 bg-black/20 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/10 hover:scale-110 transition-all cursor-pointer group"
            aria-label="Previous Video"
          >
            <svg className="w-5 h-5 md:w-6 md:h-6 group-hover:-translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
        )}
      </div>
    </section>
  );
}
