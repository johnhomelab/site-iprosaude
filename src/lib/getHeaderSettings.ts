import { getPayload } from 'payload';
import configPromise from '@payload-config';
import type { HeaderSetting } from '@/payload-types';
import { cache } from 'react';

export const getHeaderSettings = cache(async (): Promise<HeaderSetting> => {
  const payload = await getPayload({ config: configPromise });
  const headerSettings = await payload.findGlobal({
    slug: 'header-settings',
  });
  return headerSettings as HeaderSetting;
});
