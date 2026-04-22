export const dynamic = 'force-dynamic'
import '../globals.css'
import React from 'react'
import { Footer } from '@/components/Footer'
import { LivePreview } from '@/components/LivePreview'
import { getSettings } from '@/lib/getSettings'
import Script from 'next/script'


export default async function SiteLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const databaseUri = process.env.DATABASE_URI
  const canLoadSettings = Boolean(databaseUri) && !databaseUri?.includes('dummy')

  const settings = canLoadSettings ? await getSettings() : null
  const headerScripts = settings?.analytics?.headerScripts
  const bodyScripts = settings?.analytics?.bodyScripts


  return (
  <html lang="en">
    <body>
      {headerScripts && (
        <Script
          id="payload-header-scripts"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{ __html: headerScripts }}
        />
      )}
      {bodyScripts && (
        <Script
          id="payload-body-scripts"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{ __html: bodyScripts }}
        />
      )}
      <LivePreview />
      {children}
      <Footer />
    </body>
  </html>
)
}
