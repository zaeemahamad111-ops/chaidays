'use client';
import { useEffect, useState } from 'react';

export default function ScrollNavigation() {
  const [showTopButton, setShowTopButton] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowTopButton(window.scrollY > window.innerHeight * 0.6);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToMenu = () => {
    document.querySelector('[data-menu-section]')?.scrollIntoView({
      behavior: 'smooth',
    });
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <>
      <button onClick={scrollToMenu} className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2
        text-white/90 hover:text-white transition-all duration-300 group" aria-label="Scroll to menu" >
        <span className="font-sans text-[9px] tracking-[0.3em] uppercase">
          Explore Menu
        </span>

        <span
          className="w-10 h-10 rounded-full border border-white/50 flex items-center justify-center group-hover:border-white group-hover:bg-white/10 transition-all duration-300">
          <span className="material-symbols-outlined text-[20px] animate-bounce">
            keyboard_arrow_down
          </span>
        </span>
      </button>

      {showTopButton && (
        <button onClick={scrollToTop}
          className="fixed bottom-6 right-6 z-50 w-11 h-11 rounded-full bg-primary text-white flex items-center justify-center shadow-lg hover:bg-secondary transition-all duration-300" aria-label="Back to top">
          <span className="material-symbols-outlined text-[20px]">
            keyboard_arrow_up
          </span>
        </button>
      )}
    </>
  );
}