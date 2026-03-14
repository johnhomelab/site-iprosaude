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
import { FormLeadBlock as FormLeadBlockComponent } from './blocks/FormLeadBlock'
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
  case 'formLead':
  return (
    
      <FormLeadBlockComponent {...block} />
    
  )
  case 'hero':
    return <HeroBlock key={key} {...block} />

  case 'hero-gold':
    return <HeroGoldBlock key={key} {...block} />

  case 'content':
    return (
      
        <ContentBlock {...block} />
      
    )

  case 'features':
    return (
      
        <FeaturesBlock {...block} />
      
    )

  case 'testimonials':
    return (
      
        <TestimonialsBlock {...block} />
      
    )

  case 'form':
    return (
      
        <FormBlock {...block} />
      
    )

  case 'treatmentList':
    return (
      
        <TreatmentListBlock {...block} />
      
    )

  case 'beforeAfter':
    return (
      
        <BeforeAfterBlock {...block} />
      
    )

  case 'cta':
    return (
      
        <CallToActionBlock {...block} />
      
    )

  case 'authority':
    return (
      
        <AuthorityBlock {...block} />
      
    )

  case 'faq':
    return (
      
        <FaqBlock {...block} />
      
    )

  case 'location':
    return (
      
        <LocationBlock {...block} />
      
    )

  default:
    return null
}
      })}
    </div>
  );
};
