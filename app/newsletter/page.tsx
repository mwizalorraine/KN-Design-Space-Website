'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import NavOverlay from '../components/NavOverlay';
import Cursor from '../components/Cursor ';

const CONTAINER = 'max-w-[1440px] mx-auto';

// Hand-edit these until this content lives in Django.
const NEWS = [
  {
    date: 'Date TBD',
    title: 'Mpazi Rehousing project featured on national coverage',
    excerpt:
      "A look at how the Mpazi neighborhood's redevelopment is reshaping housing in Kigali — watch the full feature below.",
    image: '/images/54521897332_ef3752defd_o.jpg',
  },
  {
    date: 'August 2026',
    title: 'KN Design Space Office Revamp completed',
    excerpt:
      "Our own office got the same interior design treatment we bring to client projects — reception, co-working space, and a director's office built around our material language.",
    image: '/images/ENTRANCE.png',
  }, 
];

type EventItem = {
  date: string;
  tag: string;
  title: string;
  description: string;
  media?: string; // leave blank for the placeholder frame; add a video/thumbnail URL later and it'll render automatically
};

const EVENTS: EventItem[] = [
  {
    date: 'September 2026',
    tag: 'SITE VISIT',
    title: 'TITLE',
    description: 'LOCATION',
  }, 
];

function NewsletterForm({ dark = false }: { dark?: boolean }) {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    try {
      const res = await fetch('https://kn-design-space-website.onrender.com/api/newsletter/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      if (!res.ok) throw new Error('failed');
      setStatus('success');
      setEmail('');
    } catch {
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <p className="font-mono text-sm uppercase text-[var(--brass)]">
        You&apos;re on the list — thank you.
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-[480px]">
      <input
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="add your email here"
        className={`flex-1 bg-transparent border-b py-2.5 px-1 text-base focus:outline-none focus:border-[var(--brass)] transition-colors ${
          dark ? 'border-[var(--on-dark)]/40 text-[var(--on-dark)] placeholder:text-[var(--on-dark)]/50' : 'border-[var(--line)]'
        }`}
      />
      <button
        type="submit"
        disabled={status === 'loading'}
        className="magnetic font-mono text-xs uppercase px-6 py-2.5 rounded-full bg-[var(--ink)] text-[var(--paper-light)] disabled:opacity-60"
      >
        {status === 'loading' ? 'Subscribing…' : 'Subscribe'}
      </button>
      {status === 'error' && (
        <p className="font-mono text-xs uppercase text-[var(--brass)] sm:ml-2 self-center">
          Something went wrong — try again.
        </p>
      )}
    </form>
  );
}

function EventCard({ event, i }: { event: EventItem; i: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5, delay: i * 0.08 }}
      className="border border-[var(--line)] bg-[var(--paper)]"
    >
      {/* Video-shaped frame — same aspect ratio as the featured video above, so a
          real video or thumbnail can drop straight in later via `media` with no layout change */}
      <div className="relative aspect-video overflow-hidden bg-gradient-to-br from-[var(--charcoal)] to-[var(--ink)]">
        <span className="absolute top-4 left-4 font-mono text-[10px] uppercase px-3 py-1.5 bg-[var(--brass)] text-[var(--paper-light)]">
          {event.tag}  
        </span>
        {event.media ? (
          <img src={event.media} alt={event.title} className="absolute inset-0 w-full h-full object-cover" />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="font-display text-2xl tracking-[0.3em] text-[var(--brass)] opacity-30 uppercase">
              Event 
            </span>
          </div> 
        )}
      </div>
      <div className="p-5">
        <span className="font-mono text-xs uppercase text-[var(--brass)] block mb-2">{event.date}</span>
        <h3 className="font-display font-semibold text-lg mb-2 leading-snug">{event.title}</h3>
        <p className="text-sm opacity-70 leading-relaxed">{event.description}</p>
      </div>
    </motion.div>
  );
}

