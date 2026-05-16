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
      {/* Cinematic Video Header */}
      <section className="relative w-full h-[70vh] min-h-[500px] overflow-hidden bg-[#0a0806] flex items-center justify-center">
        <video
          src="/hero.mp4"
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover opacity-70"
        />
        {/* Gradients to fade smoothly into the rest of the page */}
        <div className="absolute inset-0 bg-gradient-to-t from-surface via-transparent to-surface/60 pointer-events-none" />
        <div className="absolute inset-0 bg-black/20 pointer-events-none" />
        
        <div className="relative z-10 text-center px-6 mt-16 max-w-[1440px] mx-auto">
          <ScrollReveal>
            <p className="font-sans text-[11px] tracking-[0.4em] uppercase text-[#e8c8a0] mb-4">
              Curated Collections
            </p>
          </ScrollReveal>
          <ScrollReveal delay={150}>
            <h1 
              className="font-serif text-[64px] md:text-[90px] text-white italic mb-6 leading-[1.1]" 
              style={{ textShadow: '0 4px 40px rgba(0,0,0,0.6)' }}
            >
              The Modern Ritual
            </h1>
          </ScrollReveal>
          <ScrollReveal delay={300}>
            <p 
              className="font-sans text-lg text-white/90 max-w-2xl mx-auto leading-relaxed"
              style={{ textShadow: '0 2px 20px rgba(0,0,0,0.5)' }}
            >
              A thoughtfully assembled selection of artisanal brews and hand-crafted bites, designed for slow living and intentional moments of pause.
            </p>
          </ScrollReveal>
        </div>
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
                sizes="(max-width: 1024px) 100vw, 58vw"
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
                sizes="96px"
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
                      sizes="(max-width: 768px) 100vw, 33vw"
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
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </ScrollReveal>
        </div>

        {/* New Pastries Grid */}
        <div className="mt-24 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {[
            { name: 'Almond Croissant', desc: 'A classic buttery croissant filled with rich almond frangipane and topped with toasted almonds.', img: '/images/menu/almond-croissant.webp' },
            { name: 'Banana Frangipane Tart', desc: 'A delicate shortcrust tart filled with almond cream and caramelized bananas, baked to golden perfection.', img: '/images/menu/banana-tart.webp' },
            { name: 'Berliner Doughnut', desc: 'Traditional German-style doughnut, dusted with fine sugar and filled with a burst of seasonal fruit jam.', img: '/images/menu/berliner-doughnut.webp' },
            { name: 'Butter Palmier', desc: 'Crisp, flaky, and golden-brown puff pastry hearts baked with caramelized sugar.', img: '/images/menu/butter-palmier.webp' },
            { name: 'KitKat Doughnut', desc: 'A decadent, soft doughnut glazed with rich chocolate and topped with crushed KitKat pieces.', img: '/images/menu/kitkat-donut.webp' },
          ].map((item, i) => (
            <ScrollReveal key={item.name} delay={i * 100}>
              <div className="group cursor-default h-full flex flex-col">
                <div className="aspect-[4/3] overflow-hidden rounded-xl mb-6 bg-surface-container-low">
                  <Image 
                    src={item.img} 
                    alt={item.name} 
                    width={500} 
                    height={375} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" 
                    loading="lazy"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                </div>
                <h4 className="font-serif text-2xl text-primary mb-2">{item.name}</h4>
                <p className="font-sans text-sm text-on-surface-variant leading-relaxed flex-grow">{item.desc}</p>
              </div>
            </ScrollReveal>
          ))}
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
          
          {/* Featured Visual Bites */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20">
            {[
              { name: 'Chai Days Special Buns', tag: 'SIGNATURE', desc: 'Our signature soft buns, freshly baked and lightly glazed. Perfect for tearing and dipping into hot chai.', img: '/images/menu/special-buns.webp' },
              { name: 'Chicken Fatayer', tag: 'SAVORY', desc: 'Middle-Eastern inspired savory pastries stuffed with beautifully spiced minced chicken.', img: '/images/menu/chicken-fatayer.webp' },
              { name: 'Paneer Roll', tag: 'VEGETARIAN', desc: 'A flaky, golden crust filled with spiced, crumbled paneer and fresh herbs.', img: '/images/menu/paneer-roll.webp' },
              { name: 'Classic Puff Pastry', tag: 'SAVORY', desc: 'Flaky, buttery layers baked until golden and crisp, offering a delightful savory crunch.', img: '/images/menu/puff-pastry.webp' },
            ].map((item, i) => (
              <ScrollReveal key={item.name} delay={i * 150}>
                <div className="group cursor-default">
                  <div className="aspect-[16/10] overflow-hidden rounded-xl mb-6 bg-surface-container-low">
                    <Image 
                      src={item.img} 
                      alt={item.name} 
                      width={600} 
                      height={375} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" 
                      loading="lazy"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  </div>
                  <div className="flex justify-between items-baseline mb-2">
                    <h4 className="font-serif text-2xl text-primary group-hover:text-secondary transition-colors">{item.name}</h4>
                    <span className="font-sans text-[10px] text-secondary tracking-widest px-3 py-1 border border-secondary rounded-full ml-4 flex-shrink-0">{item.tag}</span>
                  </div>
                  <p className="font-sans text-sm text-on-surface-variant leading-relaxed">{item.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-20 gap-y-12 pt-16 border-t border-outline-variant/20">
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
