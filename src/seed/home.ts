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
