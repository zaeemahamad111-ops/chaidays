import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import ScrollReveal from '@/components/ScrollReveal';

export async function generateMetadata(): Promise<Metadata> {
  let seo: any = {};
  try {
    const data = await getSiteData();
    seo = data?.pages?.experience?.seo || {};
  } catch (e) {}

  return {
    title: seo.title || 'The Experience',
    description: seo.description || 'Step into the Chai Days sensory experience — the scent of freshly ground spices, the texture of hand-thrown stoneware, and a curated atmosphere for slow living.',
    keywords: seo.keywords || [],
    openGraph: { title: seo.title || 'The Experience | Chai Days', url: seo.canonical || 'https://chaidays.com/experience' },
  };
}

import { getSiteData } from '@/lib/data';

export default async function ExperiencePage() {
  let contentData: any = {};
  try {
    const data = await getSiteData();
    contentData = data?.pages?.experience?.content || {};
  } catch (e) {
    console.error(e);
  }

  return (
    <>
      {/* ── Hero ── */}
      <section className="pt-[140px] pb-0 px-6 md:px-16 max-w-[1440px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center py-20">
          <div className="space-y-8">
            <p className="hero-text-1 font-sans text-[11px] tracking-[0.3em] uppercase text-secondary">{contentData.heroSubtitle || 'The Sensory Experience'}</p>
            <h1 className="hero-text-2 font-serif text-[56px] md:text-[72px] text-primary-container leading-tight" dangerouslySetInnerHTML={{ __html: contentData.heroTitle || 'Elevating the everyday through intentional sips.' }} />
            <p className="hero-text-3 font-sans text-lg text-on-surface-variant max-w-lg leading-relaxed">
              {contentData.heroDesc || 'Step into a space where time slows down. Chai Days is more than a café; it is a curated sensory journey designed for the modern connoisseur of slow living.'}
            </p>
          </div>
          <ScrollReveal delay={150} className="relative aspect-square lg:aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl group">
            <Image 
              src={contentData.heroImg || "/images/gallery/space-3.jpg"} 
              alt="Cinematic chai ritual — aromatic steam and warm tones" 
              fill 
              className="object-cover transition-transform duration-700 group-hover:scale-105" 
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </ScrollReveal>
        </div>
      </section>

      {/* ── Pillar I: Matcha Tropic Pearl ── */}
      <section className="py-32 bg-primary text-surface">
        <div className="max-w-[1440px] mx-auto px-6 md:px-16 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <ScrollReveal className="order-2 lg:order-1 rounded-2xl overflow-hidden h-[500px] relative">
            <Image 
              src={contentData.pillar1Img || "/images/gallery/drink-10.jpg"} 
              alt="Matcha Tropic Pearl — signature Chai Days drink" 
              fill 
              className="object-cover" 
              loading="lazy"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </ScrollReveal>
          <ScrollReveal delay={200} className="order-1 lg:order-2 space-y-8">
            <span className="font-sans text-[11px] tracking-widest uppercase text-secondary-fixed">{contentData.pillar1Subtitle || 'Signature Creation'}</span>
            <h2 className="font-serif text-5xl text-primary-fixed">{contentData.pillar1Title || 'Matcha Tropic Pearl'}</h2>
            <div className="w-16 h-1 bg-secondary-fixed" />
            <p className="font-sans text-lg text-primary-fixed-dim leading-relaxed">
              {contentData.pillar1Desc || 'Premium tropical matcha fusion layered with fruit pearls, mango essence, and velvety cream foam. A bold yet balanced creation that celebrates the artistry of our craft.'}
            </p>
            <div className="space-y-5 pt-4">
              {[
                { icon: 'eco', label: 'Premium tropical matcha' },
                { icon: 'bubble_chart', label: 'Fresh fruit pearls' },
                { icon: 'cloud', label: 'Velvety cream foam' },
              ].map((feat) => (
                <div key={feat.label} className="flex items-center gap-4 group">
                  <span className="material-symbols-outlined text-secondary-fixed text-3xl transition-transform group-hover:scale-110">{feat.icon}</span>
                  <span className="font-sans text-base text-primary-fixed">{feat.label}</span>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ── Pillar III: The Atmosphere ── */}
      <section className="py-32 bg-surface-container-high">
        <div className="max-w-[1440px] mx-auto px-6 md:px-16">
          <ScrollReveal className="text-center max-w-3xl mx-auto mb-16">
            <span className="font-sans text-[11px] tracking-widest uppercase text-secondary block mb-4">{contentData.pillar3Subtitle || 'Sensory Pillar III'}</span>
            <h2 className="font-serif text-5xl text-primary-container mb-6">{contentData.pillar3Title || 'The Atmosphere'}</h2>
            <p className="font-sans text-lg text-on-surface-variant leading-relaxed">
              {contentData.pillar3Desc || 'Inspired by the soft curves of ceramic art and the tonal warmth of earth, our flagship space features tactile linen, natural oak, and a quietude that filters out the noise of the city.'}
            </p>
          </ScrollReveal>
          <ScrollReveal delay={200} className="relative h-[500px] rounded-3xl overflow-hidden shadow-2xl group">
            <Image 
              src={contentData.pillar3Img || "/images/gallery/space-5.jpg"} 
              alt="Minimalist tea house interior atmosphere" 
              fill 
              className="object-cover" 
              loading="lazy"
              sizes="100vw"
            />
            <div className="absolute bottom-12 left-12 grid grid-cols-1 md:grid-cols-2 gap-6 text-white max-w-2xl">
              {[
                { title: 'Soft Lighting', desc: 'Dimmable amber glows designed for focus and intimacy.' },
                { title: 'Curated Sound', desc: 'Analogue lo-fi and acoustic rhythms at conversational levels.' },
              ].map((card) => (
                <div key={card.title} className="backdrop-blur-md bg-white/10 p-6 rounded-xl border border-white/20">
                  <h4 className="font-sans text-[11px] tracking-[0.15em] uppercase mb-2">{card.title}</h4>
                  <p className="font-sans text-sm text-surface-container-high leading-relaxed">{card.desc}</p>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-32 px-6 md:px-16">
        <div className="max-w-[1200px] mx-auto bg-primary-container rounded-[2rem] p-16 flex flex-col items-center text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-secondary/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />
          <ScrollReveal>
            <h2 className="font-serif text-5xl md:text-6xl text-primary-fixed mb-8 relative z-10">{contentData.ctaTitle || 'Experience the Ritual.'}</h2>
            <p className="font-sans text-lg text-primary-fixed-dim max-w-2xl mb-12 leading-relaxed relative z-10">
              {contentData.ctaDesc || 'We invite you to join us for a seated experience. Reservations are encouraged to ensure the proper time is dedicated to your brew.'}
            </p>
            <div className="flex flex-col sm:flex-row gap-6 relative z-10">
              <Link href={contentData.ctaBtn1Link || "/visit"} className="bg-secondary text-white px-12 py-4 rounded-full font-sans text-[11px] tracking-[0.15em] uppercase hover:bg-on-secondary-fixed-variant transition-all hover:-translate-y-1 duration-300">
                {contentData.ctaBtn1Text || 'Book a Table'}
              </Link>
              <Link href={contentData.ctaBtn2Link || "/menu"} className="border border-primary-fixed text-primary-fixed px-12 py-4 rounded-full font-sans text-[11px] tracking-[0.15em] uppercase hover:bg-white/10 transition-all duration-300">
                {contentData.ctaBtn2Text || 'View the Menu'}
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
