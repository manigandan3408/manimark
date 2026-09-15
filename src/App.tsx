import { useRef, useEffect } from 'react';
import Navigation from '@/components/Navigation';
import Hero from '@/components/Hero';
import SelectedWork from '@/components/SelectedWork';
import DemoProjects from '@/components/DemoProjects';
import Services from '@/components/Services';
import Process from '@/components/Process';
import About from '@/components/About';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';

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
    <div className="relative bg-ink-950 grain min-h-screen">
      <Navigation />
      <Hero scrollProgress={scrollProgress} />
      <SelectedWork />
      <DemoProjects />
      <Services />
      <Process />
      <About />
      <Contact />
      <Footer />
    </div>
  );
}

export default App;
