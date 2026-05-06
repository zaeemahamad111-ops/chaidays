'use client';
import { useEffect, useState } from 'react';
import Image from 'next/image';

export default function SplashScreen() {
  const [phase, setPhase] = useState<'visible' | 'fading' | 'done'>('visible');

  useEffect(() => {
    // Show splash for 1.8s, then start fade-out over 0.8s
    const fadeTimer = setTimeout(() => setPhase('fading'), 1800);
    const doneTimer = setTimeout(() => setPhase('done'), 2600);
    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(doneTimer);
    };
  }, []);

  if (phase === 'done') return null;

  return (
    <div
      aria-hidden="true"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fdf9f4',
        transition: 'opacity 0.8s ease',
        opacity: phase === 'fading' ? 0 : 1,
        pointerEvents: phase === 'fading' ? 'none' : 'all',
      }}
    >
      {/* Logo */}
      <div
        style={{
          animation: 'splashScale 0.9s cubic-bezier(0.22, 1, 0.36, 1) forwards',
          opacity: 0,
        }}
      >
        <Image
          src="/logo.webp"
          alt="Chai Days"
          width={140}
          height={140}
          priority
          style={{ objectFit: 'contain' }}
        />
      </div>

      {/* Tagline */}
      <p
        style={{
          marginTop: '20px',
          fontFamily: "'Manrope', system-ui, sans-serif",
          fontSize: '10px',
          fontWeight: 600,
          letterSpacing: '0.3em',
          textTransform: 'uppercase',
          color: '#8d4f00',
          animation: 'splashFadeIn 0.9s 0.4s ease forwards',
          opacity: 0,
        }}
      >
        Kickstart Your Days
      </p>

      {/* Thin progress bar */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          height: '2px',
          backgroundColor: '#fda957',
          animation: 'splashProgress 1.8s ease-in-out forwards',
          width: 0,
        }}
      />

      <style>{`
        @keyframes splashScale {
          from { opacity: 0; transform: scale(0.85); }
          to   { opacity: 1; transform: scale(1); }
        }
        @keyframes splashFadeIn {
          from { opacity: 0; transform: translateY(8px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes splashProgress {
          from { width: 0; }
          to   { width: 100%; }
        }
      `}</style>
    </div>
  );
}
