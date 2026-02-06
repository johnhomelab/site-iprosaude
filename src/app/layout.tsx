import React from 'react';
import { getPayload } from 'payload';
import configPromise from '@payload-config';
import type { Settings } from '@/payload-types';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Payload Project',
  description: 'Website built with Payload and Next.js',
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const databaseUri = process.env.DATABASE_URI;
  const canLoadSettings = Boolean(databaseUri) && !databaseUri?.includes('dummy');

  const settings = canLoadSettings
    ? await (async () => {
        const payload = await getPayload({ config: configPromise });
        return (await payload.findGlobal({
          slug: 'settings',
        })) as Settings;
      })()
    : null;

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
