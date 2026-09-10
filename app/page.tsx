'use client';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import NavOverlay from './components/NavOverlay';
import Cursor from './components/Cursor ';
import WelcomeSplash from './components/WelcomeSplash'; 
import { Bebas_Neue } from "next/font/google";


const bebasNeue = Bebas_Neue({
  weight: "400",
  subsets: ["latin"], 
});


const rotatorWords = ['how you live.', 'how you work.', 'how you gather.', 'how you rest.'];

const categoryLabels: Record<string, string> = {
  education: 'Education & Institutional',
  health: 'Health & Foodservice',
  housing: 'Community & Housing',
  institutional: 'Institutional & Hospitality',
  residential: 'Residential Design',
  concept: 'Concept Studies',
  interior: 'Interior Design',
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
  const [categoryImages, setCategoryImages] = useState<Record<string, string>>({});

  useEffect(() => {
    const id = setInterval(() => setWord((w) => (w + 1) % rotatorWords.length), 2200);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    fetch('https://kn-design-space-website.onrender.com/api/projects/')
      .then((res) => res.json())
      .then(setProjects)
      .catch(() => setProjects([]));
  }, []);

  useEffect(() => {
  fetch('https://kn-design-space-website.onrender.com/api/category-images/')
    .then((res) => res.json())
    .then((data: { category: string; image: string }[]) => {
      const map: Record<string, string> = {};
      data.forEach((c) => { map[c.category] = c.image; });
      setCategoryImages(map);
    })
    .catch(() => setCategoryImages({}));
}, []);

  return (
    <>
      <WelcomeSplash />
      <Cursor />
      <NavOverlay />
      
      <section id="home-sentinel" className="relative w-full h-[70vh] md:h-[102vh] min-h-[480px] md:min-h-[660px] overflow-hidden">
  <img
    src="/images/night view.png"
    alt="KN Design Space project"
    className="absolute inset-0 w-full h-full object-cover"
  />
  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-black/10" />
  
  <div className="relative h-full flex flex-col justify-end px-6 md:px-12 pb-10 md:pb-16 text-[var(--on-dark)]">
    <div className="font-serif italic text-xl text-[20px] md:text-[40px] opacity-85 mb-4">Transforming lives through architecture.</div>
    <motion.h1
      initial={{ opacity: 0, y: 24}}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 3 }} 
      className="font-display font-bold uppercase text-[clamp(32px,8vw,96px)] leading-[0.94] tracking-tight max-w-[25ch] md:max-w-[20ch] text-balance">
      Spaces built around YOU{' '}
      <span className="relative inline-block h-[1em] overflow-hidden align-bottom">
        {rotatorWords.map((w, i) => (
          <motion.span
            key={w}
            className="absolute left-0 top-0 text-[var(--brass)]"
            animate={{ opacity: i === word ? 1 : 0, y: i === word ? 0 : 30 }}
            transition={{ duration: 0.5 }}
          >
            {w}
          </motion.span>
        ))}
      </span>
    </motion.h1>

    <motion.p
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.4 }}
      className="max-w-[46ch] text-base md:text-[25px] leading-relaxed opacity-90 text-balance mt-1"
    >
      KN Design Space is a Kigali-based architecture and design practice, designing across a wide range of sectors to create spaces that serve the people & communities who use them.
    </motion.p>

    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className="flex flex-wrap gap-3 mt-8"
    >
      <a href="#projects" className="magnetic font-mono text-xs uppercase px-5 py-2.5 rounded-full bg-[var(--on-dark)] text-[var(--charcoal)]">View Projects →</a>
      <a href="/contact" className="magnetic font-mono text-xs uppercase px-5 py-2.5 rounded-full border border-[var(--on-dark)]">Start a project</a>
    </motion.div>
      </div>
