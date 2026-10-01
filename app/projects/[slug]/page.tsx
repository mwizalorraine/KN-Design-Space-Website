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

/*
|--------------------------------------------------------------------------
| Image URL helper
|--------------------------------------------------------------------------
| Django/Render may return either:
|   /media/...
| or:
|   https://127.0.0.1:8000/media/...
|
| This helper supports both.
|--------------------------------------------------------------------------
*/

const BACKEND_URL = 'http://127.0.0.1:8000';

function getImageUrl(image: string | null | undefined) {
  if (!image) return '';

  if (image.startsWith('http://') || image.startsWith('https://')) {
    return image;
  }

  if (image.startsWith('/')) {
    return `${BACKEND_URL}${image}`;
  }

  return `${BACKEND_URL}/${image}`;
}

/*
|--------------------------------------------------------------------------
| Optimized gallery image
|--------------------------------------------------------------------------
| We continue using normal <img> because your Django media files are
| already working. The important changes are:
|
| - loading="lazy"
| - decoding="async"
| - stable dimensions through the parent container
|
| This prevents mobile from immediately loading every large original image.
|--------------------------------------------------------------------------
*/

function GalleryImg({
  src,
  alt,
  className = '',
  loading = 'lazy',
}: {
  src: string;
  alt: string;
  className?: string;
  loading?: 'lazy' | 'eager';
}) {
  return (
    <img
      src={getImageUrl(src)}
      alt={alt}
      loading={loading}
      decoding="async"
      className={className}
    />
  );
}

// -----------------------------------------------------------------------------
// Generic slider — used by every non-interior category
// -----------------------------------------------------------------------------

