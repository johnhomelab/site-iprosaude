import React from 'react';
import { getPayload } from 'payload';
import configPromise from '@payload-config';
import type { Settings } from '@/payload-types';

export const metadata = {
  title: 'Payload Project',
  description: 'Website built with Payload and Next.js',
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const payload = await getPayload({ config: configPromise });
  const settings = await payload.findGlobal({
    slug: 'settings',
  }) as Settings;

  const headerScripts = settings?.analytics?.headerScripts;
  const bodyScripts = settings?.analytics?.bodyScripts;

  return (
    <html lang="en">
      <head>
        {headerScripts && (
            <div dangerouslySetInnerHTML={{ __html: headerScripts }} style={{display:'none'}} />
        )}
      </head>
      <body>
         {bodyScripts && (
            <div dangerouslySetInnerHTML={{ __html: bodyScripts }} style={{display:'none'}} />
         )}
        <main>{children}</main>
      </body>
    </html>
  );
}
