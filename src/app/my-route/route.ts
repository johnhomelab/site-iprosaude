import configPromise from '@payload-config'
import { getPayload } from 'payload'

export const GET = async () => {
  const payload = await getPayload({
    config: configPromise,
  })

  const data = await payload.find({
    collection: 'users',
    limit: 100,
    select: {
      email: true,
      id: true,
    },
  })

  return Response.json(data)
}
