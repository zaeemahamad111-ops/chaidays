import type { Metadata } from 'next';
import Image from 'next/image';
import ScrollReveal from '@/components/ScrollReveal';
import { getSiteData } from '@/lib/data';

export const revalidate = 0;

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Menu',
    description: 'Explore the Chai Days curated menu — signature chai blends, artisan coffee, sweet endings, and light bites. Designed for slow living and intentional moments.',
    openGraph: { title: 'Menu | Chai Days', url: 'https://chaidays.com/menu' },
  };
}

export default async function MenuPage() {
  let menuData = [];
  try {
    const data = await getSiteData();
    if (data?.menu) menuData = data.menu;
  } catch (error) {
    console.error("Error loading menu data:", error);
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Menu",
    "name": "Chai Days Menu",
    "hasMenuSection": menuData.map((category: any) => ({
      "@type": "MenuSection",
      "name": category.category,
      "description": category.description || "",
      "hasMenuItem": category.items.map((item: any) => ({
        "@type": "MenuItem",
        "name": item.name,
        "description": item.desc,
        "image": item.img ? `https://chaidays.com${item.img}` : undefined
      }))
    }))
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
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
              A Cozy Modern Experience
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
      <div className="sticky top-[72px] z-40 bg-surface/95 backdrop-blur-sm border-y border-outline-variant/30 relative">
        <div className="max-w-[1440px] mx-auto px-6 md:px-16 py-4 relative">
          <div className="flex items-center gap-6 overflow-x-auto flex-nowrap [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden snap-x snap-mandatory pr-10">
            {menuData.map((cat: any) => (
              <a key={cat.category} href={`#${cat.category.toLowerCase().replace(/\s+/g, '-')}`} className="snap-start shrink-0 font-sans text-[11px] font-semibold tracking-[0.15em] uppercase text-on-surface-variant hover:text-secondary transition-colors animated-link whitespace-nowrap">
                {cat.category}
              </a>
            ))}
          </div>
          {/* Mobile scroll hint */}
          <div className="md:hidden absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-surface via-surface/80 to-transparent pointer-events-none flex items-center justify-end pr-4">
            <span className="material-symbols-outlined text-secondary animate-pulse text-[18px]">arrow_forward</span>
          </div>
        </div>
      </div>

      {/* Dynamic Menu Categories */}
      {menuData.map((category: any, idx: number) => (
        <section 
          key={category.category} 
          id={category.category.toLowerCase().replace(/\s+/g, '-')} 
          className={`py-32 px-6 md:px-16 ${idx % 2 !== 0 ? 'bg-surface-container-low' : ''}`}
        >
          <div className="max-w-[1440px] mx-auto">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-4">
              <ScrollReveal><h2 className="font-serif text-[56px] md:text-[64px] text-primary">{category.category}</h2></ScrollReveal>
              {category.description && (
                <ScrollReveal delay={100}><p className="font-sans text-sm text-on-surface-variant max-w-xs md:text-right">{category.description}</p></ScrollReveal>
              )}
            </div>
            
            {/* Category Banner Image */}
            {category.img && (
              <ScrollReveal delay={200}>
                <div className="w-full h-[30vh] md:h-[40vh] mb-16 overflow-hidden rounded-2xl relative shadow-sm">
                  <Image src={category.img} alt={category.category} fill className="object-cover" />
                </div>
              </ScrollReveal>
            )}

            {(() => {
              // Group items by subcategory
              const groupedItems = category.items.reduce((acc: any, item: any) => {
                const sub = item.subcategory || "Other";
                if (!acc[sub]) acc[sub] = [];
                acc[sub].push(item);
                return acc;
              }, {});
              
              const subcategories = Object.keys(groupedItems);
              const showHeaders = subcategories.length > 1 || (subcategories.length === 1 && subcategories[0] !== "Other");
              
              return subcategories.map((subcat, sIdx) => (
                <div key={subcat} className={sIdx > 0 ? "mt-20" : ""}>
                  {showHeaders && (
                    <ScrollReveal>
                      <h3 className="font-serif text-3xl md:text-4xl text-primary mb-8 border-b border-outline-variant/30 pb-4">{subcat}</h3>
                    </ScrollReveal>
                  )}
                  <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-10 md:gap-10">
                    {groupedItems[subcat].map((item: any, i: number) => (
                      <ScrollReveal key={item.id || item.name} delay={(i % 3) * 100}>
                        <div className="group cursor-default h-full flex flex-col">
                          {item.img && (
                            <div className="aspect-[4/3] overflow-hidden rounded-xl mb-4 md:mb-6 bg-surface-container-low">
                              <Image 
                                src={item.img} 
                                alt={item.name} 
                                width={500} 
                                height={375} 
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" 
                                loading="lazy"
                                sizes="(max-width: 768px) 50vw, 33vw"
                              />
                            </div>
                          )}
                          <div className="flex flex-col md:flex-row md:justify-between md:items-baseline mb-2 gap-1.5 md:gap-0">
                            <h4 className="font-serif text-[17px] md:text-2xl text-primary group-hover:text-secondary transition-colors leading-tight">{item.name}</h4>
                            {item.tag && <span className="font-sans text-[8px] md:text-[10px] text-secondary tracking-widest px-2 py-0.5 md:px-3 md:py-1 border border-secondary rounded-full flex-shrink-0 self-start md:self-auto md:ml-4">{item.tag}</span>}
                          </div>
                          <p className="font-sans text-xs md:text-sm text-on-surface-variant leading-relaxed flex-grow line-clamp-3 md:line-clamp-none">{item.desc}</p>
                        </div>
                      </ScrollReveal>
                    ))}
                  </div>
                </div>
              ));
            })()}
          </div>
        </section>
      ))}
    </>
  );
}
