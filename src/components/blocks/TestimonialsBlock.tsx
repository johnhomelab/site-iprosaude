'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { cn } from '../../lib/utils';
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
    <section className="py-20 bg-gray-900">
      <div className="max-w-6xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold text-white mb-4">
            Depoimentos de <span className="text-yellow-500">Pacientes</span>
          </h2>
          <p className="text-white/60 max-w-2xl mx-auto">
            Confiança e satisfação em cada sorriso transformado
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {items.map((item, index) => {
             const imageUrl = typeof item.image === 'object' && item.image?.url ? item.image.url : null;
             const imageAlt = typeof item.image === 'object' && item.image?.alt ? item.image.alt : item.name || '';

             return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group"
              >
                <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10 hover:border-yellow-500/30 transition-all">
                  {/* Rating */}
                  {item.rating && (
                    <div className="flex text-yellow-500 mb-4">
                      {[...Array(5)].map((_, i) => (
                        <svg
                          key={i}
                          className={i < (item.rating || 0) ? 'fill-current' : 'fill-gray-600'}
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                        >
                          <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                        </svg>
                      ))}
                    </div>
                  )}

                  {/* Testimonial */}
                  <p className="text-white/90 mb-6 italic">
                    "{item.testimonial}"
                  </p>

                  {/* Author */}
                  <div className="flex items-center space-x-4">
                    {imageUrl && (
                      <div className="w-12 h-12 rounded-full overflow-hidden relative">
                        <Image
                          src={imageUrl}
                          alt={imageAlt}
                          fill
                          className="object-cover"
                        />
                      </div>
                    )}
                    <div>
                      <h4 className="font-bold text-white">{item.name}</h4>
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
