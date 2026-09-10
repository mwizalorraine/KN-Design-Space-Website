'use client';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import NavOverlay from './components/NavOverlay';
import Cursor from './components/Cursor ';

const rotatorWords = ['how you live.', 'how you work.', 'how you gather.', 'how you rest.'];

const categoryLabels: Record<string, string> = {
  education: 'Education & Institutional',
  health: 'Health & Foodservice',
  housing: 'Community & Housing',
  institutional: 'Institutional & Hospitality',
  residential: 'Residential Design',
  concept: 'Concept Studies',
};

type Project = {
  id: number;
  title: string;
  slug: string;
  category: string;
  location: string;
  role: string;
  status: string;
  year: number | null;
  summary: string;
  cover_image: string | null;
};

function StatCounter({ target, label }: { target: number; label: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let cur = 0;
    const step = Math.max(1, Math.round(target / 40));
    const tick = () => {
      cur = Math.min(target, cur + step);
      setCount(cur);
      if (cur < target) requestAnimationFrame(tick);
    };
    tick();
  }, [inView, target]);

  return (
    <div ref={ref} className="text-center">
      <div className="font-display font-bold text-[clamp(40px,5vw,64px)] text-[var(--brass)]">{count}+</div>
      <div className="font-mono text-xs uppercase opacity-65 mt-1.5">{label}</div>
    </div>
  );
}

