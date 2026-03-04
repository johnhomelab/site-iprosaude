'use client';

import { LivePreviewListener } from '@payloadcms/live-preview-react';
import { useEffect } from 'react';

export function LivePreview() {
  // Draft mode (Next) cria o cookie __prerender_bypass quando o /api/preview roda
  const enabled =
    typeof document !== 'undefined' &&
    document.cookie.includes('__prerender_bypass=');

  useEffect(() => {
    if (enabled) {
      console.log('[LivePreview] enabled (draft mode cookie found)');
    } else {
      console.log('[LivePreview] disabled (no draft mode cookie)');
    }
  }, [enabled]);

  if (!enabled) return null;

  return <LivePreviewListener />;
}