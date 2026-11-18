import { motion } from 'motion/react';
import { ArrowRight, MessageCircle } from 'lucide-react';
import { ImageWithFallback } from './ImageWithFallback';
import heroInteriorImg from '../assets/images/hero_modern_interior_1795018379882.jpg';

interface HeroProps {
  onRequestQuote: () => void;
}

export function Hero({ onRequestQuote }: HeroProps) {
  return (
    <section
      id="home"
      className="bg-white border-b border-[#10264B]/8 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-stretch">
          {/* Left Column: Brand Proposition */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6 flex flex-col justify-center py-2 lg:py-6"
          >
            <p className="text-xs sm:text-sm font-semibold tracking-[0.14em] uppercase text-[#1746A2] mb-4">
              Professional Painting <span aria-hidden="true">·</span> Decorating <span aria-hidden="true">·</span> Flooring
            </p>

            <h1
              className="font-display font-bold text-[#10264B] tracking-tight leading-[1.08] mb-6"
              style={{
                fontSize: 'clamp(2.25rem, 4.2vw, 3.75rem)',
                textWrap: 'balance',
              }}
            >
              Transform Your Space.{' '}
              <span className="block sm:inline">
                Love Where You{' '}
                <span className="text-[#1746A2]">Live.</span>
              </span>
            </h1>

            <p className="text-base sm:text-lg text-[#252D3A] leading-relaxed max-w-xl mb-8">
              From refreshing your interiors with beautiful finishes to transforming your flooring,{' '}
              <strong className="font-semibold text-[#10264B]">
                S.A.W Painting, Decorating &amp; Flooring
              </strong>{' '}
              delivers reliable service and quality workmanship.
            </p>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 mb-10">
              <button
                type="button"
                onClick={onRequestQuote}
                className="inline-flex items-center justify-center gap-2.5 px-7 py-3.5 text-xs font-semibold tracking-wider uppercase text-white bg-[#1746A2] hover:bg-[#2878E5] active:scale-[0.99] rounded-sm transition-all duration-200 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#10264B]"
              >
                <span>GET A FREE QUOTE</span>
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </button>

              <a
                href="https://wa.me/447725746013"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2.5 px-7 py-3.5 text-xs font-semibold tracking-wider uppercase text-[#10264B] bg-[#F3F6FA] hover:bg-[#E4ECF7] border border-[#10264B]/15 rounded-sm transition-colors duration-200 whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1746A2]"
              >
                <MessageCircle className="w-4 h-4 text-[#1746A2]" aria-hidden="true" />
                <span>WHATSAPP US</span>
              </a>
            </div>

            <div className="pt-6 border-t border-[#10264B]/10 space-y-1.5">
              <p className="text-sm font-semibold text-[#10264B] tracking-tight">
                Reliable Service. Quality Work. Professional Finishes.
              </p>
              <p className="text-sm text-[#252D3A]/80">
                &ldquo;For all your decorating needs, reliable and quality work guaranteed.&rdquo;
              </p>
            </div>
          </motion.div>

          {/* Right Column: Hero Interior Photography */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1], delay: 0.08 }}
            className="lg:col-span-6 relative"
          >
            <div className="relative h-full min-h-[300px] sm:min-h-[400px] lg:min-h-[520px] rounded-sm overflow-hidden bg-[#F3F6FA] border border-[#10264B]/10">
              <ImageWithFallback
                src={heroInteriorImg}
                alt="Freshly painted modern British living room with neutral walls, oak herringbone flooring, and crisp interior finishes by S.A.W"
                loading="eager"
                className="w-full h-full lg:h-full object-cover"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
