import type { Metadata } from 'next';
import Image from 'next/image';
import ScrollReveal from '@/components/ScrollReveal';

import { getSiteData } from '@/lib/data';

export async function generateMetadata(): Promise<Metadata> {
  let seo: any = {};
  try {
    const data = await getSiteData();
    seo = data?.pages?.about?.seo || {};
  } catch (e) {}

  return {
    title: seo.title || 'Our Story',
    description: seo.description || 'Chai Days was born from a desire to elevate the act of drinking tea into intentional moments.',
    keywords: seo.keywords || [],
    openGraph: { title: seo.title || 'Our Story | Chai Days', url: seo.canonical || 'https://chaidays.com/about' },
  };
}
const pillars = [
  { icon: 'precision_manufacturing', title: 'Craft', desc: 'Every blend is a masterpiece of precision. We hand-select our tea leaves and grind our spices daily.' },
  { icon: 'chair', title: 'Comfort', desc: 'Our spaces are designed as extensions of your home. Soft textures and warm lighting let you truly exhale.' },
  { icon: 'groups', title: 'Community', desc: 'Beyond the brew, we are a gathering point for souls. We host dialogues, workshops, and quiet mornings.' },
];

export default async function AboutPage() {
  let contentData: any = {};
  try {
    const data = await getSiteData();
    contentData = data?.pages?.about?.content || {};
  } catch (e) {
    console.error(e);
  }

  return (
    <>
      <section className="pt-[140px] pb-20 px-6 md:px-16 max-w-[1440px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-end mb-20">
          <div className="md:col-span-7">
            <p className="hero-text-1 font-sans text-[11px] font-semibold tracking-[0.3em] uppercase text-secondary mb-5">{contentData.heroSubtitle || 'Est. 2024'}</p>
            <h1 className="hero-text-2 font-serif text-[64px] md:text-[80px] text-primary leading-[0.9]" dangerouslySetInnerHTML={{ __html: contentData.heroTitle || 'The Art of the<br /><em class="text-secondary-container">Slow Steam.</em>' }} />
          </div>
          <div className="md:col-span-5 pb-2">
            <p className="hero-text-3 font-sans text-lg text-on-surface-variant max-w-md leading-relaxed">
              {contentData.heroDesc || 'At Chai Days, we\'ve spent over four years perfecting the art of crafting the finest teas, snacks, and beverages.'}
            </p>
          </div>
        </div>
        <ScrollReveal className="aspect-[21/9] w-full overflow-hidden rounded-xl">
          <Image 
            src={contentData.heroImg || "/images/philosophy.jpg"} 
            alt="Chai Days minimalist tea bar cinematic view" 
            width={1440} 
            height={617} 
            className="w-full h-full object-cover" 
            priority
            sizes="100vw"
          />
        </ScrollReveal>
      </section>

      <section className="py-32 bg-surface-container-low">
        <div className="max-w-[1440px] mx-auto px-6 md:px-16 grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
          <ScrollReveal className="order-2 md:order-1 space-y-8">
            <h2 className="font-serif text-4xl md:text-5xl text-primary">{contentData.qualityTitle || 'Uncompromising Quality'}</h2>
            <p className="font-sans text-lg text-on-surface-variant leading-relaxed">
              {contentData.qualityDesc || 'Quality is our way of life. We source from the best estates and use expert techniques to ensure every item reflects our dedication to excellence.'}
            </p>
          </ScrollReveal>
          <ScrollReveal delay={200} className="order-1 md:order-2">
            <div className="aspect-[4/5] rounded-xl overflow-hidden shadow-xl">
              <Image 
                src={contentData.qualityImg || "/images/gallery/drink-14.jpg"} 
                alt="Hand grinding spices" 
                width={600} 
                height={750} 
                className="w-full h-full object-cover" 
                loading="lazy"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </ScrollReveal>
        </div>
      </section>

      <section className="py-32 bg-surface">
        <div className="max-w-[1440px] mx-auto px-6 md:px-16 grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
          <ScrollReveal>
            <div className="aspect-[4/5] rounded-xl overflow-hidden shadow-xl">
              <Image 
                src={contentData.modernImg || "/images/gallery/space-6.jpg"} 
                alt="Modern minimalist tea lounge" 
                width={600} 
                height={750} 
                className="w-full h-full object-cover" 
                loading="lazy"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </ScrollReveal>
          <ScrollReveal delay={200} className="space-y-8">
            <h2 className="font-serif text-4xl md:text-5xl text-primary">{contentData.modernTitle || 'Modern Presence'}</h2>
            <p className="font-sans text-lg text-on-surface-variant leading-relaxed">{contentData.modernDesc1 || 'Today, Chai Days brings that sanctuary to the modern landscape. We bridge the gap between traditional spice-blending techniques and a clean, minimalist lifestyle.'}</p>
            <p className="font-sans text-lg text-on-surface-variant leading-relaxed">{contentData.modernDesc2 || 'Our vision is to cultivate a global community that values quality over quantity, and presence over productivity. We believe in the power of the pause.'}</p>
          </ScrollReveal>
        </div>
      </section>

      {/* ── Detailed Awards Section ── */}
      <section className="py-32 bg-surface-container-low border-t border-outline-variant/30">
        <div className="max-w-[1440px] mx-auto px-6 md:px-16">
          <ScrollReveal className="text-center mb-20">
            <span className="font-sans text-[11px] tracking-[0.3em] uppercase text-secondary mb-3 block">Awards & Recognition</span>
            <h2 className="font-serif text-4xl md:text-5xl text-primary">Celebrating Excellence</h2>
          </ScrollReveal>
          <div className="space-y-12">
            {[
              { icon: '🏆', title: 'Tea Café of the Year', org: 'Restaurant Awards 2023', desc: 'Awarded to Chai Days as Tea Café of the Year, recognizing excellence in tea craftsmanship, customer experience, and innovation in the café industry.' },
              { icon: '🏆', title: 'Best Tea Café of the Year – Bengaluru', org: 'Food Connoisseurs India Awards', desc: "A prestigious recognition celebrating Chai Days as Bengaluru's Best Tea Café, honoring exceptional quality, hospitality, and consistency." },
              { icon: '⭐', title: 'Certificate of Excellence', org: 'Food Connoisseurs India Awards', desc: 'Presented to Chai Days for maintaining outstanding standards in food, beverages, service, and overall guest satisfaction.' },
              { icon: '🏅', title: 'Restaurant Awards Recognition', org: 'Restaurant Awards 2023', desc: "Industry recognition celebrating Chai Days' contribution to India's growing specialty café culture and premium tea experience." },
              { icon: '🚀', title: 'Zomato Milestone Award', org: '50,000+ Online Orders', desc: 'A milestone celebrating over 50,000 successful online orders, reflecting the trust and loyalty of customers who continue to choose Chai Days every day.' }
            ].map((award, i) => (
              <ScrollReveal key={award.title} delay={i * 100}>
                <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-16 items-center bg-white p-8 md:p-12 rounded-2xl shadow-sm border border-outline-variant/20 hover:shadow-md transition-shadow">
                  <div className="md:col-span-5 lg:col-span-4">
                    <div className="aspect-[4/3] bg-surface border-2 border-dashed border-outline-variant/50 flex flex-col items-center justify-center rounded-xl text-on-surface-variant gap-3">
                      <span className="material-symbols-outlined text-4xl opacity-50">image</span>
                      <span className="font-sans text-[9px] tracking-widest uppercase opacity-50">Image Placeholder</span>
                    </div>
                  </div>
                  <div className="md:col-span-7 lg:col-span-8 space-y-4">
                    <div className="flex items-center gap-4 border-b border-outline-variant/30 pb-4">
                      <span className="text-3xl">{award.icon}</span>
                      <h3 className="font-serif text-2xl md:text-3xl text-primary">{award.title}</h3>
                    </div>
                    <p className="font-sans text-[11px] tracking-[0.2em] uppercase text-secondary font-semibold">{award.org}</p>
                    <p className="font-sans text-base text-on-surface-variant leading-relaxed max-w-2xl">
                      {award.desc}
                    </p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="py-32 bg-primary-container text-surface">
        <div className="max-w-[1440px] mx-auto px-6 md:px-16">
          <ScrollReveal className="text-center mb-20">
            <span className="font-sans text-[11px] tracking-[0.3em] uppercase text-secondary-container mb-3 block">{contentData.philosophySubtitle || 'Our Core Pillars'}</span>
            <h2 className="font-serif text-4xl md:text-5xl">{contentData.philosophyTitle || 'Philosophy in Practice'}</h2>
          </ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {pillars.map((p, i) => (
              <ScrollReveal key={p.title} delay={i * 150}>
                <div className="p-10 border border-outline/30 rounded-xl hover:bg-surface/5 transition-all duration-500 h-full">
                  <span className="material-symbols-outlined text-secondary-container text-4xl mb-5 block">{p.icon}</span>
                  <h3 className="font-serif text-2xl mb-4">{p.title}</h3>
                  <p className="font-sans text-sm text-surface/80 leading-relaxed">{p.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="py-32 text-center bg-surface">
        <div className="max-w-4xl mx-auto px-6 md:px-16">
          <ScrollReveal>
            <span className="material-symbols-outlined text-secondary text-6xl mb-8 block">format_quote</span>
            <blockquote className="font-serif text-4xl md:text-6xl italic leading-tight text-primary mb-8" dangerouslySetInnerHTML={{ __html: contentData.quoteText || '&ldquo;Chai is not just a beverage; it is a pause button for the soul.&rdquo;' }} />
            <div className="w-16 h-px bg-secondary-container mx-auto mb-5" />
            <p className="font-sans text-[11px] tracking-[0.3em] uppercase text-on-surface-variant">{contentData.quoteSubtitle || 'The Chai Days Philosophy'}</p>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
