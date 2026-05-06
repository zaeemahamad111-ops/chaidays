'use client';
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import ScrollReveal from '@/components/ScrollReveal';

const galleryItems = [
  {
    id: 1,
    category: "space",
    label: "SPACE • 01",
    colSpan: "col-span-12 md:col-span-8",
    ratio: "aspect-[16/9]",
    img: "/images/gallery/space-1.jpg",
    alt: "Chai Days space 1"
  },
  {
    id: 2,
    category: "space",
    label: "SPACE • 02",
    colSpan: "col-span-12 md:col-span-4",
    ratio: "aspect-[3/4]",
    img: "/images/gallery/space-2.jpg",
    alt: "Chai Days space 2"
  },
  {
    id: 3,
    category: "space",
    label: "SPACE • 03",
    colSpan: "col-span-12 md:col-span-4",
    ratio: "aspect-square",
    img: "/images/gallery/space-3.jpg",
    alt: "Chai Days space 3"
  },
  {
    id: 4,
    category: "space",
    label: "SPACE • 04",
    colSpan: "col-span-12 md:col-span-4",
    ratio: "aspect-square",
    img: "/images/gallery/space-4.jpg",
    alt: "Chai Days space 4"
  },
  {
    id: 5,
    category: "space",
    label: "SPACE • 05",
    colSpan: "col-span-12 md:col-span-4",
    ratio: "aspect-[3/4]",
    img: "/images/gallery/space-5.jpg",
    alt: "Chai Days space 5"
  },
  {
    id: 6,
    category: "space",
    label: "SPACE • 06",
    colSpan: "col-span-12 md:col-span-8",
    ratio: "aspect-[16/9]",
    img: "/images/gallery/space-6.jpg",
    alt: "Chai Days space 6"
  },
  {
    id: 7,
    category: "space",
    label: "SPACE • 07",
    colSpan: "col-span-12 md:col-span-6",
    ratio: "aspect-[4/3]",
    img: "/images/gallery/space-7.jpg",
    alt: "Chai Days space 7"
  },
  {
    id: 8,
    category: "drinks",
    label: "DRINKS • 01",
    colSpan: "col-span-12 md:col-span-6",
    ratio: "aspect-[4/3]",
    img: "/images/gallery/drink-1.jpg",
    alt: "Chai Days drinks 1"
  },
  {
    id: 9,
    category: "drinks",
    label: "DRINKS • 02",
    colSpan: "col-span-12 md:col-span-8",
    ratio: "aspect-[16/9]",
    img: "/images/gallery/drink-2.jpg",
    alt: "Chai Days drinks 2"
  },
  {
    id: 10,
    category: "drinks",
    label: "DRINKS • 03",
    colSpan: "col-span-12 md:col-span-4",
    ratio: "aspect-[3/4]",
    img: "/images/gallery/drink-3.jpg",
    alt: "Chai Days drinks 3"
  },
  {
    id: 11,
    category: "drinks",
    label: "DRINKS • 04",
    colSpan: "col-span-12 md:col-span-4",
    ratio: "aspect-square",
    img: "/images/gallery/drink-4.jpg",
    alt: "Chai Days drinks 4"
  },
  {
    id: 12,
    category: "drinks",
    label: "DRINKS • 05",
    colSpan: "col-span-12 md:col-span-4",
    ratio: "aspect-square",
    img: "/images/gallery/drink-5.jpg",
    alt: "Chai Days drinks 5"
  },
  {
    id: 13,
    category: "drinks",
    label: "DRINKS • 06",
    colSpan: "col-span-12 md:col-span-4",
    ratio: "aspect-[3/4]",
    img: "/images/gallery/drink-6.jpg",
    alt: "Chai Days drinks 6"
  },
  {
    id: 14,
    category: "drinks",
    label: "DRINKS • 07",
    colSpan: "col-span-12 md:col-span-8",
    ratio: "aspect-[16/9]",
    img: "/images/gallery/drink-7.jpg",
    alt: "Chai Days drinks 7"
  },
  {
    id: 15,
    category: "drinks",
    label: "DRINKS • 08",
    colSpan: "col-span-12 md:col-span-6",
    ratio: "aspect-[4/3]",
    img: "/images/gallery/drink-8.jpg",
    alt: "Chai Days drinks 8"
  },
  {
    id: 16,
    category: "drinks",
    label: "DRINKS • 09",
    colSpan: "col-span-12 md:col-span-6",
    ratio: "aspect-[4/3]",
    img: "/images/gallery/drink-9.jpg",
    alt: "Chai Days drinks 9"
  },
  {
    id: 17,
    category: "drinks",
    label: "DRINKS • 10",
    colSpan: "col-span-12 md:col-span-8",
    ratio: "aspect-[16/9]",
    img: "/images/gallery/drink-10.jpg",
    alt: "Chai Days drinks 10"
  },
  {
    id: 18,
    category: "drinks",
    label: "DRINKS • 11",
    colSpan: "col-span-12 md:col-span-4",
    ratio: "aspect-[3/4]",
    img: "/images/gallery/drink-11.jpg",
    alt: "Chai Days drinks 11"
  },
  {
    id: 19,
    category: "drinks",
    label: "DRINKS • 12",
    colSpan: "col-span-12 md:col-span-4",
    ratio: "aspect-square",
    img: "/images/gallery/drink-12.jpg",
    alt: "Chai Days drinks 12"
  },
  {
    id: 20,
    category: "drinks",
    label: "DRINKS • 13",
    colSpan: "col-span-12 md:col-span-4",
    ratio: "aspect-square",
    img: "/images/gallery/drink-13.jpg",
    alt: "Chai Days drinks 13"
  },
  {
    id: 21,
    category: "drinks",
    label: "DRINKS • 14",
    colSpan: "col-span-12 md:col-span-4",
    ratio: "aspect-[3/4]",
    img: "/images/gallery/drink-14.jpg",
    alt: "Chai Days drinks 14"
  },
  {
    id: 22,
    category: "drinks",
    label: "DRINKS • 15",
    colSpan: "col-span-12 md:col-span-8",
    ratio: "aspect-[16/9]",
    img: "/images/gallery/drink-15.jpg",
    alt: "Chai Days drinks 15"
  },
  {
    id: 23,
    category: "desserts",
    label: "DESSERTS • 01",
    colSpan: "col-span-12 md:col-span-6",
    ratio: "aspect-[4/3]",
    img: "/images/gallery/dessert-1.jpg",
    alt: "Chai Days desserts 1"
  },
  {
    id: 24,
    category: "desserts",
    label: "DESSERTS • 02",
    colSpan: "col-span-12 md:col-span-6",
    ratio: "aspect-[4/3]",
    img: "/images/gallery/dessert-2.jpg",
    alt: "Chai Days desserts 2"
  },
  {
    id: 25,
    category: "desserts",
    label: "DESSERTS • 03",
    colSpan: "col-span-12 md:col-span-8",
    ratio: "aspect-[16/9]",
    img: "/images/gallery/dessert-3.jpg",
    alt: "Chai Days desserts 3"
  },
  {
    id: 26,
    category: "desserts",
    label: "DESSERTS • 04",
    colSpan: "col-span-12 md:col-span-4",
    ratio: "aspect-[3/4]",
    img: "/images/gallery/dessert-4.jpg",
    alt: "Chai Days desserts 4"
  }
];