export default function Home() {
  const [word, setWord] = useState(0);
  const [projects, setProjects] = useState<Project[]>([]);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    const id = setInterval(() => setWord((w) => (w + 1) % rotatorWords.length), 2200);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/projects/')
      .then((res) => res.json())
      .then(setProjects)
      .catch(() => setProjects([]));
  }, []);

  const filtered = filter === 'all' ? projects : projects.filter((p) => p.category === filter);
  const swatchClasses = ['a', 'b', 'c'];

  return (
    <>
      <Cursor />
      <NavOverlay />

      <section className="grid md:grid-cols-[1.1fr_0.9fr] gap-10 items-end px-12 pt-20 pb-14 min-h-[520px]">
        <div>
          <div className="font-serif italic text-lg opacity-75 mb-4">Transforming lives through architecture.</div>
          <h1 className="font-display font-semibold text-[clamp(40px,5vw,66px)] leading-[0.98] tracking-tight max-w-[12ch]">
            Spaces built around{' '}
            <span className="relative inline-block h-[1.1em] overflow-hidden align-bottom">
              {rotatorWords.map((w, i) => (
                <motion.span
                  key={w}
                  className="absolute left-0 top-0 font-serif italic text-[var(--brass)]"
                  animate={{ opacity: i === word ? 1 : 0, y: i === word ? 0 : 30 }}
                  transition={{ duration: 0.5 }}
                >
                  {w}
                </motion.span>
              ))}
            </span>
          </h1>
          <p className="max-w-[38ch] text-[17px] leading-relaxed opacity-80 mt-5">
           KN Design Space is a Kigali-based architecture and design practice creating thoughtful, contemporary spaces that serve people and communities. We combine functionality, cultural sensitivity, and sustainable design to deliver projects that create lasting value—from education and housing to hospitality and institutional spaces.
          </p>
          <div className="flex gap-3.5 mt-7">
            <a href="#projects" className="magnetic font-mono text-xs uppercase px-5 py-2.5 rounded-full bg-[var(--ink)] text-[var(--paper-light)]">View Projects →</a>
            <a href="/contact" className="magnetic font-mono text-xs uppercase px-5 py-2.5 rounded-full border border-[var(--ink)]">Start a project</a>
          </div>
        </div>
        <div className="relative">
          <svg viewBox="0 0 420 340" className="w-full h-auto">
            <line x1="20" y1="300" x2="400" y2="300" stroke="var(--ink)" strokeWidth={1.4} />
            <polygon points="70,300 70,150 210,90 350,150 350,300" fill="var(--white)" stroke="var(--ink)" strokeWidth={1.2} />
            <line x1="210" y1="90" x2="210" y2="300" stroke="var(--ink)" strokeWidth={1.4} strokeDasharray="3,4" />
            <rect x="95" y="190" width="34" height="46" fill="var(--paper)" stroke="var(--ink)" strokeWidth={0.8} />
            <rect x="150" y="190" width="34" height="46" fill="var(--paper)" stroke="var(--ink)" strokeWidth={0.8} />
            <rect x="236" y="190" width="34" height="46" fill="var(--paper)" stroke="var(--ink)" strokeWidth={0.8} />
            <rect x="291" y="190" width="34" height="46" fill="var(--paper)" stroke="var(--ink)" strokeWidth={0.8} />
            <rect x="150" y="250" width="60" height="50" fill="var(--paper)" stroke="var(--ink)" strokeWidth={0.8} />
            <text x="70" y="320" fontFamily="var(--font-mono)" fontSize="10.5" fill="var(--concrete)">VILLA KARISIMBI VALLEYS, ELEVATION N</text>
          </svg>
        </div>
      </section>

      <div className="bg-[var(--charcoal)] text-[var(--paper-light)] py-3.5 overflow-hidden border-y border-[var(--line)]">
        <div className="ticker-track">
          {[0, 1].map((i) => (
            <span key={i} className="font-mono text-[13px] uppercase px-7 whitespace-nowrap opacity-85">
              Architectural Design &amp; Supervision <span className="mx-9">—</span>
              Educational &amp; Institutional Planning <span className="mx-9">—</span>
              Campus Master Planning <span className="mx-9">—</span>
              Renovation &amp; Adaptive Reuse <span className="mx-9">—</span>
              Industrial &amp; Food-Service Design <span className="mx-9">—</span>
              Construction Documentation <span className="mx-9">—</span>
              Contract Administration <span className="mx-9">—</span> 
            </span> 
          ))}
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-6 px-12 py-16">
        <StatCounter target={10} label="Years in Operation" />
        <StatCounter target={26} label="Projects" />
        <StatCounter target={928} label="Housing Units Delivered" />
      </div>

      <div className="grid md:grid-cols-[220px_1fr] gap-10 px-12 py-10 border-y border-[var(--line)] bg-[var(--paper-light)]">
        <div className="font-mono text-xs uppercase text-[var(--brass)]">Studio Note</div>
        <p className="text-xl font-serif leading-relaxed max-w-[99ch]">
         We believe good design is not only about how a space looks, but how it feels, functions, and serves the people who use it. At KN Design Space, we design with purpose—bringing together context, culture, material, and people to create spaces that are thoughtful, responsible, and built to last. Every project is an opportunity to solve meaningful problems, create value, and shape better places for people and communities.
        </p>
      </div>
      <section id="projects" className="px-12 py-20">
        <h2 className="font-display font-semibold text-3xl mb-8">Projects Types</h2>
        <div className="flex gap-2.5 flex-wrap mb-9">
          {['all', 'education', 'health', 'housing', 'institutional', 'residential', 'concept'].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`magnetic font-mono text-[11.5px] uppercase px-4 py-2 rounded-full border transition-colors ${
                filter === f ? 'bg-[var(--ink)] text-[var(--paper-light)] border-[var(--ink)]' : 'border-[var(--line)]'
              }`}
            >
              {f === 'all' ? 'All' : categoryLabels[f]}
            </button>
          ))}
        </div>
        <div className="grid md:grid-cols-3 gap-[2px] bg-[var(--line)]">
          {filtered.length === 0 && (
            <div className="bg-[var(--paper)] p-8 font-mono text-sm opacity-60 md:col-span-3">
              Sorry, Something went wrong.
            </div>
          )}
          {filtered.map((p, i) => (
            <Link
              href={`/projects/${p.slug}`}
              key={p.id}
              className="magnetic cursor-none bg-[var(--paper)] p-6 min-h-[280px] flex flex-col justify-end relative overflow-hidden group"
            >
              {p.cover_image ? (
                <img
                  src={p.cover_image}
                  alt={p.title}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              ) : (
                <div
                  className={`absolute top-6 left-6 w-8 h-8 rounded-sm transition-transform duration-300 group-hover:scale-[4] group-hover:opacity-10 ${
                    swatchClasses[i % 3] === 'a' ? 'bg-[var(--brass)]' : swatchClasses[i % 3] === 'b' ? 'bg-[var(--charcoal)]' : 'bg-[var(--wood)]'
                  }`}
                />
              )}
              {p.cover_image && <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />}
              <div className={`font-mono text-[11px] uppercase mb-2 relative ${p.cover_image ? 'text-white/80' : 'opacity-60'}`}>{categoryLabels[p.category]} — {p.status}</div>
              <h3 className={`font-display font-semibold text-xl mb-1.5 relative ${p.cover_image ? 'text-white' : ''}`}>{p.title}</h3>
              {p.location && <div className={`text-sm italic relative ${p.cover_image ? 'text-white/75' : 'opacity-65'}`}>{p.location}</div>}
            </Link>
          ))}
        </div>
      </section>

      <section className="bg-[var(--charcoal)] text-[var(--paper-light)] px-12 py-20">
        <h2 className="font-display font-semibold text-3xl mb-8">Services</h2>
        <div className="border-t border-white/20">
          {[
            ['01', 'Architectural Design & Supervision', 'Full design leadership from concept through construction oversight.'],
            ['02', 'Educational & Institutional Facility Planning', "Campuses, classrooms and civic facilities designed around how they're actually used."],
            ['03', 'Campus Master Planning', 'Site-wide strategy for multi-building institutional and educational sites.'],
            ['04', 'Renovation & Adaptive Reuse', 'Upgrading and repurposing existing structures for new demands.'],
            ['05', 'Industrial & Food-Service Facility Design', 'Large-scale kitchens and foodservice operations engineered for hygiene and daily impact.'],
            ['06', 'Construction Documentation', 'Detailed drawings and specifications ready for permitting and build.'],
            ['07', 'Contract Administration & Project Closeout', 'Coordination through to handover, keeping delivery accountable to the design.'],
          ].map(([idx, title, desc]) => (
            <div key={idx} className="grid md:grid-cols-[60px_1fr_1fr_24px] items-center gap-6 py-6 border-b border-white/20">
              <div className="font-mono text-xs text-[var(--brass)]">{idx}</div>
              <h4 className="font-display font-semibold text-xl">{title}</h4>
              <p className="text-sm opacity-70 leading-relaxed">{desc}</p>
              <div className="font-mono">→</div>
            </div>
          ))}
        </div>
      </section>

      <section className="grid md:grid-cols-4 gap-6 px-12 py-20" id="process">
        {[
          ['01 / Brief', 'Listen & Survey', 'Site visit, constraints, budget and how the space needs to be lived in.'],
          ['02 / Concept', 'Sketch & Test', 'Early massing and plan options, reviewed together before we commit.'],
          ['03 / Drawings', 'Design Development', 'Detailed drawings, materials and approvals ready for construction.'],
          ['04 / Build', 'Site Delivery', 'Contractor coordination and site visits through to handover.'],
        ].map(([num, title, desc], i) => (
          <motion.div
            key={num}
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: i * 0.05 }}
          >
            <span className="font-mono text-xs text-[var(--brass)] block mb-5">{num}</span>
            <h4 className="font-display font-semibold text-lg mb-2.5">{title}</h4>
            <p className="text-sm opacity-72 leading-relaxed">{desc}</p>
          </motion.div>
        ))}
      </section>

      <section className="px-12 py-20 bg-[var(--paper-light)] text-center">
        <blockquote className="font-serif italic text-[clamp(22px,3vw,32px)] max-w-[68ch] mx-auto mb-4 leading-relaxed">
          &quot;85% of materials sourced within 100km, 54% of participants trained were women, and over 390 residents brought into the Isooko Community Development Center alone.&quot;
        </blockquote>
        <cite className="font-mono text-xs uppercase opacity-65 not-italic">— Isooko Community Development Center, Masoro, Rwanda</cite>
      </section>

      <footer className="border-t border-[var(--line)] px-12 pt-16 pb-8">
        {/* CTA */}
        <div className="flex justify-between items-end flex-wrap gap-6 mb-16">
          <h2 className="font-display font-semibold text-[clamp(30px,4vw,46px)] max-w-[14ch] leading-tight">
            Have a site in mind? Let&apos;s draw it.
          </h2>
          <a href="/contact" className="magnetic font-mono text-xs uppercase px-5 py-2.5 rounded-full bg-[var(--ink)] text-[var(--paper-light)]">
            Start a project →
          </a>
        </div>

        <div className="grid md:grid-cols-2 gap-10 mb-14">
          <div>
            <div className="font-mono text-xs uppercase text-[var(--brass)] mb-4">Quick Links</div>
            <ul className="space-y-2.5 text-sm mb-10">
              <li><a href="/" className="magnetic hover:text-[var(--brass)] transition-colors">Home</a></li>
              <li><a href="/#projects" className="magnetic hover:text-[var(--brass)] transition-colors">Projects</a></li>
              <li><a href="/studio" className="magnetic hover:text-[var(--brass)] transition-colors">Studio</a></li>
              <li><a href="/#services" className="magnetic hover:text-[var(--brass)] transition-colors">Services</a></li>
              <li><a href="/contact" className="magnetic hover:text-[var(--brass)] transition-colors">Contact</a></li>
            </ul>

            <div className="font-mono text-xs uppercase text-[var(--brass)] mb-3">Direct</div>
            <a href="https://mail.google.com/mail/?view=cm&fs=1&to=kndesignspace@gmail.com" target="_blank" className="magnetic block font-display font-semibold text-lg hover:text-[var(--brass)] transition-colors mb-1">
              kndesignspace@gmail.com
            </a>
            <a href="tel:+250788841556" className="magnetic block text-sm opacity-80 hover:text-[var(--brass)] transition-colors mb-6">
              +250 788 841 556
            </a>

            <div className="flex gap-2.5">
              <a href="https://wa.me/250788841556" target="_blank" className="magnetic w-10 h-10 rounded-full border border-[var(--line)] flex items-center justify-center hover:bg-[var(--ink)] hover:text-[var(--paper-light)] transition-colors">
                <svg viewBox="0 0 24 24" className="w-4.5 h-4.5 fill-current"><path d="M12 2C6.48 2 2 6.48 2 12c0 1.85.5 3.58 1.36 5.07L2 22l5.07-1.33A9.94 9.94 0 0012 22c5.52 0 10-4.48 10-10S17.52 2 12 2zm5.2 14.2c-.22.62-1.28 1.18-1.77 1.25-.45.07-1.02.1-1.65-.1-.38-.12-.87-.28-1.5-.55-2.64-1.14-4.36-3.8-4.5-3.98-.13-.18-1.08-1.43-1.08-2.73 0-1.3.68-1.93.92-2.2.24-.26.53-.33.7-.33h.5c.16 0 .38-.06.6.45.22.53.75 1.83.82 1.96.07.13.11.29.02.47-.09.18-.14.29-.27.44-.13.16-.28.35-.4.47-.13.13-.27.27-.12.53.16.26.7 1.15 1.5 1.86 1.03.92 1.9 1.2 2.16 1.34.26.13.42.11.57-.07.16-.18.66-.77.84-1.04.18-.26.35-.22.6-.13.24.09 1.53.72 1.79.85.26.13.44.2.5.31.07.11.07.65-.15 1.27z" /></svg>
              </a>
              <a href="https://www.instagram.com/kn_design_space/" className="magnetic w-10 h-10 rounded-full border border-[var(--line)] flex items-center justify-center hover:opacity-100 hover:bg-[var(--ink)] hover:text-[var(--paper-light)] transition-colors" title="Add real Instagram link">
                <svg viewBox="0 0 24 24" className="w-4.5 h-4.5 fill-current"><path d="M12 2c2.7 0 3.05.01 4.12.06 1.06.05 1.79.22 2.43.47.66.26 1.21.6 1.76 1.15.55.55.89 1.1 1.15 1.76.25.64.42 1.37.47 2.43.05 1.07.06 1.42.06 4.12s-.01 3.05-.06 4.12c-.05 1.06-.22 1.79-.47 2.43a4.9 4.9 0 01-1.15 1.76 4.9 4.9 0 01-1.76 1.15c-.64.25-1.37.42-2.43.47-1.07.05-1.42.06-4.12.06s-3.05-.01-4.12-.06c-1.06-.05-1.79-.22-2.43-.47a4.9 4.9 0 01-1.76-1.15 4.9 4.9 0 01-1.15-1.76c-.25-.64-.42-1.37-.47-2.43C2.01 15.05 2 14.7 2 12s.01-3.05.06-4.12c.05-1.06.22-1.79.47-2.43.26-.66.6-1.21 1.15-1.76A4.9 4.9 0 015.44 2.53c.64-.25 1.37-.42 2.43-.47C8.95 2.01 9.3 2 12 2zm0 5a5 5 0 100 10 5 5 0 000-10zm0 8.2a3.2 3.2 0 110-6.4 3.2 3.2 0 010 6.4zm5.2-8.4a1.17 1.17 0 100-2.34 1.17 1.17 0 000 2.34z" /></svg>
              </a>
              <a href="#" className="magnetic w-10 h-10 rounded-full border border-[var(--line)] flex items-center justify-center opacity-35 hover:opacity-100 hover:bg-[var(--ink)] hover:text-[var(--paper-light)] transition-colors" title="Add real LinkedIn link">
                <svg viewBox="0 0 24 24" className="w-4.5 h-4.5 fill-current"><path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.03-1.85-3.03-1.85 0-2.14 1.45-2.14 2.94v5.66H9.34V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.38-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.07 2.07 0 110-4.13 2.07 2.07 0 010 4.13zM7.12 20.45H3.56V9h3.56v11.45z" /></svg>
              </a>
            </div>
          </div>

          <div className="border border-[var(--ink)] p-3 h-fit">
            <div className="overflow-hidden" style={{ height: '260px' }}>
              <iframe
                src="https://www.google.com/maps?q=KN%205%20Rd%2C%20Immeuble%20Aigle%20Blanc%2C%20Kimihurura%2C%20Kigali%2C%20Rwanda&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0, filter: 'grayscale(20%)' }}
                loading="lazy"
                title="KN Design Space office location"
              />
            </div>
            <div className="flex justify-between items-center pt-3 font-mono text-[10.5px] uppercase opacity-55">
              <span>STUDIO LOCATION: KN 5 Rd, Immeuble Aigle Blanc, 1st Floor, Kimihurura, Kigali</span> 
            </div>
            <a
              href="https://www.google.com/maps/dir/?api=1&destination=KN%205%20Rd%2C%20Immeuble%20Aigle%20Blanc%2C%20Kimihurura%2C%20Kigali%2C%20Rwanda"
              target="_blank"
              className="magnetic inline-flex items-center gap-2 font-mono text-xs uppercase px-5 py-2.5 rounded-full bg-[var(--brass)] text-[var(--paper-light)] mt-4"
            >
              Get directions →
            </a>
          </div>
        </div>
      </footer>
      <a
        href="https://wa.me/250788841556"
        target="_blank"
        className="magnetic fixed bottom-7 right-7 w-14 h-14 rounded-full bg-[#25D366] flex items-center justify-center shadow-lg z-40"
      >
        <svg viewBox="0 0 24 24" className="w-7 h-7 fill-white">
          <path d="M12 2C6.48 2 2 6.48 2 12c0 1.85.5 3.58 1.36 5.07L2 22l5.07-1.33A9.94 9.94 0 0012 22c5.52 0 10-4.48 10-10S17.52 2 12 2zm5.2 14.2c-.22.62-1.28 1.18-1.77 1.25-.45.07-1.02.1-1.65-.1-.38-.12-.87-.28-1.5-.55-2.64-1.14-4.36-3.8-4.5-3.98-.13-.18-1.08-1.43-1.08-2.73 0-1.3.68-1.93.92-2.2.24-.26.53-.33.7-.33h.5c.16 0 .38-.06.6.45.22.53.75 1.83.82 1.96.07.13.11.29.02.47-.09.18-.14.29-.27.44-.13.16-.28.35-.4.47-.13.13-.27.27-.12.53.16.26.7 1.15 1.5 1.86 1.03.92 1.9 1.2 2.16 1.34.26.13.42.11.57-.07.16-.18.66-.77.84-1.04.18-.26.35-.22.6-.13.24.09 1.53.72 1.79.85.26.13.44.2.5.31.07.11.07.65-.15 1.27z" />
        </svg>
      </a>
    </>
  );
}