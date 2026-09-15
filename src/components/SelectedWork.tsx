import { useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowUpRight, ExternalLink } from 'lucide-react';

interface Project {
  number: string;
  name: string;
  type: 'LIVE PROJECT' | 'DEMO CONCEPT';
  description: string;
  tags: string[];
  url: string;
  previewColor: string;
  previewGradient: string;
  imageUrl: string;
  imageAlt: string;
}

const projects: Project[] = [
  {
    number: '01',
    name: 'SASHWIN CABS',
    type: 'LIVE PROJECT',
    description:
      'Cab booking experience with customer booking flows and business operations. A complete ride-booking platform connecting customers with drivers.',
    tags: ['React', 'Node.js', 'MongoDB', 'Cloudinary'],
    url: 'https://sashwincabs.com',
    previewColor: '#1a2a3e',
    previewGradient: 'from-[#0a1520] via-[#1a3a5e] to-[#0a1520]',
    imageUrl: 'https://images.pexels.com/photos/34239/pexels-photo.jpg?auto=compress&cs=tinysrgb&h=650&w=940',
    imageAlt: 'Cab booking app on a smartphone — visual representation of the Sashwin Cabs booking experience',
  },
  {
    number: '02',
    name: 'THE SAFFRON TABLE',
    type: 'DEMO CONCEPT',
    description:
      'A premium restaurant website with menu display, table reservations, and gallery showcase. Designed for fine dining establishments.',
    tags: ['React', 'Tailwind', 'Supabase'],
    url: '#',
    previewColor: '#2a1a0e',
    previewGradient: 'from-[#1a0a05] via-[#3a2a15] to-[#1a0a05]',
    imageUrl: 'https://images.pexels.com/photos/8864543/pexels-photo-8864543.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    imageAlt: 'Fine dining dish — visual concept for a premium restaurant website',
  },
  {
    number: '03',
    name: 'LUMEN SALON',
    type: 'DEMO CONCEPT',
    description:
      'Beauty and salon booking platform with service menus, stylist profiles, and appointment scheduling for premium beauty brands.',
    tags: ['React', 'Node.js', 'PostgreSQL'],
    url: '#',
    previewColor: '#1a1a2e',
    previewGradient: 'from-[#0a0a1a] via-[#2a2a4e] to-[#0a0a1a]',
    imageUrl: 'https://images.pexels.com/photos/13068377/pexels-photo-13068377.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    imageAlt: 'Modern beauty salon interior — visual concept for a salon booking website',
  },
  {
    number: '04',
    name: 'WANDERWAY TRAVEL',
    type: 'DEMO CONCEPT',
    description:
      'Travel agency platform with destination showcases, itinerary builders, and enquiry systems for curated travel experiences.',
    tags: ['React', 'Next.js', 'Stripe'],
    url: '#',
    previewColor: '#0e2a1a',
    previewGradient: 'from-[#051a0a] via-[#1a3a2a] to-[#051a0a]',
    imageUrl: 'https://images.pexels.com/photos/1647113/pexels-photo-1647113.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    imageAlt: 'Scenic aerial landscape — visual concept for a travel agency website',
  },
];

