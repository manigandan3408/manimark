import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Service {
  number: string;
  title: string;
  description: string;
  detail: string;
  icon: string;
}

const services: Service[] = [
  {
    number: '01',
    title: 'BUSINESS WEBSITES',
    description: 'Professional websites for local businesses, services and brands.',
    detail:
      'Complete websites built to represent your business professionally. Every site is designed to convert visitors into customers with clear messaging, fast loading, and a design that reflects your brand.',
    icon: '◇',
  },
  {
    number: '02',
    title: 'BOOKING & ENQUIRY SYSTEMS',
    description: 'Appointment, booking, quotation and enquiry experiences.',
    detail:
      'Custom booking and enquiry systems that let customers schedule appointments, request quotes, or send enquiries directly through your website. Integrated with your workflow.',
    icon: '◈',
  },
  {
    number: '03',
    title: 'LANDING PAGES',
    description: 'Focused pages for products, services and campaigns.',
    detail:
      'High-conversion landing pages designed for specific products, services, or marketing campaigns. Built to drive action with compelling copy and strategic layout.',
    icon: '◆',
  },
  {
    number: '04',
    title: 'WEB APPS & DASHBOARDS',
    description: 'Custom interfaces for business workflows.',
    detail:
      'Tailored web applications and dashboards that streamline your business operations. From inventory management to customer portals, built to fit your exact workflow.',
    icon: '◉',
  },
  {
    number: '05',
    title: 'WEBSITE REDESIGN',
    description: 'Modern redesigns for outdated websites.',
    detail:
      'Transform your existing website into a modern, fast, and professional experience. We preserve your content and brand while elevating every visual and interaction.',
    icon: '◎',
  },
  {
    number: '06',
    title: 'WEBSITE MAINTENANCE',
    description: 'Updates, improvements, fixes and support.',
    detail:
      'Ongoing maintenance and support to keep your website secure, fast, and up to date. Content updates, feature additions, security patches, and technical support.',
    icon: '●',
  },
];

export default function Services() {
  const [active, setActive] = useState<number | null>(null);

  return (
    <section id="services" className="relative py-32 md:py-48 px-6 md:px-10">
      <div className="max-w-[1600px] mx-auto">
        {/* Section header */}
        <div className="mb-16 md:mb-24">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-px bg-accent" />
            <span className="font-mono text-xs tracking-[0.3em] text-accent uppercase">
              Services
            </span>
          </div>
          <h2 className="font-display text-5xl md:text-7xl font-bold tracking-tight text-ink-50 leading-tight">
            What we
            <br />
            <span className="gradient-accent">build for you.</span>
          </h2>
        </div>

        {/* Interactive vertical list */}
        <div className="border-t border-ink-700">
          {services.map((service, i) => (
            <div
              key={service.number}
              className="group relative border-b border-ink-700 cursor-pointer overflow-hidden"
              onMouseEnter={() => setActive(i)}
              onMouseLeave={() => setActive(null)}
            >
              {/* Hover gradient */}
              <div
                className={`absolute inset-0 transition-opacity duration-500 ${
                  active === i ? 'opacity-100' : 'opacity-0'
                }`}
                style={{
                  background: 'linear-gradient(90deg, rgba(196,168,111,0.04), transparent 70%)',
                }}
              />

              <div className="relative grid grid-cols-12 gap-4 md:gap-8 py-8 md:py-12 px-2 md:px-4 transition-all duration-500">
                {/* Number */}
                <div className="col-span-2 md:col-span-1">
                  <span
                    className={`font-mono text-sm transition-colors duration-300 ${
                      active === i ? 'text-accent' : 'text-ink-400'
                    }`}
                  >
                    {service.number}
                  </span>
                </div>

                {/* Title + description */}
                <div className="col-span-10 md:col-span-6">
                  <h3
                    className={`font-display text-2xl md:text-4xl font-medium tracking-tight transition-all duration-500 ${
                      active === i
                        ? 'text-ink-50 translate-x-2'
                        : 'text-ink-100'
                    }`}
                  >
                    {service.title}
                  </h3>
                  <p className="mt-3 text-ink-200 text-sm md:text-base max-w-lg leading-relaxed">
                    {service.description}
                  </p>
                </div>

                {/* Icon */}
                <div className="hidden md:flex col-span-2 items-start justify-end">
                  <span
                    className={`text-3xl transition-all duration-500 ${
                      active === i
                        ? 'text-accent scale-110 rotate-12'
                        : 'text-ink-500'
                    }`}
                  >
                    {service.icon}
                  </span>
                </div>

                {/* Detail — appears on hover */}
                <div className="col-span-12 md:col-span-3">
                  <AnimatePresence>
                    {active === i && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ duration: 0.3 }}
                        className="text-ink-200 text-sm leading-relaxed md:border-l md:border-ink-600 md:pl-4"
                      >
                        {service.detail}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
