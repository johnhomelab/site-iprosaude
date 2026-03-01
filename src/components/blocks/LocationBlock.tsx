import React from 'react';

export const LocationBlock: React.FC<any> = (props) => {
  const { titulo, endereco, horario, mapUrl } = props;

  return (
    <section className="py-24 bg-slate-950 text-white border-t border-slate-900">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="flex flex-col lg:flex-row gap-12 items-center">
          
          <div className="w-full lg:w-1/3 space-y-8">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white">
              {titulo || 'Nossa Clínica'}
            </h2>
            
            <div className="space-y-6">
              <div className="flex items-start">
                <div className="w-12 h-12 bg-slate-900 rounded-xl flex items-center justify-center text-amber-500 shrink-0 mr-4 border border-slate-800">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                </div>
                <div>
                  <h4 className="text-sm text-slate-400 font-semibold mb-1 uppercase tracking-wider">Endereço</h4>
                  <p className="text-slate-200 font-light">{endereco || 'Endereço da IPRO-Saúde'}</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="w-12 h-12 bg-slate-900 rounded-xl flex items-center justify-center text-amber-500 shrink-0 mr-4 border border-slate-800">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                </div>
                <div>
                  <h4 className="text-sm text-slate-400 font-semibold mb-1 uppercase tracking-wider">Horário</h4>
                  <p className="text-slate-200 font-light">{horario || 'Atendimento com horário marcado'}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="w-full lg:w-2/3 h-96 rounded-3xl overflow-hidden shadow-2xl border border-slate-800 relative bg-slate-900">
            {mapUrl ? (
              <iframe 
                src={mapUrl} 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen={false} 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                className="grayscale contrast-125 opacity-80 hover:grayscale-0 hover:opacity-100 transition-all duration-700"
              ></iframe>
            ) : (
              <div className="w-full h-full flex items-center justify-center text-slate-500">URL do mapa não configurada no painel.</div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
