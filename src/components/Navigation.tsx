import { useState, useEffect } from 'react';
import { ArrowUpRight } from 'lucide-react';

const navLinks = [
  { label: 'Work', href: '#work' },
  { label: 'Services', href: '#services' },
  { label: 'Process', href: '#process' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' },
];

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? 'glass py-3' : 'py-5'
      }`}
    >
      <div className="max-w-[1600px] mx-auto px-6 md:px-10 flex items-center justify-between">
        <a href="#hero" className="group flex items-center gap-3">
          <div className="w-8 h-8 relative">
            <div className="absolute inset-0 border border-ink-300 rotate-45 group-hover:rotate-90 transition-transform duration-700" />
            <div className="absolute inset-2 bg-accent/80 rotate-45 group-hover:rotate-0 transition-transform duration-700" />
          </div>
          <span className="font-display text-lg font-semibold tracking-[0.2em] text-ink-50">
            MANIMARK
          </span>
        </a>

        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-sm font-medium text-ink-200 hover:text-ink-50 transition-colors duration-300 tracking-wide"
            >
              {link.label}
            </a>
          ))}
        </div>

        <a
          href="#contact"
          className="group flex items-center gap-2 text-sm font-medium text-ink-50 border border-ink-500 px-5 py-2.5 hover:border-accent hover:text-accent transition-all duration-300"
        >
          START A PROJECT
          <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
        </a>
      </div>
    </nav>
  );
}
