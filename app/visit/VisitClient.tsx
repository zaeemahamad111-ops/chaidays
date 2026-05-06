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

export default function VisitClient() {
  const [formState, setFormState] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* ── Hero ── */}
      <section className="pt-[140px] pb-24 px-6 md:px-16 max-w-[1440px] mx-auto">
        <div className="flex flex-col lg:flex-row items-end gap-12 border-b border-outline-variant pb-24">
          <div className="lg:w-1/2 space-y-8">
            <p className="hero-text-1 font-sans text-[11px] tracking-[0.3em] uppercase text-secondary">Guest Experience</p>
            <h1 className="hero-text-2 font-serif text-[64px] md:text-[80px] text-primary leading-none">An Invitation to Pause</h1>
            <p className="hero-text-3 font-sans text-lg text-on-surface-variant max-w-xl leading-relaxed">
              Step away from the noise and rediscover intentional presence in a sanctuary curated for the art of the moment.
            </p>
          </div>
          <ScrollReveal delay={150} className="lg:w-1/2 w-full h-[400px] md:h-[500px] overflow-hidden rounded-2xl shadow-xl relative">
            <Image
              src="/images/gallery/space-1.jpg"
              alt="Serene Chai Days tea house interior with warm light"
              fill
              className="object-cover"
              priority
              unoptimized={true}
            />
          </ScrollReveal>
        </div>
      </section>

      {/* ── Info Cards ── */}
      <section className="pb-32 px-6 md:px-16 max-w-[1440px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
          <ScrollReveal>
            <div className="group">
              <div className="mb-6 overflow-hidden rounded-xl border border-outline-variant h-48 relative">
                <Image
                  src="/images/gallery/space-4.jpg"
                  alt="Stone Harbor district location map"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                  unoptimized={true}
                />
              </div>
              <span className="font-sans text-[11px] tracking-[0.3em] uppercase text-secondary mb-3 block">Location</span>
              <h3 className="font-serif text-2xl text-primary mb-4">Krishnappa Compound</h3>
              <address className="font-sans text-sm text-on-surface-variant not-italic leading-relaxed mb-6">
                NO.1 & 2, NO.26/10, 80 FT ROAD<br />Mangammana Palya Main Road<br />Bangalore, Karnataka 560068
              </address>
              <a href="https://maps.google.com" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-primary font-sans font-semibold text-sm hover:text-secondary transition-colors">
                View Map <span className="material-symbols-outlined text-[18px]">arrow_outward</span>
              </a>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={150}>
            <div className="mb-6 flex items-center justify-center border border-outline-variant h-48 rounded-xl bg-surface-container-low">
              <span className="material-symbols-outlined text-outline-variant" style={{ fontSize: 64 }}>pace</span>
            </div>
            <span className="font-sans text-[11px] tracking-[0.3em] uppercase text-secondary mb-3 block">Service Hours</span>
            <h3 className="font-serif text-2xl text-primary mb-6">Opening Hours</h3>
            <div className="space-y-3 font-sans text-sm text-on-surface-variant">
              {[['Daily Service', '08:00 – 22:00']].map(([day, hours]) => (
                <div key={day} className="flex justify-between border-b border-outline-variant pb-3">
                  <span>{day}</span>
                  <span className="text-primary font-semibold">{hours}</span>
                </div>
              ))}
              <p className="text-[10px] italic mt-2 opacity-70">*Hours may vary on holidays</p>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={300}>
            <div className="mb-6 flex items-center justify-center border border-outline-variant h-48 rounded-xl bg-surface-container-low">
              <span className="material-symbols-outlined text-outline-variant" style={{ fontSize: 64 }}>contact_mail</span>
            </div>
            <span className="font-sans text-[11px] tracking-[0.3em] uppercase text-secondary mb-3 block">Get in Touch</span>
            <h3 className="font-serif text-2xl text-primary mb-6">Contact</h3>
            <div className="space-y-2 mb-8">
              <p className="font-sans text-sm text-on-surface-variant">info@chaidays.in</p>
              <p className="font-sans text-sm text-on-surface-variant">+91 99800 84666</p>
            </div>
            <div className="flex gap-5">
              <a href="https://wa.me/919980084666" target="_blank" rel="noopener noreferrer" className="text-primary hover:text-secondary transition-colors">
                <span className="material-symbols-outlined">chat_bubble</span>
              </a>
              <a href="https://www.instagram.com/chaidays" target="_blank" rel="noopener noreferrer" className="text-primary hover:text-secondary transition-colors">
                <span className="material-symbols-outlined">alternate_email</span>
              </a>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ── Concierge Form ── */}
      <section className="py-32 bg-surface-container-low">
        <div className="max-w-[1440px] mx-auto px-6 md:px-16">
          <ScrollReveal className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="font-serif text-4xl md:text-5xl text-primary mb-6">Concierge Inquiry</h2>
            <p className="font-sans text-lg text-on-surface-variant leading-relaxed">
              Planning a visit or have a special request? Our concierge team is here to assist with your journey.
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
            <span className="font-sans text-[11px] tracking-[0.3em] uppercase text-secondary">Career Opportunities</span>
            <h2 className="font-serif text-4xl md:text-5xl text-primary">We&apos;re Hiring!</h2>
            <p className="font-sans text-lg text-on-surface-variant leading-relaxed">
              If helping people start their day off right makes your day, we&apos;re the team for you. Multiple positions available at our Bangalore locations.
            </p>
            <div className="pt-4">
              <a href="mailto:info@chaidays.in" className="inline-block bg-primary text-white px-12 py-5 rounded-full font-sans text-[11px] tracking-widest uppercase hover:bg-secondary transition-all">
                Join the Team
              </a>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ── Pull Quote ── */}
      <section className="py-32 text-center px-6">
        <ScrollReveal>
          <blockquote className="font-serif text-2xl md:text-3xl text-primary-container max-w-2xl mx-auto italic leading-relaxed">
            &ldquo;We believe every cup of chai is an invitation to slow down and connect with oneself and others.&rdquo;
          </blockquote>
        </ScrollReveal>
      </section>
    </>
  );
}
