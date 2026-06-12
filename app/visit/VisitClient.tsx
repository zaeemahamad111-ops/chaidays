'use client';
import { useState } from 'react';
import Image from 'next/image';
import ScrollReveal from '@/components/ScrollReveal';

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'CafeOrCoffeeShop',
  name: 'Chai Days',
  description: 'Premium artisan chai café dedicated to the slow sip.',
  url: 'https://chaidays.com',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'NO.1 & 2, NO.26/10, 80 FT ROAD, KRISHNAPPA COMPOUND, MANGAMMANA PALYA MAIN ROAD',
    addressLocality: 'Bangalore',
    addressRegion: 'Karnataka',
    postalCode: '560068',
    addressCountry: 'IN',
  },
  openingHoursSpecification: [
    { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'], opens: '00:00', closes: '00:00' },
  ],
  telephone: '+91-99800-84666',
  email: 'info@chaidays.in',
};

export default function VisitClient({ contentData = {}, outlets = [] }: { contentData?: any, outlets?: any[] }) {
  const [formState, setFormState] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  // Fallback to original single layout if no outlets are defined in CMS
  const displayOutlets = outlets && outlets.length > 0 ? outlets : [{
    name: contentData.locName || 'Krishnappa Compound',
    address: contentData.locAddress || 'NO.1 & 2, NO.26/10, 80 FT ROAD<br />Mangammana Palya Main Road<br />Bangalore, Karnataka 560068',
    mapUrl: 'https://maps.google.com',
    img: contentData.locImg || '/images/gallery/space-4.jpg',
    email: contentData.contactEmail || 'info@chaidays.in',
    phone: contentData.contactPhone || '+91 99800 84666',
    hours: 'Daily Service: 08:00 – 22:00'
  }];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* ── Hero ── */}
      <section className="pt-[140px] pb-24 px-6 md:px-16 max-w-[1440px] mx-auto">
        <div className="flex flex-col lg:flex-row items-end gap-12 border-b border-outline-variant pb-24">
          <div className="lg:w-1/2 space-y-8">
            <p className="hero-text-1 font-sans text-[11px] tracking-[0.3em] uppercase text-secondary">{contentData.heroSubtitle || 'Guest Experience'}</p>
            <h1 className="hero-text-2 font-serif text-[64px] md:text-[80px] text-primary leading-none">{contentData.heroTitle || 'An Invitation to Pause'}</h1>
            <p className="hero-text-3 font-sans text-lg text-on-surface-variant max-w-xl leading-relaxed">
              {contentData.heroDesc || 'Step away from the noise and rediscover intentional presence in a sanctuary curated for the art of the moment.'}
            </p>
          </div>
          <ScrollReveal delay={150} className="lg:w-1/2 w-full h-[400px] md:h-[500px] overflow-hidden rounded-2xl shadow-xl relative">
            <Image
              src={contentData.heroImg || "/images/gallery/space-1.jpg"}
              alt="Serene Chai Days tea house interior with warm light"
              fill
              className="object-cover"
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </ScrollReveal>
        </div>
      </section>

      {/* ── Outlets Grid ── */}
      <section className="pb-32 px-6 md:px-16 max-w-[1440px] mx-auto">
        <div className={`grid grid-cols-1 gap-10 ${displayOutlets.length > 1 ? 'md:grid-cols-2 lg:grid-cols-3' : 'max-w-xl'}`}>
          {displayOutlets.map((outlet, index) => {
            const rawHours = outlet.hours || '';
            const hoursLines = rawHours.split('\n').filter((h: string) => h.trim() !== '');
            const formattedHours = hoursLines.length > 0 ? hoursLines : ['Daily Service: 08:00 – 22:00'];

            return (
              <ScrollReveal key={index} delay={index * 100}>
                <div className="group border border-outline-variant rounded-2xl overflow-hidden bg-surface-container-low hover:shadow-xl transition-shadow duration-500">
                  {/* Image */}
                  <div className="relative h-56 overflow-hidden">
                    <Image
                      src={outlet.img || '/images/gallery/space-4.jpg'}
                      alt={`${outlet.name} location`}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      loading="lazy"
                      sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                    />
                  </div>

                  {/* Details */}
                  <div className="p-7 space-y-6">
                    {/* Name & Address */}
                    <div>
                      <span className="font-sans text-[10px] tracking-[0.3em] uppercase text-secondary mb-2 block">Location</span>
                      <h3 className="font-serif text-2xl text-primary mb-3">{outlet.name || 'Store Location'}</h3>
                      <address className="font-sans text-sm text-on-surface-variant not-italic leading-relaxed" dangerouslySetInnerHTML={{ __html: outlet.address || 'Address not provided' }} />
                      {outlet.mapUrl && (
                        <a href={outlet.mapUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-secondary font-sans font-semibold text-xs mt-3 hover:text-primary transition-colors">
                          View on Map <span className="material-symbols-outlined text-[15px]">arrow_outward</span>
                        </a>
                      )}
                    </div>

                    <div className="border-t border-outline-variant/50" />

                    {/* Hours */}
                    <div>
                      <span className="font-sans text-[10px] tracking-[0.3em] uppercase text-secondary mb-3 block">Service Hours</span>
                      <div className="space-y-2 font-sans text-sm text-on-surface-variant">
                        {formattedHours.map((line: string, i: number) => {
                          const colonIdx = line.indexOf(':');
                          const day = colonIdx >= 0 ? line.slice(0, colonIdx) : line;
                          const time = colonIdx >= 0 ? line.slice(colonIdx + 1).trim() : '';
                          return (
                            <div key={i} className="flex justify-between">
                              <span>{day.trim()}</span>
                              {time && <span className="text-primary font-semibold">{time}</span>}
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    <div className="border-t border-outline-variant/50" />

                    {/* Contact */}
                    <div>
                      <span className="font-sans text-[10px] tracking-[0.3em] uppercase text-secondary mb-3 block">Contact</span>
                      <div className="space-y-1 font-sans text-sm text-on-surface-variant mb-4">
                        {outlet.email && <p>{outlet.email}</p>}
                        {outlet.phone && <p>{outlet.phone}</p>}
                      </div>
                      <div className="flex gap-4">
                        {outlet.phone && (
                          <a href={`https://wa.me/${(outlet.phone || '').replace(/[^0-9]/g, '')}`} target="_blank" rel="noopener noreferrer" className="text-primary hover:text-secondary transition-colors">
                            <span className="material-symbols-outlined">chat_bubble</span>
                          </a>
                        )}
                        {outlet.email && (
                          <a href={`mailto:${outlet.email}`} className="text-primary hover:text-secondary transition-colors">
                            <span className="material-symbols-outlined">alternate_email</span>
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </section>


      {/* ── Concierge Form ── */}
      <section className="py-32 bg-surface-container-low">
        <div className="max-w-[1440px] mx-auto px-6 md:px-16">
          <ScrollReveal className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="font-serif text-4xl md:text-5xl text-primary mb-6">{contentData.formTitle || 'Concierge Inquiry'}</h2>
            <p className="font-sans text-lg text-on-surface-variant leading-relaxed">
              {contentData.formDesc || 'Planning a visit or have a special request? Our concierge team is here to assist with your journey.'}
            </p>
          </ScrollReveal>

          {submitted ? (
            <div className="max-w-2xl mx-auto text-center py-12">
              <span className="material-symbols-outlined text-secondary text-6xl mb-4 block">check_circle</span>
              <h3 className="font-serif text-3xl text-primary mb-3">Your invitation has been sent.</h3>
              <p className="font-sans text-on-surface-variant">We will be in touch within 24 hours to confirm your experience.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="max-w-2xl mx-auto space-y-10">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <div className="floating-label-group">
                  <input id="name" type="text" placeholder=" " required value={formState.name} onChange={(e) => setFormState({ ...formState, name: e.target.value })} />
                  <label htmlFor="name">Full Name</label>
                </div>
                <div className="floating-label-group">
                  <input id="email" type="email" placeholder=" " required value={formState.email} onChange={(e) => setFormState({ ...formState, email: e.target.value })} />
                  <label htmlFor="email">Email Address</label>
                </div>
              </div>
              <div className="floating-label-group">
                <textarea id="message" placeholder=" " rows={4} required value={formState.message} onChange={(e) => setFormState({ ...formState, message: e.target.value })} style={{ resize: 'none' }} />
                <label htmlFor="message">How Can We Assist You?</label>
              </div>
              <div className="flex justify-center pt-4">
                <button type="submit" className="bg-secondary text-white px-14 py-5 rounded-full font-sans text-[11px] tracking-widest uppercase hover:bg-[#6b3b00] hover:shadow-lg transition-all duration-300 active:scale-95">
                  Send Invitation
                </button>
              </div>
            </form>
          )}
        </div>
      </section>

      {/* ── Join the Team ── */}
      <section className="py-24 bg-surface-container-highest/20 border-t border-outline-variant/30">
        <div className="max-w-[1440px] mx-auto px-6 md:px-16 text-center">
          <ScrollReveal className="max-w-2xl mx-auto space-y-8">
            <span className="font-sans text-[11px] tracking-[0.3em] uppercase text-secondary">{contentData.hiringSubtitle || 'Career Opportunities'}</span>
            <h2 className="font-serif text-4xl md:text-5xl text-primary">{contentData.hiringTitle || 'We\'re Hiring!'}</h2>
            <p className="font-sans text-lg text-on-surface-variant leading-relaxed">
              {contentData.hiringDesc || 'If helping people start their day off right makes your day, we\'re the team for you. Multiple positions available at our Bangalore locations.'}
            </p>
            <div className="pt-4">
              <a href="mailto:info@chaidays.in" className="inline-block bg-primary text-white px-12 py-5 rounded-full font-sans text-[11px] tracking-widest uppercase hover:bg-secondary transition-all">
                {contentData.hiringBtnText || 'Join the Team'}
              </a>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ── Pull Quote ── */}
      <section className="py-32 text-center px-6">
        <ScrollReveal>
          <blockquote className="font-serif text-2xl md:text-3xl text-primary-container max-w-2xl mx-auto italic leading-relaxed" dangerouslySetInnerHTML={{ __html: contentData.quoteText || '&ldquo;We believe every cup of chai is an invitation to slow down and connect with oneself and others.&rdquo;' }} />
        </ScrollReveal>
      </section>
    </>
  );
}