function BrowserFrame({ project, index }: { project: Project; index: number }) {
  const frameRef = useRef<HTMLDivElement>(null);
  const [rotate, setRotate] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!frameRef.current) return;
    const rect = frameRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setRotate({ x: y * -6, y: x * 8 });
  };

  const handleMouseLeave = () => setRotate({ x: 0, y: 0 });

  const isReversed = index % 2 === 1;

  return (
    <div className={`flex flex-col ${isReversed ? 'md:flex-row-reverse' : 'md:flex-row'} items-center gap-8 md:gap-16`}>
      {/* Text side */}
      <div className="w-full md:w-2/5 flex flex-col">
        <div className="flex items-center gap-4 mb-4">
          <span className="font-mono text-sm text-accent tracking-widest">{project.number}</span>
          <span
            className={`font-mono text-[10px] tracking-[0.2em] px-3 py-1 border ${
              project.type === 'LIVE PROJECT'
                ? 'border-accent/40 text-accent bg-accent/5'
                : 'border-ink-500 text-ink-300'
            }`}
          >
            {project.type}
          </span>
        </div>

        <h3 className="font-display text-3xl md:text-5xl font-bold tracking-tight text-ink-50 mb-6 leading-tight">
          {project.name}
        </h3>

        <p className="text-ink-200 text-base md:text-lg leading-relaxed mb-8 max-w-md">
          {project.description}
        </p>

        <div className="flex flex-wrap gap-2 mb-8">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="font-mono text-xs text-ink-300 border border-ink-600 px-3 py-1.5"
            >
              {tag}
            </span>
          ))}
        </div>

        <a
          href={project.url}
          target={project.url !== '#' ? '_blank' : undefined}
          rel={project.url !== '#' ? 'noopener noreferrer' : undefined}
          className="group inline-flex items-center gap-2 text-sm font-medium text-ink-50 hover:text-accent transition-colors w-fit"
        >
          {project.type === 'LIVE PROJECT' ? 'VIEW PROJECT' : 'VIEW CONCEPT'}
          <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
        </a>
      </div>

      {/* 3D Browser frame */}
      <div
        className="w-full md:w-3/5 perspective-1000"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        <div
          ref={frameRef}
          className="preserve-3d transition-transform duration-300 ease-out"
          style={{
            transform: `rotateX(${rotate.x}deg) rotateY(${rotate.y}deg)`,
          }}
        >
          {/* Browser chrome */}
          <div className="bg-ink-800 border border-ink-600 rounded-t-lg overflow-hidden shadow-2xl">
            <div className="flex items-center gap-2 px-4 py-3 border-b border-ink-600">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-ink-500" />
                <div className="w-3 h-3 rounded-full bg-ink-500" />
                <div className="w-3 h-3 rounded-full bg-ink-500" />
              </div>
              <div className="flex-1 mx-4 h-6 bg-ink-700 rounded flex items-center px-3">
                <span className="font-mono text-[10px] text-ink-300 truncate">
                  {project.url !== '#' ? project.url : 'demo.manimark.dev/' + project.name.toLowerCase().replace(/\s/g, '-')}
                </span>
              </div>
              <ExternalLink className="w-3.5 h-3.5 text-ink-400" />
            </div>
          </div>

          {/* Preview content — real project image */}
          <div
            className={`bg-gradient-to-br ${project.previewGradient} border-x border-b border-ink-600 rounded-b-lg overflow-hidden relative`}
            style={{ aspectRatio: '16 / 10' }}
          >
            <img
              src={project.imageUrl}
              alt={project.imageAlt}
              loading="lazy"
              className="absolute inset-0 w-full h-full object-cover opacity-70"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink-950/80 via-transparent to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6">
              <p className="font-mono text-[10px] text-ink-300 tracking-widest uppercase">
                {project.type === 'LIVE PROJECT' ? 'Live Project Preview' : 'Demo Concept Visual'}
              </p>
            </div>
          </div>

          {/* Reflection / shadow */}
          <div
            className="h-20 mt-1 opacity-30 blur-xl"
            style={{
              background: `linear-gradient(to bottom, ${project.previewColor}, transparent)`,
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default function SelectedWork() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const headerOpacity = useTransform(scrollYProgress, [0, 0.1, 0.9, 1], [0, 1, 1, 0.5]);

  return (
    <section ref={sectionRef} id="work" className="relative py-32 md:py-48 px-6 md:px-10">
      <div className="max-w-[1600px] mx-auto">
        {/* Section header */}
        <motion.div style={{ opacity: headerOpacity }} className="mb-20 md:mb-32">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-px bg-accent" />
            <span className="font-mono text-xs tracking-[0.3em] text-accent uppercase">
              Selected Work
            </span>
          </div>
          <h2 className="font-display text-5xl md:text-7xl font-bold tracking-tight text-ink-50 leading-tight">
            Projects that
            <br />
            <span className="gradient-accent">deliver results.</span>
          </h2>
        </motion.div>

        {/* Project showcases */}
        <div className="space-y-32 md:space-y-48">
          {projects.map((project, index) => (
            <div key={project.number}>
              <BrowserFrame project={project} index={index} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
