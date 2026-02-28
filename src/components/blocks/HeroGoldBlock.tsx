'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { cn } from '../../lib/utils'; // Remova ou mantenha dependendo se você usa essa função
import { Media } from '@/payload-types';

// 1. Atualizamos a interface para receber o Grupo "botao" exato que criamos no Payload
interface HeroGoldBlockProps {
  id?: string | null;
  blockType: 'hero-gold';
  title: string;
  subtitle?: string | null;
  botao?: {
    texto: string;
    url: string;
    cor: 'verde' | 'dourado' | 'vermelho';
  } | null;
  image?: number | string | Media | null;
}

export function HeroGoldBlock({ title, subtitle, botao, image }: HeroGoldBlockProps) {
  // Helper para buscar a URL da imagem com segurança
  const imageUrl = typeof image === 'object' && image?.url ? image.url : null;
  const imageAlt = typeof image === 'object' && image?.alt ? image.alt : '';

  // 2. Lógica para mudar a cor do botão baseado na escolha lá no painel (Plantão vs Agendamento)
  const getButtonStyles = (cor?: string) => {
    switch (cor) {
      case 'verde':
        return 'bg-green-600 hover:bg-green-500 text-white shadow-green-600/50';
      case 'vermelho':
        return 'bg-red-600 hover:bg-red-500 text-white shadow-red-600/50 text-xl animate-pulse'; // Destaque extra para plantão 24h
      case 'dourado':
      default:
        return 'bg-yellow-500 hover:bg-yellow-400 text-black shadow-yellow-500/50';
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black">
      {/* Imagem de fundo com overlay escuro/dourado para dar contraste */}
      {imageUrl && (
        <div className="absolute inset-0">
          <Image
            src={imageUrl}
            alt={imageAlt || 'IPRO-Saúde'}
            fill
            className="object-cover opacity-60" // Reduzi a opacidade para a foto não brigar com o texto
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-yellow-500/10" />
        </div>
      )}

      <div className="relative z-10 max-w-6xl mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-6"
        >
          {/* Título Principal */}
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-5xl md:text-7xl font-bold text-white leading-tight"
          >
            {/* Mantive sua lógica original de deixar a primeira palavra dourada */}
            {title.split(' ').map((word, i) => (
              <span key={i} className={i === 0 ? 'text-yellow-500' : ''}>
                {word}{' '}
              </span>
            ))}
          </motion.h1>

          {/* Subtítulo focado na dor/desejo */}
          {subtitle && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto font-light"
            >
              {subtitle}
            </motion.p>
          )}

          {/* Botão de Conversão Inteligente */}
          {botao?.texto && botao?.url && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="pt-4"
            >
              <a
                href={botao.url}
                className={`inline-block px-8 py-4 font-bold rounded-full transition-all shadow-lg hover:-translate-y-1 ${getButtonStyles(botao.cor)}`}
              >
                {botao.texto}
              </a>
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
