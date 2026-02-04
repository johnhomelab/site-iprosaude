import React from 'react';
import { HeroBlock } from './blocks/HeroBlock';
import { ContentBlock } from './blocks/ContentBlock';
import { FeaturesBlock } from './blocks/FeaturesBlock';
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
          case 'content':
            return <ContentBlock key={key} {...block} />;
          case 'features':
            return <FeaturesBlock key={key} {...block} />;
          case 'form':
            return <FormBlock key={key} {...block} />;
          case 'treatmentList':
            return <TreatmentListBlock key={key} {...block} />;
          case 'beforeAfter':
            return <BeforeAfterBlock key={key} {...block} />;
          case 'cta':
            const ctaBlock = block as any;
            const isUrgent = ctaBlock.style === 'urgent';
            const btnClasses = isUrgent
              ? "inline-block bg-green-600 hover:bg-green-700 text-white font-bold px-10 py-5 text-2xl rounded-full transition-colors shadow-lg transform hover:scale-105"
              : "inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold px-8 py-3 rounded-full transition-colors";

             return (
              <div key={key} className={`cta-block p-8 ${isUrgent ? 'bg-red-50' : 'bg-gray-100'} text-center my-8`}>
                {ctaBlock.text && (
                   <p className={`mb-4 ${isUrgent ? 'text-xl font-semibold text-red-700' : 'text-lg'}`}>
                     <SmartText text={ctaBlock.text} />
                   </p>
                )}
                {ctaBlock.url && (
                    <a href={ctaBlock.url} className={btnClasses}>
                        {ctaBlock.label ? <SmartText text={ctaBlock.label} /> : 'Click Here'}
                    </a>
                )}
              </div>
            );
          default:
            return null;
        }
      })}
    </div>
  );
};
