import { getPayload } from 'payload';
import configPromise from '@payload-config';
import type { Settings } from '@/payload-types';
import { cache } from 'react';

export const getSettings = cache(async (): Promise<Settings> => {
  const payload = await getPayload({ config: configPromise });
  const settings = await payload.findGlobal({
    slug: 'settings',
  });
  return settings as Settings;
});
