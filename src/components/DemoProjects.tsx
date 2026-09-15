import { useState } from 'react';
import { motion } from 'framer-motion';

interface DemoCategory {
  number: string;
  name: string;
  description: string;
  color: string;
}

const categories: DemoCategory[] = [
  { number: '01', name: 'Restaurant', description: 'Menu, reservations, gallery', color: '#c4a86f' },
  { number: '02', name: 'Salon & Beauty', description: 'Services, stylists, booking', color: '#e0c896' },
  { number: '03', name: 'Car & Bike Rental', description: 'Fleet, booking, pricing', color: '#6b7a8f' },
  { number: '04', name: 'Travel Agency', description: 'Destinations, itineraries', color: '#8a9aaf' },
  { number: '05', name: 'Tuition Centre', description: 'Courses, faculty, enrollment', color: '#9a7f4a' },
  { number: '06', name: 'Clinic', description: 'Appointments, doctors, services', color: '#c4a86f' },
  { number: '07', name: 'Real Estate', description: 'Listings, search, enquiries', color: '#6b7a8f' },
  { number: '08', name: 'Interior Design', description: 'Portfolio, services, quotes', color: '#e0c896' },
  { number: '09', name: 'Small Manufacturer', description: 'Catalogue, capabilities, quotes', color: '#9a7f4a' },
  { number: '10', name: 'Wedding & Events', description: 'Packages, gallery, enquiries', color: '#c4a86f' },
  { number: '11', name: 'Driving School', description: 'Courses, schedules, enrollment', color: '#8a9aaf' },
  { number: '12', name: 'Repair & Service', description: 'Services, booking, support', color: '#6b7a8f' },
];

export default function DemoProjects() {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <section className="relative py-32 md:py-48 px-6 md:px-10">
      <div className="max-w-[1600px] mx-auto">
        {/* Section header */}
        <div className="mb-16 md:mb-24">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-px bg-accent" />
            <span className="font-mono text-xs tracking-[0.3em] text-accent uppercase">
              Business Categories
            </span>
          </div>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <h2 className="font-display text-5xl md:text-7xl font-bold tracking-tight text-ink-50 leading-tight">
              Every industry,
              <br />
              <span className="text-ink-300 font-light">one standard.</span>
            </h2>
            <p className="text-ink-200 max-w-md text-base md:text-lg leading-relaxed">
              Twelve industry-specific demo concepts. Each one a visual demonstration of what
              MANIMARK can build for your business.
            </p>
          </div>
        </div>

        {/* Large interactive category list */}
        <div className="border-t border-ink-700">
          {categories.map((cat, i) => (
            <div
              key={cat.number}
              className="group relative border-b border-ink-700 cursor-pointer overflow-hidden"
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
            >
              {/* Hover background glow */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                  background: `radial-gradient(ellipse at 80% 50%, ${cat.color}15, transparent 60%)`,
                }}
              />

              <div className="relative flex items-center justify-between py-6 md:py-8 px-2 md:px-4 transition-transform duration-500 group-hover:translate-x-4">
                <div className="flex items-baseline gap-6 md:gap-10">
                  <span className="font-mono text-sm text-ink-400 group-hover:text-accent transition-colors duration-300">
                    {cat.number}
                  </span>
                  <h3 className="font-display text-2xl md:text-4xl font-medium text-ink-100 group-hover:text-ink-50 transition-colors duration-300">
                    {cat.name}
                  </h3>
                </div>
                <div className="flex items-center gap-6 md:gap-10">
                  <span className="hidden md:block text-sm text-ink-300 font-light">
                    {cat.description}
                  </span>
                  <span className="font-mono text-[10px] tracking-[0.2em] text-ink-400 border border-ink-600 px-3 py-1.5 group-hover:border-accent/40 group-hover:text-accent transition-all duration-300">
                    DEMO CONCEPT
                  </span>
                </div>
              </div>

              {/* Expandable detail */}
              <motion.div
                initial={false}
                animate={{ height: hovered === i ? 'auto' : 0, opacity: hovered === i ? 1 : 0 }}
                transition={{ duration: 0.4, ease: 'easeInOut' }}
                className="overflow-hidden"
              >
                <div className="px-2 md:px-4 pb-8 pl-[3.5rem] md:pl-[5rem]">
                  <p className="text-ink-200 text-sm md:text-base max-w-2xl leading-relaxed">
                    A complete website concept designed specifically for {cat.name.toLowerCase()} businesses.
                    Includes industry-relevant layouts, booking or enquiry flows, and a design
                    language that speaks to your customers.
                  </p>
                </div>
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
