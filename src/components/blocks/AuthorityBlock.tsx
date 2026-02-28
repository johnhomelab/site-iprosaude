import React from 'react';
import Image from 'next/image';

export const AuthorityBlock: React.FC<any> = (props) => {
  const { headline, nomeProfissional, credenciais, registro, descricao, fotoAutoridade, numerosDeSucesso } = props;
  const imageUrl = fotoAutoridade?.url;

  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          
          {/* Lado da Foto */}
          <div className="w-full lg:w-1/2 relative">
            <div className="absolute inset-0 bg-amber-500 rounded-[3rem] -rotate-3 scale-105 opacity-20"></div>
            <div className="relative aspect-[4/5] rounded-[3rem] overflow-hidden shadow-2xl border-4 border-white">
              {imageUrl ? (
                <Image src={imageUrl} alt={nomeProfissional || 'Especialista'} fill className="object-cover" />
              ) : (
                <div className="w-full h-full bg-slate-200 flex items-center justify-center text-slate-400">Sem Foto</div>
              )}
            </div>
          </div>

          {/* Lado do Texto (Copy) */}
          <div className="w-full lg:w-1/2 space-y-8">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 tracking-tight leading-tight">
              {headline}
            </h2>
            
            <div className="space-y-2 border-l-4 border-amber-500 pl-6">
              <h3 className="text-2xl font-bold text-slate-800">{nomeProfissional}</h3>
              <p className="text-amber-600 font-semibold tracking-wide">{credenciais}</p>
              <p className="text-slate-500 text-sm font-mono bg-slate-100 inline-block px-2 py-1 rounded">{registro}</p>
            </div>

            <p className="text-lg text-slate-600 leading-relaxed font-light">
              {descricao}
            </p>

            {/* Números de Sucesso */}
            {numerosDeSucesso && numerosDeSucesso.length > 0 && (
              <div className="grid grid-cols-2 gap-6 pt-6 border-t border-slate-100">
                {numerosDeSucesso.map((item: any, i: number) => (
                  <div key={i}>
                    <p className="text-4xl font-black text-slate-900 mb-1">{item.numero}</p>
                    <p className="text-sm text-slate-500 uppercase tracking-widest font-semibold">{item.legenda}</p>
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>
      </div>
    </section>
  );
};
