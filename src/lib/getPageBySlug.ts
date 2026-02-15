import { getPayload } from 'payload';
import configPromise from '@payload-config';
import type { LandingPage } from '@/payload-types';
import { cache } from 'react';

export const getPageBySlug = cache(async (slug: string): Promise<LandingPage | null> => {
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

  return result.docs?.[0] || null;
});
