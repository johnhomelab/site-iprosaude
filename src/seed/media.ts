import fs from 'node:fs'
import path from 'node:path'
import type { Payload } from 'payload'

type MediaDoc = { id: number | string }

export async function upsertMedia(payload: Payload, filename: string, alt: string) {
  const existing = await payload.find({
    collection: 'media',
    where: { filename: { equals: filename } },
    limit: 1,
  })

  if (existing.docs.length > 0) {
    console.log('Media já existe:', filename)
    return existing.docs[0] as unknown as MediaDoc
  }

  const filePath = path.resolve(process.cwd(), 'src/seed/assets', filename)
  const fileBuffer = fs.readFileSync(filePath)

  const created = await payload.create({
    collection: 'media',
    data: { alt },
    file: {
      data: fileBuffer,
      mimetype: 'image/jpeg',
      name: filename,
      size: fileBuffer.length,
    },
  })

  console.log('Media criada:', filename)
  return created as unknown as MediaDoc
}
