import { motion } from 'framer-motion';
import Image from 'next/image';
import type { Media } from '@/payload-types';

interface TestimonialItem {
  id?: string | null;
  name?: string | null;
  testimonial?: string | null;
  rating?: number | null;
  image?: number | string | Media | null;
}

interface TestimonialsBlockProps {
  id?: string | null;
  blockType: 'testimonials';
  items?: TestimonialItem[] | null;
}

export function TestimonialsBlock({ items }: TestimonialsBlockProps) {
  if (!items || items.length === 0) return null;

  return (
    <section className="py-24 bg-slate-950 relative overflow-hidden">
      {/* Luz de fundo sutil */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">
            Sorrisos que contam <span className="text-amber-500">Nossa História</span>
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto text-lg font-light">
            A satisfação de quem já transformou a própria vida com a IPRO-Saúde.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {items.map((item, index) => {
             const imageUrl = typeof item.image === 'object' && item.image?.url ? item.image.url : null;
             
             return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group h-full"
              >
                <div className="bg-slate-900/50 backdrop-blur-sm rounded-3xl p-8 border border-slate-800 hover:border-amber-500/50 transition-all duration-300 h-full flex flex-col shadow-lg hover:shadow-amber-500/10">
                  {/* Estrelas */}
                  {item.rating && (
                    <div className="flex text-amber-500 mb-6">
                      {[...Array(5)].map((_, i) => (
                        <svg key={i} className={`w-5 h-5 ${i < (item.rating || 0) ? 'fill-current' : 'fill-slate-800'}`} viewBox="0 0 24 24">
                          <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                        </svg>
                      ))}
                    </div>
                  )}

                  <p className="text-slate-300 mb-8 italic flex-grow leading-relaxed font-light">
                    "{item.testimonial}"
                  </p>

                  <div className="flex items-center space-x-4 mt-auto">
                    {imageUrl ? (
                      <div className="w-14 h-14 rounded-full overflow-hidden relative border-2 border-slate-700 group-hover:border-amber-500 transition-colors">
                        <Image src={imageUrl} alt={item.name || ''} fill className="object-cover" />
                      </div>
                    ) : (
                      <div className="w-14 h-14 rounded-full bg-slate-800 flex items-center justify-center border-2 border-slate-700 text-amber-500 font-bold text-xl">
                        {item.name?.charAt(0)}
                      </div>
                    )}
                    <div>
                      <h4 className="font-bold text-white tracking-wide">{item.name}</h4>
                      <p className="text-xs text-amber-500 font-medium uppercase tracking-wider mt-1">Paciente IPRO</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
