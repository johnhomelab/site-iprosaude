'use client';

import React, { useState } from 'react';

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
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4 max-w-5xl">
        <div className="relative w-full aspect-[4/3] md:aspect-video rounded-xl overflow-hidden shadow-2xl select-none group">
          {/* After Image (Background - Right Side effectively) */}
          <img
            src={afterUrl}
            alt="After"
            className="absolute inset-0 w-full h-full object-cover"
          />

          {/* Before Image (Foreground - Left Side - Clipped) */}
          <img
            src={beforeUrl}
            alt="Before"
            className="absolute inset-0 w-full h-full object-cover z-10"
            style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
          />

          {/* Slider Handle Line */}
          <div
            className="absolute top-0 bottom-0 w-1 bg-white z-20 pointer-events-none"
            style={{ left: `${sliderPosition}%` }}
          >
             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-full p-2 shadow-lg text-gray-800">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12h-15m0 0l6.75 6.75M4.5 12l6.75-6.75" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75" />
                   {/* Just simple left right arrows */}
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 15L12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9" transform="rotate(-90 12 12)" />
                </svg>
             </div>
          </div>

          {/* Range Input (Interaction Layer) */}
          <input
            type="range"
            min="0"
            max="100"
            value={sliderPosition}
            onChange={(e) => setSliderPosition(Number(e.target.value))}
            className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize z-30 m-0 p-0"
          />

          {/* Labels */}
          <div className="absolute bottom-6 left-6 z-20 bg-black/60 text-white px-3 py-1 rounded-full text-sm font-semibold backdrop-blur-sm pointer-events-none">
            {labelBefore || 'Antes'}
          </div>
          <div className="absolute bottom-6 right-6 z-20 bg-black/60 text-white px-3 py-1 rounded-full text-sm font-semibold backdrop-blur-sm pointer-events-none">
            {labelAfter || 'Depois'}
          </div>
        </div>
      </div>
    </section>
  );
};
