'use client';
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import ThemeToggle from './ThemeToggle';

const links = [
  { label: 'Home', href: '/' },
  { label: 'Projects', href: '/projects' },
  { label: 'Team', href: '/studio' },
  { label: 'Services', href: '/services' },
  { label: 'Newsletter', href: '/newsletter' },
];

type SearchResult = {
  id: number;
  title: string;
  slug: string;
  location: string;
};

const NAV_HEIGHT = 84; // px — used to push page content down on non-home pages

export default function NavOverlay() {
  const pathname = usePathname();
  const isHome = pathname === '/';
  const [scrollProgress, setScrollProgress] = useState(0);
  const scrolled = scrollProgress > 0.5;
  const [open, setOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [allProjects, setAllProjects] = useState<SearchResult[]>([]);
  const [activeSection, setActiveSection] = useState<string | null>(null);

  const transparent = isHome && !scrolled;

  useEffect(() => {
  const onScroll = () => setScrollProgress(Math.min(1, window.scrollY / 140));
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });
  return () => window.removeEventListener('scroll', onScroll);
}, []);
useEffect(() => {
  if (pathname !== '/') return;
  const homeEl = document.getElementById('home-sentinel');
  const projectsEl = document.getElementById('projects');
  const servicesEl = document.getElementById('services');
  const targets = [homeEl, projectsEl, servicesEl].filter(Boolean) as HTMLElement[];
  if (targets.length === 0) return;

  const observer = new IntersectionObserver(
    (entries) => {
      const visible = entries
        .filter((e) => e.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

      if (visible) {
        setActiveSection(visible.target.id === 'home-sentinel' ? 'home' : visible.target.id);
      } else {
        // Not in any tracked section (e.g. scrolled into the footer/process area) — clear the highlight entirely
        setActiveSection(null);
      }
    },
    { threshold: 0.3 }
  );

  targets.forEach((t) => observer.observe(t));
  return () => observer.disconnect();
}, [pathname]);

  const isActive = (label: string) => {
    if (label === 'Home') return pathname === '/' && activeSection === 'home';
    if (label === 'Projects') return pathname.startsWith('/projects') || (pathname === '/' && activeSection === 'projects');
    if (label === 'Team') return pathname === '/studio';
    if (label === 'Services') return pathname.startsWith('/services');
    if (label === 'Newsletter') return pathname === '/newsletter';
    return false;
  };

  useEffect(() => {
    if (searchOpen && allProjects.length === 0) {
      fetch('http://127.0.0.1:8000/api/projects/')
        .then((res) => res.json())
        .then(setAllProjects)
        .catch(() => setAllProjects([]));
    }
  }, [searchOpen, allProjects.length]);

  const results =
    query.trim().length > 0
      ? allProjects.filter(
          (p) =>
            p.title.toLowerCase().includes(query.toLowerCase()) ||
            p.location?.toLowerCase().includes(query.toLowerCase())
        )
      : [];

  return (
    <>
      <nav className="fixed top-0 inset-x-0 z-50 px-12 py-5">
  <div
    className="absolute inset-0 bg-[var(--paper)] border-b border-[var(--line)]"
    style={{ opacity: isHome ? scrollProgress : 1 }}
  />
  <div className="relative flex items-center justify-between">
  
        <div className="flex items-center gap-3">
          <img
            src="/images/KN_Design_Space_Logo.png"
            alt="KN Design Space"
            className={`h-11 w-auto site-logo transition-all duration-300 ${transparent ? 'invert' : ''}`}
          />
          <span className={`font-display font-bold text-sm tracking-wide ${transparent ? 'text-white' : ''}`}>KN DESIGN SPACE</span>
        </div>

        <div className={`hidden md:flex items-center gap-9 ${transparent ? 'text-white' : ''}`}>
          {links.map((link) => {
            const active = isActive(link.label);
            return (
              <a
                key={link.label}
                href={link.href}
                className={`magnetic group relative font-serif text-[15px] uppercase tracking-[0.06em] pb-1 transition-opacity ${
                  transparent
                    ? active ? 'text-white opacity-80' : 'text-white opacity-100 hover:opacity-100'
                    : active ? 'text-[var(--brass)] opacity-85' : 'text-[var(--brass)] opacity-100 hover:opacity-100'
                }`}
              >
                {link.label}
                <span
                  className={`absolute left-0 -bottom-0.5 h-[1px] transition-all duration-300 ${
                    transparent ? 'bg-white' : 'bg-[var(--brass)]'
                  } ${active ? 'w-full' : 'w-0 group-hover:w-full'}`}
                />
              </a>
            );
          })}
        </div>

        <div className={`flex items-center gap-3 ${transparent ? 'text-white' : 'text-[var(--ink)]'}`}>
          <ThemeToggle />

          <button
            onClick={() => setSearchOpen((v) => !v)}
            aria-label="Search"
            className={`magnetic hidden md:flex items-center justify-center w-10 h-10 rounded-full transition-colors ${
              transparent ? 'hover:bg-white/15' : 'hover:bg-[var(--line)]'
            }`}
          >
            <svg viewBox="0 0 24 24" className="w-4.5 h-4.5 fill-none stroke-current" strokeWidth="1.8">
              <circle cx="11" cy="11" r="7" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
          </button>

          <a
            href="/contact"
            className={`magnetic hidden sm:inline-flex font-mono text-xs uppercase tracking-wide rounded-full px-5 py-2.5 border transition-colors ${
              transparent
                ? 'border-white text-white hover:bg-white hover:text-[var(--ink)]'
                : 'border-[var(--ink)] hover:bg-[var(--ink)] hover:text-[var(--paper-light)]'
            }`}
          >
            Let&apos;s talk →
          </a>

          <button onClick={() => setOpen(true)} className="magnetic md:hidden flex flex-col justify-center gap-1.5 w-8 h-8">
            <span className={`block h-[1.5px] w-full transition-colors ${transparent ? 'bg-white' : 'bg-[var(--ink)]'}`} />
            <span className={`block h-[1.5px] w-full transition-colors ${transparent ? 'bg-white' : 'bg-[var(--ink)]'}`} />
            <span className={`block h-[1.5px] w-full transition-colors ${transparent ? 'bg-white' : 'bg-[var(--ink)]'}`} />
          </button>
        </div>
        </div>
      </nav>

      {/* Reserves space for the fixed nav on every page EXCEPT home, where the hero is designed to sit full-bleed behind it */}
      {!isHome && <div style={{ height: NAV_HEIGHT }} />}

      <AnimatePresence>
        {searchOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
            className="fixed z-40 bg-[var(--paper-light)] border-b border-[var(--line)] px-12 py-6 inset-x-0"
            style={{ top: NAV_HEIGHT }}
          >
            <input
              autoFocus
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search projects by name or location…"
              className="w-full bg-transparent border-b border-[var(--ink)] py-2 text-lg font-serif italic outline-none"
            />
            {results.length > 0 && (
              <ul className="mt-4 space-y-2 max-h-72 overflow-y-auto">
                {results.map((r) => (
                  <li key={r.id}>
                    <a
                      href={`/projects/${r.slug}`}
                      className="magnetic block font-mono text-sm py-1.5 hover:text-[var(--brass)] transition-colors"
                    >
                      {r.title} <span className="opacity-50">— {r.location}</span>
                    </a>
                  </li>
                ))}
              </ul>
            )}
            {query.trim().length > 0 && results.length === 0 && (
              <p className="mt-4 font-mono text-sm opacity-50">No projects found.</p>
            )}
          </motion.div>
        )}
      </AnimatePresence>

<AnimatePresence>
        {open && (
          <motion.div
            initial={{ y: '-100%' }}
            animate={{ y: 0 }}
            exit={{ y: '-100%' }}
            transition={{ duration: 0.55, ease: [0.77, 0, 0.18, 1] }}
            className="fixed inset-0 z-[100] md:hidden overflow-hidden"
          >
            {/* Full-bleed photo background, same treatment as your hero */}
            <img
              src="/images/night view.png"
              alt=""
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-[var(--charcoal)]/95 via-[var(--charcoal)]/92 to-[var(--charcoal)]/95" />

            <div className="relative h-full flex flex-col text-[var(--on-dark)] px-8 pt-6 pb-8">
              {/* HEADER ROW — mirrors the desktop nav bar's own layout */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <img
                    src="/images/KN_Design_Space_Logo.png"
                    alt="KN Design Space"
                    className="h-9 w-auto invert"
                  />
                  <span className="font-display font-bold text-xs tracking-wide">KN DESIGN SPACE</span>
                </div>

                <div className="flex items-center gap-2">
                  <ThemeToggle />
                  <button
                    onClick={() => {
                      setOpen(false);
                      setSearchOpen(true);
                    }}
                    aria-label="Search"
                    className="magnetic flex items-center justify-center w-9 h-9 rounded-full hover:bg-white/10 transition-colors"
                  >
                    <svg viewBox="0 0 24 24" className="w-4.5 h-4.5 fill-none stroke-current" strokeWidth="1.8">
                      <circle cx="11" cy="11" r="7" />
                      <line x1="21" y1="21" x2="16.65" y2="16.65" />
                    </svg>
                  </button>
                  <button onClick={() => setOpen(false)} className="magnetic text-xl w-9 h-9 flex items-center justify-center">
                    ✕
                  </button>
                </div>
              </div>

              {/* NAV LINKS — contained, list-like, not oversized headline text */}
              <ul className="flex-1 flex flex-col justify-center gap-1 border-t border-white/10 mt-3">
                {links.map((link, i) => {
                  const active = isActive(link.label);
                  return (
                    <li key={link.label} className="border-b border-white/10 overflow-hidden">
                      <motion.a
                        href={link.href}
                        className="magnetic group flex items-center justify-between py-4 font-display font-semibold text-3xl"
                        initial={{ opacity: 0, x: -12 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 + i * 0.05, duration: 0.4 }}
                        onClick={() => setOpen(false)}
                      >
                        <span className={active ? 'text-[var(--brass)]' : 'group-hover:text-[var(--brass)] transition-colors'}>
                          {link.label}
                        </span>
                        <span className="font-mono text-xs opacity-40 group-hover:opacity-100 group-hover:text-[var(--brass)] transition-all">
                          →
                        </span>
                      </motion.a>
                    </li>
                  );
                })}
              </ul>

              {/* LET'S TALK — a real pill button, same as desktop, not just another list word */}
              <motion.a
                href="/contact"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + links.length * 0.05 + 0.1, duration: 0.4 }}
                onClick={() => setOpen(false)}
                className="magnetic mt-8 inline-flex justify-center items-center font-mono text-xs uppercase tracking-wide rounded-full px-6 py-3 border border-[var(--on-dark)] hover:bg-[var(--on-dark)] hover:text-[var(--charcoal)] transition-colors"
              >
                Let&apos;s talk →
              </motion.a>

              {/* CONTACT INFO */}
              
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}





