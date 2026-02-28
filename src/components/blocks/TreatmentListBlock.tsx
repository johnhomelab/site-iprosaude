import React from 'react';
import { getPayload } from 'payload';
import configPromise from '@payload-config';
import Image from 'next/image';
import { SmartText } from '../SmartText';

export const TreatmentListBlock = async (props: any) => {
  const { title, description } = props;
  const payload = await getPayload({ config: configPromise });
  
  // Busca os tratamentos cadastrados no painel
  const treatments = await payload.find({
    collection: 'tratamentos',
    limit: 100,
  });

  return (
    <section className="py-24 bg-slate-50">
      <div className="container mx-auto px-4 md:px-8 max-w-7xl">
        
        {/* Cabeçalho da Seção */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          {title && (
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6 tracking-tight">
              <SmartText text={title} />
            </h2>
          )}
          {description && (
            <p className="text-lg md:text-xl text-slate-600 leading-relaxed font-light">
              <SmartText text={description} />
            </p>
          )}
        </div>

        {/* Grid de Tratamentos */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {treatments.docs.map((t: any) => (
            <div
              key={t.id}
              className="group bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 border border-slate-100 flex flex-col"
            >
              {/* Imagem com efeito de Zoom suave ao passar o mouse */}
              {t.imagemDestaque && typeof t.imagemDestaque === 'object' && t.imagemDestaque.url && (
                <div className="relative w-full h-64 overflow-hidden">
                  <Image
                    src={t.imagemDestaque.url}
                    alt={t.imagemDestaque.alt || t.titulo}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700 ease-in-out"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  {/* Gradiente escuro sutil que aparece no hover para destacar o luxo */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
              )}
              
              <div className="p-8 flex flex-col flex-grow">
                <h3 className="text-2xl font-bold text-slate-900 mb-4">{t.titulo}</h3>
                <p className="text-slate-600 mb-8 flex-grow leading-relaxed">{t.descricao}</p>

                {/* Renderiza os benefícios que adicionamos no banco de dados (se existirem) */}
                {t.beneficios && t.beneficios.length > 0 && (
                  <ul className="mb-8 space-y-3">
                    {t.beneficios.slice(0, 3).map((b: any, index: number) => (
                      <li key={index} className="flex items-start">
                        {/* Ícone de check dourado */}
                        <svg className="w-6 h-6 text-amber-500 mr-3 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="text-sm font-medium text-slate-700">{b.beneficio}</span>
                      </li>
                    ))}
                  </ul>
                )}

                {/* Botão de Ação Direta para o WhatsApp */}
                <a
                  href={`https://wa.me/55S75991904849?text=Olá, vim do site e gostaria de saber mais sobre ${t.titulo}`}
                  className="mt-auto inline-flex items-center justify-center w-full px-6 py-4 bg-slate-50 group-hover:bg-amber-500 text-slate-900 font-bold rounded-2xl transition-colors duration-300"
                >
                  Saber mais
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
