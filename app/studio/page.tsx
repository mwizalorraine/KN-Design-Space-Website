'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import NavOverlay from '../components/NavOverlay';
import Cursor from '../components/Cursor ';

const CONTAINER = 'max-w-[1440px] mx-auto';

type Member = { name: string; position: string; bio: string, image?: string; };

const BOARD: Member[] = [
  {
    name: 'Doreen Kalimba Basiime',
    position: 'Chairperson',
    bio: "Doreen brings close to two decades of experience in public administration, local government and social protection in Rwanda. She currently serves as Executive Committee Chairperson in Kayonza District and previously worked as Social Analyst Expert at LODA, where she oversaw public funds for national programmes. She holds a Master's degree in Gender, Culture and Development from the Kigali Institute of Education.",
  },
  {
    name: 'Martin Sezibera',
    position: 'Vice Chairperson',
    bio: "Martin is a civil engineer and contractor with eleven years of experience across construction, permitting and the energy sector in Rwanda. He brings to the Board practical insight into project delivery, regulatory approvals and the construction market, supporting the firm's oversight of growth and strategy.",
  },
  {
    name: 'Maureen Isimbi',
    position: 'Independent Board Member',
    bio: 'Maureen is a learning designer and education facilities planner who holds a Master of Education in Learning Design and Technology from Harvard University and a BA in Human-Computer Interaction from Tufts University. At Harvard\'s Project Zero she researched how learning environments shape student agency and belonging, co-authoring "Why Where We Learn Matters", and she has supported programmes across 27 schools in Rwanda with the Maranyundo Initiative. She is the founder of Kalimba Education.',
  },
  {
    name: 'Alex Rusagara',
    position: 'Independent Board Member (Finance)',
    bio: "Alex is an experienced business executive who has served as Chief Operating Officer for several companies, leading operations, financial management and organisational growth. He brings this experience to the Board, overseeing the firm's financial reporting, tax compliance and project profitability.",
  },
  {
    name: 'Nicolas Kalimba Rugamba',
    position: 'Board Secretary (ex officio)',
    bio: "Nicolas serves as Board Secretary in an ex officio capacity by virtue of his role as Managing Director. He keeps the Board's records, prepares its agendas and minutes, and ensures that its resolutions are carried through.",
  },
];

const LEADERSHIP: Member[] = [
  {
    name: 'Nicolas Kalimba Rugamba',
    position: 'Managing Director / Principal Architect',
    bio: 'Nicolas is a licensed architect (RIA Reg. No. A.105.19) and founder of KN Design Space, with extensive experience in institutional, educational, health and residential projects across Rwanda. He has worked on landmark buildings including the BPR Bank and Cogebanque headquarters and Kigali International Community School, and currently serves as Secretary General of the Rwanda Institute of Architects.',
  },
  {
    name: 'Jean Pierre Bayisenge',
    position: 'Technical Director / Lead Structural Engineer',
    bio: 'Jean Pierre is a registered Professional Engineer with the Institution of Engineers Rwanda (Reg. No. A489/EC/IER/2016) and holds an MSc in Structural Engineering from JKUAT. He leads structural design and oversees the structural integrity of every building the firm designs and supervises.',
  },
];

const CORE_TEAM: Member[] = [
  {
    name: 'Flavia Gwiza',
    position: 'Project Architect',
    bio: 'Flavia is a registered architect (RIA Reg. No. A.78.17) and urban designer who holds a Master of Science in Architecture (Urban Design) from Virginia Tech, earned as a Fulbright Scholar, and a Bachelor of Architecture from the University of Rwanda. With more than ten years of experience in Rwanda, East Africa and the United States, she has worked on Kigali Downtown Centre, Rugarama Park Estate, Green City Kigali and AFD funded informal settlement upgrading in Kigali.',
  },
  {
    name: 'Thierry Gashema Gasangwa',
    position: 'MEP Engineer',
    bio: 'Thierry is a registered Professional Engineer (IER Reg. No. A303/EC/IER/2015) and RURA licensed electrical engineer with more than twenty years of experience in Rwanda, the DRC and the UAE. He has led MEP design and supervision on landmark buildings including M-Peace Plaza and the Cogebanque Headquarters, and leads the mechanical, electrical and plumbing design of every KN Design Space project.',
  },
  {
    name: 'Alphonse Nsengumuremyi Mucyo',
    position: 'Quantity Surveyor',
    bio: 'Alphonse is a Quantity Surveyor, certified Project Management Professional (PMP\u00ae) and member of the Rwanda Institute of Quantity Surveyors, with a BSc (Hons) in Quantity Surveying from the University of Rwanda. Since 2017 he has delivered cost planning, tender documentation and contract administration on major projects including the University of Rwanda Infrastructure Development Project and Kivu Marina Bay Hotel.',
  },
  {
    name: 'Lorraine Mwiza Ndongozi',
    position: 'Office Administrator',
    bio: "Lorraine brings a background in software engineering to the studio, combining office administration with the firm's digital work. She manages client communication, documentation and administrative compliance, and leads the development of the KN Design Space website. She is often the first point of contact for clients and partners.",
    image: '/images/Team images/Lorraine.png', 
  }, 
  {
    name: 'Come Banziziki',
    position: 'Site Supervisor',
    bio: "Come is a civil engineer and corporate member of the Institution of Engineers Rwanda (Reg. No. A1448/EC/IER/2021), with a Master's degree in Civil Engineering from Beijing Jiaotong University and a Bachelor's degree from the University of Rwanda. He brings more than ten years of site, structural and geotechnical experience in Rwanda and China, including the University of Global Health Equity campus in Butaro, the Rubavu-Gisiza road and WASAC water supply systems. He represents KN Design Space on site, monitoring quality, progress and compliance.",
  },
  {
    name: 'Felix Nteziyaremye',
    position: 'Accountant',
    bio: 'Felix brings experience in accounting, taxation and auditing. He advises the firm on tax matters and manages its financial records and documentation, keeping KN Design Space compliant with RRA and RSSB requirements.',
  },
];

