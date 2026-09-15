import { useRef, useEffect, lazy, Suspense } from 'react';
import { MotionConfig } from 'framer-motion';
import Navigation from '@/components/Navigation';
import Hero from '@/components/Hero';

// Below-the-fold sections are code-split so the initial JS payload
// only includes what's needed to paint the first screen (Navigation +
// Hero). Each section loads as the browser becomes idle / the user
// scrolls near it, rather than all being fetched up front.
const SelectedWork = lazy(() => import('@/components/SelectedWork'));
const DemoProjects = lazy(() => import('@/components/DemoProjects'));
const Services = lazy(() => import('@/components/Services'));
const Process = lazy(() => import('@/components/Process'));
const About = lazy(() => import('@/components/About'));
const Contact = lazy(() => import('@/components/Contact'));
const Footer = lazy(() => import('@/components/Footer'));

// Neutral, near-invisible fallback — avoids a layout-shifting spinner
// while a lazy section's chunk loads (usually near-instant on a warm cache).
const SectionFallback = () => <div className="min-h-[40vh]" />;

function App() {
  const scrollProgress = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      scrollProgress.current = Math.min(scrollTop / docHeight, 1);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    // reducedMotion="user" makes every framer-motion animation in the
    // tree honor the OS-level prefers-reduced-motion setting automatically.
    <MotionConfig reducedMotion="user">
      <div className="relative bg-ink-950 grain min-h-screen">
        <Navigation />
        <Hero scrollProgress={scrollProgress} />
        <Suspense fallback={<SectionFallback />}>
          <SelectedWork />
        </Suspense>
        <Suspense fallback={<SectionFallback />}>
          <DemoProjects />
        </Suspense>
        <Suspense fallback={<SectionFallback />}>
          <Services />
        </Suspense>
        <Suspense fallback={<SectionFallback />}>
          <Process />
        </Suspense>
        <Suspense fallback={<SectionFallback />}>
          <About />
        </Suspense>
        <Suspense fallback={<SectionFallback />}>
          <Contact />
        </Suspense>
        <Suspense fallback={<SectionFallback />}>
          <Footer />
        </Suspense>
      </div>
    </MotionConfig>
  );
}

export default App;
