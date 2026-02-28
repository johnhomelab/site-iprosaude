import React from 'react';
import { HeroBlock } from './blocks/HeroBlock';
import { HeroGoldBlock } from './blocks/HeroGoldBlock';
import { ContentBlock } from './blocks/ContentBlock';
import { FeaturesBlock } from './blocks/FeaturesBlock';
import { TestimonialsBlock } from './blocks/TestimonialsBlock';
import { FormBlock } from './blocks/FormBlock';
import { TreatmentListBlock } from './blocks/TreatmentListBlock';
import { BeforeAfterBlock } from './blocks/BeforeAfterBlock';
import { SmartText } from './SmartText';
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
  const url = (btn.url ?? ctaBlock.url ?? '') as string;
  const label = (btn.label ?? ctaBlock.label ?? '') as string;

  const isUrgent = style === 'urgent';
  const isWhats = style === 'whatsapp';

  const btnClasses =
    isUrgent
      ? 'inline-block px-6 py-3 rounded-lg font-semibold bg-red-600 text-white hover:opacity-90'
      : isWhats
        ? 'inline-block px-6 py-3 rounded-lg font-semibold bg-green-600 text-white hover:opacity-90'
        : 'inline-block px-6 py-3 rounded-lg font-semibold bg-black text-white hover:opacity-90';

  return (
    <div
      key={key}
      className={`cta-block p-8 ${isUrgent ? 'bg-red-50' : 'bg-gray-100'} text-center my-8`}
    >
      {ctaBlock.text && (
        <div className="max-w-3xl mx-auto text-lg">
          <SmartText text={ctaBlock.text} />
        </div>
      )}

      {url && (
        <div className="mt-6">
          <a href={url} className={btnClasses}>
            {label ? <SmartText text={label} /> : 'Falar com a clínica'}
          </a>
        </div>
      )}
    </div>
  );
}