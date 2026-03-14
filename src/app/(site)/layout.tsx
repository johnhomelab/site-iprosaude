import React from 'react'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { Header } from '@/components/Header'
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


  const payload = await getPayload({ config: configPromise })
  const headerData = await payload.findGlobal({ slug: 'header-settings' })


  return (
    <>
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
      <Header data={headerData} />
      {children}
      <Footer />
    </>
  )
}