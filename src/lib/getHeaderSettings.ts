import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { cache } from 'react'

export const getHeaderSettings = cache(async () => {
  const payload = await getPayload({ config: configPromise })

  return payload.findGlobal({ slug: 'header-settings' })
})
