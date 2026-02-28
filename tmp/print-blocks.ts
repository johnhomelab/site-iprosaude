async function main() {
  try {
    const payloadMod = await import('payload')
    const payload = (payloadMod as any).default ?? payloadMod

    const configMod = await import('../src/payload.config.ts')
    const config = (configMod as any).default ?? configMod

    console.log('CONFIG IMPORT OK')

    await payload.init({ config })
    console.log('PAYLOAD INIT OK')

    const lp: any = config.collections?.find((c: any) => c.slug === 'landing-pages')
    if (!lp) {
      console.log('ERRO: collection landing-pages não encontrada')
      process.exit(2)
    }

    const layout: any = lp.fields?.find((f: any) => f.name === 'layout')
    if (!layout) {
      console.log('ERRO: field layout não encontrado')
      process.exit(3)
    }

    const blocks = layout.blocks?.map((b: any) => ({
      slug: b.slug,
      labels: b.labels,
      fields: b.fields?.map((x: any) => x.name),
    }))

    console.log(JSON.stringify({ hasBlocks: !!layout.blocks, blocks }, null, 2))
  } catch (e) {
    console.error('ERRO AO RODAR SCRIPT:')
    console.error(e)
    process.exit(1)
  }
}

main()
