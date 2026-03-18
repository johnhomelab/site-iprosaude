import React from 'react';

export const Logo = () => (
  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontFamily: 'sans-serif' }}>
    <div style={{
      width: '32px',
      height: '32px',
      backgroundColor: '#f59e0b',
      borderRadius: '8px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontWeight: '900',
      color: '#0f172a',
      fontSize: '14px'
    }}>
      IP
    </div>
    {/* Deixamos sem cor fixa no texto principal para que o Payload mude de preto para branco automaticamente se você ativar o Modo Escuro no painel */}
    <span style={{ fontWeight: 'bold', fontSize: '20px', letterSpacing: '-0.5px' }}>
      IPRO<span style={{ color: '#f59e0b' }}>-Saúde</span>
    </span>
  </div>
);