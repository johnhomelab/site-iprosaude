import payload from 'payload'
import config from '../payload.config'
import { upsertMedia } from './media'
import { seedHome } from './home'

async function run() {
  await payload.init({ config })

  const before = await upsertMedia(payload, 'before.jpg', 'Antes (seed)')
  const after = await upsertMedia(payload, 'after.jpg', 'Depois (seed)')

  await seedHome(payload, { beforeId: before.id, afterId: after.id })

  console.log('SEED OK')
  process.exit(0)
}

run().catch((e) => {
  console.error('SEED ERROR:', e)
  process.exit(1)
})
