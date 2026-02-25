#!/usr/bin/env bash

set -e

echo "==> Verificando diretório do projeto..."
cd ~/site/site-iprosaude || { echo "ERRO: pasta não encontrada"; exit 1; }

echo "==> Criando estrutura seed..."
mkdir -p src/seed
mkdir -p src/seed/assets

echo "==> Estrutura base criada."

echo "==> Criando arquivo src/seed/media.ts..."

cat > src/seed/media.ts <<'EOF'
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
EOF

echo "==> media.ts criado."


echo "==> Criando arquivo src/seed/seed.ts..."

cat > src/seed/seed.ts <<'EOF'
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
EOF

echo "==> seed.ts criado."

echo "==> Reescrevendo src/seed/home.ts..."

cat > src/seed/home.ts <<'EOF'
import type { Payload } from 'payload'

type Opts = { beforeId: number | string; afterId: number | string }

export const seedHome = async (payload: Payload, opts: Opts) => {
  const existing = await payload.find({
    collection: 'landing-pages',
    where: { slug: { equals: 'home' } },
    limit: 1,
  })

  if (existing.docs.length > 0) {
    const force = process.env.FORCE_SEED_HOME === '1'
    if (!force) {
      console.log('Home já existe. Seed ignorado.')
      return
    }

    console.log('FORCE_SEED_HOME=1: removendo Home existente...')
    await payload.delete({
      collection: 'landing-pages',
      id: existing.docs[0].id,
    })
  }

  await payload.create({
    collection: 'landing-pages',
    data: {
      title: 'Home',
      slug: 'home',
      layout: [
        {
          blockType: 'heroGold',
          title: 'Implantes que Devolvem Seu Sorriso e Sua Confiança',
          subtitle: 'Especialistas em Implantes, Prótese e Urgência 24h.',
          ctaText: 'Agendar Avaliação',
          ctaLink: '#contato',
        },
        {
          blockType: 'beforeAfter',
          beforeImage: opts.beforeId,
          afterImage: opts.afterId,
        },
        {
          blockType: 'treatmentList',
          title: 'Tratamentos de Alta Performance',
          treatments: [
            { title: 'Implantes Dentários' },
            { title: 'Prótese Dentária' },
            { title: 'Facetas Estéticas' },
            { title: 'Tratamento de Canal' },
            { title: 'Aparelho Ortodôntico' },
            { title: 'Clareamento Dental' },
            { title: 'Cirurgias Complexas' },
            { title: 'Urgência 24h' },
          ],
        },
        {
          blockType: 'callToAction',
          title: 'Está com dor ou quer transformar seu sorriso?',
          text: 'Fale agora com nossa equipe e agende sua avaliação.',
          buttonText: 'Falar no WhatsApp',
          buttonLink: '#whatsapp',
        },
      ],
    },
  })

  console.log('Home criada com sucesso.')
}
EOF

echo "==> home.ts atualizado."
