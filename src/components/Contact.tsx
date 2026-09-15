import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, ArrowUpRight, MessageCircle, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';

const requestTypes = [
  'Project Enquiry',
  'Website Problem',
  'Service Request',
  'Feedback',
  'Other',
];

type FormState = {
  name: string;
  email: string;
  phone: string;
  requestType: string;
  message: string;
};

type Status = 'idle' | 'submitting' | 'success' | 'error';

export default function Contact() {
  const [form, setForm] = useState<FormState>({
    name: '',
    email: '',
    phone: '',
    requestType: 'Project Enquiry',
    message: '',
  });
  const [status, setStatus] = useState<Status>('idle');
  const [statusMessage, setStatusMessage] = useState('');
  const [errors, setErrors] = useState<Partial<FormState>>({});

  const validate = (): boolean => {
    const e: Partial<FormState> = {};
    if (!form.name.trim()) e.name = 'Please enter your name';
    if (!form.email.trim()) e.email = 'Please enter your email';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Please enter a valid email';
    if (!form.message.trim()) e.message = 'Please enter a message';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setStatus('submitting');
    setStatusMessage('');

    try {
      const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
      const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
      const endpoint = `${supabaseUrl}/functions/v1/contact-email`;

      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${anonKey}`,
        },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          phone: form.phone || undefined,
          requestType: form.requestType,
          message: form.message,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data?.error || 'Submission failed');
      }

      setStatus('success');
      setStatusMessage(data.message || "Thanks — your message has been received. I'll get back to you soon.");
      setForm({ name: '', email: '', phone: '', requestType: 'Project Enquiry', message: '' });
    } catch (err) {
      setStatus('error');
      setStatusMessage(
        err instanceof Error
          ? err.message
          : 'Something went wrong. Please try again or call directly.'
      );
    }
  };

  const inputClass =
    'w-full bg-transparent border-b border-ink-600 py-3 text-ink-50 placeholder-ink-500 focus:border-accent focus:outline-none transition-colors';

  return (
    <section id="contact" className="relative py-32 md:py-48 px-6 md:px-10 overflow-hidden">
      {/* Ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[280px] h-[280px] md:w-[800px] md:h-[800px] rounded-full bg-accent/5 blur-2xl md:blur-[120px] pointer-events-none" />

      <div className="max-w-[1600px] mx-auto relative">
        {/* Section header */}
        <div className="mb-16 md:mb-24 text-center">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="w-12 h-px bg-accent" />
            <span className="font-mono text-xs tracking-[0.3em] text-accent uppercase">
              Contact
            </span>
            <div className="w-12 h-px bg-accent" />
          </div>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="font-display text-5xl md:text-8xl font-bold tracking-tight text-ink-50 leading-tight"
          >
            Let's build
            <br />
            <span className="gradient-accent">something serious.</span>
          </motion.h2>
        </div>

        {/* Contact grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 max-w-5xl mx-auto">
          {/* Left — contact info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <p className="text-ink-200 text-lg leading-relaxed">
              Have a project in mind? Tell me about your business and what you need. I'll get
              back to you with a plan.
            </p>

            <div className="space-y-5">
              <div className="flex items-center gap-4 text-ink-100">
                <div className="w-12 h-12 border border-ink-600 flex items-center justify-center">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <p className="font-mono text-xs text-ink-400 tracking-widest uppercase">Email</p>
                  <p className="text-base">manigandan3408@gmail.com</p>
                </div>
              </div>

              <a
                href="tel:9944321507"
                className="group flex items-center gap-4 text-ink-100 hover:text-accent transition-colors"
              >
                <div className="w-12 h-12 border border-ink-600 flex items-center justify-center group-hover:border-accent transition-colors">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <p className="font-mono text-xs text-ink-400 tracking-widest uppercase">Phone</p>
                  <p className="text-base">9944321507</p>
                </div>
              </a>

              <a
                href="https://wa.me/919944321507"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-4 text-ink-100 hover:text-accent transition-colors"
              >
                <div className="w-12 h-12 border border-ink-600 flex items-center justify-center group-hover:border-accent transition-colors">
                  <MessageCircle className="w-5 h-5" />
                </div>
                <div>
                  <p className="font-mono text-xs text-ink-400 tracking-widest uppercase">WhatsApp</p>
                  <p className="text-base">Chat on WhatsApp</p>
                </div>
              </a>

              <div className="flex items-center gap-4 text-ink-100">
                <div className="w-12 h-12 border border-ink-600 flex items-center justify-center">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <p className="font-mono text-xs text-ink-400 tracking-widest uppercase">Location</p>
                  <p className="text-base">India · Remote Worldwide</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right — contact form */}
          <motion.form
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-5"
            onSubmit={handleSubmit}
            noValidate
          >
            <div>
              <label className="font-mono text-xs text-ink-400 tracking-widest uppercase block mb-2">
                Your Name <span className="text-accent">*</span>
              </label>
              <input
                type="text"
                placeholder="Your name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className={inputClass}
              />
              {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name}</p>}
            </div>
            <div>
              <label className="font-mono text-xs text-ink-400 tracking-widest uppercase block mb-2">
                Email <span className="text-accent">*</span>
              </label>
              <input
                type="email"
                placeholder="you@business.com"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className={inputClass}
              />
              {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email}</p>}
            </div>
            <div>
              <label className="font-mono text-xs text-ink-400 tracking-widest uppercase block mb-2">
                Phone <span className="text-ink-500">(optional)</span>
              </label>
              <input
                type="tel"
                placeholder="Your phone number"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                className={inputClass}
              />
            </div>
            <div>
              <label className="font-mono text-xs text-ink-400 tracking-widest uppercase block mb-2">
                Request Type <span className="text-accent">*</span>
              </label>
              <select
                value={form.requestType}
                onChange={(e) => setForm({ ...form, requestType: e.target.value })}
                className="w-full bg-transparent border-b border-ink-600 py-3 text-ink-50 focus:border-accent focus:outline-none transition-colors appearance-none cursor-pointer"
              >
                {requestTypes.map((type) => (
                  <option key={type} value={type} className="bg-ink-900 text-ink-50">
                    {type}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="font-mono text-xs text-ink-400 tracking-widest uppercase block mb-2">
                Message <span className="text-accent">*</span>
              </label>
              <textarea
                rows={4}
                placeholder="Tell me about your project, problem, or enquiry..."
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                className={`${inputClass} resize-none`}
              />
              {errors.message && <p className="text-red-400 text-xs mt-1">{errors.message}</p>}
            </div>

            {/* Status messages */}
            {status === 'success' && (
              <div className="flex items-start gap-3 p-4 border border-green-600/40 bg-green-900/10 text-green-400 text-sm">
                <CheckCircle2 className="w-5 h-5 flex-shrink-0 mt-0.5" />
                <p>{statusMessage}</p>
              </div>
            )}
            {status === 'error' && (
              <div className="flex items-start gap-3 p-4 border border-red-600/40 bg-red-900/10 text-red-400 text-sm">
                <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                <p>{statusMessage}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={status === 'submitting'}
              className="group w-full flex items-center justify-center gap-3 py-4 bg-ink-50 text-ink-950 font-medium text-sm tracking-wide hover:bg-accent transition-all duration-400 mt-8 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {status === 'submitting' ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  SENDING...
                </>
              ) : (
                <>
                  SEND MESSAGE
                  <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </>
              )}
            </button>
          </motion.form>
        </div>
      </div>
    </section>
  );
}
