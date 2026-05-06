'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/menu', label: 'Menu' },
  { href: '/gallery', label: 'Gallery' },
  { href: '/experience', label: 'Experience' },
  { href: '/visit', label: 'Visit' },
];

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => { setMenuOpen(false); }, [pathname]);

  const isHeroTransparent = pathname === '/' && !scrolled && !menuOpen;

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled || menuOpen ? 'nav-glass' : 'bg-transparent'
        }`}
      >
        <nav className="max-w-[1440px] mx-auto px-6 md:px-16 h-[72px] flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center flex-shrink-0">
            <Image src="/chai-brand-logo.png" alt="Chai Days" width={140} height={50} className="object-contain h-[45px] w-auto transition-all duration-500" priority />
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              let linkColor = isActive ? 'text-secondary border-b border-secondary pb-0.5' : 'text-on-surface-variant hover:text-primary';
              if (isHeroTransparent) {
                linkColor = isActive ? 'text-white border-b border-white pb-0.5' : 'text-white/80 hover:text-white';
              }
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`font-sans text-[12px] font-600 tracking-[0.15em] uppercase transition-colors duration-300 animated-link ${linkColor}`}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>

          {/* CTA + Hamburger */}
          <div className="flex items-center gap-4">
            <Link
              href="/visit"
              className={`hidden md:inline-flex items-center px-6 py-2.5 rounded-full font-sans text-[11px] font-semibold tracking-[0.15em] uppercase transition-colors duration-300 active:scale-95 ${
                isHeroTransparent 
                  ? 'bg-transparent border border-white text-white hover:bg-white hover:text-secondary' 
                  : 'bg-secondary text-white border border-transparent hover:bg-[#6b3b00]'
              }`}
            >
              Order Now
            </Link>
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className={`md:hidden flex flex-col gap-[5px] p-2 ${menuOpen ? 'hamburger-open' : ''} ${isHeroTransparent ? 'brightness-0 invert' : ''}`}
              aria-label="Toggle navigation"
            >
              <span className="hamburger-line" />
              <span className="hamburger-line" />
              <span className="hamburger-line" />
            </button>
          </div>
        </nav>

        {/* Mobile Menu */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-500 ease-in-out ${
            menuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <div className="px-6 pb-6 pt-2 flex flex-col gap-4 border-t border-outline-variant/30">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`font-sans text-sm font-semibold tracking-[0.12em] uppercase py-2 transition-colors ${
                  pathname === link.href ? 'text-secondary' : 'text-on-surface-variant'
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/visit"
              className="mt-2 inline-flex items-center justify-center bg-secondary text-white px-6 py-3 rounded-full font-sans text-[11px] font-semibold tracking-[0.15em] uppercase hover:bg-[#6b3b00] transition-colors"
            >
              Order Now
            </Link>
          </div>
        </div>
      </header>
    </>
  );
}
