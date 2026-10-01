'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import NavOverlay from '../components/NavOverlay';
import Cursor from '../components/Cursor ';;

type Project = {
  id: number;
  title: string;
  slug: string;
  category: string;
  location?: string;
  year?: string;
  summary?: string;
  cover_image?: string;
  featured?: boolean;
};

const categoryLabels: Record<string, string> = {
  education: 'Education & Institutional',
  health: 'Health & Foodservice',
  housing: 'Community & Housing',
  institutional: 'Institutional & Hospitality',
  residential: 'Residential Design',
  concept: 'Concept Studies',
  interior: 'Interior Design',
};

const CONTAINER = 'w-full max-w-[1440px] mx-auto';

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/projects/')
      .then((res) => {
        if (!res.ok) {
          throw new Error('Failed to fetch projects');
        }
        return res.json();
      })
      .then((data) => {
        setProjects(data);
      })
      .catch((error) => {
        console.error('Error loading projects:', error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <>
      <NavOverlay />
      <Cursor />

      <main className="min-h-screen bg-[var(--paper-light)] text-[var(--ink)]">

        {/* HEADER */}
        <section className="px-6 md:px-12 pt-32 md:pt-40 pb-16">
          <div className={CONTAINER}>
            <p className="text-xs tracking-[0.25em] uppercase opacity-60 mb-5">
              Transforming lives through architecture.
            </p>

            <h1 className="font-monospace text-5xl md:text-7xl lg:text-8xl font-light tracking-tight">
              Projects
            </h1>

            <p className="max-w-2xl mt-8 text-base md:text-lg leading-relaxed opacity-70 text-balance">
              Explore our architecture and design projects across education,
              healthcare, housing, hospitality, residential and conceptual design.
            </p>
          </div>
        </section>

        {/* PROJECTS */}
        <section className="px-6 md:px-12 pb-24">
          <div className={CONTAINER}>

            {loading ? (
              <p className="text-sm opacity-60">
                Loading projects...
              </p>
            ) : projects.length === 0 ? (
              <p className="text-sm opacity-60">
                No projects available.
              </p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-16">

                {projects.map((project) => (
                  <Link
                    key={project.id}
                    href={`/projects/${project.slug}`}
                    className="group block"
                  >

                    {/* IMAGE */}
                    <div className="relative aspect-[16/10] overflow-hidden bg-neutral-200">
                      {project.cover_image ? (
                        <img
                          src={project.cover_image}
                          alt={project.title}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <span className="text-sm opacity-40">
                            No image
                          </span>
                        </div>
                      )}
                    </div>

                    {/* INFO */}
                    <div className="mt-5 flex justify-between gap-6">

                      <div>
                        <p className="text-xs uppercase tracking-[0.18em] opacity-50 mb-2">
                          {categoryLabels[project.category] || project.category}
                        </p>

                        <h2 className="text-2xl md:text-3xl font-light group-hover:opacity-60 transition-opacity">
                          {project.title}
                        </h2>

                        {project.location && (
                          <p className="mt-2 text-sm opacity-60">
                            {project.location}
                          </p>
                        )}
                      </div>

                      {project.year && (
                        <span className="text-sm opacity-50 shrink-0">
                          {project.year}
                        </span>
                      )}

                    </div>

                  </Link>
                ))}

              </div>
            )}

          </div>
  <div className="fixed bottom-7 z-40 flex flex-col items-end gap-3 right-[max(1.75rem,calc((100vw-1440px)/2))]"
>
  <a
    href="/contact"
    className="magnetic font-mono text-sm uppercase px-6 py-3.5 rounded-full bg-[var(--on-dark)] text-[var(--brass)] shadow-xl whitespace-nowrap "
  >
    Start a project →
  </a>
  </div>
  </section>
      </main>
    </>
  );
}