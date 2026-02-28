console.log('START inspect-config')

async function main() {
  const configMod = await import('../src/payload.config.ts')
  const config = (configMod as any).default ?? configMod

  console.log('typeof:', typeof config)
  console.log('Object.keys:', Object.keys(config || {}))
  console.log('getOwnPropertyNames:', Object.getOwnPropertyNames(config || {}))

  const hasCollections = config && ('collections' in (config as any))
  console.log('has collections via "in"?', hasCollections)

  // tenta acessar direto e imprimir slugs se existir
  const cols = (config as any)?.collections
  console.log('collections typeof:', typeof cols)
  if (Array.isArray(cols)) {
    console.log('collections length:', cols.length)
    console.log('slugs:', cols.map((c: any) => c?.slug))
  }
}

main().catch((e) => {
  console.error('ERROR:', e)
  process.exit(1)
})
