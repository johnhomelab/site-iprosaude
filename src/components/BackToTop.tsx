'use client';

import React from 'react';

export const BackToTop = () => {
  return (
    <button 
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      className="hover:text-amber-400 transition-colors"
      aria-label="Voltar ao topo"
    >
      ↑ Voltar ao topo
    </button>
  );
};
