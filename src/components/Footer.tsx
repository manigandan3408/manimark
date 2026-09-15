export default function Footer() {
  return (
    <footer className="relative py-16 px-6 md:px-10 border-t border-ink-800">
      <div className="max-w-[1600px] mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-6 h-6 relative">
              <div className="absolute inset-0 border border-ink-400 rotate-45" />
              <div className="absolute inset-1.5 bg-accent/80 rotate-45" />
            </div>
            <span className="font-display text-sm font-semibold tracking-[0.2em] text-ink-200">
              MANIMARK
            </span>
          </div>

          {/* Links */}
          <div className="flex items-center gap-6 text-sm text-ink-300">
            <a href="#work" className="hover:text-accent transition-colors">Work</a>
            <a href="#services" className="hover:text-accent transition-colors">Services</a>
            <a href="#process" className="hover:text-accent transition-colors">Process</a>
            <a href="#about" className="hover:text-accent transition-colors">About</a>
            <a href="#contact" className="hover:text-accent transition-colors">Contact</a>
          </div>

          {/* Copyright */}
          <p className="font-mono text-xs text-ink-400 tracking-widest">
            © {new Date().getFullYear()} MANIMARK · ALL RIGHTS RESERVED
          </p>
        </div>
      </div>
    </footer>
  );
}
