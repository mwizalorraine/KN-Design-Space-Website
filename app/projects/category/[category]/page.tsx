'use client';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import NavOverlay from '../../../components/NavOverlay';
import Cursor from '../../../components/Cursor ';

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
  status: string;
  cover_image: string | null;
};

export default function CategoryPage() {
  const params = useParams();
  const category = params.category as string;
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/projects/`)
      .then((res) => res.json())
      .then((data: Project[]) => setProjects(data.filter((p) => p.category === category)))
      .catch(() => setProjects([]));
  }, [category]);

  const label = categoryLabels[category] || 'Projects';

  return (
    <>
      <Cursor />
      <NavOverlay />

      <section className="px-12 pt-16 pb-10">
        <a href="/#projects" className="magnetic font-mono text-xs uppercase opacity-60 hover:opacity-100 transition-opacity">
          ← All categories
        </a>
        <h1 className="font-display font-semibold text-[clamp(32px,5vw,54px)] leading-tight mt-4">
          {label}
        </h1>
        <p className="font-mono text-xs uppercase opacity-60 mt-3">
          {projects.length} {projects.length === 1 ? 'Project' : 'Projects'}
        </p>
      </section>

      <section className="px-12 pb-20">
        <div className="grid md:grid-cols-3 gap-[2px] bg-[var(--line)]">
          {projects.length === 0 && (
            <div className="bg-[var(--paper)] p-8 font-mono text-sm opacity-60 md:col-span-3">
              No projects in this category yet.
            </div>
          )}
          {projects.map((p) => (
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
                <div className="absolute top-6 left-6 w-8 h-8 rounded-sm bg-[var(--brass)] transition-transform duration-300 group-hover:scale-[4] group-hover:opacity-10" />
              )}
              {p.cover_image && <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />}
              <div className={`font-mono text-[11px] uppercase mb-2 relative ${p.cover_image ? 'text-white/80' : 'opacity-60'}`}>{p.status}</div>
              <h3 className={`font-display font-semibold text-xl mb-1.5 relative ${p.cover_image ? 'text-white' : ''}`}>{p.title}</h3>
              {p.location && <div className={`text-sm italic relative ${p.cover_image ? 'text-white/75' : 'opacity-65'}`}>{p.location}</div>}
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
