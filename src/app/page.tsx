import React from 'react';
import { notFound } from 'next/navigation';
import { RenderBlocks } from '../components/RenderBlocks';
import { FloatingWhatsApp } from '../components/FloatingWhatsApp';
import { Metadata } from 'next';
import { getSettings } from '@/lib/getSettings';
import { getPageBySlug } from '@/lib/getPageBySlug';

export const dynamic = 'force-dynamic';

export async function generateMetadata(): Promise<Metadata> {
  const page = await getPageBySlug('home');

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
  const page = await getPageBySlug('home');

  if (!page) {
    return notFound();
  }

  const settings = await getSettings();

  return (
    <div>
      <RenderBlocks layout={page.layout} />
      {page.showFloatingButton && <FloatingWhatsApp number={settings?.contact?.whatsapp} />}
    </div>
  );
}
