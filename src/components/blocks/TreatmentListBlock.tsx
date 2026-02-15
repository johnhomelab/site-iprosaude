import React from 'react';
import { getPayload } from 'payload';
import configPromise from '@payload-config';
import Image from 'next/image';
import { SmartText } from '../SmartText';

export const TreatmentListBlock = async (props: any) => {
  const { title, description } = props;
  const payload = await getPayload({ config: configPromise });
  const treatments = await payload.find({
    collection: 'tratamentos',
    limit: 100,
  });

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        {title && (
          <h2 className="text-3xl font-bold text-center mb-4">
            <SmartText text={title} />
          </h2>
        )}
        {description && (
          <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
            <SmartText text={description} />
          </p>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {treatments.docs.map((t: any) => (
            <div
              key={t.id}
              className="bg-gray-50 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
            >
              {t.imagemDestaque &&
                typeof t.imagemDestaque === 'object' &&
                t.imagemDestaque.url && (
                  <div className="relative w-full h-48">
                    <Image
                      src={t.imagemDestaque.url}
                      alt={t.imagemDestaque.alt || t.titulo}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  </div>
                )}
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">{t.titulo}</h3>
                <p className="text-gray-600">{t.descricao}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
