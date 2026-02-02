import React from 'react';
import { notFound } from 'next/navigation';
import { getPayload } from 'payload';
import configPromise from '@payload-config';
import { RenderBlocks } from '../../components/RenderBlocks';

export default async function Page() {
  const payload = await getPayload({ config: configPromise });

  const result = await payload.find({
    collection: 'landing-pages',
    where: {
      slug: {
        equals: 'urgencia-24h',
      },
    },
    limit: 1,
  });

  const page = result.docs[0];

  if (!page) {
    return notFound();
  }

  return (
    <div>
      <RenderBlocks layout={page.layout} />
    </div>
  );
}
