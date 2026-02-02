import React from 'react';
import { notFound } from 'next/navigation';
import { getPayload } from 'payload';
import configPromise from '@payload-config';
import { RenderBlocks } from '../../components/RenderBlocks';
import { trackPageVisit } from '../../lib/tracking';

type Props = {
  params: Promise<{ slug: string }>;
};

export default async function Page({ params }: Props) {
  const { slug } = await params;
  const payload = await getPayload({ config: configPromise });

  const result = await payload.find({
    collection: 'landing-pages',
    where: {
      slug: {
        equals: slug,
      },
    },
    limit: 1,
  });

  const page = result.docs[0];

  if (!page) {
    return notFound();
  }

  // Server-side tracking
  await trackPageVisit(slug);

  return (
    <div>
      <RenderBlocks layout={page.layout} />
    </div>
  );
}

export async function generateStaticParams() {
  const payload = await getPayload({ config: configPromise });
  const pages = await payload.find({
    collection: 'landing-pages',
    limit: 1000, 
    select: {
      slug: true,
    }
  });

  return pages.docs.map((page) => ({
    slug: page.slug,
  }));
}
