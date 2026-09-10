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
  interior: 'Interior Design',
};

type GalleryImage = {
  id: number;
  image: string;
  caption: string;
  order: number;
  image_type: 'gallery' | 'before' | 'after';
  pair_key: string;
  section: string;
};

type Spec = {
  label: string;
  value: string;
  order: number;
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
  specs: Spec[];
};

// --- Generic slider, used by every non-interior category (unchanged) ---

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

// --- Interior-only: spec list + always-visible before/after pairs
// (matches the source portfolio PDF: two stacked photos per view, both
// visible, with a small BEFORE/AFTER tag — no click-to-toggle) ---

function SpecList({ specs }: { specs: Spec[] }) {
  if (specs.length === 0) return null;
  return (
    <dl className="border-t border-[var(--line)]">
      {specs.map((spec) => (
        <div key={spec.label} className="py-4 border-b border-[var(--line)]">
          <dt className="font-mono text-xs uppercase text-[var(--brass)] mb-1.5">{spec.label}</dt>
          <dd className="text-sm leading-relaxed opacity-85">{spec.value}</dd>
        </div>
      ))}
    </dl>
  );
}

function BeforeAfterPair({
  before,
  after,
  viewLabel,
}: {
  before: GalleryImage;
  after: GalleryImage;
  viewLabel: string;
}) {
  return (
    <div className="flex flex-col gap-3">
      <div className="relative aspect-[4/3] overflow-hidden">
        <img src={before.image} alt={`${viewLabel} — before`} className="w-full h-full object-cover" />
        <span className="absolute left-3 top-3 font-mono text-[10px] uppercase px-2.5 py-1 bg-[var(--ink)] text-[var(--paper)]">
          Before
        </span>
      </div>
      <div className="relative aspect-[4/3] overflow-hidden">
        <img src={after.image} alt={`${viewLabel} — after`} className="w-full h-full object-cover" />
        <span className="absolute left-3 top-3 font-mono text-[10px] uppercase px-2.5 py-1 bg-[var(--ink)] text-[var(--paper)]">
          After
        </span>
      </div>
      <div className="font-mono text-[10px] uppercase opacity-50 text-center">{viewLabel}</div>
    </div>
  );
}

function groupBeforeAfter(images: GalleryImage[]) {
  const befores = [...images].filter((img) => img.image_type === 'before').sort((a, b) => a.order - b.order);
  const afters = [...images].filter((img) => img.image_type === 'after').sort((a, b) => a.order - b.order);

  // Prefer matching by explicit pair_key when both sides actually set one
  // (e.g. both 'view-1'). If pair_key is blank — easy to forget in admin —
  // fall back to matching by position, so pairs still come out correct as
  // long as befores and afters were entered in the same view order.
  return befores
    .map((before, i) => {
      const matched = before.pair_key ? afters.find((a) => a.pair_key === before.pair_key) : undefined;
      return { before, after: matched || afters[i] };
    })
    .filter((pair): pair is { before: GalleryImage; after: GalleryImage } => Boolean(pair.after));
}

// Fixed eyebrow captions matching the source PDF's named galleries. A
// section title not in this map (e.g. a future project's own section
// names) just renders without an eyebrow — nothing breaks.
const SECTION_SUBTITLES: Record<string, string> = {
  'The Finished Space': 'Selected views',
  'Reception': 'First impression & portfolio wall',
  "Co-Working & Director's Office": "Meeting space, pin-up wall & MD office",
  'As Built': 'The completed studio, photographed on site',
};

function groupBySection(images: GalleryImage[]) {
  const named = [...images].filter((img) => img.section).sort((a, b) => a.order - b.order);
  const order: string[] = [];
  const groups: Record<string, GalleryImage[]> = {};
  named.forEach((img) => {
    if (!groups[img.section]) {
      groups[img.section] = [];
      order.push(img.section);
    }
    groups[img.section].push(img);
  });
  return order.map((title) => ({ title, images: groups[title] }));
}

// Matches the PDF's two recurring layouts: 3 photos -> one large + two
// stacked; 4 photos -> an even 2x2 grid. Any other count falls back to a
// simple even grid so nothing breaks if a project has a different amount.
function GallerySection({ title, images }: { title: string; images: GalleryImage[] }) {
  const subtitle = SECTION_SUBTITLES[title];

  return (
    <div className="pt-16 mt-16 mb-8 border-t border-[var(--line)]">
      <div className="flex items-end justify-between mb-6">
        <h4 className="font-display font-semibold text-2xl md:text-3xl">{title}</h4>
        {subtitle && <span className="font-mono text-[11px] uppercase opacity-60">{subtitle}</span>}
      </div>

      {images.length === 3 ? (
        <div className="grid md:grid-cols-[1.5fr_1fr] gap-3">
          <img
            src={images[0].image}
            alt={images[0].caption || title}
            className="w-full h-72 md:h-[600px] object-cover"
          />
          <div className="flex flex-col gap-3 h-72 md:h-[600px]">
            <img src={images[1].image} alt={images[1].caption || title} className="w-full flex-1 object-cover" />
            <img src={images[2].image} alt={images[2].caption || title} className="w-full flex-1 object-cover" />
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-3">
          {images.map((img) => (
            <img
              key={img.id}
              src={img.image}
              alt={img.caption || title}
              className="w-full aspect-[4/3] object-cover"
            />
          ))}
        </div>
      )}
    </div>
  );
}

