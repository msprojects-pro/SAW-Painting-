import { motion } from 'motion/react';
import { Paintbrush, Layers, Grid2x2, ArrowUpRight } from 'lucide-react';
import { ImageWithFallback } from './ImageWithFallback';
import servicePaintingImg from '../assets/images/service_painting_1795018380543.jpg';
import serviceDecoratingImg from '../assets/images/service_decorating_1795018381454.jpg';
import serviceFlooringImg from '../assets/images/service_flooring_1795018381896.jpg';

export type ServiceOption = 'Painting' | 'Decorating' | 'Flooring' | 'Multiple Services';

interface ServicesProps {
  onSelectService: (service: ServiceOption) => void;
}

interface ServiceItem {
  number: string;
  title: ServiceOption;
  description: string;
  image: string;
  alt: string;
  icon: typeof Paintbrush;
}

const SERVICES: ServiceItem[] = [
  {
    number: '01',
    title: 'Painting',
    description:
      'Give your home a fresh new look with professional painting and quality finishes.',
    image: servicePaintingImg,
    alt: 'Freshly painted neutral residential bedroom and hallway with crisp white woodwork and satin finish doors',
    icon: Paintbrush,
  },
  {
    number: '02',
    title: 'Decorating',
    description:
      'Transform your living spaces with carefully considered decorating and attention to detail.',
    image: serviceDecoratingImg,
    alt: 'Decorated British sitting room featuring bespoke panelling, textured wallcoverings, and refined ceiling cornice',
    icon: Layers,
  },
  {
    number: '03',
    title: 'Flooring',
    description:
      'Enhance your home with beautiful flooring that complements your interior.',
    image: serviceFlooringImg,
    alt: 'Modern European oak herringbone parquet and wide-plank timber flooring seamlessly fitted alongside clean white skirting boards',
    icon: Grid2x2,
  },
];

export function Services({ onSelectService }: ServicesProps) {
  return (
    <section
      id="services"
      className="bg-[#F3F6FA] py-16 sm:py-20 lg:py-24 border-b border-[#10264B]/8"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-2xl mb-12 lg:mb-14"
        >
          <p className="text-xs sm:text-sm font-semibold tracking-[0.14em] uppercase text-[#1746A2] mb-3">
            What We Do
          </p>
          <h2
            className="font-display font-bold text-[#10264B] tracking-tight leading-[1.15] mb-4"
            style={{
              fontSize: 'clamp(1.75rem, 3vw, 2.5rem)',
              textWrap: 'balance',
            }}
          >
            Everything Your Home Needs.
          </h2>
          <p className="text-base text-[#252D3A] leading-relaxed">
            Professional home improvement services with attention to detail and quality finishes.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {SERVICES.map((service, index) => {
            const Icon = service.icon;
            return (
              <motion.article
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{
                  duration: 0.45,
                  delay: index * 0.08,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="group bg-white border border-[#10264B]/10 rounded-sm overflow-hidden flex flex-col transition-all duration-200 hover:-translate-y-1 hover:border-[#1746A2]/40 hover:shadow-md"
              >
                <div className="aspect-[4/3] w-full overflow-hidden bg-[#E8EFF8]">
                  <ImageWithFallback
                    src={service.image}
                    alt={service.alt}
                    className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]"
                  />
                </div>

                <div className="p-6 sm:p-7 flex flex-col flex-1 justify-between">
                  <div>
                    <div className="flex items-center justify-between gap-4 mb-4">
                      <span className="font-display text-xs font-semibold tracking-[0.12em] text-[#1746A2] tabular-nums">
                        {service.number}
                      </span>
                      <span className="w-9 h-9 rounded-sm bg-[#F3F6FA] text-[#1746A2] flex items-center justify-center transition-colors duration-200 group-hover:bg-[#1746A2] group-hover:text-white">
                        <Icon className="w-4 h-4" aria-hidden="true" />
                      </span>
                    </div>

                    <h3 className="font-display font-bold text-xl text-[#10264B] mb-2.5">
                      {service.title}
                    </h3>

                    <p className="text-sm sm:text-[15px] text-[#252D3A] leading-relaxed mb-6">
                      {service.description}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-[#10264B]/8">
                    <button
                      type="button"
                      onClick={() => onSelectService(service.title)}
                      className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#1746A2] hover:text-[#2878E5] transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1746A2] rounded-xs"
                    >
                      <span>Enquire about {service.title}</span>
                      <ArrowUpRight
                        className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                        aria-hidden="true"
                      />
                    </button>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
