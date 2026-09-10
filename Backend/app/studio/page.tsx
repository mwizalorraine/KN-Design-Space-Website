'use client';
import { motion } from 'framer-motion';
import NavOverlay from '../components/NavOverlay';
import Cursor from '../components/Cursor ';

const values = [
  {
    num: '01',
    title: 'Listen first',
    text: "A brief is a set of real constraints, not a mood board — light, budget, climate, how a family actually gathers in a kitchen at 7am.",
  },
  {
    num: '02',
    title: 'Draw honestly',
    text: "What gets built should look like what got drawn. We avoid renders that oversell a space beyond what the budget can deliver.",
  },
  {
    num: '03',
    title: 'Stay on site',
    text: "Design doesn't end at the drawing set. We stay involved through construction so the intent survives contact with reality.",
  },
];

const team = [
  { name: 'Nicolas Kalimba ', role: 'Principal Architect', initials: 'KN' },
  { name: 'Aimee Uwase', role: 'Urban Planner', initials: 'AU' },
  { name: 'B. Habimana', role: 'Civil & Structural Engineer', initials: 'CH' },
  { name: 'C. Ingabire', role: 'MEP Engineer', initials: 'CI' },
];

export default function Studio() {
  return (
    <>
      <Cursor />
      <NavOverlay />

      <section className="px-12 pt-20 pb-16 max-w-3xl">
        <div className="font-serif italic text-lg opacity-75 mb-3">The studio.</div>
        <h1 className="font-display font-semibold text-[clamp(30px,5vw,52px)] leading-tight mb-6">
          Designed by people, not templates.
        </h1>
        <p className="opacity-80 text-[17px] leading-relaxed max-w-[56ch]">
          Our team draws together architects, urban planners, civil and structural engineers, MEP engineers,
          environmentalists, and social-impact specialists brought together on each project according to its specific
          demands, from design inception through to implementation.
        </p>
      </section>

      <section className="px-12 py-16 border-y border-[var(--line)] bg-[var(--paper-light)] grid md:grid-cols-3 gap-10">
        {values.map((v, i) => (
          <motion.div
            key={v.num}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.55, delay: i * 0.08 }}
          >
            <span className="font-mono text-xs text-[var(--brass)] block mb-4">{v.num}</span>
            <h3 className="font-display font-semibold text-xl mb-3">{v.title}</h3>
            <p className="text-[15px] opacity-75 leading-relaxed">{v.text}</p>
          </motion.div>
        ))}
      </section>

      <section className="px-12 py-20">
        <h2 className="font-display font-semibold text-3xl mb-10">The team</h2>
        <div className="grid md:grid-cols-4 gap-8">
          {team.map((member, i) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.5, delay: i * 0.06 }}
            >
              <div className="w-full aspect-square bg-[var(--charcoal)] text-[var(--paper-light)] flex items-center justify-center font-display font-semibold text-3xl mb-4">
                {member.initials}
              </div>
              <h4 className="font-display font-semibold text-lg">{member.name}</h4>
              <p className="font-mono text-xs uppercase opacity-60 mt-1">{member.role}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="px-12 py-20 bg-[var(--charcoal)] text-[var(--paper-light)] flex flex-col md:flex-row justify-between items-start md:items-end gap-8">
        <h2 className="font-display font-semibold text-[clamp(28px,4vw,42px)] max-w-[16ch] leading-tight">
          Want to work with the studio?
        </h2>
        
        <a  href="/contact"
          className="magnetic font-mono text-xs uppercase px-6 py-3 rounded-full bg-[var(--paper-light)] text-[var(--ink)] whitespace-nowrap"
        >
          Start a project →
        </a>
      </section>
    </>
  );
}