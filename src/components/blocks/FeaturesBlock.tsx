import React from 'react';
import { SmartText } from '../SmartText';

export const FeaturesBlock: React.FC<any> = (props) => {
  const { features } = props;

  if (!features || !Array.isArray(features)) {
    return null;
  }

  return (
    <section className="features-block py-16 px-4 bg-white">
      <div className="container mx-auto max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature: any, index: number) => (
            <div key={index} className="feature-item p-6 border rounded-lg shadow-sm hover:shadow-md transition-shadow">
              {feature.title && (
                <h3 className="text-xl font-bold mb-3 text-gray-900">
                  <SmartText text={feature.title} />
                </h3>
              )}
              {feature.description && (
                <p className="text-gray-600">
                  <SmartText text={feature.description} />
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
