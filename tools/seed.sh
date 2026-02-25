#!/bin/sh
set -eu

cd "$(dirname "$0")/.."

echo "==> Rodando seed em container node:20-alpine (com libc6-compat)..."

docker run --rm -it \
  --network iprosaude-testnet \
  -e DATABASE_URI='postgres://john:123456@iprosaude-pg:5432/iprosaude_site' \
  -e PAYLOAD_SECRET='test' \
  -e FORCE_SEED_HOME="${FORCE_SEED_HOME:-0}" \
  -v "$(pwd)":/app \
  -w /app \
  node:20-alpine \
  sh -lc 'apk add --no-cache libc6-compat >/dev/null 2>&1; npx --yes tsx src/seed/seed.ts'
