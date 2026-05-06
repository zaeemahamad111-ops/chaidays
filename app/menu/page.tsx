import type { Metadata } from 'next';
import Image from 'next/image';
import ScrollReveal from '@/components/ScrollReveal';

export const metadata: Metadata = {
  title: 'Menu',
  description: 'Explore the Chai Days curated menu — signature chai blends, artisan coffee, sweet endings, and light bites. Designed for slow living and intentional moments.',
  openGraph: { title: 'Menu | Chai Days', url: 'https://chaidays.com/menu' },
};

export default function MenuPage() {
  return (
    <>
      {/* Header */}
      <section className="pt-[140px] pb-16 text-center px-6 md:px-16 max-w-[1440px] mx-auto">
        <p className="hero-text-1 font-sans text-[11px] tracking-[0.3em] uppercase text-secondary mb-4">Curated Collections</p>
        <h1 className="hero-text-2 font-serif text-[64px] md:text-[80px] text-primary italic mb-6">The Modern Ritual</h1>
        <p className="hero-text-3 font-sans text-lg text-on-surface-variant max-w-2xl mx-auto leading-relaxed">
          A thoughtfully assembled selection of artisanal brews and hand-crafted bites, designed for slow living and intentional moments of pause.
        </p>
      </section>

      {/* Sticky category nav */}
      <div className="sticky top-[72px] z-40 bg-surface/95 backdrop-blur-sm border-y border-outline-variant/30">
        <div className="max-w-[1440px] mx-auto px-6 md:px-16 py-5 flex flex-wrap justify-center gap-8">
          {['Signature Drinks', 'Curated Coffee', 'Sweet Endings', 'Light Bites'].map((cat) => (
            <a key={cat} href={`#${cat.toLowerCase().replace(' ', '-')}`} className="font-sans text-[11px] tracking-[0.15em] uppercase text-on-surface-variant hover:text-secondary transition-colors animated-link">
              {cat}
            </a>
          ))}
        </div>
      </div>

      {/* ── Signature Drinks ── */}
      <section id="signature-drinks" className="py-32 px-6 md:px-16 max-w-[1440px] mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-4">
          <ScrollReveal><h2 className="font-serif text-[56px] md:text-[64px] text-primary">Signature Drinks</h2></ScrollReveal>
          <ScrollReveal delay={100}><p className="font-sans text-sm text-on-surface-variant max-w-xs md:text-right">A harmonious blend of tradition and contemporary precision.</p></ScrollReveal>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <ScrollReveal className="lg:col-span-7 group">
            <div className="aspect-[16/10] overflow-hidden rounded-xl mb-6">
              <Image 
                src="/images/gallery/drink-2.jpg" 
                alt="Classic Masala Chai" 
                width={700} 
                height={437} 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" 
                loading="lazy" 
                unoptimized={true}
              />
            </div>
            <div className="flex justify-between items-start">
              <div className="max-w-md">
                <h3 className="font-serif text-3xl text-primary mb-2">Classic Masala Chai</h3>
                <p className="font-sans text-sm text-on-surface-variant leading-relaxed">Signature blend of CTC black tea, simmered with freshly crushed ginger, cardamom, cinnamon, and whole milk. Finished with organic jaggery.</p>
              </div>
              <span className="font-sans text-[11px] text-secondary italic tracking-widest whitespace-nowrap">OUR SIGNATURE</span>
            </div>
          </ScrollReveal>
          <ScrollReveal delay={200} className="lg:col-span-5 flex flex-col gap-10">
            {[
              { name: 'Saffron Rose', desc: 'Infused with premium Iranian saffron and organic rose petals for a delicate, aromatic experience.' },
              { name: 'Golden Turmeric', desc: 'A healing blend of turmeric, black pepper, and almond milk. Grounding and restorative.' },
            ].map((item) => (
              <div key={item.name} className="group">
                <h3 className="font-serif text-2xl text-primary mb-2 group-hover:text-secondary transition-colors">{item.name}</h3>
                <p className="font-sans text-sm text-on-surface-variant mb-4 leading-relaxed">{item.desc}</p>
                <div className="h-px w-full bg-outline-variant/30" />
              </div>
            ))}
            <div className="bg-surface-container-low p-8 rounded-xl border border-outline-variant/20 flex gap-6 items-center">
              <Image 
                src="/images/gallery/drink-8.jpg" 
                alt="Cloud Matcha" 
                width={96} 
                height={96} 
                className="w-24 h-24 rounded-full object-cover flex-shrink-0" 
                loading="lazy" 
                unoptimized={true}
              />
              <div>
                <h3 className="font-serif text-2xl text-primary mb-1">Cloud Matcha</h3>
                <p className="font-sans text-sm text-on-surface-variant">Ceremonial grade matcha whisked into a cold coconut milk foam.</p>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ── Curated Coffee ── */}
      <section id="curated-coffee" className="py-32 bg-surface-container-low px-6 md:px-16">
        <div className="max-w-[1440px] mx-auto">
          <ScrollReveal className="text-center mb-16">
            <h2 className="font-serif text-[56px] md:text-[64px] text-primary italic mb-4">Curated Coffee</h2>
            <div className="h-px w-24 bg-secondary mx-auto" />
          </ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { name: 'Single Origin Espresso', desc: 'Rotating beans from Chikmagalur, roasted to highlight dark chocolate and stone fruit.', img: '/images/gallery/drink-11.jpg' },
              { name: 'Silk Flat White', desc: 'Silky micro-foam poured over a double ristretto for a balanced, creamy finish.', img: '/images/gallery/drink-12.jpg' },
              { name: 'Midnight Cold Brew', desc: 'Steeped for 18 hours. Smooth, low-acidity, with naturally sweet cocoa undertones.', img: '/images/gallery/drink-13.jpg' },
            ].map((item, i) => (
              <ScrollReveal key={item.name} delay={i * 150}>
                <div className="group">
                  <div className="aspect-[3/4] overflow-hidden rounded-xl mb-6">
                    <Image 
                      src={item.img} 
                      alt={item.name} 
                      width={400} 
                      height={533} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" 
                      loading="lazy" 
                      unoptimized={true}
                    />
                  </div>
                  <h3 className="font-serif text-2xl text-primary mb-2 text-center">{item.name}</h3>
                  <p className="font-sans text-sm text-on-surface-variant text-center px-4 leading-relaxed">{item.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Sweet Endings ── */}
      <section id="sweet-endings" className="py-32 px-6 md:px-16 max-w-[1440px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <ScrollReveal className="order-2 lg:order-1 space-y-8">
            <span className="font-sans text-[11px] tracking-[0.3em] uppercase text-secondary block">Signature Pastry</span>
            <h2 className="font-serif text-[56px] text-primary">Sweet Endings</h2>
            <h3 className="font-serif text-2xl text-primary italic">Cardamom Infused Olive Oil Cake</h3>
            <p className="font-sans text-lg text-on-surface-variant leading-relaxed">A light, moist cake crafted with premium cold-pressed olive oil, accented with freshly ground cardamom and finished with a bright citrus glaze.</p>
            <div className="space-y-3">
              {[{ icon: 'verified', label: 'Gluten Free Option Available' }, { icon: 'spa', label: 'Plant-Based & Dairy Free' }].map((b) => (
                <div key={b.label} className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-secondary text-xl">{b.icon}</span>
                  <span className="font-sans text-[11px] tracking-[0.1em] uppercase">{b.label}</span>
                </div>
              ))}
            </div>
            <div className="p-8 bg-surface-container-high/50 border-l-2 border-secondary">
              <p className="font-sans text-sm text-primary italic leading-relaxed">&ldquo;The perfect companion to our Classic Masala Chai. The spice notes harmonize in a truly exceptional way.&rdquo;</p>
              <p className="font-sans text-[10px] tracking-widest uppercase text-secondary mt-4">— Our Executive Chef</p>
            </div>
          </ScrollReveal>
          <ScrollReveal delay={200} className="order-1 lg:order-2">
            <div className="rounded-2xl overflow-hidden shadow-2xl shadow-primary/5">
              <Image 
                src="/images/gallery/dessert-1.jpg" 
                alt="Cardamom Infused Olive Oil Cake" 
                width={700} 
                height={700} 
                className="w-full aspect-square object-cover" 
                loading="lazy" 
                unoptimized={true}
              />
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ── Light Bites ── */}
      <section id="light-bites" className="py-32 bg-surface-container-low px-6 md:px-16">
        <div className="max-w-[1440px] mx-auto">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-16 gap-4">
            <ScrollReveal><h2 className="font-serif text-[56px] md:text-[64px] text-primary">Light Bites</h2></ScrollReveal>
            <div className="hidden md:block h-px flex-grow mx-8 bg-outline-variant/30" />
            <ScrollReveal delay={100}><span className="font-sans text-[11px] tracking-[0.15em] uppercase text-on-surface-variant">Served All Day</span></ScrollReveal>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-20 gap-y-12">
            {[
              { name: 'Truffle Samosa Pav', tag: 'SAVORY', desc: 'Mini spiced potato fritters infused with white truffle oil in a buttery toasted brioche bun.' },
              { name: 'Avocado & Chili Crunch', tag: 'VEGAN', desc: 'Hand-stretched sourdough topped with smashed organic avocado, house-made chili oil, and toasted pepitas.' },
              { name: 'Pistachio & Rose Shortbread', tag: 'SWEET', desc: 'Crumbly, high-fat butter shortbread packed with roasted Iranian pistachios and fragrant rose essence.' },
              { name: 'Masala Scrambled Tartine', tag: 'PROTEIN', desc: 'Soft organic scrambled eggs with turmeric, green chilies, and fresh cilantro on toasted multigrain.' },
            ].map((item, i) => (
              <ScrollReveal key={item.name} delay={(i % 2) * 150}>
                <div className="group cursor-default">
                  <div className="flex justify-between items-baseline mb-2">
                    <h4 className="font-serif text-2xl text-primary group-hover:text-secondary transition-colors">{item.name}</h4>
                    <span className="font-sans text-[10px] text-secondary tracking-widest px-3 py-1 border border-secondary rounded-full ml-4 flex-shrink-0">{item.tag}</span>
                  </div>
                  <p className="font-sans text-sm text-on-surface-variant leading-relaxed">{item.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
