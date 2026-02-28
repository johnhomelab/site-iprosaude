async function main() {
  const configMod = await import('../src/payload.config.ts')
  const config = (configMod as any).default ?? configMod

  console.log('TYPEOF config:', typeof config)
  console.log('TOP KEYS:', Object.keys(config || {}))

  // tenta caminhos comuns
  const candidates: any[] = [
    config,
    (config as any).config,
    (config as any).default,
    (config as any).payload,
  ].filter(Boolean)

  for (const [i, c] of candidates.entries()) {
    console.log(`\n--- CANDIDATE[${i}] KEYS ---`)
    console.log(Object.keys(c))
    if ((c as any).collections) {
      console.log(`collections.length = ${(c as any).collections?.length}`)
      console.log('collection slugs =', (c as any).collections?.map((x:any)=>x.slug))
    }
  }
}

main().catch((e)=>{ console.error(e); process.exit(1) })
