'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import NavOverlay from '../components/NavOverlay';
import Cursor from '../components/Cursor ';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    try {
      const res = await fetch('http://127.0.0.1:8000/api/contact/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error('Failed');
      setStatus('sent');
      setForm({ name: '', email: '', phone: '', message: '' });
    } catch {
      setStatus('error');
    }
  };

  const address = 'KN 5 Rd, Immeuble Aigle Blanc, Kimihurura, Kigali, Rwanda';
  const mapEmbedSrc = `https://www.google.com/maps?q=${encodeURIComponent(address)}&output=embed`;
  const directionsHref = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(address)}`;

  return (
    <>
      <Cursor />
      <NavOverlay />

      {/* HERO STRIP */}
      <section className="px-12 pt-20 pb-14 border-b border-[var(--line)]">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <div className="font-serif italic text-lg opacity-75 mb-3">Transforming lives through architecture.</div>
          <h1 className="font-display font-semibold text-[clamp(36px,5.5vw,62px)] leading-[1.02] max-w-[16ch]">
            Have a site in mind? Let&apos;s design it.
          </h1>
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="flex flex-wrap gap-x-12 gap-y-3 mt-9 font-mono text-xs uppercase opacity-60"
        >
          <div><span className="opacity-50 block mb-1">Response Time</span>Within 2 business days</div>
          <div><span className="opacity-50 block mb-1">Office Hours</span>Mon–Fri, 9:00–17:00 CAT</div>
          <div><span className="opacity-50 block mb-1">Preferred</span>Email or WhatsApp</div>
        </motion.div>
      </section>

      <section className="grid md:grid-cols-[1fr_1px_1fr] gap-0">
        {/* LEFT: form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
          className="px-12 py-16"
        >
          <div className="font-mono text-xs uppercase text-[var(--brass)] mb-8">Tell us about the project</div>

          {status === 'sent' ? (
            <div className="border border-[var(--line)] bg-[var(--paper-light)] p-8">
              <p className="font-display font-semibold text-xl mb-2">Message sent.</p>
              <p className="opacity-75">Thanks for reaching out — we&apos;ll be in touch soon.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-7 max-w-md">
              <div>
                <label className="font-mono text-xs uppercase opacity-65 block mb-2">Name</label>
                <input
                  required
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  className="w-full bg-transparent border-b border-[var(--line)] py-3 outline-none focus:border-[var(--brass)] transition-colors"
                />
              </div>
              <div>
                <label className="font-mono text-xs uppercase opacity-65 block mb-2">Email</label>
                <input
                  required
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  className="w-full bg-transparent border-b border-[var(--line)] py-3 outline-none focus:border-[var(--brass)] transition-colors"
                />
              </div>
              <div>
                <label className="font-mono text-xs uppercase opacity-65 block mb-2">Phone (optional)</label>
                <input
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  className="w-full bg-transparent border-b border-[var(--line)] py-3 outline-none focus:border-[var(--brass)] transition-colors"
                />
              </div>
              <div>
                <label className="font-mono text-xs uppercase opacity-65 block mb-2">Message</label>
                <textarea
                  required
                  name="message"
                  rows={5}
                  value={form.message}
                  onChange={handleChange}
                  className="w-full bg-transparent border-b border-[var(--line)] py-3 outline-none focus:border-[var(--brass)] transition-colors resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={status === 'sending'}
                className="magnetic font-mono text-xs uppercase px-6 py-3 rounded-full bg-[var(--ink)] text-[var(--paper-light)] disabled:opacity-50"
              >
                {status === 'sending' ? 'Sending…' : 'Send message →'}
              </button>

              {status === 'error' && (
                <p className="text-sm text-[var(--brass)]">Something went wrong — check the backend is running and try again.</p>
              )}
            </form>
          )}
        </motion.div>

        {/* DIVIDER */}
        <div className="hidden md:block bg-[var(--line)]" />

        {/* RIGHT: map framed as a drawing figure, contact, socials */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="px-12 py-16"
        >
          <div className="font-mono text-xs uppercase text-[var(--brass)] mb-4">Studio Location</div>

          <div className="border border-[var(--ink)] p-3">
            <div className="overflow-hidden" style={{ height: '260px' }}>
              <iframe
                src={mapEmbedSrc}
                width="100%"
                height="100%"
                style={{ border: 0, filter: 'grayscale(20%)' }}
                loading="lazy"
                title="KN Design Space office location"
              />
            </div>
            <div className="flex justify-between items-center pt-3 font-mono text-[10.5px] uppercase opacity-55">
              <span>STUDIO LOCATION, KIMIHURURA</span>
              <span>KIGALI, RW</span>
            </div>
          </div>

          <p className="text-[15px] opacity-80 mt-4 mb-5">{address}</p>

          
          <a  href={directionsHref}
            target="_blank"
            className="magnetic inline-flex items-center gap-2 font-mono text-xs uppercase px-5 py-2.5 rounded-full bg-[var(--brass)] text-[var(--paper-light)] mb-14"
          >
            Get directions →
          </a>

          <div className="grid grid-cols-2 gap-6 border-t border-[var(--line)] pt-8">
            <div>
              <div className="font-mono text-xs uppercase text-[var(--brass)] mb-3">Direct</div>
              <a href="mailto:kndesignspace@gmail.com" className="magnetic block font-display font-semibold hover:text-[var(--brass)] transition-colors mb-1">
                kndesignspace@gmail.com
              </a>
              <a href="tel:+250788841556" className="magnetic block text-sm opacity-80 hover:text-[var(--brass)] transition-colors">
                +250 788 841 556
              </a>
            </div>
            <div>
              <div className="font-mono text-xs uppercase text-[var(--brass)] mb-3">Follow</div>
              <div className="flex gap-2.5">
                <a href="https://wa.me/250788841556" target="_blank" className="magnetic w-10 h-10 rounded-full border border-[var(--line)] flex items-center justify-center hover:bg-[var(--ink)] hover:text-[var(--paper-light)] transition-colors">
                  <svg viewBox="0 0 24 24" className="w-4.5 h-4.5 fill-current"><path d="M12 2C6.48 2 2 6.48 2 12c0 1.85.5 3.58 1.36 5.07L2 22l5.07-1.33A9.94 9.94 0 0012 22c5.52 0 10-4.48 10-10S17.52 2 12 2zm5.2 14.2c-.22.62-1.28 1.18-1.77 1.25-.45.07-1.02.1-1.65-.1-.38-.12-.87-.28-1.5-.55-2.64-1.14-4.36-3.8-4.5-3.98-.13-.18-1.08-1.43-1.08-2.73 0-1.3.68-1.93.92-2.2.24-.26.53-.33.7-.33h.5c.16 0 .38-.06.6.45.22.53.75 1.83.82 1.96.07.13.11.29.02.47-.09.18-.14.29-.27.44-.13.16-.28.35-.4.47-.13.13-.27.27-.12.53.16.26.7 1.15 1.5 1.86 1.03.92 1.9 1.2 2.16 1.34.26.13.42.11.57-.07.16-.18.66-.77.84-1.04.18-.26.35-.22.6-.13.24.09 1.53.72 1.79.85.26.13.44.2.5.31.07.11.07.65-.15 1.27z" /></svg>
                </a>
                <a href="#" className="magnetic w-10 h-10 rounded-full border border-[var(--line)] flex items-center justify-center opacity-35 hover:opacity-100 hover:bg-[var(--ink)] hover:text-[var(--paper-light)] transition-colors" title="Add real Instagram link">
                  <svg viewBox="0 0 24 24" className="w-4.5 h-4.5 fill-current"><path d="M12 2c2.7 0 3.05.01 4.12.06 1.06.05 1.79.22 2.43.47.66.26 1.21.6 1.76 1.15.55.55.89 1.1 1.15 1.76.25.64.42 1.37.47 2.43.05 1.07.06 1.42.06 4.12s-.01 3.05-.06 4.12c-.05 1.06-.22 1.79-.47 2.43a4.9 4.9 0 01-1.15 1.76 4.9 4.9 0 01-1.76 1.15c-.64.25-1.37.42-2.43.47-1.07.05-1.42.06-4.12.06s-3.05-.01-4.12-.06c-1.06-.05-1.79-.22-2.43-.47a4.9 4.9 0 01-1.76-1.15 4.9 4.9 0 01-1.15-1.76c-.25-.64-.42-1.37-.47-2.43C2.01 15.05 2 14.7 2 12s.01-3.05.06-4.12c.05-1.06.22-1.79.47-2.43.26-.66.6-1.21 1.15-1.76A4.9 4.9 0 015.44 2.53c.64-.25 1.37-.42 2.43-.47C8.95 2.01 9.3 2 12 2zm0 5a5 5 0 100 10 5 5 0 000-10zm0 8.2a3.2 3.2 0 110-6.4 3.2 3.2 0 010 6.4zm5.2-8.4a1.17 1.17 0 100-2.34 1.17 1.17 0 000 2.34z" /></svg>
                </a>
                <a href="#" className="magnetic w-10 h-10 rounded-full border border-[var(--line)] flex items-center justify-center opacity-35 hover:opacity-100 hover:bg-[var(--ink)] hover:text-[var(--paper-light)] transition-colors" title="Add real LinkedIn link">
                  <svg viewBox="0 0 24 24" className="w-4.5 h-4.5 fill-current"><path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.03-1.85-3.03-1.85 0-2.14 1.45-2.14 2.94v5.66H9.34V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.38-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.07 2.07 0 110-4.13 2.07 2.07 0 010 4.13zM7.12 20.45H3.56V9h3.56v11.45z" /></svg>
                </a>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      <div className="px-12 py-6 border-t border-[var(--line)] flex justify-between font-mono text-[11px] uppercase opacity-50">
        <span>KN Design Space</span>
      </div>
    </>
  );
}