'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { cn } from '../../lib/utils';
import { Media } from '@/payload-types';

interface HeroGoldBlockProps {
  id?: string | null;
  blockType: 'hero-gold';
  title: string;
  subtitle?: string | null;
  ctaText?: string | null;
  ctaLink?: string | null;
  image?: number | string | Media | null;
}

export function HeroGoldBlock({ title, subtitle, ctaText, ctaLink, image }: HeroGoldBlockProps) {
  // Helper to get image URL safely
  const imageUrl = typeof image === 'object' && image?.url ? image.url : null;
  const imageAlt = typeof image === 'object' && image?.alt ? image.alt : '';

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black">
      {/* Imagem de fundo com overlay dourado */}
      {imageUrl && (
        <div className="absolute inset-0">
          <Image
            src={imageUrl}
            alt={imageAlt || ''}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-yellow-500/20" />
        </div>
      )}

      <div className="relative z-10 max-w-6xl mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-6"
        >
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-5xl md:text-7xl font-bold text-white leading-tight"
          >
            {title.split(' ').map((word, i) => (
              <span key={i} className={i === 0 ? 'text-yellow-500' : ''}>
                {word}{' '}
              </span>
            ))}
          </motion.h1>

          {subtitle && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto"
            >
              {subtitle}
            </motion.p>
          )}

          {ctaText && ctaLink && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
            >
              <a
                href={ctaLink}
                className="inline-block px-8 py-4 bg-yellow-500 hover:bg-yellow-400 text-black font-bold rounded-full text-lg transition-all shadow-lg hover:shadow-yellow-500/50"
              >
                {ctaText}
              </a>
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
