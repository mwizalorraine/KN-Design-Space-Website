'use client';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';
import NavOverlay from '../../components/NavOverlay';
import Cursor from '../../components/Cursor ';

const categoryLabels: Record<string, string> = {
  education: 'Education & Institutional',
  health: 'Health & Foodservice',
  housing: 'Community & Housing',
  institutional: 'Institutional & Hospitality',
  residential: 'Residential Design',
  concept: 'Concept Studies',
};

type GalleryImage = {
  id: number;
  image: string;
  caption: string;
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
  gallery: GalleryImage[];
};

function Slider({ images, title }: { images: GalleryImage[]; title: string }) {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const go = (dir: number) => {
    setDirection(dir);
    setIndex((i) => (i + dir + images.length) % images.length);
  };

  if (images.length === 0) return null;

  return (
    <div>
      <div className="font-mono text-xs uppercase text-[var(--brass)] mb-5">
        Gallery — {index + 1} / {images.length}
      </div>

      <div className="relative w-full overflow-hidden border border-[var(--line)]" style={{ aspectRatio: '16 / 10' }}>
        <AnimatePresence initial={false} custom={direction} mode="wait">
          <motion.img
            key={images[index].id}
            src={images[index].image}
            alt={images[index].caption || title}
            custom={direction}
            initial={{ opacity: 0, x: direction > 0 ? 60 : -60 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: direction > 0 ? -60 : 60 }}
            transition={{ duration: 0.4 }}
            className="absolute inset-0 w-full h-full object-cover"
          />
        </AnimatePresence>

        {images.length > 1 && (
          <>
            <button
              onClick={() => go(-1)}
              className="magnetic absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-[var(--ink)]/70 text-[var(--paper-light)] flex items-center justify-center backdrop-blur-sm"
              aria-label="Previous image"
            >
              ←
            </button>
            <button
              onClick={() => go(1)}
              className="magnetic absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-[var(--ink)]/70 text-[var(--paper-light)] flex items-center justify-center backdrop-blur-sm"
              aria-label="Next image"
            >
              →
            </button>
          </>
        )}

        {images[index].caption && (
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent px-4 pt-8 pb-3">
            <p className="font-mono text-[11px] uppercase text-white/90">{images[index].caption}</p>
          </div>
        )}
      </div>

      {images.length > 1 && (
        <div className="flex gap-2 justify-center mt-4">
          {images.map((img, i) => (
            <button
              key={img.id}
              onClick={() => {
                setDirection(i > index ? 1 : -1);
                setIndex(i);
              }}
              className={`magnetic w-2 h-2 rounded-full transition-colors ${i === index ? 'bg-[var(--brass)]' : 'bg-[var(--line)]'}`}
              aria-label={`Go to image ${i + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default function ProjectDetail() {
  const params = useParams();
  const slug = params.slug as string;
  const [project, setProject] = useState<Project | null>(null);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    fetch(`http://127.0.0.1:8000/api/projects/${slug}/`)
      .then((res) => {
        if (!res.ok) throw new Error('not found');
        return res.json();
      })
      .then(setProject)
      .catch(() => setNotFound(true));
  }, [slug]);

  if (notFound) {
    return (
      <>
        <Cursor />
        <NavOverlay />
        <div className="px-12 py-20">
          <p className="font-mono text-sm opacity-60">
            Project not found.
          </p>
        </div>
      </>
    );
  }

  if (!project) {
    return (
      <>
        <Cursor />
        <NavOverlay />
        <div className="px-12 py-20">
          <p className="font-mono text-sm opacity-60">Loading…</p>
        </div>
      </>
    );
  }

  return (
    <>
      <Cursor />
      <NavOverlay />

      {/* FULL-SCREEN HERO */}
      <section className="relative w-full h-screen overflow-hidden">
        {project.cover_image ? (
          <img src={project.cover_image} alt={project.title} className="absolute inset-0 w-full h-full object-cover" />
        ) : (
          <div className="absolute inset-0 bg-[var(--charcoal)]" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/40" />

        <div className="relative h-full flex flex-col justify-end px-12 pb-16 text-[var(--paper-light)]">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <div className="font-mono text-xs uppercase text-[var(--brass)] mb-4">
              {categoryLabels[project.category]} — {project.status}
            </div>
            <h1 className="font-display font-semibold text-[clamp(36px,6vw,72px)] leading-[1.02] max-w-[18ch]">
              {project.title}
            </h1>
            {project.location && (
              <p className="font-serif italic text-lg opacity-80 mt-4">{project.location}</p>
            )}
          </motion.div>
        </div>

        <div className="absolute bottom-6 right-12 font-mono text-[10.5px] uppercase text-[var(--paper-light)]/60">
           {project.title.toUpperCase()}
        </div>
      </section>

      {/* CENTERED CONTENT */}
      <section className="max-w-2xl mx-auto px-6 py-20">
        <div className="flex flex-wrap justify-center gap-x-10 gap-y-3 mb-12 font-mono text-xs uppercase opacity-70 border-y border-[var(--line)] py-5 text-center">
          {project.location && (
            <div><span className="opacity-50 block mb-1">Location</span>{project.location}</div>
          )}
          {project.role && (
            <div><span className="opacity-50 block mb-1">Role</span>{project.role}</div>
          )}
          {project.year && (
            <div><span className="opacity-50 block mb-1">Year</span>{project.year}</div>
          )}
          <div><span className="opacity-50 block mb-1">Status</span>{project.status}</div>
        </div>

        {project.summary && (
          <p className="text-[17px] leading-relaxed opacity-85 text-center mb-16">
            {project.summary}
          </p>
        )}

        <Slider images={project.gallery} title={project.title} />

        <div className="text-center mt-16">
          <a
            href="/#projects"
            className="magnetic inline-block font-mono text-xs uppercase px-5 py-2.5 rounded-full border border-[var(--ink)]"
          >
            ← Back to all projects
          </a>
        </div>
      </section>
    </>
  );
}