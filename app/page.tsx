import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import ScrollReveal from '@/components/ScrollReveal';
import HeroVideo from '@/components/HeroVideo';
import { getSiteData } from "@/lib/data";

export const revalidate = 0;

// Inherits dynamic metadata from layout.tsx

const signatureItems = [
  {
    tag: 'BESTSELLER',
    name: 'Aged Masala Blend',
    desc: 'Our secret blend of seven heritage spices, steeped with devotion for twelve hours.',
    img: '/images/signature-3.jpg',
  },
  {
    tag: 'RESTORATIVE',
    name: 'Golden Sun Latte',
    desc: 'Organic turmeric and vibrant ginger whisked into a cloud of creamy coconut milk.',
    img: '/images/signature-1.jpg',
  },
  {
    tag: 'FLORAL',
    name: 'Kashmiri Velvet',
    desc: 'Saffron strands and green tea infused with the essence of Himalayan dawn.',
    img: '/images/signature-2.jpg',
  },
];

export default async function HomePage() {
  let heroData = undefined;
  let contentData: any = {};
  let outlets: any[] = [];
  try {
    const data = await getSiteData();
    if (data) {
      if (data.hero) heroData = data.hero;
      contentData = data.pages?.home?.content || {};
      outlets = data.outlets || [];
    }
  } catch (error) {
    console.error("Error loading home data:", error);
  }

  return (
    <>
      <HeroVideo heroData={heroData} />

      {/* ── Experience Section ── */}
      <section className="min-h-screen flex items-center py-32 md:py-48 bg-[#ebdcd0] relative overflow-hidden">
        {/* Subtle background decoration */}
        <div className="absolute top-0 right-0 w-[40%] h-full bg-[#e3d1c1] -skew-x-12 translate-x-20 pointer-events-none" />

        <div className="max-w-[1440px] mx-auto px-6 md:px-16 grid grid-cols-1 md:grid-cols-12 gap-16 items-center relative z-10">
          
          {/* Images Column */}
          <ScrollReveal className="md:col-span-6 lg:col-span-7 relative">
            <div className="relative w-full max-w-lg md:mr-auto">
              {/* Main Image */}
              <div className="aspect-[4/5] overflow-hidden shadow-2xl">
                <Image
                  src={contentData.expMainImg || "/images/curated-main.jpg"}
                  alt="Barista crafting artisan chai at Chai Days"
                  width={800}
                  height={1000}
                  className="w-full h-full object-cover scale-105 hover:scale-100 transition-all duration-[1.5s] ease-out"
                  priority
                  sizes="(max-width: 768px) 100vw, 58vw"
                />
              </div>
              
              {/* Overlapping smaller accent image */}
              <div className="absolute -bottom-12 -right-6 md:-right-16 w-[55%] aspect-square overflow-hidden shadow-[0_30px_60px_rgba(0,0,0,0.15)] border-[8px] border-[#ebdcd0] hidden sm:block">
                <Image
                  src={contentData.expAccentImg || "/images/curated-accent.jpg"}
                  alt="Leather reading nook"
                  width={500}
                  height={500}
                  className="w-full h-full object-cover scale-105 hover:scale-100 transition-transform duration-[1.5s] ease-out"
                  loading="lazy"
                  sizes="(max-width: 768px) 0vw, 30vw"
                />
              </div>

              {/* Minimal floating badge */}
              <div className="absolute top-10 -left-6 md:-left-10 bg-[#fdf9f4]/90 backdrop-blur-md px-6 py-4 shadow-xl flex items-center gap-4">
                <span className="w-8 h-[1px] bg-secondary" />
                <span className="font-sans text-[9px] tracking-[0.25em] uppercase text-primary font-semibold">Quiet Luxury</span>
              </div>
            </div>
          </ScrollReveal>

          {/* Text Column */}
          <ScrollReveal className="md:col-span-6 lg:col-span-5 md:pl-8 space-y-10 mt-20 md:mt-0" delay={200}>
            <div className="flex items-center gap-4">
              <span className="w-12 h-[1px] bg-secondary" />
              <span className="font-sans text-[11px] font-semibold tracking-[0.3em] uppercase text-secondary">
                {contentData.expSubtitle || 'Curated Atmosphere'}
              </span>
            </div>
            
            <h2 className="font-serif text-5xl md:text-6xl text-primary leading-[1.1] tracking-tight" dangerouslySetInnerHTML={{ __html: contentData.expTitle || 'A Space Designed for <span class="italic">Intentionality.</span>' }} />
            <p className="hero-text-3 font-sans text-lg text-on-surface-variant max-w-lg leading-relaxed">
              {contentData.expDesc || 'Every sip is a meditation. Our environments are sculpted to foster restored focus and organic community.'}
            </p>
            
            <div className="space-y-10 border-t border-outline-variant/40 pt-10">
              <div className="space-y-6">
                <h2 className="font-serif text-4xl md:text-5xl text-primary leading-tight">{contentData.stayTitle || 'Stay Awhile'}</h2>
                <div className="w-16 h-1 bg-secondary-container" />
                <p className="font-sans text-lg text-on-surface-variant leading-relaxed">
                  {contentData.stayDesc || 'More than a café—a warm sanctuary to relax, unwind, and escape the daily bustle. Our cozy, vibrant spaces are designed to make you feel right at home.'}
                </p>
                <div className="pt-2">
                  <Link href={contentData.stayBtnLink || "/visit"} className="inline-block border-b border-primary pb-1 font-sans text-xs tracking-widest uppercase text-primary hover:text-secondary hover:border-secondary transition-all">{contentData.stayBtnText || 'Find Your Sanctuary'}</Link>
                </div>
              </div>
            </div>

            <div className="pt-6">
              <Link href="/gallery" className="inline-flex items-center gap-3 font-sans text-[11px] font-bold tracking-[0.2em] uppercase text-primary group hover:text-secondary transition-colors duration-300">
                <span className="border-b border-primary/30 group-hover:border-secondary transition-colors pb-1">Explore Spaces</span>
                <span className="material-symbols-outlined text-[18px] transform group-hover:translate-x-1 transition-transform duration-300">arrow_forward</span>
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ── Signature Selection ── */}
      <section className="py-32 bg-surface-container-low">
        <div className="max-w-[1440px] mx-auto px-6 md:px-16">
          <div className="flex flex-col md:flex-row justify-between items-end mb-20 border-b border-outline-variant pb-8">
            <ScrollReveal>
              <h2 className="font-serif text-5xl md:text-6xl text-primary">The Signature Selection</h2>
            </ScrollReveal>
            <ScrollReveal delay={100}>
              <p className="font-sans text-sm text-on-surface-variant max-w-xs md:text-right mt-4 md:mt-0">
                A curation of our most revered blends, each a chapter in our heritage.
              </p>
            </ScrollReveal>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {signatureItems.map((item, i) => (
              <ScrollReveal key={item.name} delay={i * 150} className={i === 1 ? 'md:mt-12' : i === 2 ? 'md:mt-24' : ''}>
                <div className="group card-hover">
                  <div className="aspect-[3/4] overflow-hidden mb-6 bg-surface-container">
                    <Image
                      src={item.img}
                      alt={item.name}
                      width={500}
                      height={667}
                      className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                      loading="lazy"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                  </div>
                  <span className="font-sans text-[10px] tracking-[0.3em] uppercase text-on-surface-variant mb-2 block">
                    {item.tag}
                  </span>
                  <h3 className="font-serif text-2xl text-primary mb-3">{item.name}</h3>
                  <p className="font-sans text-sm text-on-surface-variant leading-relaxed">{item.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>

          <ScrollReveal className="mt-32 max-w-3xl mx-auto text-center space-y-8">
            <h2 className="font-serif text-4xl md:text-5xl text-primary">More than Drinks</h2>
            <p className="font-sans text-lg text-on-surface-variant leading-relaxed">
              Chai Days is an experience—a blend of culture, innovation, and love. From the first aroma to the last sip, we take you on a journey beyond the ordinary.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* ── Gallery Glimpses ── */}
      <section className="py-32 bg-surface">
        <div className="max-w-[1440px] mx-auto px-6 md:px-16">
          <ScrollReveal className="text-center mb-20">
            <h2 className="font-serif text-5xl text-primary italic">Glimpses of Comfort</h2>
          </ScrollReveal>
          <div className="grid grid-cols-12 gap-4 h-[600px] md:h-[900px]">
            <ScrollReveal className="col-span-8 h-full overflow-hidden">
              <Image
                src="/images/gallery/drink-1.jpg"
                alt="The Signature Cozy Chai"
                width={900}
                height={900}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-1000"
                loading="lazy"
                sizes="(max-width: 768px) 100vw, 66vw"
              />
            </ScrollReveal>
            <div className="col-span-4 flex flex-col gap-4 h-full">
              <ScrollReveal delay={150} className="h-1/3 overflow-hidden">
                <Image
                  src="/images/gallery/space-2.jpg"
                  alt="Atmospheric seating"
                  width={400}
                  height={300}
                  className="w-full h-full object-cover hover:scale-110 transition-transform duration-1000"
                  loading="lazy"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </ScrollReveal>
              <ScrollReveal delay={250} className="h-2/3 overflow-hidden">
                <Image
                  src="/images/gallery/dessert-2.jpg"
                  alt="Artisanal dessert pairing"
                  width={400}
                  height={600}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-1000"
                  loading="lazy"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {/* ── Ambience Split ── */}
      <section className="min-h-[80vh] flex flex-col md:flex-row">
        <div className="w-full md:w-1/2 bg-primary flex items-center justify-center p-16">
          <ScrollReveal className="max-w-md">
            <span className="font-sans text-[11px] font-semibold tracking-[0.3em] uppercase text-primary-fixed-dim mb-6 block">
              {contentData.philSubtitle || 'Our Philosophy'}
            </span>
            <h2 className="font-serif text-4xl md:text-5xl text-surface mb-8 leading-tight">
              {contentData.philTitle || 'A Sanctuary to Feel Different'}
            </h2>
            <p className="font-sans text-lg text-primary-fixed mb-10 opacity-80 leading-relaxed">
              {contentData.philDesc || 'From tactile ceramics to acoustic dampening, every square inch of Chai Days is engineered for calm. Leave the city\'s pulse at our threshold.'}
            </p>
            <Link
              href={contentData.philBtnLink || "/about"}
              className="inline-block text-surface-bright font-sans text-[11px] font-semibold tracking-widest border-b border-surface-bright pb-1 uppercase hover:text-secondary-fixed transition-colors animated-link"
            >
              The Design Story
            </Link>
          </ScrollReveal>
        </div>
        <div className="w-full md:w-1/2 overflow-hidden min-h-[400px] md:min-h-0">
          <Image
            src={contentData.philImg || "/images/philosophy.jpg"}
            alt="Minimalist Chai Days interior ambience"
            width={900}
            height={900}
            className="w-full h-full object-cover brightness-90 hover:brightness-100 transition-all duration-1000"
            loading="lazy"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>
      </section>

      {/* ── Visit Teaser ── */}
      <section className="py-32 bg-surface">
        <div className="max-w-[1440px] mx-auto px-6 md:px-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-24 items-center">
            <ScrollReveal className="space-y-10">
              <h2 className="font-serif text-4xl md:text-5xl text-primary">Inhabit Our World</h2>
              {outlets.length > 0 ? (
                <div className="space-y-10 border-l border-outline-variant pl-8">
                  <div>
                    <h4 className="font-sans text-[11px] font-semibold tracking-[0.2em] uppercase text-on-surface-variant mb-2">Location</h4>
                    <h3 className="font-serif text-2xl text-primary mb-2">{outlets[0].name}</h3>
                    <address className="font-sans text-base text-on-surface-variant not-italic" dangerouslySetInnerHTML={{ __html: outlets[0].address }} />
                  </div>
                  <div>
                    <h4 className="font-sans text-[11px] font-semibold tracking-[0.2em] uppercase text-on-surface-variant mb-3">Opening Hours</h4>
                    <div className="space-y-2 font-sans text-base text-on-surface">
                      {(outlets[0].hours || '').split('\n').filter(Boolean).map((line: string, i: number) => {
                        const colonIdx = line.indexOf(':');
                        const day = colonIdx >= 0 ? line.slice(0, colonIdx) : line;
                        const time = colonIdx >= 0 ? line.slice(colonIdx + 1).trim() : '';
                        return (
                          <div key={i} className="flex justify-between max-w-xs">
                            <span>{day.trim()}</span>
                            {time && <span className="font-semibold text-primary">{time}</span>}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="space-y-10 border-l border-outline-variant pl-8">
                  <div>
                    <h4 className="font-sans text-[11px] font-semibold tracking-[0.2em] uppercase text-on-surface-variant mb-2">Location</h4>
                    <p className="font-serif text-2xl text-primary">
                      124 Comfort Lane, Spiced Quarter<br />London, EC1V 4PW
                    </p>
                  </div>
                  <div>
                    <h4 className="font-sans text-[11px] font-semibold tracking-[0.2em] uppercase text-on-surface-variant mb-3">Opening Hours</h4>
                    <ul className="font-sans text-base text-on-surface space-y-2">
                      {[['Mon — Fri', '07:00 — 19:00'], ['Saturday', '08:00 — 20:00'], ['Sunday', '09:00 — 18:00']].map(([day, hours]) => (
                        <li key={day} className="flex justify-between max-w-xs">
                          <span>{day}</span>
                          <span className="font-semibold text-primary">{hours}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
              <Link
                href="/visit"
                className="inline-flex items-center gap-2 bg-secondary text-white px-8 py-4 rounded-full font-sans text-[11px] font-semibold tracking-[0.15em] uppercase hover:bg-[#6b3b00] transition-colors duration-300"
              >
                Plan Your Visit
              </Link>
            </ScrollReveal>
            <ScrollReveal delay={200} className="aspect-square bg-surface-container-high relative overflow-hidden group">
              <Image
                src={outlets.length > 0 && outlets[0].img ? outlets[0].img : "/images/gallery/space-7.jpg"}
                alt="View on map — Chai Days location"
                fill
                className="object-cover opacity-60 transition-transform duration-[2s] group-hover:scale-110"
                loading="lazy"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              {outlets.length > 0 && outlets[0].mapUrl ? (
                <a href={outlets[0].mapUrl} target="_blank" rel="noopener noreferrer" className="absolute inset-0 flex flex-col items-center justify-center text-primary/40 hover:text-primary transition-colors cursor-pointer">
                  <span className="material-symbols-outlined text-6xl mb-2 drop-shadow-md">explore</span>
                  <p className="font-sans text-[11px] tracking-[0.2em] uppercase drop-shadow-md">View on Map</p>
                </a>
              ) : (
                <div className="absolute inset-0 flex flex-col items-center justify-center text-primary/40 pointer-events-none">
                  <span className="material-symbols-outlined text-6xl mb-2 drop-shadow-md">explore</span>
                  <p className="font-sans text-[11px] tracking-[0.2em] uppercase drop-shadow-md">View on Map</p>
                </div>
              )}
            </ScrollReveal>
          </div>
        </div>
      </section>
    </>
  );
}