function Slider({
  images,
  title,
}: {
  images: GalleryImage[];
  title: string;
}) {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const go = (dir: number) => {
    setDirection(dir);

    setIndex(
      (i) => (i + dir + images.length) % images.length
    );
  };

  if (images.length === 0) return null;

  const currentImage = images[index];

  return (
    <div>
      <div className="font-mono text-xs uppercase text-[var(--brass)] mb-5">
        Gallery — {index + 1} / {images.length}
      </div>

      <div
        className="relative w-full overflow-hidden border border-[var(--line)] bg-[var(--charcoal)]"
        style={{ aspectRatio: '16 / 10' }}
      >
        <AnimatePresence
          initial={false}
          custom={direction}
          mode="wait"
        >
          <motion.div
            key={currentImage.id}
            className="absolute inset-0"
            custom={direction}
            initial={{
              opacity: 0,
              x: direction > 0 ? 60 : -60,
            }}
            animate={{
              opacity: 1,
              x: 0,
            }}
            exit={{
              opacity: 0,
              x: direction > 0 ? -60 : 60,
            }}
            transition={{
              duration: 0.4,
            }}
          >
            <GalleryImg
              src={currentImage.image}
              alt={currentImage.caption || title}
              loading="eager"
              className="absolute inset-0 w-full h-full object-cover"
            />
          </motion.div>
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

        {currentImage.caption && (
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent px-4 pt-8 pb-3 pointer-events-none">
            <p className="font-mono text-[11px] uppercase text-white/90">
              {currentImage.caption}
            </p>
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
              className={`magnetic w-2 h-2 rounded-full transition-colors ${
                i === index
                  ? 'bg-[var(--brass)]'
                  : 'bg-[var(--line)]'
              }`}
              aria-label={`Go to image ${i + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}

// -----------------------------------------------------------------------------
// Interior — specifications
// -----------------------------------------------------------------------------

function SpecList({
  specs,
}: {
  specs: Spec[];
}) {
  if (specs.length === 0) return null;

  return (
    <dl className="border-t border-[var(--line)]">
      {specs.map((spec) => (
        <div
          key={spec.label}
          className="py-4 border-b border-[var(--line)]"
        >
          <dt className="font-mono text-xs uppercase text-[var(--brass)] mb-1.5">
            {spec.label}
          </dt>

          <dd className="text-sm leading-relaxed opacity-85">
            {spec.value}
          </dd>
        </div>
      ))}
    </dl>
  );
}

// -----------------------------------------------------------------------------
// Before / After
// -----------------------------------------------------------------------------

function BeforeAfterRow({
  before,
  after,
  viewLabel,
}: {
  before: GalleryImage;
  after: GalleryImage;
  viewLabel: string;
}) {
  return (
    <>
      <div className="relative aspect-[4/3] overflow-hidden bg-[var(--charcoal)]">
        <GalleryImg
          src={before.image}
          alt={`${viewLabel} — before`}
          className="w-full h-full object-cover"
        />

        <span className="absolute left-3 top-3 font-mono text-[10px] uppercase px-2.5 py-1 bg-[var(--ink)] text-[var(--paper)]">
          Before
        </span>
      </div>

      <div className="relative aspect-[4/3] overflow-hidden bg-[var(--charcoal)]">
        <GalleryImg
          src={after.image}
          alt={`${viewLabel} — after`}
          className="w-full h-full object-cover"
        />

        <span className="absolute left-3 top-3 font-mono text-[10px] uppercase px-2.5 py-1 bg-[var(--ink)] text-[var(--paper)]">
          After
        </span>
      </div>

      <div className="col-span-2 font-mono text-[10px] uppercase opacity-50 text-center -mt-1 mb-2">
        {viewLabel}
      </div>
    </>
  );
}

function groupBeforeAfter(images: GalleryImage[]) {
  const befores = [...images]
    .filter((img) => img.image_type === 'before')
    .sort((a, b) => a.order - b.order);

  const afters = [...images]
    .filter((img) => img.image_type === 'after')
    .sort((a, b) => a.order - b.order);

  return befores
    .map((before, i) => {
      const matched = before.pair_key
        ? afters.find(
            (a) => a.pair_key === before.pair_key
          )
        : undefined;

      return {
        before,
        after: matched || afters[i],
      };
    })
    .filter(
      (
        pair
      ): pair is {
        before: GalleryImage;
        after: GalleryImage;
      } => Boolean(pair.after)
    );
}

// -----------------------------------------------------------------------------
// Section subtitles  
// -----------------------------------------------------------------------------

const SECTION_SUBTITLES: Record<string, string> = {
  'The Finished Space': 'Selected views',
  Reception: 'First impression & portfolio wall',
  "Co-Working & Director's Office":
    "Meeting space, pin-up wall & MD office",
  'As Built':
    'The completed studio, photographed on site',
}; 

// -----------------------------------------------------------------------------
// Group images by section
// -----------------------------------------------------------------------------

function groupBySection(images: GalleryImage[]) {
  const named = [...images]
    .filter((img) => img.section)
    .sort((a, b) => a.order - b.order);

  const order: string[] = [];
  const groups: Record<string, GalleryImage[]> = {};

  named.forEach((img) => {
    if (!groups[img.section]) {
      groups[img.section] = [];
      order.push(img.section);
    }

    groups[img.section].push(img);
  });

  return order.map((title) => ({
    title,
    images: groups[title],
  }));
}

// -----------------------------------------------------------------------------
// Interior gallery section
// -----------------------------------------------------------------------------

function GallerySection({
  title,
  images,
}: {
  title: string;
  images: GalleryImage[];
}) {
  const subtitle = SECTION_SUBTITLES[title];

  return (
    <div className="pt-16 mt-16 mb-8 border-t border-[var(--line)]">
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-3 mb-6">
        <h4 className="font-display font-semibold text-2xl md:text-3xl leading-tight">
          {title}
        </h4>

        {subtitle && (
          <span className="font-mono text-[10px] uppercase opacity-60 leading-relaxed w-full md:w-auto md:max-w-[220px]">
            {subtitle}
          </span>
        )}
      </div>

      {images.length === 3 ? (
        <div className="grid md:grid-cols-[1.5fr_1fr] gap-3">
          <div className="relative w-full h-72 md:h-[600px] overflow-hidden bg-[var(--charcoal)]">
            <GalleryImg
              src={images[0].image}
              alt={images[0].caption || title}
              className="absolute inset-0 w-full h-full object-cover"
            />
          </div>

          <div className="flex flex-col gap-3 h-72 md:h-[600px]">
            <div className="relative flex-1 min-h-0 overflow-hidden bg-[var(--charcoal)]">
              <GalleryImg
                src={images[1].image}
                alt={images[1].caption || title}
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>

            <div className="relative flex-1 min-h-0 overflow-hidden bg-[var(--charcoal)]">
              <GalleryImg
                src={images[2].image}
                alt={images[2].caption || title}
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-3">
          {images.map((img) => (
            <div
              key={img.id}
              className="relative w-full aspect-[4/3] overflow-hidden bg-[var(--charcoal)]"
            >
              <GalleryImg
                src={img.image}
                alt={img.caption || title}
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// -----------------------------------------------------------------------------
// Interior detail page
// -----------------------------------------------------------------------------

function InteriorDetail({
  project,
}: {
  project: Project;
}) {
  const plainGallery = [...project.gallery]
    .filter(
      (img) =>
        img.image_type === 'gallery' &&
        !img.section
    )
    .sort((a, b) => a.order - b.order);

  const pairs = groupBeforeAfter(project.gallery);

  const sections = groupBySection(
    project.gallery.filter(
      (img) => img.image_type === 'gallery'
    )
  );

  return (
    <section className="max-w-5xl mx-auto px-6 py-20">
      {project.summary && (
        <p className="text-[17px] leading-relaxed opacity-85 max-w-[62ch] mb-12">
          {project.summary}
        </p>
      )}

      <div className="grid md:grid-cols-[1.5fr_1fr] gap-6 md:gap-10 items-stretch mb-12">
        {plainGallery[0] && (
          <div className="relative w-full h-72 md:h-full min-h-[300px] overflow-hidden bg-[var(--charcoal)]">
            <GalleryImg
              src={plainGallery[0].image}
              alt={
                plainGallery[0].caption ||
                project.title
              }
              className="absolute inset-0 w-full h-full object-cover"
            />
          </div>
        )}

        <SpecList specs={project.specs} />
      </div>

      {pairs.length > 0 && (
        <>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-2 mb-6">
            <h4 className="font-display font-semibold text-2xl md:text-3xl">
              Before &amp; After
            </h4>

            <span className="font-mono text-[9px] uppercase opacity-60">
              Same shell, reimagined interior
            </span>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-2 gap-4 mb-16">
            {pairs.map((pair, i) => (
              <BeforeAfterRow
                key={
                  pair.before.pair_key ||
                  pair.before.id
                }
                {...pair}
                viewLabel={
                  pair.before.caption ||
                  `View ${String(i + 1).padStart(2, '0')}`
                }
              />
            ))}
          </div>
        </>
      )}

      {sections.map((section) => (
        <GallerySection
          key={section.title}
          title={section.title}
          images={section.images}
        />
      ))}

      <div className="text-center mt-16">
        <a
          href="/#projects"
          className="magnetic inline-block font-mono text-xs uppercase px-5 py-2.5 rounded-full border border-[var(--ink)]"
        >
          ← Back to all projects
        </a>
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
  );
}

// -----------------------------------------------------------------------------
// Main project detail
// -----------------------------------------------------------------------------

export default function ProjectDetail() {
  const params = useParams();

  const slug = params.slug as string;

  const [project, setProject] =
    useState<Project | null>(null);

  const [notFound, setNotFound] =
    useState(false);

  useEffect(() => {
    let cancelled = false;

    fetch(
      `${BACKEND_URL}/api/projects/${slug}/`
    )
      .then((res) => {
        if (!res.ok) {
          throw new Error('not found');
        }

        return res.json();
      })
      .then((data) => {
        if (!cancelled) {
          setProject(data);
        }
      })
      .catch(() => {
        if (!cancelled) {
          setNotFound(true);
        }
      });

    return () => {
      cancelled = true;
    };
  }, [slug]);

  // ---------------------------------------------------------------------------
  // Not found
  // ---------------------------------------------------------------------------

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

  // ---------------------------------------------------------------------------
  // Loading
  // ---------------------------------------------------------------------------

  if (!project) {
    return (
      <>
        <Cursor />
        <NavOverlay />

        <div className="px-12 py-20">
          <p className="font-mono text-sm opacity-60">
            Loading…
          </p>
        </div>
      </>
    );
  }

  // ---------------------------------------------------------------------------
  // Project page
  // ---------------------------------------------------------------------------

  return (
    <>
      <Cursor />
      <NavOverlay />

      {/* ------------------------------------------------------------------ */}
      {/* FULL-SCREEN HERO                                                   */}
      {/* ------------------------------------------------------------------ */}

      <section className="relative w-full h-[70vh] md:h-screen overflow-hidden bg-[var(--charcoal)]">
        {project.cover_image ? (
          <GalleryImg
            src={project.cover_image}
            alt={project.title}
            loading="eager"
            className="absolute inset-0 w-full h-full object-cover"
          />
        ) : (
          <div className="absolute inset-0 bg-[var(--charcoal)]" />
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/40 pointer-events-none" />

        <div className="relative h-full flex flex-col justify-end px-12 pb-16 text-[var(--on-dark)]">
          <motion.div
            initial={{
              opacity: 0,
              y: 20,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.7,
            }}
          >
            <div className="font-mono text-xs uppercase text-[var(--brass)] mb-4">
              {categoryLabels[project.category]} —{' '}
              {project.status}
            </div>

            <h1 className="font-display font-semibold text-[clamp(36px,6vw,72px)] leading-[1.02] max-w-[18ch]">
              {project.title}
            </h1>

            {project.location && (
              <p className="font-serif italic text-lg opacity-80 mt-4">
                {project.location}
              </p>
            )}
          </motion.div>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* META ROW                                                           */}
      {/* ------------------------------------------------------------------ */}

      <section className="max-w-2xl mx-auto px-6 pt-20">
        <div className="flex flex-wrap justify-center gap-x-10 gap-y-3 mb-4 font-mono text-xs uppercase opacity-70 border-y border-[var(--line)] py-5 text-center">
          {project.location && (
            <div>
              <span className="opacity-50 block mb-1">
                Location
              </span>

              {project.location}
            </div>
          )}

          {project.role && (
            <div>
              <span className="opacity-50 block mb-1">
                Role
              </span>

              {project.role}
            </div>
          )}

          {project.year && (
            <div>
              <span className="opacity-50 block mb-1">
                Year
              </span>

              {project.year}
            </div>
          )}

          <div>
            <span className="opacity-50 block mb-1">
              Status
            </span>

            {project.status}
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* CONTENT                                                            */}
      {/* ------------------------------------------------------------------ */}

      {project.category === 'interior' ? (
        <InteriorDetail project={project} />
      ) : (
        <section className="max-w-2xl mx-auto px-6 pb-20">
          {project.summary && (
            <p className="text-[17px] leading-relaxed opacity-85 text-center mb-16">
              {project.summary}
            </p>
          )}

          <Slider
            images={project.gallery}
            title={project.title}
          />

          <div className="text-center mt-16">
            <a
              href="/#projects"
              className="magnetic inline-block font-mono text-xs uppercase px-5 py-2.5 rounded-full border border-[var(--ink)]"
            >
              ← Back to all projects
            </a>
          </div>

          <div
  className="fixed bottom-7 z-40 flex flex-col items-end gap-3 right-[max(1.75rem,calc((100vw-1440px)/2))]"
>
  <a
    href="/contact"
    className="magnetic font-mono text-sm uppercase px-6 py-3.5 rounded-full bg-[var(--on-dark)] text-[var(--brass)] shadow-xl whitespace-nowrap "
  >
    Start a project → 
  </a> 
  </div>
        </section>

        
      )}
    </>
  );
}