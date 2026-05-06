import type { Metadata } from 'next';
import Image from 'next/image';
import ScrollReveal from '@/components/ScrollReveal';

export const metadata: Metadata = {
  title: 'Our Story',
  description: 'Chai Days was born from a desire to elevate the act of drinking tea into intentional moments. Discover our origin, values, and philosophy.',
  openGraph: { title: 'Our Story | Chai Days', url: 'https://chaidays.com/about' },
};

const pillars = [
  { icon: 'precision_manufacturing', title: 'Craft', desc: 'Every blend is a masterpiece of precision. We hand-select our tea leaves and grind our spices daily.' },
  { icon: 'chair', title: 'Comfort', desc: 'Our spaces are designed as extensions of your home. Soft textures and warm lighting let you truly exhale.' },
  { icon: 'groups', title: 'Community', desc: 'Beyond the brew, we are a gathering point for souls. We host dialogues, workshops, and quiet mornings.' },
];

export default function AboutPage() {
  return (
    <>
      <section className="pt-[140px] pb-20 px-6 md:px-16 max-w-[1440px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-end mb-20">
          <div className="md:col-span-7">
            <p className="hero-text-1 font-sans text-[11px] font-semibold tracking-[0.3em] uppercase text-secondary mb-5">Est. 2024</p>
            <h1 className="hero-text-2 font-serif text-[64px] md:text-[80px] text-primary leading-[0.9]">
              The Art of the<br /><em className="text-secondary-container">Slow Steam.</em>
            </h1>
          </div>
          <div className="md:col-span-5 pb-2">
            <p className="hero-text-3 font-sans text-lg text-on-surface-variant max-w-md leading-relaxed">
              At Chai Days, we've spent over four years perfecting the art of crafting the finest teas, snacks, and beverages.
            </p>
          </div>
        </div>
        <ScrollReveal className="aspect-[21/9] w-full overflow-hidden rounded-xl">
          <Image 
            src="/images/philosophy.jpg" 
            alt="Chai Days minimalist tea bar cinematic view" 
            width={1440} 
            height={617} 
            className="w-full h-full object-cover" 
            priority 
            unoptimized={true}
          />
        </ScrollReveal>
      </section>

      <section className="py-32 bg-surface-container-low">
        <div className="max-w-[1440px] mx-auto px-6 md:px-16 grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
          <ScrollReveal className="order-2 md:order-1 space-y-8">
            <h2 className="font-serif text-4xl md:text-5xl text-primary">Uncompromising Quality</h2>
            <p className="font-sans text-lg text-on-surface-variant leading-relaxed">
              Quality is our way of life. We source from the best estates and use expert techniques to ensure every item reflects our dedication to excellence.
            </p>
          </ScrollReveal>
          <ScrollReveal delay={200} className="order-1 md:order-2">
            <div className="aspect-[4/5] rounded-xl overflow-hidden shadow-xl">
              <Image 
                src="/images/gallery/drink-14.jpg" 
                alt="Hand grinding spices" 
                width={600} 
                height={750} 
                className="w-full h-full object-cover" 
                loading="lazy" 
                unoptimized={true}
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
                src="/images/gallery/space-6.jpg" 
                alt="Modern minimalist tea lounge" 
                width={600} 
                height={750} 
                className="w-full h-full object-cover" 
                loading="lazy" 
                unoptimized={true}
              />
            </div>
          </ScrollReveal>
          <ScrollReveal delay={200} className="space-y-8">
            <h2 className="font-serif text-4xl md:text-5xl text-primary">Modern Presence</h2>
            <p className="font-sans text-lg text-on-surface-variant leading-relaxed">Today, Chai Days brings that sanctuary to the modern landscape. We bridge the gap between traditional spice-blending techniques and a clean, minimalist lifestyle.</p>
            <p className="font-sans text-lg text-on-surface-variant leading-relaxed">Our vision is to cultivate a global community that values quality over quantity, and presence over productivity. We believe in the power of the pause.</p>
          </ScrollReveal>
        </div>
      </section>

      <section className="py-32 bg-primary-container text-surface">
        <div className="max-w-[1440px] mx-auto px-6 md:px-16">
          <ScrollReveal className="text-center mb-20">
            <span className="font-sans text-[11px] tracking-[0.3em] uppercase text-secondary-container mb-3 block">Our Core Pillars</span>
            <h2 className="font-serif text-4xl md:text-5xl">Philosophy in Practice</h2>
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
            <blockquote className="font-serif text-4xl md:text-6xl italic leading-tight text-primary mb-8">&ldquo;Chai is not just a beverage; it is a pause button for the soul.&rdquo;</blockquote>
            <div className="w-16 h-px bg-secondary-container mx-auto mb-5" />
            <p className="font-sans text-[11px] tracking-[0.3em] uppercase text-on-surface-variant">The Chai Days Philosophy</p>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