</section>

      <div className="bg-[var(--charcoal)] text-[var(--on-dark)] py-3.5 overflow-hidden border-y border-[var(--line)]">
        <div className="ticker-track"> 
          {[0, 1].map((i) => (
            <span key={i} className="font-mono text-[13px] uppercase px-7 whitespace-nowrap opacity-85">
              Architectural Design &amp; Supervision <span className="mx-9">—</span>
              Interior Design <span className="mx-9">—</span>
              Cost &amp; Feasibility Planning <span className="mx-9">—</span>
              Electrical Design <span className="mx-9">—</span>
              Structural Design <span className="mx-9">—</span>
              Mechanical &amp; Plumbing Design <span className="mx-9">—</span>
              Land Use Advisory <span className="mx-9">—</span>
              Construction Supervision <span className="mx-9">—</span>
              Permitting and Approvals <span className="mx-9">—</span>
            </span> 
          ))} 
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-6 px-6 md:px-12 py-10 md:py-16">
        <StatCounter target={10} label="Years in Operation" />
        <StatCounter target={26} label="Projects" />
        <StatCounter target={928} label="Housing Units Delivered" />
      </div>

 <section id="projects" className="px-6 md:px-12 py-12 md:py-10 mt-0">
        <h2 className="font-display font-semibold text-3xl mb-3 mt-0">Projects Categories</h2>
        <p className="opacity-70 mb-9 max-w-[52ch]"></p> 
        <div className="grid md:grid-cols-2 gap-2 justify-center mt-4  bg-[var(--line)]">
          {Object.entries(categoryLabels).map(([key, label]) => {
            const catProjects = projects.filter((p) => p.category === key);
            const cover = categoryImages[key] || catProjects.find((p) => p.cover_image)?.cover_image;
            
            return (  
              <Link
                href={`/projects/category/${key}`}
                key={key}
                className="magnetic cursor-none bg-[var(--paper)] p-6 min-h-[260px] md:min-h-[400px] flex flex-col justify-end relative overflow-hidden group">
                {cover ? (
                  <img
                    src={cover}
                    alt={label}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                ) : (
                  <div className="absolute top-6 left-6 w-8 h-8 rounded-sm bg-[var(--brass)] transition-transform duration-300 group-hover:scale-[4] group-hover:opacity-10" />
                )}
                {cover && <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />}
                   <h3 className={`font-display font-semibold text-xl md:text-3xl relative ${cover ? 'text-white' : ''}`}>{label}</h3>
              </Link>
            );
          })}
        </div>
      </section>

      <section id="services" className=" relative px-6 md:px-12 py-12 md:py-20 bg-[var(--paper-light)]">
  <h2 className="font-display font-semibold text-3xl md:text-5xl mb-10 md:mb-15 text-center">Our Services</h2>
  <div className="absolute inset-0 bg-black/10 pointer-events-none" />
  <div className="grid md:grid-cols-3 gap-14 md:gap-10">
    {[
      {

        title: 'Project Design',
        icon: <img src="/images/files/Project_Design.png" alt="" className="w-10 h-10 md:w-14 md:h-14 service-icon"/>,
        items: [
          {
            label: 'Architectural Design',
              icon: <img src="/images/files/Arch_design_icon.png" alt="" className="w-10 h-10 service-icon" />,
             
          }, 
          {
            label: 'Interior Design',
            icon: <img src="/images/files/Interior_Design.png" alt="" className="w-10 h-10 service-icon" />,
           
          },
          {
            label: 'Cost and Feasibility Planning',
            icon: <img src="/images/files/Cost_and_feasibility.png" alt="" className="w-10 h-10 service-icon" />,
          },
        ],
      },
      {
        title: 'Project Engineering', 
        icon: <img src="/images/files/Proj_Engineering.png" alt="" className="w-10 h-10 md:w-14 md:h-14 service-icon" />,
        items: [
          {
            label: 'Structural Design', 
            icon: <img src="/images/files/Structural_Design.png" alt="" className="w-10 h-10 service-icon" />,
          },
          {
            label: 'Electrical Design', 
            icon: <img src="/images/files/Electrical_Design.png" alt="" className="w-10 h-10 service-icon" />,
          },
          {
            label: 'Mechanical and Plumbing Design', 
            icon: <img src="/images/files/Mechanical_Plumbing.png" alt="" className="w-10 h-10 service-icon" />,
          },
        ],
      },
      {
        title: 'Project Compliance',
        icon: <img src="/images/files/Proj_Compliance.png" alt="" className="w-10 h-10 md:w-14 md:h-14 service-icon" />,
        items: [
          {
            label: 'Land Use Advisory',
            icon: <img src="/images/files/Land_Use_Advisory.png" alt="" className="w-10 h-10 service-icon" />,
          },
          {
            label: 'Permitting and Approvals',
            icon: <img src="/images/files/Permitting_Approval.png" alt="" className="w-10 h-10 service-icon" />,
          },
          {
            label: 'Construction Supervision',
            icon: <img src="/images/files/construction-supervision.png" alt="" className="w-10 h-10 service-icon" />,
          }, 
        ],
      },
    ].map((cat) => (
      <div key={cat.title} className="text-center md:text-left">
        <div className="w-16 h-16 md:w-24 md:h-24 rounded-full border-2 border-[var(--brass)] flex-shrink-0 flex items-center justify-center mx-auto md:mx-0 mb-3 text-[var(--brass)]">
          {cat.icon}
        </div> 
        <h3 className="font-display font-bold text-3xl uppercase leading-tight mb-3">{cat.title}</h3>
        <div className="w-36 md:w-44 h-[2px] bg-[var(--brass)] mx-auto md:mx-0 mb-6 md:mb-9" />
        <ul className="space-y-6"> 
          {cat.items.map((item) => (
            <li key={item.label} className="flex items-center gap-4 justify-center md:justify-start">
              <span className="w-8 h-8 flex-shrink-0 text-[var(--ink)] opacity-100">{item.icon}</span>
              <span className="text-base md:text-xl">{item.label}</span>
            </li> 
          ))}
        </ul>
      </div>
    ))}
  </div>
