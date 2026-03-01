'use client';
import React, { useState } from 'react';

export const FaqBlock: React.FC<any> = (props) => {
  const { titulo, perguntas } = props;
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  if (!perguntas || perguntas.length === 0) return null;

  return (
    <section className="py-24 bg-slate-50">
      <div className="container mx-auto px-6 max-w-4xl">
        <h2 className="text-3xl md:text-4xl font-bold text-slate-900 text-center mb-12 tracking-tight">
          {titulo || 'Perguntas Frequentes'}
        </h2>
        
        <div className="space-y-4">
          {perguntas.map((item: any, index: number) => (
            <div 
              key={index} 
              className="bg-white border border-slate-200 rounded-2xl overflow-hidden transition-all duration-300"
            >
              <button
                className="w-full px-6 py-5 text-left flex justify-between items-center focus:outline-none"
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
              >
                <span className="font-bold text-slate-800 text-lg">{item.pergunta}</span>
                <span className={`transform transition-transform duration-300 ${openIndex === index ? 'rotate-180 text-amber-500' : 'text-slate-400'}`}>
                  ▼
                </span>
              </button>
              
              <div 
                className={`px-6 overflow-hidden transition-all duration-300 ease-in-out ${openIndex === index ? 'max-h-96 pb-5 opacity-100' : 'max-h-0 opacity-0'}`}
              >
                <p className="text-slate-600 font-light leading-relaxed">{item.resposta}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
