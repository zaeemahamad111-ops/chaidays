'use client';
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import ScrollReveal from '@/components/ScrollReveal';

export interface GalleryItem {
  id: number | string;
  category: string;
  label: string;
  colSpan: string;
  ratio: string;
  img: string;
  alt: string;
}

const defaultGalleryItems: GalleryItem[] = [
  {
    id: 1,
    category: "space",
    label: "SPACE • 01",
    colSpan: "col-span-12 md:col-span-8",
    ratio: "aspect-[16/9]",
    img: "/images/gallery/gallery-updated-1.jpg",
    alt: "Chai Days café experience"
  },
  {
    id: 2,
    category: "space",
    label: "SPACE • 02",
    colSpan: "col-span-12 md:col-span-4",
    ratio: "aspect-[3/4]",
    img: "/images/gallery/gallery-updated-2.jpg",
    alt: "Chai Days interior atmosphere"
  },
  {
    id: 3,
    category: "drinks",
    label: "DRINKS • 01",
    colSpan: "col-span-12 md:col-span-4",
    ratio: "aspect-[3/4]",
    img: "/images/gallery/gallery-updated-3.jpg",
    alt: "Chai Days signature beverage"
  },
  {
    id: 4,
    category: "space",
    label: "SPACE • 03",
    colSpan: "col-span-12 md:col-span-4",
    ratio: "aspect-[3/4]",
    img: "/images/gallery/gallery-updated-4.jpg",
    alt: "Chai Days cozy seating"
  },
  {
    id: 5,
    category: "drinks",
    label: "DRINKS • 02",
    colSpan: "col-span-12 md:col-span-4",
    ratio: "aspect-[3/4]",
    img: "/images/gallery/gallery-updated-5.jpg",
    alt: "Chai Days handcrafted brew"
  },
  {
    id: 6,
    category: "space",
    label: "SPACE • 04",
    colSpan: "col-span-12 md:col-span-6",
    ratio: "aspect-[3/4]",
    img: "/images/gallery/gallery-updated-6.jpg",
    alt: "Chai Days café aesthetic"
  },
  {
    id: 7,
    category: "drinks",
    label: "DRINKS • 03",
    colSpan: "col-span-12 md:col-span-6",
    ratio: "aspect-[3/4]",
    img: "/images/gallery/gallery-updated-7.jpg",
    alt: "Chai Days special pour"
  },
  {
    id: 8,
    category: "space",
    label: "SPACE • 05",
    colSpan: "col-span-12 md:col-span-4",
    ratio: "aspect-[3/4]",
    img: "/images/gallery/gallery-updated-8.jpg",
    alt: "Chai Days community corner"
  },
  {
    id: 9,
    category: "drinks",
    label: "DRINKS • 04",
    colSpan: "col-span-12 md:col-span-4",
    ratio: "aspect-[3/4]",
    img: "/images/gallery/gallery-updated-9.jpg",
    alt: "Chai Days freshly steeped chai"
  },
  {
    id: 10,
    category: "space",
    label: "SPACE • 06",
    colSpan: "col-span-12 md:col-span-4",
    ratio: "aspect-[3/4]",
    img: "/images/gallery/gallery-updated-10.jpg",
    alt: "Chai Days warm evening atmosphere"
  }
];

const categories = ['all', 'space', 'drinks'];

export default function GalleryClient({ 
  contentData = {},
  initialItems = []
}: { 
  contentData?: any;
  initialItems?: GalleryItem[];
}) {
  const items = initialItems && initialItems.length > 0 ? initialItems : defaultGalleryItems;
  const [active, setActive] = useState('all');
  const filtered = active === 'all' ? items : items.filter((i) => i.category === active);

  return (
    <>
      <section className="pt-[140px] pb-16 text-center px-6 md:px-16 max-w-[1440px] mx-auto">
        <p className="hero-text-1 font-sans text-[11px] tracking-[0.3em] uppercase text-secondary mb-4">{contentData.heroSubtitle || 'Moments of Mindfulness'}</p>
        <h1 className="hero-text-2 font-serif text-[56px] md:text-[72px] text-primary mb-6">{contentData.heroTitle || 'Our Visual Journal'}</h1>
        <p className="hero-text-3 font-sans text-lg text-on-surface-variant max-w-2xl mx-auto leading-relaxed">
          {contentData.heroDesc || 'An intimate collection of cozy moments we cherish. From the delicate steam of a morning pour to the architectural silence of our space.'}
        </p>
      </section>

      <div className="flex flex-wrap justify-center gap-4 mb-16 px-6">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActive(cat)}
            className={`px-8 py-3 rounded-full font-sans text-[11px] tracking-[0.15em] uppercase transition-all duration-300 cursor-pointer ${
              active === cat
                ? 'bg-primary text-white shadow-lg shadow-primary/20'
                : 'bg-surface-container text-on-surface-variant border border-outline-variant/50 hover:bg-surface-container-high'
            }`}
          >
            {cat === 'all' ? 'All Moments' : cat.charAt(0).toUpperCase() + cat.slice(1)}
          </button>
        ))}
      </div>

      <div className="max-w-[1440px] mx-auto px-6 md:px-16">
        <div className="grid grid-cols-12 gap-6 mb-32">
          {filtered.map((item, i) => (
            <div key={item.id} className={`${item.colSpan} gallery-item group cursor-pointer`}>
              <div className={`${item.ratio} overflow-hidden rounded-xl relative bg-surface-container`}>
                <Image
                  src={item.img}
                  alt={item.alt}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                  loading={i < 4 ? 'eager' : 'lazy'}
                  priority={i < 2}
                  sizes={
                    item.colSpan.includes('md:col-span-8')
                      ? '(max-width: 768px) 100vw, 66vw'
                      : item.colSpan.includes('md:col-span-6')
                      ? '(max-width: 768px) 100vw, 50vw'
                      : item.colSpan.includes('md:col-span-4')
                      ? '(max-width: 768px) 100vw, 33vw'
                      : '100vw'
                  }
                />
                <div className="gallery-overlay absolute inset-0 bg-primary/20 flex items-end p-6">
                  <span className="text-white font-sans text-[11px] tracking-widest bg-white/20 backdrop-blur-md px-5 py-2 rounded-full border border-white/30">
                    {item.label}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <ScrollReveal className="text-center border-t border-outline-variant pt-24 pb-32 max-w-3xl mx-auto">
          <h2 className="font-serif text-4xl text-primary mb-6">{contentData.ctaTitle || 'Ready for a cozy experience?'}</h2>
          <p className="font-sans text-lg text-on-surface-variant mb-10 leading-relaxed">
            {contentData.ctaDesc || 'We invite you to step into our world and witness these moments firsthand. Our doors are open for slow living and fine tea.'}
          </p>
          <Link href={contentData.ctaBtnLink || "/visit"} className="inline-flex items-center bg-primary text-white px-12 py-4 rounded-full font-sans text-[11px] tracking-widest uppercase hover:bg-primary-container transition-colors duration-300 shadow-xl shadow-primary/20">
            {contentData.ctaBtnText || 'Plan Your Visit'}
          </Link>
        </ScrollReveal>
      </div>
    </>
  );
}
