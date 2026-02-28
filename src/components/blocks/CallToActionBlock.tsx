import React from 'react';

export const CallToActionBlock: React.FC<any> = (props) => {
  const { text, url, label, style } = props;

  // Lógica para Plantão (Urgent) ou Padrão (Default)
  const isUrgent = style === 'urgent';
  const bgColor = isUrgent ? 'bg-red-600' : 'bg-amber-500';
  const textColor = isUrgent ? 'text-white' : 'text-slate-900';
  const buttonStyle = isUrgent 
    ? 'bg-white text-red-600 hover:bg-slate-100' 
    : 'bg-slate-950 text-white hover:bg-slate-800';

  return (
    <section className={`py-16 px-6 ${bgColor} transition-colors duration-300`}>
      <div className="container mx-auto max-w-5xl flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left">
        <h2 className={`text-3xl md:text-4xl font-bold ${textColor} tracking-tight leading-tight max-w-2xl`}>
          {text || 'Pronto para voltar a sorrir?'}
        </h2>
        
        {url && label && (
          <a 
            href={url} 
            className={`shrink-0 px-8 py-4 rounded-xl font-bold text-lg shadow-lg hover:-translate-y-1 transition-all duration-300 ${buttonStyle}`}
          >
            {label}
          </a>
        )}
      </div>
    </section>
  );
};
