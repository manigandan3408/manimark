import { motion } from 'framer-motion';

const steps = [
  {
    number: '01',
    title: 'DISCOVERY',
    description: 'We learn about your business, your customers, and what you need from your website. No templates — every project starts with understanding.',
  },
  {
    number: '02',
    title: 'DESIGN',
    description: 'We craft a visual identity and user experience tailored to your industry. You see the design before a single line of code is written.',
  },
  {
    number: '03',
    title: 'DEVELOPMENT',
    description: 'We build with modern, fast, and reliable technology. Clean code that loads quickly, works on every device, and is easy to maintain.',
  },
  {
    number: '04',
    title: 'LAUNCH & SUPPORT',
    description: 'We deploy your website, connect your domain, and provide ongoing support. Your site stays fast, secure, and up to date.',
  },
];

export default function Process() {
  return (
    <section id="process" className="relative py-32 md:py-48 px-6 md:px-10">
      <div className="max-w-[1600px] mx-auto">
        {/* Section header */}
        <div className="mb-16 md:mb-24">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-px bg-accent" />
            <span className="font-mono text-xs tracking-[0.3em] text-accent uppercase">
              Process
            </span>
          </div>
          <h2 className="font-display text-5xl md:text-7xl font-bold tracking-tight text-ink-50 leading-tight">
            How we
            <br />
            <span className="text-ink-300 font-light">work together.</span>
          </h2>
        </div>

        {/* Process steps — cinematic horizontal flow */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-px bg-ink-700">
          {steps.map((step, i) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              className="group relative bg-ink-950 p-8 md:p-10 hover:bg-ink-900 transition-colors duration-500"
            >
              {/* Number watermark */}
              <span className="absolute top-6 right-6 font-display text-6xl font-bold text-ink-700 group-hover:text-ink-600 transition-colors duration-500">
                {step.number}
              </span>

              <div className="relative">
                {/* Accent line */}
                <div className="w-8 h-px bg-accent mb-6 group-hover:w-16 transition-all duration-500" />

                <h3 className="font-display text-xl md:text-2xl font-semibold text-ink-50 mb-4 tracking-wide">
                  {step.title}
                </h3>
                <p className="text-ink-200 text-sm leading-relaxed">
                  {step.description}
                </p>
              </div>

              {/* Connector arrow */}
              {i < steps.length - 1 && (
                <div className="hidden md:block absolute top-1/2 -right-3 z-10 w-6 h-6 bg-ink-950 flex items-center justify-center">
                  <span className="text-accent text-sm">→</span>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
