'use client';

import { useEffect, useRef, useState } from 'react';

interface Category {
  category: string;
}

interface MenuCategoryNavProps {
  categories: Category[];
}

export default function MenuCategoryNav({
  categories,
}: MenuCategoryNavProps) {
  const [activeCategory, setActiveCategory] = useState(
    categories[0]?.category || ''
  );

  const navRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const sections = categories
      .map((cat) =>
        document.getElementById(
          cat.category.toLowerCase().replace(/\s+/g, '-')
        )
      )
      .filter(Boolean) as HTMLElement[];

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleSections = entries
          .filter((entry) => entry.isIntersecting)
          .sort(
            (a, b) =>
              b.intersectionRatio - a.intersectionRatio
          );

        if (visibleSections.length > 0) {
          setActiveCategory(
            visibleSections[0].target.getAttribute('data-category') || ''
          );
        }
      },
      {
        root: null,
        rootMargin: '-120px 0px -55% 0px',
        threshold: [0.1, 0.25, 0.5, 0.75],
      }
    );

    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, [categories]);

  useEffect(() => {
    const activeElement = navRef.current?.querySelector(
      `[data-category="${CSS.escape(activeCategory)}"]`
    ) as HTMLElement | null;

    activeElement?.scrollIntoView({
      behavior: 'smooth',
      block: 'nearest',
      inline: 'center',
    });
  }, [activeCategory]);

  const handleCategoryClick = (category: string) => {
    const id = category.toLowerCase().replace(/\s+/g, '-');
    const section = document.getElementById(id);

    if (!section) return;

    setActiveCategory(category);

    section.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  };

  return (
    <div className="sticky top-[72px] z-40 bg-surface/95 backdrop-blur-sm border-y border-outline-variant/30">
      <div className="max-w-[1440px] mx-auto px-6 md:px-16 py-4 relative">
        <div
          ref={navRef}
          className="flex items-center gap-6 overflow-x-auto flex-nowrap [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden snap-x snap-mandatory pr-10">
          {categories.map((cat) => {
            const isActive = activeCategory === cat.category;

            return (
              <button
                key={cat.category}
                data-category={cat.category}
                onClick={() => handleCategoryClick(cat.category)}
                className={`
                  snap-start shrink-0 font-sans text-[11px] font-semibold tracking-[0.15em] uppercase whitespace-nowrap transition-all duration-300 relative pb-1
                  ${
                    isActive
                      ? 'text-secondary'
                      : 'text-on-surface-variant hover:text-secondary'
                  }
                `}
              >
                {cat.category}

                <span
                  className={`absolute left-0 right-0 bottom-0 h-[1px] bg-secondary transition-all duration-300
                    ${
                      isActive
                        ? 'opacity-100 scale-x-100'
                        : 'opacity-0 scale-x-0'
                    }
                  `}
                />
              </button>
            );
          })}
        </div>

        <div className="md:hidden absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-surface via-surface/80 to-transparent pointer-events-none flex items-center justify-end pr-4">
          <span className="material-symbols-outlined text-secondary animate-pulse text-[18px]">
            arrow_forward
          </span>
        </div>
      </div>
    </div>
  );
}