
'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const CHANNEL_URL = 'https://www.youtube.com/@KNDesignSpace';
const MAX_OTHER_VIDEOS = 3;

type Video = {
  id: string;
  title: string;
};

const MPaziVideo: Video = {
  id: 'euBTwyrYWOA',
  title:
    "Mpazi Rehousing — Imiterere y'Umudugudu wa Mpazi ugiye guhindura imiturire muri Kigali",
};

function VideoCard({
  video,
  index,
}: {
  video: Video;
  index: number;
}) {
  const [playing, setPlaying] = useState(false);
  const [hovered, setHovered] = useState(false);

  return (
    <motion.article
      initial={{
        opacity: 0,
        y: 70,
        scale: 0.92,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
        scale: 1,
      }}
      viewport={{
        once: true,
        amount: 0.25,
      }}
      transition={{
        duration: 0.8,
        delay: index * 0.15,
        ease: [0.22, 1, 0.36, 1],
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <motion.div
        animate={{
          y: hovered ? -7 : 0,
        }}
        transition={{
          duration: 0.35,
          ease: 'easeOut',
        }}
      >
        <div className="relative aspect-video overflow-hidden border border-[var(--line)] bg-[var(--charcoal)] shadow-lg">
          {playing ? (
            <motion.iframe
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              src={`https://www.youtube.com/embed/${video.id}?autoplay=1&rel=0`}
              title={video.title || 'KN Design Space video'}
              className="absolute inset-0 w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          ) : (
            <button
              type="button"
              onClick={() => setPlaying(true)}
              aria-label={`Play ${video.title || 'video'}`}
              className="absolute inset-0 w-full h-full"
            >
              <motion.img
                src={`https://i.ytimg.com/vi/${video.id}/hqdefault.jpg`}
                alt=""
                className="absolute inset-0 w-full h-full object-cover"
                animate={{
                  scale: hovered ? 1.06 : 1,
                }}
                transition={{
                  duration: 0.7,
                  ease: 'easeOut',
                }}
              />

              <motion.div
                className="absolute inset-0 bg-black/40"
                animate={{
                  opacity: hovered ? 0.2 : 0.4,
                }}
                transition={{ duration: 0.35 }}
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/10" />

              <motion.span
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-[var(--brass)] flex items-center justify-center shadow-2xl"
                animate={{
                  scale: hovered ? 1.12 : 1,
                }}
                transition={{
                  duration: 0.3,
                }}
              >
                <svg
                  viewBox="0 0 24 24"
                  className="w-6 h-6 fill-[var(--paper-light)] ml-0.5"
                >
                  <path d="M8 5v14l11-7z" />
                </svg>
              </motion.span>
            </button>
          )}
        </div>

        {video.title && (
          <motion.div
            className="mt-1"
            animate={{
              x: hovered ? 4 : 0,
            }}
            transition={{
              duration: 0.3,
            }}
          >
            <h3 className="font-display font-semibold text-lg leading-snug">
              {video.title}
            </h3>

            <motion.div
              className="h-[1px] bg-[var(--brass)] mt-3 origin-left"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 0.25 }}
              animate={{
                scaleX: hovered ? 0.55 : 0.25,
              }}
              transition={{
                duration: 0.4,
              }}
            />
          </motion.div>
        )}
      </motion.div>
    </motion.article>
  );
}

export default function YouTubeVideos() {
  const [channelVideos, setChannelVideos] = useState<Video[]>([]);

  useEffect(() => {
    fetch('/api/youtube')
      .then((res) => (res.ok ? res.json() : []))
      .then((data: Video[]) =>
        setChannelVideos(Array.isArray(data) ? data : [])
      )
      .catch(() => setChannelVideos([]));
  }, []);

  const pinnedIds = new Set([MPaziVideo.id]);

  const otherVideos = channelVideos
    .filter((video) => !pinnedIds.has(video.id))
    .slice(0, MAX_OTHER_VIDEOS);

  return (
    <section className="relative overflow-hidden px-6 md:px-12 py-20 md:py-28 bg-[var(--paper-light)]">
      <div className="max-w-[1440px] mx-auto">

        {/* SECTION HEADING */}

       {/* FEATURED VIDEO */}

    {/* FEATURED TITLE */}
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.7 }}
      className="text-center mb-5"
    >
      <span className="font-mono text-2xl uppercase text-[var(--brass)] block mb-4">
        Featured VIDEO
      </span>

      <h2 className="font-display font-semibold text-2xl md:text-3xl">
        Mpazi Rehousing Project
      </h2>
    </motion.div>

    {/* MPazi FEATURED VIDEO */}
    <motion.div
      initial={{
        opacity: 0,
        y: 100,
        scale: 0.9,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
        scale: 1,
      }}
      viewport={{
        once: true,
        amount: 0.25,
      }}
      transition={{
        duration: 1,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="max-w-4xl mx-auto mb-15 md:mb-20"
    >
      <VideoCard video={MPaziVideo} index={0} />
    </motion.div>


    {/* YOUTUBE VIDEOS */}
    <motion.div
      initial={{
        opacity: 0,
        y: 50,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
      }}
      viewport={{
        once: true,
        amount: 0.2,
      }}
      transition={{
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="text-center mb-12"
    >
      <span className="font-mono text-3xl uppercase justify-center text-[var(--brass)] block mb-4">
        Watch On YouTube
      </span>

      <h2 className="font-display font-semibold text-2xl md:text-3xl">
        YouTube Videos
      </h2>
    </motion.div>


    {/* OTHER VIDEOS */}
    <div className="grid md:grid-cols-3 gap-8 md:gap-10">
      {otherVideos.map((video, index) => (
        <VideoCard
          key={video.id}
          video={video}
          index={index + 1}
        />
      ))}
    </div>


    {/* YOUTUBE BUTTON */}
    <motion.div
      initial={{
        opacity: 0,
        y: 30,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
      }}
      viewport={{
        once: true,
      }}
      transition={{
        duration: 0.7,
        delay: 0.2,
      }}
      className="text-center mt-12"
    >
      <motion.a
        href={CHANNEL_URL}
        target="_blank"
        rel="noopener noreferrer"
        whileHover={{
          y: -4,
          scale: 1.03,
        }}
        whileTap={{
          scale: 0.97,
        }}
        className="magnetic inline-block font-mono text-xs uppercase px-6 py-3 rounded-full border border-[var(--ink)]"
      >
        More on YouTube →
      </motion.a>
    </motion.div>

  </div>
</section>
  );}  