function initials(name: string) {
  return name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0])
    .join('')
    .toUpperCase();
}

function TeamCard({ member, i, large = false }: { member: Member; i: number; large?: boolean }) {
  const [open, setOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5, delay: (i % 4) * 0.06 }}
      className="border border-[var(--line)] bg-[var(--paper)]"
    >
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="magnetic w-full flex items-center gap-4 p-6 text-left"
      >
        <span
  className={`flex-shrink-0 relative overflow-hidden rounded-full flex items-center justify-center font-display font-bold text-[var(--brass)] transition-colors ${
    member.image
      ? 'border-0'
      : `border-2 border-[var(--charcoal)] ${
          open ? 'bg-[var(--charcoal)] text-[var(--paper-light)]' : ''
        }`
  } ${large ? 'w-20 h-20 text-xl' : 'w-16 h-16 text-base'}`}
>
  {member.image ? (
    <img
      src={member.image}
      alt={member.name}
      className="absolute inset-0 w-full h-full object-cover"
    />
  ) : (
    initials(member.name)
  )}
</span>
        <span className="flex-1 min-w-0">
          <span className={`font-display font-semibold block leading-snug ${large ? 'text-3xl' : 'text-2xl'}`}>
            {member.name}
          </span>
          <span className="font-monospace text-xs uppercase text-[var(--brass)] block mt-3">{member.position}</span>
        </span>
        <span className={`font-mono text-lg flex-shrink-0 transition-transform duration-300 ${open ? 'rotate-45' : ''}`}>
          +
        </span>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <p className="px-6 pb-6 text-sm leading-relaxed opacity-80 border-t border-[var(--line)] pt-5">
              {member.bio}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

function TeamSection({
  title,
  subtitle,
  members,
  columns,
  large = false,
}: {
  title: string;
  subtitle: string;
  members: Member[];
  columns: string; 
  large?: boolean;
}) {
  return (
    <section className="px-6 md:px-12 py-16 md:py-20">
      <div className={CONTAINER}>
        <div className="flex items-baseline justify-between mb-10 flex-wrap gap-2">
          <h2 className="font-display font-semibold text-2xl md:text-4xl">{title}</h2>
          <span className="font-mono text-xs uppercase text-[var(--brass)]">{subtitle}</span>
        </div>
        <div className={`grid gap-4 ${columns}`}>
          {members.map((member, i) => (
            <TeamCard key={`${member.name}-${member.position}`} member={member} i={i} large={large} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default function Studio() {
  return (
    <>
      <Cursor />
      <NavOverlay />

      <section className="px-6 md:px-12 pt-32 pb-12 md:pt-40 md:pb-16 border-b border-[var(--line)]">
        <div className={CONTAINER}>
          <span className="font-serif italic text-xl text-[var(--brass)] block opacity-85 mb-3">The people behind the work.</span>
          <h1 className="font-display font-semibold text-[clamp(32px,5.5vw,56px)] leading-tight max-w-[22ch] mb-6">
            Our Team
          </h1>
          <p className="opacity-75 max-w-[62ch] leading-relaxed text-balance">
            From board governance to site supervision, KN Design Space is built on licensed
            professionals, registered engineers and specialists who carry every project from
            first conversation through to handover. 
          </p>
        </div>
      </section>

        <TeamSection
          title="Board of Directors" 
          subtitle={`${BOARD.length} people`}
          members={BOARD}
          columns="md:grid-cols-2 lg:grid-cols-3"
        />
      <div className="border-t border-[var(--line)]" />

      <TeamSection
        title="Leadership"
        subtitle={`${LEADERSHIP.length} people`}
        members={LEADERSHIP}
        columns="md:grid-cols-2"
      />  
      <div className="border-t border-[var(--line)] bg-[var(--paper-light)]" />

      <TeamSection
        title="Core Team"
        subtitle={`${CORE_TEAM.length} people`}
        members={CORE_TEAM}
        columns="md:grid-cols-2 lg:grid-cols-3"
      />  
      <div className="bg-[var(--paper-light)]">
      </div>

      <section className="px-12 py-12 bg-[var(--charcoal)] text-[var(--on-dark)] flex flex-col md:flex-row justify-between items-start md:items-end gap-8">
        <h2 className="font-display font-semibold text-[clamp(27px,4vw,45px)] md:max-w-[26ch] leading-tight">
          Want to work with US?
        </h2>
        
        <a  href="/contact"
          className="magnetic font-mono text-lg uppercase px-3 py-2 md:px-7 md:py-3 rounded-full bg-[var(--paper-light)] text-[var(--ink)] whitespace-nowrap"
        >
          Start a project →
        </a>
      </section> 
    </>
  );
}