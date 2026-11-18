import { motion } from 'motion/react';
import { Clock, ShieldCheck, Ruler } from 'lucide-react';
import { ImageWithFallback } from './ImageWithFallback';
import aboutInteriorImg from '../assets/images/about_finished_interior_1795018382233.jpg';

const BENEFITS = [
  {
    title: 'Reliable Service',
    description:
      'Dependable scheduling, clear communication, and respect for your home from start to finish.',
    icon: Clock,
  },
  {
    title: 'Quality Workmanship',
    description:
      'Thorough surface preparation and considered execution designed to stand the test of time.',
    icon: ShieldCheck,
  },
  {
    title: 'Attention To Detail',
    description:
      'Clean lines, smooth finishes, and carefully fitted flooring in every room.',
    icon: Ruler,
  },
];

export function About() {
  return (
    <section
      id="about"
      className="bg-white py-16 sm:py-20 lg:py-24 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-stretch">
          {/* Left Side: Finished Interior Photograph */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6"
          >
            <div className="relative h-full min-h-[300px] sm:min-h-[400px] lg:min-h-[500px] rounded-sm overflow-hidden bg-[#F3F6FA] border border-[#10264B]/10">
              <ImageWithFallback
                src={aboutInteriorImg}
                alt="Completed British home open-plan living and dining space with freshly painted walls and oak wood flooring"
                className="w-full h-full lg:h-full object-cover"
              />
            </div>
          </motion.div>

          {/* Right Side: About & Why Choose Us */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1], delay: 0.06 }}
            className="lg:col-span-6 flex flex-col justify-center"
          >
            <p className="text-xs sm:text-sm font-semibold tracking-[0.14em] uppercase text-[#1746A2] mb-3">
              About S.A.W
            </p>

            <h2
              className="font-display font-bold text-[#10264B] tracking-tight leading-[1.15] mb-5"
              style={{
                fontSize: 'clamp(1.75rem, 3vw, 2.5rem)',
                textWrap: 'balance',
              }}
            >
              Reliable Work.{' '}
              <span className="text-[#1746A2]">Quality You Can Trust.</span>
            </h2>

            <p className="text-base text-[#252D3A] leading-relaxed mb-8">
              At S.A.W Painting, Decorating &amp; Flooring, the focus is on providing reliable service and quality workmanship for your home improvement needs. Whether you&apos;re refreshing your walls, updating your interiors or improving your flooring, get in touch to discuss your project.
            </p>

            <div className="divide-y divide-[#10264B]/10 border-t border-b border-[#10264B]/10">
              {BENEFITS.map((benefit) => {
                const Icon = benefit.icon;
                return (
                  <div
                    key={benefit.title}
                    className="py-5 flex items-start gap-4"
                  >
                    <div className="w-10 h-10 rounded-sm bg-[#F3F6FA] text-[#1746A2] flex items-center justify-center shrink-0 mt-0.5">
                      <Icon className="w-5 h-5" aria-hidden="true" />
                    </div>
                    <div>
                      <h3 className="font-display font-semibold text-base text-[#10264B] mb-1">
                        {benefit.title}
                      </h3>
                      <p className="text-sm text-[#252D3A]/90 leading-relaxed">
                        {benefit.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
