'use client'

import React from 'react'
import { RefreshRouteOnSave as PayloadRefreshRouteOnSave } from '@payloadcms/live-preview-react'
import { useRouter } from 'next/navigation'

export function LivePreview() {
  const router = useRouter()

  return (
    <PayloadRefreshRouteOnSave
      refresh={() => router.refresh()}
      serverURL={process.env.NEXT_PUBLIC_PAYLOAD_URL}
    />
  )
}