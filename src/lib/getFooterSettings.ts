import { getPayload } from 'payload';
import configPromise from '@payload-config';
import type { FooterSetting } from '@/payload-types';
import { cache } from 'react';

export const getFooterSettings = cache(async (): Promise<FooterSetting> => {
  const payload = await getPayload({ config: configPromise });
  const footerSettings = await payload.findGlobal({
    slug: 'footer-settings',
  });
  return footerSettings as FooterSetting;
});
