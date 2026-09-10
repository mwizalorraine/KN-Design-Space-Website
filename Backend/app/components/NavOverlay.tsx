'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const links = [
  { label: 'Home', href: '/' },
  { label: 'Projects', href: '/#projects' },
  { label: 'Studio', href: '/studio' },
  { label: 'Services', href: '/#services' },
  { label: 'Contact', href: '/contact' },
];

export default function NavOverlay() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <nav className="sticky top-0 z-50 flex items-center justify-between px-12 py-5 bg-[var(--paper)] border-b border-[var(--line)]">
        <div className="flex items-center gap-12 font-display font-bold tracking-wide">
          <svg viewBox="0 0 100 100" className="w-8 h-8">
            <rect x="10" y="20" width="20" height="60" fill="var(--ink)" />
            <polygon points="30,80 30,20 55,35 55,80" fill="none" stroke="var(--ink)" strokeWidth="4" />
            <polygon points="55,55 75,35 95,55 95,80 75,80 75,60 55,80" fill="var(--ink)" />
          </svg>
          KN DESIGN SPACE
        </div>
        <div className="flex items-center gap-6">
          <a href="/contact" className="magnetic font-mono text-xs uppercase tracking-wide border border-[var(--ink)] rounded-full px-5 py-2.5">Let&apos;s talk →</a>
          <button onClick={() => setOpen(true)} className="magnetic flex flex-col justify-center gap-1.5 w-8 h-8">
            <span className="block h-[1.5px] w-full bg-[var(--ink)]" />
            <span className="block h-[1.5px] w-full bg-[var(--ink)]" />
            <span className="block h-[1.5px] w-full bg-[var(--ink)]" />
          </button>
        </div>
      </nav>


      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ y: '-100%' }}
            animate={{ y: 0 }}
            exit={{ y: '-100%' }}
            transition={{ duration: 0.55, ease: [0.77, 0, 0.18, 1] }}
            className="fixed inset-0 z-[100] bg-[var(--charcoal)] text-[var(--paper-light)] flex flex-col justify-center px-16"
          >
            <button onClick={() => setOpen(false)} className="magnetic absolute top-7 right-12 text-2xl">✕</button>
            <ul>
              {links.map((link, i) => (
                <li key={link.label} className="overflow-hidden">
                  <motion.a
                    href={link.href}
                    className="magnetic block font-display font-semibold text-[clamp(34px,6vw,64px)] py-1.5 hover:text-[var(--brass)]"
                    initial={{ y: '100%', opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.08 + i * 0.06, duration: 0.5 }}
                    onClick={() => setOpen(false)}
                  >
                    {link.label}
                  </motion.a>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}