import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import ScrollReveal from '@/components/ScrollReveal';
import { getSiteData } from '@/lib/data';

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
      {/* ── Full-bleed Hero ── */}
      <section className="relative min-h-screen flex items-end overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src={contentData.heroImg || '/images/gallery/space-3.jpg'}
            alt="Chai Days experience — aromatic steam and warm tones"
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1a0d00]/90 via-[#1a0d00]/40 to-transparent" />
        </div>

        <div className="relative z-10 w-full max-w-[1440px] mx-auto px-6 md:px-16 pb-24 pt-[180px]">
          <ScrollReveal>
            <p className="hero-text-1 font-sans text-[11px] tracking-[0.4em] uppercase text-[#d4a96a] mb-4">
              {contentData.heroSubtitle || 'The Sensory Experience'}
            </p>
            <h1
              className="hero-text-2 font-serif text-[56px] md:text-[80px] lg:text-[96px] text-white leading-[0.95] max-w-4xl mb-8"
              dangerouslySetInnerHTML={{ __html: contentData.heroTitle || 'Elevating the<br/>everyday through<br/>intentional sips.' }}
            />
            <p className="hero-text-3 font-sans text-lg text-white/70 max-w-xl leading-relaxed">
              {contentData.heroDesc || 'Step into a space where time slows down. Chai Days is more than a café; it is a curated sensory journey designed for the modern connoisseur of slow living.'}
            </p>
          </ScrollReveal>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center animate-bounce">
          <div className="w-px h-12 bg-white/30" />
        </div>
      </section>

      {/* ── Pillar I: The Scent ── */}
      <section className="py-32 bg-[#0f0700] overflow-hidden">
        <div className="max-w-[1440px] mx-auto px-6 md:px-16 grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
          <ScrollReveal className="relative order-2 lg:order-1">
            <div className="absolute -inset-4 bg-gradient-to-tr from-[#8D4F00]/30 to-transparent rounded-3xl blur-2xl" />
            <div className="relative rounded-2xl overflow-hidden h-[560px]">
              <Image
                src={contentData.pillar1Img || '/images/gallery/drink-10.jpg'}
                alt="The fragrance of fresh chai spices"
                fill
                className="object-cover"
                loading="lazy"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0f0700]/60 via-transparent to-transparent" />
            </div>
          </ScrollReveal>

          <ScrollReveal delay={200} className="order-1 lg:order-2 space-y-8">
            <span className="font-sans text-[11px] tracking-[0.4em] uppercase text-[#d4a96a]">
              {contentData.pillar1Subtitle || 'Sensory Pillar I'}
            </span>
            <h2 className="font-serif text-[56px] md:text-[64px] text-white leading-tight">
              {contentData.pillar1Title || 'The Scent'}
            </h2>
            <div className="w-16 h-[2px] bg-[#8D4F00]" />
            <p className="font-sans text-lg text-white/65 leading-relaxed">
              {contentData.pillar1Desc || 'The intoxicating aroma of freshly ground cardamom, ginger, and cinnamon bark greeting you at the threshold. It is a warm, spice-laden embrace that instantly anchors you in the present moment.'}
            </p>
            <div className="space-y-5 pt-4">
              {[
                { icon: 'air', label: 'Freshly ground spice blend' },
                { icon: 'local_fire_department', label: 'Hand-roasted organic tea leaves' },
                { icon: 'cloud', label: 'Slow-steeped aromatic steam' },
              ].map((feat) => (
                <div key={feat.label} className="flex items-center gap-4 group">
                  <div className="w-10 h-10 rounded-full border border-[#8D4F00]/40 flex items-center justify-center group-hover:border-[#d4a96a] transition-colors">
                    <span className="material-symbols-outlined text-[#d4a96a] text-[18px]">{feat.icon}</span>
                  </div>
                  <span className="font-sans text-sm text-white/75">{feat.label}</span>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ── Pillar II: The Texture ── */}
      <section className="py-32 bg-surface overflow-hidden">
        <div className="max-w-[1440px] mx-auto px-6 md:px-16 grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
          <ScrollReveal className="space-y-8">
            <span className="font-sans text-[11px] tracking-[0.4em] uppercase text-secondary">
              {contentData.pillar2Subtitle || 'Sensory Pillar II'}
            </span>
            <h2 className="font-serif text-[56px] md:text-[64px] text-primary-container leading-tight">
              {contentData.pillar2Title || 'The Texture'}
            </h2>
            <div className="w-16 h-[2px] bg-secondary" />
            <p className="font-sans text-lg text-on-surface-variant leading-relaxed">
              {contentData.pillar2Desc || 'The velvety micro-foam of steamed whole milk meeting the raw, gritty finish of our custom-thrown stoneware cups. We believe the vessel is as important as the brew, offering a tactile connection to the earth.'}
            </p>
            <div className="flex flex-wrap gap-3 pt-4">
              {['Hand-Thrown Stoneware', 'Velvety Microfoam', 'Organic Textiles'].map((tag) => (
                <span key={tag} className="px-5 py-2 border border-outline rounded-full font-sans text-[11px] tracking-[0.1em] uppercase text-on-surface hover:bg-surface-container-high transition-colors">
                  {tag}
                </span>
              ))}
            </div>
          </ScrollReveal>

          <ScrollReveal delay={200} className="relative flex justify-center items-center min-h-[400px]">
            <div className="absolute w-[420px] h-[420px] rounded-full border border-outline-variant/30" style={{ animation: 'spin 20s linear infinite' }} />
            <div className="absolute w-[350px] h-[350px] rounded-full border border-outline-variant/20" style={{ animation: 'spin 30s linear infinite reverse' }} />
            <div className="w-[280px] h-[280px] rounded-full overflow-hidden border-[10px] border-surface-container-high shadow-2xl relative group z-10">
              <Image
                src={contentData.pillar2Img || '/images/gallery/drink-1.jpg'}
                alt="Tactile stoneware cup texture"
                fill
                className="object-cover transition-transform duration-[3s] group-hover:scale-110"
                loading="lazy"
                sizes="280px"
              />
            </div>
            <div className="absolute -z-10 w-64 h-64 bg-secondary/10 rounded-full blur-[80px]" />
          </ScrollReveal>
        </div>
      </section>

      {/* ── Pillar III: The Atmosphere ── */}
      <section className="py-32 bg-surface-container-high overflow-hidden">
        <div className="max-w-[1440px] mx-auto px-6 md:px-16">
          <ScrollReveal className="text-center max-w-3xl mx-auto mb-16">
            <span className="font-sans text-[11px] tracking-[0.4em] uppercase text-secondary block mb-4">
              {contentData.pillar3Subtitle || 'Sensory Pillar III'}
            </span>
            <h2 className="font-serif text-[56px] md:text-[64px] text-primary-container leading-tight mb-6">
              {contentData.pillar3Title || 'The Atmosphere'}
            </h2>
            <p className="font-sans text-lg text-on-surface-variant leading-relaxed">
              {contentData.pillar3Desc || 'Inspired by the soft curves of ceramic art and the tonal warmth of earth, our flagship space features tactile linen, natural oak, and a quietude that filters out the noise of the city.'}
            </p>
          </ScrollReveal>

          <ScrollReveal delay={150} className="relative h-[600px] md:h-[700px] rounded-3xl overflow-hidden shadow-2xl group">
            <Image
              src={contentData.pillar3Img || '/images/gallery/space-5.jpg'}
              alt="Minimalist tea house interior atmosphere"
              fill
              className="object-cover transition-transform duration-[4s] group-hover:scale-105"
              loading="lazy"
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0f0700]/70 via-transparent to-transparent" />
            <div className="absolute bottom-10 left-8 right-8 grid grid-cols-1 md:grid-cols-2 gap-5 max-w-2xl">
              {[
                { icon: 'light_mode', title: 'Soft Lighting', desc: 'Dimmable amber glows designed for focus and intimacy.' },
                { icon: 'music_note', title: 'Curated Sound', desc: 'Analogue lo-fi and acoustic rhythms at conversational levels.' },
              ].map((card) => (
                <div key={card.title} className="backdrop-blur-md bg-white/10 p-6 rounded-2xl border border-white/15 hover:bg-white/15 transition-colors">
                  <span className="material-symbols-outlined text-[#d4a96a] text-2xl mb-3 block">{card.icon}</span>
                  <h4 className="font-sans text-[11px] tracking-[0.2em] uppercase text-white mb-2">{card.title}</h4>
                  <p className="font-sans text-sm text-white/65 leading-relaxed">{card.desc}</p>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-32 px-6 md:px-16 bg-[#0f0700] relative overflow-hidden">
        <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[500px] h-[500px] bg-[#8D4F00]/15 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[400px] h-[400px] bg-[#d4a96a]/8 rounded-full blur-[100px] pointer-events-none" />

        <div className="relative z-10 max-w-[900px] mx-auto text-center">
          <ScrollReveal>
            <p className="font-sans text-[11px] tracking-[0.4em] uppercase text-[#d4a96a] mb-6">Begin the journey</p>
            <h2 className="font-serif text-[56px] md:text-[72px] text-white leading-tight mb-8">
              {contentData.ctaTitle || 'Experience the Ritual.'}
            </h2>
            <p className="font-sans text-lg text-white/55 max-w-2xl mx-auto mb-14 leading-relaxed">
              {contentData.ctaDesc || 'We invite you to join us for a seated experience. Reservations are encouraged to ensure the proper time is dedicated to your brew.'}
            </p>
            <div className="flex flex-col sm:flex-row gap-5 justify-center">
              <Link
                href={contentData.ctaBtn1Link || '/visit'}
                className="bg-[#8D4F00] text-white px-12 py-5 rounded-full font-sans text-[11px] tracking-[0.2em] uppercase hover:bg-[#a85e00] transition-all hover:-translate-y-1 duration-300 shadow-lg shadow-[#8D4F00]/30"
              >
                {contentData.ctaBtn1Text || 'Find a Location'}
              </Link>
              <Link
                href={contentData.ctaBtn2Link || '/menu'}
                className="border border-white/25 text-white/80 px-12 py-5 rounded-full font-sans text-[11px] tracking-[0.2em] uppercase hover:border-white/50 hover:text-white transition-all duration-300"
              >
                {contentData.ctaBtn2Text || 'View the Menu'}
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
