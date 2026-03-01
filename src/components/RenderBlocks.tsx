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
          case 'cta':
            return <CallToActionBlock key={key} {...block} />; // Agora ele puxa o arquivo externo!
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
