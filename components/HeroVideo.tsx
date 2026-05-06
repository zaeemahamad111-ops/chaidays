'use client';
import { useEffect, useRef, useState, useCallback } from 'react';
import Link from 'next/link';

const textStages = [
  { from: 0,   eyebrow: '', headline: '', sub: '', cta: false },
  { from: 1.8, eyebrow: 'KICKSTART YOUR DAYS!', headline: 'Chai Days', sub: '', cta: false },
  { from: 2.4, eyebrow: 'KICKSTART YOUR DAYS!', headline: 'Chai Days', sub: 'Sip, Savor, and Satisfy Your Senses with Chai Days.', cta: false },
  { from: 3.0, eyebrow: 'KICKSTART YOUR DAYS!', headline: 'Chai Days', sub: 'Sip, Savor, and Satisfy Your Senses with Chai Days.', cta: true  },
];

export default function HeroVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [stageIdx, setStageIdx] = useState(2); // Start at final stage so content is always visible
  const [videoReady, setVideoReady] = useState(false);
  const [videoStarted, setVideoStarted] = useState(false);
  const [videoSrc, setVideoSrc] = useState<string | null>(null);
  const scrolledRef = useRef(false);

  useEffect(() => {
    // Determine which video to serve based on screen width
    const mql = window.matchMedia('(max-width: 767px)');
    setVideoSrc(mql.matches ? '/hero-reversed.mp4' : '/hero.mp4');
    
    const handler = (e: MediaQueryListEvent) => {
      setVideoSrc(e.matches ? '/hero-reversed.mp4' : '/hero.mp4');
    };
    mql.addEventListener('change', handler);
    return () => mql.removeEventListener('change', handler);
  }, []);

  const handleTimeUpdate = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;
    const t = video.currentTime;
    let idx = 0;
    for (let i = textStages.length - 1; i >= 0; i--) {
      if (t >= textStages[i].from) { idx = i; break; }
    }
    setStageIdx(idx);

    // Auto-scroll slightly before video ends to create a continuous motion
    if (video.duration && t >= video.duration - 0.2 && !scrolledRef.current) {
      scrolledRef.current = true;
      if (window.scrollY < 50) {
        window.scrollBy({ top: window.innerHeight, behavior: 'smooth' });
      }
    }
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // When video data is available, start playback and reset to stage 0 for animation
    const onLoadedData = () => {
      setVideoReady((prev) => {
        if (!prev) {
          setStageIdx(0); // reset to beginning for animation
          setVideoStarted(false);
        }
        return true;
      });
    };

    if (video.readyState >= 2) {
      onLoadedData();
    }

    const onPlay = () => setVideoStarted(true);

    // Freeze on last frame when video ends and act as a reliable fallback for auto-scroll on mobile
    const onEnded = () => {
      setStageIdx(textStages.length - 1);
      if (!scrolledRef.current) {
        scrolledRef.current = true;
        if (window.scrollY < 50) {
          window.scrollBy({ top: window.innerHeight, behavior: 'smooth' });
        }
      }
    };

    // Fallback: if video can't autoplay, keep stage at last
    const onError = () => {
      setStageIdx(textStages.length - 1);
    };

    video.addEventListener('loadeddata', onLoadedData);
    video.addEventListener('play', onPlay);
    video.addEventListener('timeupdate', handleTimeUpdate);
    video.addEventListener('ended', onEnded);
    video.addEventListener('error', onError);

    // Try to force play (needed on some browsers)
    video.play().catch(() => {
      // Autoplay blocked — stay at final stage
      setStageIdx(textStages.length - 1);
    });

    return () => {
      video.removeEventListener('loadeddata', onLoadedData);
      video.removeEventListener('play', onPlay);
      video.removeEventListener('timeupdate', handleTimeUpdate);
      video.removeEventListener('ended', onEnded);
      video.removeEventListener('error', onError);
    };
  }, [handleTimeUpdate, videoSrc]);

  const stage = textStages[stageIdx];

  return (
    <section className="relative w-full overflow-hidden bg-[#0d0a08]" style={{ height: '100dvh', minHeight: '600px' }}>

      {/* ── Video ── */}
      {videoSrc && (
        <video
          ref={videoRef}
          src={videoSrc}
        autoPlay
        muted
        playsInline
        preload="auto"
        className="absolute inset-0 w-full h-full object-cover"
        style={{
          opacity: videoReady ? 1 : 0,
          transition: 'opacity 1s ease',
        }}
      />
      )}

      {/* ── Fallback gradient (shows if video not ready) ── */}
      <div
        className="absolute inset-0 bg-gradient-to-br from-[#1a0d06] via-[#261206] to-[#0d0a08]"
        style={{ opacity: videoReady ? 0 : 1, transition: 'opacity 1s ease' }}
      />

      {/* ── Cinematic overlays ── */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-black/55 pointer-events-none z-10" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-transparent to-transparent pointer-events-none z-10" />

      {/* ── Letterbox bars ── */}
      <div className="absolute top-0 inset-x-0 h-16 bg-black z-20 pointer-events-none" />
      <div className="absolute bottom-0 inset-x-0 h-16 bg-black z-20 pointer-events-none" />

      {/* ── Content ── */}
      <div className="absolute inset-0 z-30 flex flex-col justify-center px-8 md:px-16 lg:px-24 pt-16 pb-20 max-w-[1440px] mx-auto left-0 right-0">

        {/* Eyebrow */}
        <p
          className="font-sans text-[10px] md:text-[11px] tracking-[0.4em] md:tracking-[0.5em] uppercase mb-6 md:mb-8"
          style={{
            color: 'rgba(255,255,255,0.65)',
            opacity: stage.eyebrow ? 1 : 0,
            transform: stage.eyebrow ? 'translateY(0)' : 'translateY(10px)',
            transition: 'opacity 0.8s ease, transform 0.8s ease',
          }}
        >
          {stage.eyebrow}
        </p>

        {/* Headline */}
        <h1
          className="font-serif italic font-light leading-none mb-6 md:mb-8"
          style={{
            fontSize: 'clamp(60px, 10vw, 140px)',
            color: '#ffffff',
            textShadow: '0 2px 30px rgba(0,0,0,0.4)',
            opacity: stage.headline ? 1 : 0,
            transform: stage.headline ? 'translateY(0) skewY(0deg)' : 'translateY(40px) skewY(1.5deg)',
            transition: 'opacity 1s cubic-bezier(0.22,1,0.36,1), transform 1s cubic-bezier(0.22,1,0.36,1)',
          }}
        >
          {stage.headline || '\u00A0'}
        </h1>

        {/* Subtitle */}
        <p
          className="font-sans text-base md:text-lg leading-relaxed max-w-lg mb-10 md:mb-12"
          style={{
            color: 'rgba(255,255,255,0.78)',
            opacity: stage.sub ? 1 : 0,
            transform: stage.sub ? 'translateY(0)' : 'translateY(16px)',
            transition: 'opacity 0.8s 0.15s ease, transform 0.8s 0.15s ease',
          }}
        >
          {stage.sub || '\u00A0'}
        </p>

        {/* CTAs */}
        <div
          className="flex flex-col sm:flex-row gap-4"
          style={{
            opacity: stage.cta ? 1 : 0,
            transform: stage.cta ? 'translateY(0)' : 'translateY(16px)',
            transition: 'opacity 0.8s 0.3s ease, transform 0.8s 0.3s ease',
          }}
        >
          <Link
            href="/experience"
            className="inline-flex items-center justify-center border border-white/50 text-white backdrop-blur-sm px-8 md:px-10 py-3.5 md:py-4 font-sans text-[10px] md:text-[11px] font-semibold tracking-[0.2em] uppercase hover:bg-white hover:text-secondary transition-all duration-500 w-fit"
          >
            The Experience
          </Link>
          <Link
            href="/menu"
            className="inline-flex items-center justify-center bg-[#8D4F00] text-white px-8 md:px-10 py-3.5 md:py-4 font-sans text-[10px] md:text-[11px] font-semibold tracking-[0.2em] uppercase hover:bg-[#6b3b00] hover:text-white transition-all duration-500 w-fit"
          >
            Explore Menu
          </Link>
        </div>
      </div>

      {/* ── Progress bar ── */}
      <VideoProgress videoRef={videoRef} />
    </section>
  );
}

function VideoProgress({ videoRef }: { videoRef: React.RefObject<HTMLVideoElement | null> }) {
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const update = () => {
      if (video.duration) {
        setProgress((video.currentTime / video.duration) * 100);
        setVisible(true);
      }
    };
    video.addEventListener('timeupdate', update);
    return () => video.removeEventListener('timeupdate', update);
  }, [videoRef]);

  if (!visible) return null;

  return (
    <div className="absolute bottom-[72px] inset-x-0 z-30 px-8 md:px-16 lg:px-24 max-w-[1440px] mx-auto left-0 right-0 flex items-center gap-4">
      <div className="flex-1 h-px bg-white/15 overflow-hidden">
        <div
          className="h-full bg-white/50"
          style={{ width: `${progress}%`, transition: 'width 0.1s linear' }}
        />
      </div>
      <span className="font-sans text-[9px] tracking-[0.2em] text-white/35 tabular-nums">
        {String(Math.min(5, Math.ceil(progress / 20))).padStart(2, '0')} / 05
      </span>
    </div>
  );
}
