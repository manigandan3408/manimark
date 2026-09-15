import { motion } from 'framer-motion';

export default function About() {
  return (
    <section id="about" className="relative py-32 md:py-48 px-6 md:px-10">
      <div className="max-w-[1600px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-16">
          {/* Left — label */}
          <div className="md:col-span-3">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-px bg-accent" />
              <span className="font-mono text-xs tracking-[0.3em] text-accent uppercase">
                About
              </span>
            </div>
          </div>

          {/* Right — content */}
          <div className="md:col-span-9">
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="font-display text-3xl md:text-5xl lg:text-6xl font-light tracking-tight text-ink-100 leading-[1.15] mb-12"
            >
              MANIMARK is an independent digital studio led by Manigandan, building
              <span className="gradient-accent font-medium"> serious digital products</span> for
              businesses — websites, booking systems, and web applications that work as hard as you do.
            </motion.h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <p className="text-ink-200 text-base md:text-lg leading-relaxed mb-6">
                  I focus on businesses that need a real online presence — not a template, not a
                  drag-and-drop builder, but a custom-built website that reflects the quality of
                  their work.
                </p>
                <p className="text-ink-200 text-base md:text-lg leading-relaxed">
                  Every project is built from scratch. Every line of code serves a purpose. Every
                  design decision is made with your customer in mind.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="space-y-6"
              >
                <div className="border-l border-ink-600 pl-6">
                  <p className="font-mono text-xs text-accent tracking-widest mb-2">FOCUS</p>
                  <p className="text-ink-100 text-base leading-relaxed">
                    Local businesses, service providers, and brands that need a professional
                    digital presence.
                  </p>
                </div>
                <div className="border-l border-ink-600 pl-6">
                  <p className="font-mono text-xs text-accent tracking-widest mb-2">APPROACH</p>
                  <p className="text-ink-100 text-base leading-relaxed">
                    Custom-built, performance-first, and designed to convert visitors into
                    customers.
                  </p>
                </div>
                <div className="border-l border-ink-600 pl-6">
                  <p className="font-mono text-xs text-accent tracking-widest mb-2">STANDARD</p>
                  <p className="text-ink-100 text-base leading-relaxed">
                    Every project held to the same quality bar — regardless of size or budget.
                  </p>
                </div>
              </motion.div>
            </div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 mt-16 pt-12 border-t border-ink-700"
            >
              {[
                { value: '1', label: 'Live Project' },
                { value: '12', label: 'Demo Concepts' },
                { value: '6', label: 'Service Lines' },
                { value: '100%', label: 'Custom Built' },
              ].map((stat) => (
                <div key={stat.label}>
                  <p className="font-display text-4xl md:text-5xl font-bold gradient-accent mb-2">
                    {stat.value}
                  </p>
                  <p className="font-mono text-xs text-ink-300 tracking-widest uppercase">
                    {stat.label}
                  </p>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
