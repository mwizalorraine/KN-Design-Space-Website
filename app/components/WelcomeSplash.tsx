'use client';
import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

export default function WelcomeSplash() {
  const [show, setShow] = useState(true);
  const [progress, setProgress] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const WELCOME_TEXT = "Transforming Lives Through Architecture    ...";

  useEffect(() => {
    setIsMobile(window.innerWidth < 768);

    const seen = sessionStorage.getItem('kn_welcome_seen');
    if (seen === 'true') {
      setShow(false);
      return;
    }

    setShow(true);

    const duration = 15000;
    const start = performance.now();

    const tick = (now: number) => {
      const elapsed = now - start;
      const pct = Math.min(100, Math.round((elapsed / duration) * 100));
      setProgress(pct);
      if (pct < 100) {
        requestAnimationFrame(tick);
      } else {
        sessionStorage.setItem('kn_welcome_seen', 'true');
        setShow(false); 
      }
    };
    requestAnimationFrame(tick);
  }, []);

if (show === null) {
  return null;
}
const revealedCount = Math.floor((progress / 100) * WELCOME_TEXT.length);
  const visibleText = WELCOME_TEXT.slice(0, revealedCount); 

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0 }}
          className="fixed inset-0 z-[200] overflow-hidden bg-[var(--ink)] "
        >
          : (
            <video
              autoPlay
              muted
              loop
              playsInline
              poster="/videos/welcome-poster.jpg"
              className="absolute inset-0 w-full h-full object-cover"
            >
              <source src="/videos/welcome-video.mp4" type="video/mp4" />
            </video>
          )

          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-black/70" />

          <div className="relative h-full flex flex-col items-center justify-center text-center px-6 text-[var(--paper-light)]">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className=" rounded-lg px-10 py-8 mb-0"
            >
              <img src="/images/Artboard 3 1.png" alt="KN Design Space" className="h-80 w-auto" />
            </motion.div>

            <p className="font-serif italic text-xl md:text-5xl opacity-100 mb-7 min-h-[1.5em] ">
              {visibleText}
              <span className="animate-pulse"></span>
            </p>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.7 }}
              className="w-full max-w-[420px]"
            >
              <div className="h-[12px] w-full bg-white/20 overflow-hidden rounded-full">
                <div
                  className="h-full bg-[var(--brass)] transition-[width] duration-100 ease-linear"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <div className="font-mono text-[20.5px] uppercase tracking-widest opacity-80 mt-3">
                Loading — {progress}%
              </div>
            </motion.div>
          </div> 
        </motion.div>
      )}
    </AnimatePresence>
  );
}