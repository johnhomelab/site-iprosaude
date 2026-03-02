'use client'

import { LivePreviewListener } from '@payloadcms/live-preview-react'

export function LivePreview() {
  // O listener só precisa existir na árvore do React
  return <LivePreviewListener />
}