</section>
      <section className="px-6 md:px-12 py-16 md:py-20" id="process">
  <h2 className=" font-display font-semibold text-3xl md:text-4xl mb-6 ">How We Work</h2>
  <p className="opacity-70 mb-10  max-w-[102ch]">A clear process from first conversation through to life after handover.</p>
  <div className="grid md:grid-cols-5 gap-6 text-balance">
        {[
          ['01 / Brief', 'Listen & Survey', 'Site visit, constraints, budget and how the space needs to be lived in.'],
          ['02 / Concept', 'Sketch & Test', 'Early massing and plan options, reviewed together before we commit.'],
          ['03 / Drawings', 'Design Development', 'Detailed drawings and materials,taken through regulatory approval and signed off with you before construction begins.'],
          ['04 / Build', 'Site Delivery', 'Contractor coordination and regular site visits, with progress shared through to handover.'],
          ['05 / Aftercare', 'Handover & Support', 'As-built drawings, defects follow-up and guidance for the first months of use.'],
        ].map(([num, title, desc], i) => (
          <motion.div
            key={num}
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: i * 0.05 }}
          > 
            <span className="font-mono text-xs md:text-[15px] text-[var(--brass)] block mb-5">{num}</span>
            <h4 className="font-display font-semibold text-lg md:text-[17px] mb-2.5">{title}</h4>
            <p className="text-sm opacity-72 leading-relaxed">{desc}</p>
          </motion.div> 
        ))}
        </div> 
      </section>

      <section className="px-12 py-20 bg-[var(--paper-light)] text-center">
        <blockquote className="font-serif italic text-[clamp(22px,3vw,32px)] max-w-[68ch] mx-auto mb-4 leading-relaxed">
          &quot;85% of materials sourced within 100km, 54% of participants trained were women, and over 390 residents brought into the Isooko Community Development Center alone.&quot;
        </blockquote> 
        <cite className="font-mono text-xs uppercase opacity-65 not-italic">— Isooko Community Development Center, Masoro, Rwanda</cite>
      </section>

  <footer className="border-t border-[var(--line)] px-12 pt-16 pb-8">
        {/* CTA */} 
        <div className="flex justify-between items-end flex-wrap gap-2 mb-13">
          <h2 className="font-display font-semibold text-[clamp(28px,3.5vw,44px)] max-w-[50ch] leading-tight">
            Have a site in mind? Let&apos;s design it.
          </h2>
          <a href="/contact" className="magnetic font-mono text-xs uppercase px-5 py-2.5 rounded-full bg-[var(--ink)] text-[var(--paper-light)]">
            Start a project →
          </a>
        </div>
        <div className="grid md:grid-cols-3 gap-7 md:gap-3 mb-8">
        <div className="flex items-center gap-3">
            <svg viewBox="0 0 24 24" className="w-7.5 h-7.5 stroke-[var(--brass)] fill-none" strokeWidth="1.8"><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 3" /></svg>
            <div>
              <div className="font-mono text-xs md:text-[17px] uppercase opacity-50">Response Time</div>
              <div className="font-mono text-xs md:text-[17px] uppercase ">Within 2 Business Days</div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <svg viewBox="0 0 24 24" className="w-7.5 h-7.5 stroke-[var(--brass)] fill-none" strokeWidth="1.8"><rect x="3" y="4" width="18" height="17" rx="2" /><path d="M3 9h18M8 2v4M16 2v4" /></svg>
            <div>
              <div className="font-mono text-xs md:text-[17px] uppercase opacity-50">Office Hours</div>
              <div className="font-mono text-xs md:text-[17px] uppercase ">Mon–Fri, 9:00–17:00 CAT</div>
            </div>
          </div> 
          <div className="flex items-center gap-3">
            <svg viewBox="0 0 24 24" className="w-7.5 h-7.5 stroke-[var(--brass)] fill-none" strokeWidth="1.8"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" /></svg>
            <div>
              <div className="font-mono text-xs md:text-[17px] uppercase opacity-50">Preferred</div> 
              <div className="font-mono text-xs md:text-[17px] uppercase">Email or WhatsApp</div>
            </div>
          </div>
          </div> 

        {/* MAP + DIRECT — one balanced row */}
        <div className="grid md:grid-cols-2 gap-10 md:gap-20 mb-8">
          <div className="border border-[var(--ink)] p-3 h-fit w-full">
            <div className="overflow-hidden h-[180px] md:h-[260px] w-full">
              <iframe
                src="https://www.google.com/maps?q=KN%205%20Rd%2C%20Immeuble%20Aigle%20Blanc%2C%20Kimihurura%2C%20Kigali%2C%20Rwanda&output=embed"
                width="100%"  
                height="100%" 
                style={{ border: 10, filter: 'grayscale(20%)' }}
                loading="lazy" 
                title="KN Design Space office location"
              />
            </div>
            <p className="pt-3 font-mono text-[10.5px] uppercase opacity-55">
              KN 5 Rd, Immeuble Aigle Blanc, 1st Floor, Kimihurura, Kigali
            </p>
            
              <a href="https://www.google.com/maps/dir/?api=1&destination=KN%205%20Rd%2C%20Immeuble%20Aigle%20Blanc%2C%20Kimihurura%2C%20Kigali%2C%20Rwanda"
              target="_blank"
              className="magnetic inline-flex items-center gap-2 font-mono text-xs uppercase px-6 py-2.5 rounded-full bg-[var(--brass)] text-[var(--paper-light)] mt-4"
              >
              Get directions → 
            </a>
          </div>
        <div className="flex flex-col justify-center">
  <div className="flex flex-wrap gap-x-12 gap-y-6 mb-6">
    <div>
      <div className="font-mono text-[13px] uppercase text-[var(--brass)] mb-2">Email</div>
      <a href="https://mail.google.com/mail/?view=cm&fs=1&to=kndesignspace@gmail.com" target="_blank" className="magnetic font-display font-semibold text-lg md:text-2xl hover:text-[var(--brass)] transition-colors">
        kndesignspace@gmail.com
      </a>
    </div>
    <div>
      <div className="font-mono text-[13px] uppercase text-[var(--brass)] mb-2">Phone</div>
      <a href="tel:+250788841556" className="magnetic font-display font-semibold text-lg md:text-2xl hover:text-[var(--brass)] transition-colors">
        +250 788 841 556
      </a>
    </div>
  </div>
            <div className="font-mono text-[15px] uppercase text-[var(--brass)] mt-6 mb-3">REACH US ON</div>
            <div className="flex flex-wrap gap-5">
          
  
  <a href="https://wa.me/250788841556" target="_blank" aria-label="WhatsApp" className="magnetic group flex flex-col items-center gap-1.5">
    <span className="w-16 h-16 md:w-30 md:h-30 rounded-full border border-[var(--line)] flex items-center justify-center group-hover:bg-[var(--ink)] group-hover:text-[var(--paper-light)] transition-colors">
      <svg viewBox="0 0 24 24" className="w-12.5 h-12.5 fill-current"><path d="M12 2C6.48 2 2 6.48 2 12c0 1.85.5 3.58 1.36 5.07L2 22l5.07-1.33A9.94 9.94 0 0012 22c5.52 0 10-4.48 10-10S17.52 2 12 2zm5.2 14.2c-.22.62-1.28 1.18-1.77 1.25-.45.07-1.02.1-1.65-.1-.38-.12-.87-.28-1.5-.55-2.64-1.14-4.36-3.8-4.5-3.98-.13-.18-1.08-1.43-1.08-2.73 0-1.3.68-1.93.92-2.2.24-.26.53-.33.7-.33h.5c.16 0 .38-.06.6.45.22.53.75 1.83.82 1.96.07.13.11.29.02.47-.09.18-.14.29-.27.44-.13.16-.28.35-.4.47-.13.13-.27.27-.12.53.16.26.7 1.15 1.5 1.86 1.03.92 1.9 1.2 2.16 1.34.26.13.42.11.57-.07.16-.18.66-.77.84-1.04.18-.26.35-.22.6-.13.24.09 1.53.72 1.79.85.26.13.44.2.5.31.07.11.07.65-.15 1.27z" /></svg>
    </span> 
    <span className="font-mono text-[10px] uppercase opacity-60 group-hover:opacity-100 group-hover:text-[var(--brass)] transition-all">WhatsApp</span>
  </a> 
   
  <a href="https://www.instagram.com/kn_design_space/" target="_blank" aria-label="Instagram" className="magnetic group flex flex-col items-center gap-1.5">
    <span className="w-16 h-16 md:w-30 md:h-30 rounded-full border border-[var(--line)] flex items-center justify-center group-hover:bg-[var(--ink)] group-hover:text-[var(--paper-light)] transition-colors">
      <svg viewBox="0 0 24 24" className="w-12.5 h-12.5 fill-current"><path d="M12 2c2.7 0 3.05.01 4.12.06 1.06.05 1.79.22 2.43.47.66.26 1.21.6 1.76 1.15.55.55.89 1.1 1.15 1.76.25.64.42 1.37.47 2.43.05 1.07.06 1.42.06 4.12s-.01 3.05-.06 4.12c-.05 1.06-.22 1.79-.47 2.43a4.9 4.9 0 01-1.15 1.76 4.9 4.9 0 01-1.76 1.15c-.64.25-1.37.42-2.43.47-1.07.05-1.42.06-4.12.06s-3.05-.01-4.12-.06c-1.06-.05-1.79-.22-2.43-.47a4.9 4.9 0 01-1.76-1.15 4.9 4.9 0 01-1.15-1.76c-.25-.64-.42-1.37-.47-2.43C2.01 15.05 2 14.7 2 12s.01-3.05.06-4.12c.05-1.06.22-1.79.47-2.43.26-.66.6-1.21 1.15-1.76A4.9 4.9 0 015.44 2.53c.64-.25 1.37-.42 2.43-.47C8.95 2.01 9.3 2 12 2zm0 5a5 5 0 100 10 5 5 0 000-10zm0 8.2a3.2 3.2 0 110-6.4 3.2 3.2 0 010 6.4zm5.2-8.4a1.17 1.17 0 100-2.34 1.17 1.17 0 000 2.34z" /></svg>
    </span>
    <span className="font-mono text-[10px] uppercase opacity-60 group-hover:opacity-100 group-hover:text-[var(--brass)] transition-all">Instagram</span>
  </a>

  <a href="#" aria-label="LinkedIn"  className="magnetic group flex flex-col items-center gap-1.5 opacity- 100 hover:opacity-100 transition-opacity">
    <span className="w-16 h-16 md:w-30 md:h-30 rounded-full border border-[var(--line)] flex items-center justify-center group-hover:bg-[var(--ink)] group-hover:text-[var(--paper-light)] transition-colors">
      <svg viewBox="0 0 24 24" className="w-12.5 h-12.5 fill-current"><path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.03-1.85-3.03-1.85 0-2.14 1.45-2.14 2.94v5.66H9.34V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.38-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.07 2.07 0 110-4.13 2.07 2.07 0 010 4.13zM7.12 20.45H3.56V9h3.56v11.45z" /></svg>
    </span>
    <span className="font-mono text-[10px] uppercase opacity-60 group-hover:text-[var(--brass)] transition-all">LinkedIn</span>
  </a>
   <a href="#" aria-label="X (Twitter)" className="magnetic group flex flex-col items-center gap-1.5">
  <span className="w-16 h-16 md:w-30 md:h-30 rounded-full border border-[var(--line)] flex items-center justify-center group-hover:bg-[var(--ink)] group-hover:text-[var(--paper-light)] transition-colors">
    <svg viewBox="0 0 24 24" className="w-12.5 h-12.5 md:w-8 md:h-8 fill-current">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg> 
  </span>
  <span className="font-mono text-[10px] uppercase opacity-60 group-hover:opacity-100 group-hover:text-[var(--brass)] transition-all">X</span>
</a>
  </div>
  </div>
</div> 
<div className="border-t border-[var(--line)] mt-10 pt-6 flex flex-col md:flex-row justify-between items-center gap-2">
          <p className="font-mono text-[11px] uppercase opacity-50">
            © {new Date().getFullYear()} KN Design Space. All rights reserved.
          </p>
          <p className="font-mono text-[11px] uppercase opacity-50">
            Kimihurura, Gasabo, Kigali, Rwanda
          </p>
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