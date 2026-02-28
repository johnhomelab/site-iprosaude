#!/usr/bin/env sh
set -eu

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"

say() { printf "\n==> %s\n" "$*"; }

require() {
  command -v "$1" >/dev/null 2>&1 || { echo "ERRO: comando '$1' não encontrado"; exit 1; }
}

say "Verificando repo..."
[ -d .git ] || { echo "ERRO: não é um repositório git"; exit 1; }

say "OK. Script pronto."
echo "DICA: agora crie um 'patch' em tools/patch.sh e rode: sh tools/patch.sh"
