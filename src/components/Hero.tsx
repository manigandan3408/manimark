import { Suspense, useRef } from 'react';
import { motion } from 'framer-motion';
import HeroScene from '@/three/HeroScene';

interface HeroProps {
  scrollProgress: React.MutableRefObject<number>;
}

export default function Hero({ scrollProgress }: HeroProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <section id="hero" ref={containerRef} className="relative h-screen w-full overflow-hidden">
      {/* 3D Canvas — fills the entire hero */}
      <div className="absolute inset-0 z-10">
        <Suspense fallback={<div className="w-full h-full bg-ink-950" />}>
          <HeroScene scrollProgress={scrollProgress} />
        </Suspense>
      </div>

      {/* Ambient gradient overlays */}
      <div className="absolute inset-0 z-20 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-ink-950/60 via-transparent to-ink-950/80" />
        <div className="absolute top-1/4 left-0 w-1/3 h-1/2 bg-gradient-to-r from-ink-950/50 to-transparent" />
        <div className="absolute bottom-1/4 right-0 w-1/3 h-1/2 bg-gradient-to-l from-ink-950/50 to-transparent" />
      </div>

      {/* Editorial typography composition — overlapping the 3D */}
      <div className="absolute inset-0 z-30 flex flex-col justify-center px-6 md:px-10 pointer-events-none">
        <div className="max-w-[1600px] mx-auto w-full">
          {/* Top label */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="flex items-center gap-3 mb-6 md:mb-8"
          >
            <div className="w-12 h-px bg-accent" />
            <span className="font-mono text-xs tracking-[0.3em] text-accent uppercase">
              Independent Digital Studio
            </span>
          </motion.div>

          {/* Massive MANIMARK headline */}
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.4 }}
            className="font-display font-bold tracking-tighter leading-[0.85] text-[clamp(3.5rem,14vw,12rem)] text-ink-50"
          >
            MANIMARK
          </motion.h1>

          {/* Subheadline */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.7 }}
            className="mt-4 md:mt-6 flex flex-col md:flex-row md:items-end gap-4 md:gap-12"
          >
            <div>
              <p className="font-display text-xl md:text-3xl font-light text-ink-100 tracking-wide">
                Web Development
              </p>
              <p className="font-display text-xl md:text-3xl font-light text-ink-200 tracking-wide">
                & Digital Solutions
              </p>
            </div>
            <p className="font-sans text-sm md:text-base text-ink-200 max-w-sm leading-relaxed md:pb-2">
              Websites that make your business look ready for its next customer.
            </p>
          </motion.div>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1 }}
            className="mt-8 md:mt-12 flex flex-wrap gap-4 pointer-events-auto"
          >
            <a
              href="#work"
              className="group flex items-center gap-3 px-7 py-4 bg-ink-50 text-ink-950 font-medium text-sm tracking-wide hover:bg-accent transition-all duration-400"
            >
              VIEW WORK
              <span className="inline-block group-hover:translate-x-1 transition-transform">→</span>
            </a>
            <a
              href="#contact"
              className="group flex items-center gap-3 px-7 py-4 border border-ink-400 text-ink-50 font-medium text-sm tracking-wide hover:border-accent hover:text-accent transition-all duration-400"
            >
              START A PROJECT
              <span className="inline-block group-hover:translate-x-1 group-hover:-translate-y-0.5 transition-transform">↗</span>
            </a>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-2 pointer-events-none"
      >
        <span className="font-mono text-[10px] tracking-[0.3em] text-ink-300 uppercase">Scroll</span>
        <div className="w-px h-12 bg-gradient-to-b from-ink-400 to-transparent" />
      </motion.div>
    </section>
  );
}
