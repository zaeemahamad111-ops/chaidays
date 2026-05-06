'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import ScrollReveal from '@/components/ScrollReveal';

const footerLinks = {
  Explore: [
    { label: 'Our Story', href: '/about' },
    { label: 'The Menu', href: '/menu' },
    { label: 'Gallery', href: '/gallery' },
    { label: 'Sustainability', href: '#' },
  ],
  Visit: [
    { label: 'Reservations', href: '/visit' },
    { label: 'Gift Cards', href: '#' },
    { label: 'Private Events', href: '#' },
    { label: 'Locations', href: '/visit' },
  ],
  Connect: [
    { label: 'Instagram', href: '#' },
    { label: 'Spotify Playlists', href: '#' },
    { label: 'Join the Journal', href: '#' },
    { label: 'Press Kit', href: '#' },
  ],
};

const Github = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
  </svg>
);

const Instagram = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
  </svg>
);

const Linkedin = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
    <rect x="2" y="9" width="4" height="12"></rect>
    <circle cx="4" cy="4" r="2"></circle>
  </svg>
);

const GradientBars: React.FC = () => {
  const [numBars] = useState(15);

  const calculateHeight = (index: number, total: number) => {
    const position = index / (total - 1);
    const maxHeight = 100;
    const minHeight = 30;
    
    const center = 0.5;
    const distanceFromCenter = Math.abs(position - center);
    const heightPercentage = Math.pow(distanceFromCenter * 2, 1.2);
    
    return minHeight + (maxHeight - minHeight) * heightPercentage;
  };

  return (
    <div className="absolute inset-0 z-0 overflow-hidden opacity-70 pointer-events-none">
      <div 
        className="flex h-full"
        style={{
          width: '100%',
          transform: 'translateZ(0)',
          backfaceVisibility: 'hidden',
          WebkitFontSmoothing: 'antialiased',
        }}
      >
        {Array.from({ length: numBars }).map((_, index) => {
          const height = calculateHeight(index, numBars);
          return (
            <div
              key={index}
              style={{
                flex: '1 0 calc(100% / 15)',
                maxWidth: 'calc(100% / 15)',
                height: '100%',
                background: 'linear-gradient(to top, rgba(141, 80, 0, 0.89), transparent)',
                transform: `scaleY(${height / 100})`,
                transformOrigin: 'bottom',
                transition: 'transform 0.5s ease-in-out',
                animation: 'pulseBar 2s ease-in-out infinite alternate',
                animationDelay: `${index * 0.1}s`,
                outline: '1px solid rgba(0, 0, 0, 0)',
                boxSizing: 'border-box',
              }}
            />
          );
        })}
      </div>
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes pulseBar {
          0% { transform: scaleY(0.8) translateY(10%); opacity: 0.5; }
          100% { transform: scaleY(1.2) translateY(0); opacity: 1; }
        }
      `}} />
    </div>
  );
};

export default function WaitlistSection() {
  return (
    <section className="relative flex flex-col items-center px-6 sm:px-8 md:px-16 overflow-hidden">
      <GradientBars />
      
      <div className="relative z-10 w-full max-w-[1440px] mx-auto flex flex-col items-center pt-24 pb-8 text-left">
        <ScrollReveal delay={100} className="flex justify-center space-x-8 mb-16">
          <a href="https://www.instagram.com/chaidays" target="_blank" rel="noopener noreferrer" className="text-on-surface-variant hover:text-secondary transition-colors duration-300">
            <Instagram className="w-5 h-5 sm:w-[24px] sm:h-[24px]" />
          </a>
          <a href="https://www.linkedin.com/company/chaidays" target="_blank" rel="noopener noreferrer" className="text-on-surface-variant hover:text-secondary transition-colors duration-300">
            <Linkedin className="w-5 h-5 sm:w-[24px] sm:h-[24px]" />
          </a>
          <a href="https://wa.me/919980084666" target="_blank" rel="noopener noreferrer" className="text-on-surface-variant hover:text-secondary transition-colors duration-300">
            <span className="material-symbols-outlined text-[20px] sm:text-[24px]">chat_bubble</span>
          </a>
        </ScrollReveal>

        {/* ── Footer Integrated Content ── */}
        <div className="w-full">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-16">
            <div className="md:col-span-4">
              <Link href="/" className="flex items-center mb-6">
                <Image src="/chai-brand-logo.png" alt="Chai Days" width={160} height={60} className="object-contain h-[50px] w-auto opacity-90" />
              </Link>
              <p className="font-sans text-sm text-on-surface-variant leading-relaxed max-w-xs">
                Chai Days CAFE INDIA PVT LTD.<br />
                A sanctuary of slow sips and intentional moments.
              </p>
            </div>
            
            {/* Quick Links */}
            <div className="md:col-span-2">
              <h4 className="font-sans text-[10px] font-bold tracking-[0.2em] uppercase text-primary mb-6">Menu</h4>
              <ul className="space-y-4 font-sans text-sm text-on-surface-variant">
                <li><Link href="/menu#signature-drinks" className="hover:text-secondary transition-colors">Signature</Link></li>
                <li><Link href="/menu#sweet-endings" className="hover:text-secondary transition-colors">Sweet Endings</Link></li>
                <li><Link href="/menu#light-bites" className="hover:text-secondary transition-colors">Light Bites</Link></li>
              </ul>
            </div>

            <div className="md:col-span-2">
              <h4 className="font-sans text-[10px] font-bold tracking-[0.2em] uppercase text-primary mb-6">Explore</h4>
              <ul className="space-y-4 font-sans text-sm text-on-surface-variant">
                <li><Link href="/about" className="hover:text-secondary transition-colors">Our Story</Link></li>
                <li><Link href="/experience" className="hover:text-secondary transition-colors">Experience</Link></li>
                <li><Link href="/gallery" className="hover:text-secondary transition-colors">Gallery</Link></li>
              </ul>
            </div>

            {/* Support */}
            <div className="md:col-span-4">
              <h4 className="font-sans text-[10px] font-bold tracking-[0.2em] uppercase text-primary mb-6">Visit Us</h4>
              <p className="font-sans text-sm text-on-surface-variant leading-relaxed mb-4">
                NO.1 & 2, NO.26/10, 80 FT ROAD, KRISHNAPPA COMPOUND, BANGALORE - 560068
              </p>
              <p className="font-sans text-sm text-on-surface-variant mb-2">info@chaidays.in</p>
              <p className="font-sans text-sm text-on-surface-variant">+91 99800 84666</p>
            </div>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-center border-t border-outline-variant/30 pt-8 gap-4">
            <p className="font-sans text-[10px] text-on-surface-variant tracking-widest uppercase">
              &copy; 2024 CHAI DAYS - ALL RIGHTS RESERVED.
            </p>
            <div className="flex gap-6">
              <Link href="#" className="font-sans text-[10px] tracking-[0.1em] uppercase text-on-surface-variant/60 hover:text-primary transition-colors">
                Privacy Policy
              </Link>
              <Link href="#" className="font-sans text-[10px] tracking-[0.1em] uppercase text-on-surface-variant/60 hover:text-primary transition-colors">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
