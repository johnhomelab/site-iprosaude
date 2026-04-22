
import React from 'react';
import { notFound } from 'next/navigation';
import { RenderBlocks } from '@/components/RenderBlocks';
import { FloatingWhatsApp } from '@/components/FloatingWhatsApp';
import { trackPageVisit } from '@/lib/tracking';
import { Metadata } from 'next';
import { getSettings } from '@/lib/getSettings';
import { getHeaderSettings } from '@/lib/getHeaderSettings';
import { getPageBySlug } from '@/lib/getPageBySlug';
import { Header } from '@/components/Header';

export const dynamic = 'force-dynamic';

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const page = await getPageBySlug(slug);

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
  const page = await getPageBySlug(slug);

  if (!page) {
    return notFound();
  }

  // Server-side tracking
  await trackPageVisit(slug);

  const settings = await getSettings();
  const showHeader = page.showHeader ?? true;
  const headerData = showHeader ? await getHeaderSettings() : null;

  return (
    <div>
      {showHeader && <Header data={headerData} />}
      <RenderBlocks layout={page.layout} />
      {page.showFloatingButton && <FloatingWhatsApp number={settings?.contact?.whatsapp} />}
    </div>
  );
}
