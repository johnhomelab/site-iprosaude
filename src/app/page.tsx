import React from 'react';
import { notFound } from 'next/navigation';
import { getPayload } from 'payload';
import configPromise from '@payload-config';
import { RenderBlocks } from '../components/RenderBlocks';
import { FloatingWhatsApp } from '../components/FloatingWhatsApp';
import { Metadata } from 'next';
import type { Settings } from '@/payload-types';

export async function generateMetadata(): Promise<Metadata> {
  const payload = await getPayload({ config: configPromise });
  const result = await payload.find({
    collection: 'landing-pages',
    where: {
      slug: {
        equals: 'home',
      },
    },
    limit: 1,
  });

  const page = result.docs[0];

  if (!page) {
    return {};
  }

  return {
    title: page.meta?.title || page.title,
    description: page.meta?.description,
    openGraph: {
      title: page.meta?.title || page.title,
      description: page.meta?.description || undefined,
      images: typeof page.meta?.image === 'object' && page.meta?.image?.url ? [page.meta.image.url] : undefined,
    },
  };
}

export default async function Page() {
  const payload = await getPayload({ config: configPromise });

  const result = await payload.find({
    collection: 'landing-pages',
    where: {
      slug: {
        equals: 'home',
      },
    },
    limit: 1,
  });

  const page = result.docs[0];

  if (!page) {
    return notFound();
  }

  const settings = await payload.findGlobal({
    slug: 'settings',
  }) as Settings;

  return (
    <div>
      <RenderBlocks layout={page.layout} />
      {page.showFloatingButton && <FloatingWhatsApp number={settings?.contact?.whatsapp} />}
    </div>
  );
}