const categories = ['all', 'drinks', 'space', 'desserts'];

export default function GalleryClient() {
  const [active, setActive] = useState('all');
  const filtered = active === 'all' ? galleryItems : galleryItems.filter((i) => i.category === active);

  return (
    <>
      <section className="pt-[140px] pb-16 text-center px-6 md:px-16 max-w-[1440px] mx-auto">
        <p className="hero-text-1 font-sans text-[11px] tracking-[0.3em] uppercase text-secondary mb-4">Moments of Mindfulness</p>
        <h1 className="hero-text-2 font-serif text-[56px] md:text-[72px] text-primary mb-6">Our Visual Journal</h1>
        <p className="hero-text-3 font-sans text-lg text-on-surface-variant max-w-2xl mx-auto leading-relaxed">
          An intimate collection of the rituals we cherish. From the delicate steam of a morning pour to the architectural silence of our space.
        </p>
      </section>

      <div className="flex flex-wrap justify-center gap-4 mb-16 px-6">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActive(cat)}
            className={`px-8 py-3 rounded-full font-sans text-[11px] tracking-[0.15em] uppercase transition-all duration-300 ${
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
              <div className={`${item.ratio} overflow-hidden rounded-xl relative`}>
                <Image
                  src={item.img}
                  alt={item.alt}
                  fill
                  className="object-cover"
                  loading={i < 2 ? 'eager' : 'lazy'}
                  sizes="(max-width: 768px) 100vw, 66vw"
                  unoptimized={true}
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
          <h2 className="font-serif text-4xl text-primary mb-6">Ready to experience the ritual?</h2>
          <p className="font-sans text-lg text-on-surface-variant mb-10 leading-relaxed">
            We invite you to step into our world and witness these moments firsthand. Our doors are open for slow living and fine tea.
          </p>
          <Link href="/visit" className="inline-flex items-center bg-primary text-white px-12 py-4 rounded-full font-sans text-[11px] tracking-widest uppercase hover:bg-primary-container transition-colors duration-300 shadow-xl shadow-primary/20">
            Plan Your Visit
          </Link>
        </ScrollReveal>
      </div>
    </>
  );
}
