import React from 'react';
import { HeroBlock } from './blocks/HeroBlock';
import { HeroGoldBlock } from './blocks/HeroGoldBlock';
import { ContentBlock } from './blocks/ContentBlock';
import { FeaturesBlock } from './blocks/FeaturesBlock';
import { TestimonialsBlock } from './blocks/TestimonialsBlock';
import { FormBlock } from './blocks/FormBlock';
import { TreatmentListBlock } from './blocks/TreatmentListBlock';
import { BeforeAfterBlock } from './blocks/BeforeAfterBlock';
import { CallToActionBlock } from './blocks/CallToActionBlock'; // Importamos o componente limpo
import { AuthorityBlock } from './blocks/AuthorityBlock'; // Novo Bloco
import { FaqBlock } from './blocks/FaqBlock'; // Novo Bloco
import { LocationBlock } from './blocks/LocationBlock'; // Novo Bloco

import type { LandingPage } from '@/payload-types';

type Props = {
  layout: LandingPage['layout'];
};

export const RenderBlocks: React.FC<Props> = ({ layout }) => {
  if (!layout || !Array.isArray(layout) || layout.length === 0) {
    return null;
  }

  return (
    <div className="blocks-container">
      {layout.map((block, index) => {
        const { blockType } = block;

        const key = (block as any).id || index;

        switch (blockType) {
          case 'hero':
            return <HeroBlock key={key} {...block} />;
          case 'hero-gold':
            return <HeroGoldBlock key={key} {...block} />;
          case 'content':
            return <ContentBlock key={key} {...block} />;
          case 'features':
            return <FeaturesBlock key={key} {...block} />;
          case 'testimonials':
            return <TestimonialsBlock key={key} {...block} />;
          case 'form':
            return <FormBlock key={key} {...block} />;
          case 'treatmentList':
            return <TreatmentListBlock key={key} {...block} />;
          case 'beforeAfter':
            return <BeforeAfterBlock key={key} {...block} />;
          case 'cta': {
  const ctaBlock = block as any;

  // compat: novo formato (botao.{label,url,style}) + antigo (label/url/style no topo)
  const btn = ctaBlock.botao ?? {};

  const style = (btn.style ?? ctaBlock.style ?? 'default') as string;
  const rawUrl = (btn.url ?? ctaBlock.url ?? '') as string;
  const label = (btn.label ?? ctaBlock.label ?? '') as string;

  const normalizeUrl = (u?: string) => {
    if (!u) return '';
    const s = u.trim();
    if (/^https?:\/\//i.test(s)) return s;
    if (/^wa\.me\//i.test(s)) return `https://${s}`;
    if (/^wa\.me/i.test(s)) return `https://${s.replace(/^wa\.me/i, 'wa.me')}`;
    return s; // permite #ancora
  };

  const url = normalizeUrl(rawUrl);

  const isUrgent = style === 'urgent';
  const isWhats = style === 'whatsapp';

  const btnClasses =
    isUrgent
      ? 'inline-block px-8 py-4 rounded-full font-bold bg-red-600 text-white hover:opacity-90'
      : isWhats
        ? 'inline-block px-8 py-4 rounded-full font-bold bg-green-600 text-white hover:opacity-90'
        : 'inline-block px-8 py-4 rounded-full font-bold bg-slate-900 text-white hover:opacity-90';

  return (
    <section
      key={key}
      className={`py-16 px-6 transition-colors duration-300 ${
        isUrgent ? 'bg-red-500' : 'bg-amber-500'
      }`}
    >
      <div className="container mx-auto max-w-5xl flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left">
        <h2 className="text-3xl md:text-4xl font-bold text-slate-900 tracking-tight leading-tight max-w-2xl">
          {ctaBlock.text ? <SmartText text={ctaBlock.text} /> : 'Fale com a clínica agora'}
        </h2>

        {url && (
          <a href={url} className={btnClasses}>
            {label ? <SmartText text={label} /> : 'Falar no WhatsApp'}
          </a>
        )}
      </div>
    </section>
  );
}
         // case 'cta':
         //   return <CallToActionBlock key={key} {...block} />; // Agora ele puxa o arquivo externo!
          case 'authority':
            return <AuthorityBlock key={key} {...block} />; // Pluga a Autoridade
          case 'faq':
            return <FaqBlock key={key} {...block} />; // Pluga o FAQ
          case 'location':
            return <LocationBlock key={key} {...block} />; // Pluga o Mapa
          default:
            return null;
        }
      })}
    </div>
  );
};
