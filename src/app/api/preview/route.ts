import { draftMode } from 'next/headers'
import { headers } from 'next/headers'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const redirectPath = searchParams.get('redirect') || '/'

  draftMode().enable()

  const h = headers()

  // prioridade: proxy -> host direto
  const proto = h.get('x-forwarded-proto') ?? 'http'
  const host =
    h.get('x-forwarded-host') ??
    h.get('host') ??
    new URL(request.url).host

  const absoluteUrl = new URL(redirectPath, `${proto}://${host}`)

  return NextResponse.redirect(absoluteUrl)
}