import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface NavbarProps {
  onRequestQuote: () => void;
}

const NAV_LINKS = [
  { label: 'Home', href: '#home' },
  { label: 'Services', href: '#services' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' },
];

export function Navbar({ onRequestQuote }: NavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 16);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLinkClick = () => {
    setMobileOpen(false);
  };

  const handleQuoteClick = () => {
    setMobileOpen(false);
    onRequestQuote();
  };

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-colors duration-200 border-b ${
        scrolled
          ? 'bg-white/95 backdrop-blur-md border-[#10264B]/10 shadow-xs'
          : 'bg-white border-[#10264B]/8'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-[72px] flex items-center justify-between gap-4 sm:gap-8">
        {/* Zone 1: Brand Wordmark */}
        <a
          href="#home"
          className="flex items-center gap-3 shrink-0 group focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#1746A2] rounded-sm"
          aria-label="S.A.W Painting, Decorating and Flooring Home"
        >
          <span
            aria-hidden="true"
            className="w-9 h-9 bg-[#10264B] text-white flex items-center justify-center rounded-sm border border-[#1746A2] font-bold text-xs tracking-tight shrink-0 transition-colors duration-200 group-hover:bg-[#1746A2]"
          >
            S.A.W
          </span>
          <span className="flex flex-col leading-none">
            <span className="font-display font-extrabold text-base sm:text-lg tracking-tight text-[#10264B] whitespace-nowrap">
              S.A.W
            </span>
            <span className="font-display font-semibold text-[10px] sm:text-[11px] tracking-[0.12em] uppercase text-[#1746A2] whitespace-nowrap mt-0.5">
              Painting, Decorating &amp; Flooring
            </span>
          </span>
        </a>

        {/* Zone 2: Navigation Links */}
        <nav aria-label="Primary Navigation" className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="relative py-1 text-sm font-medium text-[#252D3A] hover:text-[#1746A2] transition-colors duration-200 whitespace-nowrap shrink-0 after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-full after:h-[2px] after:bg-[#1746A2] after:scale-x-0 hover:after:scale-x-100 after:origin-left after:transition-transform after:duration-200 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#1746A2] rounded-xs"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Zone 3: Primary Action & Mobile Toggle */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={handleQuoteClick}
            className="hidden sm:inline-flex items-center justify-center px-5 py-2.5 text-xs font-semibold tracking-wider uppercase text-white bg-[#1746A2] hover:bg-[#2878E5] active:scale-[0.99] rounded-sm transition-all duration-200 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#10264B]"
          >
            GET A FREE QUOTE
          </button>

          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-expanded={mobileOpen}
            aria-controls="mobile-navigation"
            aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
            className="md:hidden inline-flex items-center justify-center w-11 h-11 rounded-sm text-[#10264B] hover:bg-[#F3F6FA] transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-[#1746A2]"
          >
            {mobileOpen ? <X className="w-6 h-6" aria-hidden="true" /> : <Menu className="w-6 h-6" aria-hidden="true" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.nav
            id="mobile-navigation"
            aria-label="Mobile Navigation"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
            className="md:hidden bg-white border-t border-[#10264B]/10 shadow-lg"
          >
            <div className="px-4 py-4 space-y-1">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={handleLinkClick}
                  className="block px-3 py-3 text-base font-medium text-[#10264B] hover:bg-[#F3F6FA] hover:text-[#1746A2] rounded-sm transition-colors"
                >
                  {link.label}
                </a>
              ))}
              <div className="pt-3 border-t border-[#10264B]/10">
                <button
                  type="button"
                  onClick={handleQuoteClick}
                  className="w-full flex items-center justify-center px-5 py-3 text-xs font-semibold tracking-wider uppercase text-white bg-[#1746A2] hover:bg-[#2878E5] rounded-sm transition-colors cursor-pointer"
                >
                  GET A FREE QUOTE
                </button>
              </div>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
