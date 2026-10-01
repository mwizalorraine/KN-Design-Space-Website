'use client';

import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

export default function WelcomeSplash() {
  const [show, setShow] = useState(true);
  const [progress, setProgress] = useState(0);
  const [videoFailed, setVideoFailed] = useState(false); // true once autoplay is confirmed blocked
  const [posterFailed, setPosterFailed] = useState(false); // true if even the fallback image can't load

  const videoRef = useRef<HTMLVideoElement>(null);

  const WELCOME_TEXT =
    'Transforming Lives Through Architecture    ...';

  useEffect(() => {
    const seen = sessionStorage.getItem('kn_welcome_seen');

    if (seen === 'true') {
      setShow(false);
      return;
    }

    const duration = 15000;
    const start = performance.now();

    let animationFrame: number;

    const tick = (now: number) => {
      const elapsed = now - start;
      const pct = Math.min(
        100,
        Math.round((elapsed / duration) * 100)
      );

      setProgress(pct);

      if (pct < 100) {
        animationFrame = requestAnimationFrame(tick);
      } else {
        sessionStorage.setItem('kn_welcome_seen', 'true');
        setShow(false);
      }
    };

    animationFrame = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(animationFrame);
    };
  }, []);

  /*
   * Try to start the video as soon as it is ready.
   * Muted + playsInline allows autoplay on most mobile browsers.
   * If the browser blocks it anyway (common on mobile: data-saver mode,
   * iOS's Wi-Fi-only autoplay setting, low power mode — outside our
   * control), we swap to a static fallback photo instead of leaving a
   * black screen. The splash itself (logo, tagline, progress) still runs.
   */
  useEffect(() => {
    if (!show || videoFailed) return;

    const video = videoRef.current;

    if (!video) return;

    video.muted = true;
    video.playsInline = true;

    const tryPlay = () => {
      video.play().catch(() => {
        setVideoFailed(true);
      });
    };

    tryPlay();

    video.addEventListener('canplay', tryPlay);
    video.addEventListener('loadeddata', tryPlay);
    video.addEventListener('error', () => setVideoFailed(true));

    return () => {
      video.removeEventListener('canplay', tryPlay);
      video.removeEventListener('loadeddata', tryPlay);
    };
  }, [show, videoFailed]);

  const revealedCount = Math.floor(
    (progress / 100) * WELCOME_TEXT.length
  );

  const visibleText = WELCOME_TEXT.slice(0, revealedCount);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0 }}
          className="fixed inset-0 z-[200] overflow-hidden bg-[var(--charcoal)]"
        >
          {/* BACKGROUND: video normally, or a static photo if autoplay is blocked */}
          {!videoFailed ? (
            <video
              ref={videoRef}
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
              poster="/videos/welcome-poster.jpg"
              className="absolute inset-0 w-full h-full object-contain"
              aria-hidden="true"
            >
              <source
                src="/videos/welcome-video.mp4"
                type="video/mp4"
              />
            </video>
          ) : !posterFailed ? (
            <img
              src="/videos/welcome-poster.jpg"
              alt=""
              className="absolute inset-0 w-full h-full object-cover"
              onError={() => setPosterFailed(true)}
            />
          ) : (
            // Last-resort fallback if even the poster image is missing —
            // reuses an existing site photo so it's never a bare black void.
            <img
              src="/images/night view.png"
              alt=""
              className="absolute inset-0 w-full h-full object-cover"
            />
          )}

          {/* DARK OVERLAY */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-black/70" />

          {/* CONTENT */}
          <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6 text-[var(--paper-light)]">

            {/* LOGO */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.8,
                delay: 0.3,
              }}
              className="rounded-lg px-6 md:px-10 py-8 mb-0"
            >
              <img
                src="/images/Artboard 3 1.png"
                alt="KN Design Space"
                className="h-56 md:h-80 w-auto"
              />
            </motion.div>

            {/* WELCOME TEXT */}
            <p className="font-serif italic text-xl md:text-5xl opacity-100 mb-7 min-h-[1.5em] text-[var(--on-dark)]">
              {visibleText}
              <span className="animate-pulse" />
            </p>

            {/* LOADING BAR */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{
                duration: 0.8,
                delay: 0.7,
              }}
              className="w-full max-w-[420px]"
            >
              <div className="h-[12px] w-full bg-white/20 overflow-hidden rounded-full">
                <div
                  className="h-full bg-[var(--brass)] transition-[width] duration-100 ease-linear"
                  style={{
                    width: `${progress}%`,
                  }}
                />
              </div>

              <div className="font-mono text-[20.5px] uppercase tracking-widest opacity-80 mt-3 text-[var(--on-dark)]">
                Loading — {progress}%
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}