'use client';

import React, { useState } from 'react';
import Image from 'next/image';

export const BeforeAfterBlock = (props: any) => {
  const { beforeImage, afterImage, labelBefore, labelAfter } = props;
  const [sliderPosition, setSliderPosition] = useState(50);

  const getUrl = (img: any) => {
    if (img && typeof img === 'object' && img.url) return img.url;
    return null;
  };

  const beforeUrl = getUrl(beforeImage);
  const afterUrl = getUrl(afterImage);

  if (!beforeUrl || !afterUrl) return null;

  return (
    <section className="py-24 bg-slate-950 relative overflow-hidden">
      {/* Brilho de fundo sutil (Efeito Premium) */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-amber-500/5 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="container mx-auto px-4 max-w-5xl relative z-10">
        
        {/* Cabeçalho Emocional de Conversão */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 tracking-tight">
            Resultados Reais. <span className="text-amber-500">Transformações Reais.</span>
          </h2>
          <p className="text-slate-400 text-lg md:text-xl font-light max-w-2xl mx-auto">
            Arraste a linha central para os lados e veja a diferença que a precisão e a tecnologia avançada podem fazer pelo seu sorriso.
          </p>
        </div>

        {/* Container do Slider */}
        <div className="relative w-full aspect-[4/3] md:aspect-video rounded-3xl overflow-hidden shadow-[0_0_40px_rgba(0,0,0,0.4)] border border-slate-800 select-none group bg-slate-900">
          
          {/* After Image (Fundo - Lado Direito) */}
          <Image
            src={afterUrl}
            alt={labelAfter || "Depois"}
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 1024px"
          />

          {/* Before Image (Frente - Lado Esquerdo com recorte dinâmico) */}
          <Image
            src={beforeUrl}
            alt={labelBefore || "Antes"}
            fill
            className="object-cover z-10"
            style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
            sizes="(max-width: 1024px) 100vw, 1024px"
          />

          {/* Linha Divisória e Botão (Cor Dourada Premium) */}
          <div
            className="absolute top-0 bottom-0 w-1 bg-amber-500 z-20 pointer-events-none shadow-[0_0_15px_rgba(245,158,11,0.5)]"
            style={{ left: `${sliderPosition}%` }}
          >
             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-slate-950 border-2 border-amber-500 rounded-full p-2.5 shadow-[0_0_20px_rgba(245,158,11,0.4)] text-amber-500 transition-transform group-hover:scale-110">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 15L12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9" transform="rotate(-90 12 12)" />
                </svg>
             </div>
          </div>

          {/* Input Invisível para Arrastar */}
          <input
            type="range"
            min="0"
            max="100"
            value={sliderPosition}
            onChange={(e) => setSliderPosition(Number(e.target.value))}
            className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize z-30 m-0 p-0"
          />

          {/* Tags "Antes" e "Depois" Redesenhadas */}
          <div className="absolute bottom-6 left-6 z-20 bg-slate-950/80 border border-slate-700 text-white px-4 py-1.5 rounded-full text-sm font-bold tracking-wide backdrop-blur-md pointer-events-none shadow-lg">
            {labelBefore || 'Antes'}
          </div>
          <div className="absolute bottom-6 right-6 z-20 bg-amber-500/90 border border-amber-400 text-slate-950 px-4 py-1.5 rounded-full text-sm font-bold tracking-wide backdrop-blur-md pointer-events-none shadow-lg shadow-amber-500/20">
            {labelAfter || 'Depois'}
          </div>
        </div>
      </div>
    </section>
  );
};
