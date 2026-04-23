export const dynamic = 'force-dynamic'
import '../globals.css'
import React from 'react'
import { Footer } from '@/components/Footer'
import { GlobalScripts } from '@/components/GlobalScripts'
import { LivePreview } from '@/components/LivePreview'
import { getSettings } from '@/lib/getSettings'
import { getSiteIconUrl } from '@/lib/getSiteIcon'
import type { Metadata } from 'next'

export async function generateMetadata(): Promise<Metadata> {
  const databaseUri = process.env.DATABASE_URI
  const canLoadSettings = Boolean(databaseUri) && !databaseUri?.includes('dummy')
  const settings = canLoadSettings ? await getSettings() : null
  const siteIconUrl = getSiteIconUrl(settings)

  if (!siteIconUrl) {
    return {}
  }

  return {
    icons: {
      icon: siteIconUrl,
      shortcut: siteIconUrl,
      apple: siteIconUrl,
    },
  }
}

export default async function SiteLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const databaseUri = process.env.DATABASE_URI
  const canLoadSettings = Boolean(databaseUri) && !databaseUri?.includes('dummy')

  const settings = canLoadSettings ? await getSettings() : null
  const headerScripts = settings?.analytics?.headerScripts ?? null
  const bodyScripts = settings?.analytics?.bodyScripts ?? null

  return (
    <html lang="pt-BR">
      <head>
        <GlobalScripts html={headerScripts} position="head" />
      </head>
      <body>
        <GlobalScripts html={bodyScripts} position="body" />
        <LivePreview />
        {children}
        <Footer />
      </body>
    </html>
  )
}