function InteriorDetail({ project }: { project: Project }) {
  const plainGallery = [...project.gallery]
    .filter((img) => img.image_type === 'gallery' && !img.section)
    .sort((a, b) => a.order - b.order);
  const pairs = groupBeforeAfter(project.gallery);
  const sections = groupBySection(project.gallery.filter((img) => img.image_type === 'gallery'));

  return (
    <section className="max-w-5xl mx-auto px-6 py-20">
      {project.summary && (
        <p className="text-[17px] leading-relaxed opacity-85 max-w-[62ch] mb-12">{project.summary}</p>
      )}

      <div className="grid md:grid-cols-[1.5fr_1fr] gap-6 md:gap-10 items-stretch mb-12">
        {plainGallery[0] && (
          <img
            src={plainGallery[0].image}
            alt={plainGallery[0].caption || project.title}
            className="w-full h-72 md:h-full object-cover"
          />
        )}
        <SpecList specs={project.specs} />
      </div>

      {pairs.length > 0 && (
        <>
          <div className="flex items-end justify-between mb-6">
            <h4 className="font-display font-semibold text-2xl md:text-3xl">Before &amp; After</h4>
            <span className="font-mono text-[11px] uppercase opacity-60">Same shell, reimagined interior</span>
          </div>
          <div
            className="grid gap-4 mb-16"
            style={{ gridTemplateColumns: `repeat(${pairs.length}, minmax(0, 1fr))` }}
          >
            {pairs.map((pair, i) => (
              <BeforeAfterPair
                key={pair.before.pair_key}
                {...pair}
                viewLabel={pair.before.caption || `View ${String(i + 1).padStart(2, '0')}`}
              />
            ))}
          </div>
        </>
      )}

      {sections.map((section) => (
        <GallerySection key={section.title} title={section.title} images={section.images} />
      ))}

      <div className="text-center mt-16">
        <a
          href="/#projects"
          className="magnetic inline-block font-mono text-xs uppercase px-5 py-2.5 rounded-full border border-[var(--ink)]"
        >
          ← Back to all projects
        </a>
      </div>
    </section>
  );
}


export default function ProjectDetail() {
  const params = useParams();
  const slug = params.slug as string;
  const [project, setProject] = useState<Project | null>(null);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    fetch(`https://kn-design-space-website.onrender.com/api/projects/${slug}/`)
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
          <p className="font-mono text-sm opacity-60">Project not found.</p>
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

      {/* FULL-SCREEN HERO — same for every category */}
      <section className="relative w-full h-screen overflow-hidden">
        {project.cover_image ? (
          <img src={project.cover_image} alt={project.title} className="absolute inset-0 w-full h-full object-cover" />
        ) : (
          <div className="absolute inset-0 bg-[var(--charcoal)]" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/40" />

        <div className="relative h-full flex flex-col justify-end px-12 pb-16 text-[var(--on-dark)]">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <div className="font-mono text-xs uppercase text-[var(--brass)] mb-4">
              {categoryLabels[project.category]} — {project.status}
            </div>
            <h1 className="font-display font-semibold text-[clamp(36px,6vw,72px)] leading-[1.02] max-w-[18ch]">
              {project.title}
            </h1>
            {project.location && <p className="font-serif italic text-lg opacity-80 mt-4">{project.location}</p>}
          </motion.div>
        </div>

        <div className="absolute bottom-6 right-12 font-mono text-[10.5px] uppercase text-[var(--on-dark)]/60">
          {project.title.toUpperCase()}
        </div>
      </section>

      {/* Meta row — same for every category */}
      <section className="max-w-2xl mx-auto px-6 pt-20">
        <div className="flex flex-wrap justify-center gap-x-10 gap-y-3 mb-4 font-mono text-xs uppercase opacity-70 border-y border-[var(--line)] py-5 text-center">
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
      </section>

      {/* Content — branches by category */}
      {project.category === 'interior' ? (
        <InteriorDetail project={project} />
      ) : (
        <section className="max-w-2xl mx-auto px-6 pb-20">
          {project.summary && (
            <p className="text-[17px] leading-relaxed opacity-85 text-center mb-16">{project.summary}</p>
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
      )}
    </>
  );
}