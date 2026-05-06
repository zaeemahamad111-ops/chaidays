'use client';
import { useEffect, useState } from 'react';
import Image from 'next/image';

export default function SplashScreen() {
  const [phase, setPhase] = useState<'visible' | 'fading' | 'done'>('visible');

  useEffect(() => {
    const fadeTimer = setTimeout(() => setPhase('fading'), 2000);
    const doneTimer  = setTimeout(() => setPhase('done'),   2800);
    return () => { clearTimeout(fadeTimer); clearTimeout(doneTimer); };
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
      {/* Logo — scales in from below */}
      <div style={{ animation: 'splashLogoIn 0.85s cubic-bezier(0.22, 1, 0.36, 1) forwards', opacity: 0 }}>
        <Image
          src="/chaidays-logo-splash.png"
          alt="Chai Days — bringing back positive-teas"
          width={280}
          height={280}
          priority
          style={{ objectFit: 'contain', width: 'min(280px, 70vw)', height: 'auto' }}
        />
      </div>

      {/* Thin amber progress bar at bottom */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          height: '3px',
          background: 'linear-gradient(90deg, #8d4f00, #fda957)',
          animation: 'splashProgress 2s ease-in-out forwards',
          width: 0,
          borderRadius: '0 2px 0 0',
        }}
      />

      <style>{`
        @keyframes splashLogoIn {
          from { opacity: 0; transform: scale(0.78) translateY(20px); }
          to   { opacity: 1; transform: scale(1) translateY(0); }
        }
        @keyframes splashProgress {
          from { width: 0; }
          to   { width: 100%; }
        }
      `}</style>
    </div>
  );
}
