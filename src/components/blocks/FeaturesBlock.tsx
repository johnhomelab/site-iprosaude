import React from 'react';
import { SmartText } from '../SmartText';

export const FeaturesBlock: React.FC<any> = (props) => {
  const { features } = props;

  if (!features || !Array.isArray(features)) return null;

  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {features.map((feature: any, index: number) => (
            <div key={index} className="group p-8 rounded-3xl bg-slate-50 border border-transparent hover:border-amber-100 hover:bg-white hover:shadow-2xl hover:-translate-y-2 transition-all duration-300">
              {/* Ícone Dourado de Destaque */}
              <div className="w-14 h-14 mb-6 rounded-2xl bg-amber-100 text-amber-600 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              
              {feature.title && (
                <h3 className="text-xl font-bold mb-4 text-slate-900 tracking-tight">
                  <SmartText text={feature.title} />
                </h3>
              )}
              {feature.description && (
                <p className="text-slate-600 leading-relaxed font-light">
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
