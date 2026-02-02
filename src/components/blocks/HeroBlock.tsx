import React from 'react';
import { SmartText } from '../SmartText';

export const HeroBlock: React.FC<any> = (props) => {
  const { heading, text } = props;

  return (
    <section className="hero-block relative py-20 px-4 bg-gray-900 text-white text-center">
      <div className="container mx-auto max-w-4xl z-10 relative">
        {heading && (
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            <SmartText text={heading} />
          </h1>
        )}
        {text && (
          <p className="text-xl md:text-2xl text-gray-200 mb-8">
            <SmartText text={text} />
          </p>
        )}
      </div>
    </section>
  );
};