export default function NewsletterPage() {
  return (
    <>
      <Cursor />
      <NavOverlay />

      {/* HEADER — full-bleed hero, same treatment as your homepage/project pages */}
      <section className="relative w-full h-[55vh] md:h-[65vh] min-h-[420px] overflow-hidden flex items-center justify-center text-center">
        <img
          src="/images/night view.png"
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/55 to-black/75" />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className={`relative px-6 ${CONTAINER}`}
        >
          <span className="font-mono text-2xl uppercase text-[var(--brass)] block mb-4">Stay updated</span>
          <h1 className="font-display font-semibold text-[clamp(40px,7vw,72px)] text-3xl leading-tight text-[var(--on-dark)] mb-4">
            Newsletter 
          </h1> 
          <div className="w-40 h-[2px] bg-[var(--brass)] mx-auto mb-6" />
          <p className="text-[var(--on-dark)]/85 max-w-[72ch] mx-auto text-lg md:text-20px text-balance mb-8">
            Project updates, upcoming events, and other news from KN Design Space - Delivered straight to your inbox.
          </p>
          <div className="flex justify-center">
            <NewsletterForm dark />
          </div>
        </motion.div>
      </section>

      {/* LATEST NEWS */}
      <section className="px-6 md:px-12 py-16 md:py-20">
        <div className={CONTAINER}>
          <h2 className="font-display font-semibold text-2xl md:text-3xl mb-10">Latest News</h2>
          <div className="grid md:grid-cols-2 gap-8 md:gap-12">
            {NEWS.map((item, i) => (
              <motion.article
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
                className="group border border-[var(--line)] bg-[var(--paper)] overflow-hidden"
              >
             <div className="relative aspect-[16/10] overflow-hidden bg-[var(--paper-light)]">
                {item.image ? (
                 <img
                  src={item.image}
                  alt={item.title}
             />
  ) : (
    <div className="absolute top-6 left-6 w-8 h-8 rounded-sm bg-[var(--brass)] transition-transform duration-300 group-hover:scale-[4] group-hover:opacity-10" />
  )}
</div>
                <div className="p-6">
                  <span className="font-mono text-xs uppercase text-[var(--brass)] block mb-3">{item.date}</span>
                  <h3 className="font-display font-semibold text-xl mb-2 leading-snug">{item.title}</h3>
                  <p className="opacity-75 leading-relaxed text-sm">{item.excerpt}</p>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURED VIDEO — centered, with an entrance animation */}
      <section className="px-6 md:px-12 py-12 md:py-16 bg-[var(--paper-light)]">
        <div className={CONTAINER}>
          <span className="font-mono text-2xl uppercase text-[var(--brass)] block mb-4 text-center">Featured</span>
          <h2 className="font-display font-semibold text-2xl md:text-3xl mb-8 max-w-[40ch] mx-auto text-center">
            Mpazi Rehousing — Imiterere y&apos;Umudugudu wa Mpazi ugiye guhindura imiturire muri Kigali
          </h2> 
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 16 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="relative w-full max-w-[900px] mx-auto aspect-video border border-[var(--line)] shadow-lg"
          > 
            <iframe
              src="https://www.youtube.com/embed/euBTwyrYWOA"
              title="Mpazi Rehousing"
              className="absolute inset-0 w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </motion.div>
        </div>
      </section>

      {/* UPCOMING EVENTS — video-shaped placeholder cards */}
      <section className="px-6 md:px-12 py-16 md:py-20 bg-[var(--paper-light)]">
        <div className={CONTAINER}>
          <h2 className="font-display font-semibold text-2xl md:text-3xl mb-10">Upcoming Events</h2>
          {EVENTS.length > 0 ? (
            <div className="grid md:grid-cols-3 gap-6">
              {EVENTS.map((event, i) => (
                <EventCard key={event.title} event={event} i={i} />
              ))}
            </div>
          ) : (
            <p className="opacity-60 font-mono text-sm uppercase">Nothing scheduled right now — check back soon.</p>
          )}
        </div>
      </section>
    </>
  );
}