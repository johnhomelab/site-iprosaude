import React from 'react';
import { SmartText } from '../SmartText';

export const CallToActionBlock: React.FC<any> = (props) => {
  // 1. Rastreador do Texto Principal: Busca em todas as variações comuns
  const mainText = props.text || props.titulo || props.title || props.headline || '';

  // 2. Rastreador dos Dados do Botão
  const btn = props.botao || {};
  const url = btn.url || props.url || props.link || '';
  const label = btn.label || btn.texto || props.label || props.texto || props.buttonText || '';
  const style = btn.style || btn.cor || props.style || props.cor || 'default';

  const isUrgent = style === 'urgent' || style === 'vermelho';
  const isWhats = style === 'whatsapp' || style === 'verde';
  
  let bgColor = 'bg-amber-500';
  let textColor = 'text-slate-900';
  let buttonStyle = 'bg-slate-950 text-white hover:bg-slate-800';

  if (isUrgent) {
    bgColor = 'bg-red-600';
    textColor = 'text-white';
    buttonStyle = 'bg-white text-red-600 hover:bg-slate-100';
  } else if (isWhats) {
    bgColor = 'bg-green-600';
    textColor = 'text-white';
    buttonStyle = 'bg-white text-green-700 hover:bg-slate-100';
  }

  return (
    <section className={`py-16 px-6 ${bgColor} transition-colors duration-300`}>
      <div className="container mx-auto max-w-5xl flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left">
        
        {/* Texto da Chamada */}
        <h2 className={`text-3xl md:text-4xl font-bold ${textColor} tracking-tight leading-tight max-w-2xl`}>
          {mainText ? <SmartText text={mainText} /> : 'Pronto para voltar a sorrir?'}
        </h2>
        
        {/* Botão com Link */}
        {url && label && (
          <a 
            href={url} 
            className={`shrink-0 px-8 py-4 rounded-xl font-bold text-lg shadow-lg hover:-translate-y-1 transition-all duration-300 ${buttonStyle}`}
          >
            {/* Removi o SmartText daqui caso ele esteja causando conflito com texto simples */}
            {typeof label === 'string' ? label : <SmartText text={label} />}
          </a>
        )}
      </div>
    </section>
  );
};