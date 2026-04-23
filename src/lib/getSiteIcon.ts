import type { Media, Settings } from '@/payload-types'

const isMediaDocument = (value: number | Media | null | undefined): value is Media => {
  return typeof value === 'object' && value !== null && 'url' in value
}

export const getSiteIconUrl = (settings: Settings | null | undefined): string | undefined => {
  const siteIcon = settings?.metadata?.siteIcon

  if (!isMediaDocument(siteIcon)) {
    return undefined
  }

  return siteIcon.url || undefined
}
