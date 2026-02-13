import React from 'react';
import { notFound } from 'next/navigation';
import { getPayload } from 'payload';
import configPromise from '@payload-config';
import { RenderBlocks } from '../../components/RenderBlocks';
import { FloatingWhatsApp } from '../../components/FloatingWhatsApp';
import { trackPageVisit } from '../../lib/tracking';
import { Metadata } from 'next';
import { getSettings } from '@/lib/getSettings';

export const dynamic = 'force-dynamic'

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
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

  const settings = await getSettings();

  return (
    <div>
      <RenderBlocks layout={page.layout} />
      {page.showFloatingButton && <FloatingWhatsApp number={settings?.contact?.whatsapp} />}
    </div>
  );
}
