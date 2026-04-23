'use client'

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'

type HeaderMenuItem = {
  label?: string | null
  href?: string | null
  highlight?: boolean | null
  newTab?: boolean | null
}

type HeaderData = {
  backgroundColor?: string | null
  backdropBlur?: boolean | null
  transparency?: number | null
  height?: 'sm' | 'md' | 'lg' | null
  logoTextPrimary?: string | null
  logoTextHighlight?: string | null
  logoImage?:
    | {
        url?: string | null
        alt?: string | null
      }
    | null
  showWhatsappButton?: boolean | null
  whatsappNumber?: string | null
  whatsappButtonText?: string | null
  whatsappMessage?: string | null
  showAnnouncement?: boolean | null
  announcementText?: string | null
  announcementColor?: 'amber' | 'red' | 'green' | null
  menuItems?: HeaderMenuItem[] | null
}

type HeaderProps = {
  data?: HeaderData | null
}

const HEADER_HEIGHT_CLASSES = {
  sm: 'h-16',
  md: 'h-20',
  lg: 'h-24',
} as const

const ANNOUNCEMENT_COLOR_CLASSES = {
  amber: 'bg-amber-500 text-slate-950',
  red: 'bg-red-600 text-white',
  green: 'bg-green-600 text-white',
} as const

const clamp = (value: number, min: number, max: number) => {
  return Math.min(Math.max(value, min), max)
}

const hexToRgb = (value: string) => {
  const normalized = value.replace('#', '')
  const hex =
    normalized.length === 3
      ? normalized
          .split('')
          .map((char) => char + char)
          .join('')
      : normalized

  if (hex.length !== 6 || /[^a-fA-F0-9]/.test(hex)) {
    return null
  }

  const red = Number.parseInt(hex.slice(0, 2), 16)
  const green = Number.parseInt(hex.slice(2, 4), 16)
  const blue = Number.parseInt(hex.slice(4, 6), 16)

  return { red, green, blue }
}

const applyTransparencyToColor = (color: string, transparency: number) => {
  const alpha = clamp(transparency, 0, 100) / 100
  const trimmedColor = color.trim()

  const hexRgb = hexToRgb(trimmedColor)
  if (hexRgb) {
    return `rgba(${hexRgb.red}, ${hexRgb.green}, ${hexRgb.blue}, ${alpha})`
  }

  const rgbMatch = trimmedColor.match(/^rgb\(\s*([^)]+)\s*\)$/i)
  if (rgbMatch) {
    return `rgba(${rgbMatch[1]}, ${alpha})`
  }

  const rgbaMatch = trimmedColor.match(
    /^rgba\(\s*([^,]+)\s*,\s*([^,]+)\s*,\s*([^,]+)\s*,\s*([^)]+)\s*\)$/i,
  )
  if (rgbaMatch) {
    return `rgba(${rgbaMatch[1]}, ${rgbaMatch[2]}, ${rgbaMatch[3]}, ${alpha})`
  }

  return trimmedColor
}

export const Header = ({ data }: HeaderProps) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false)

  const menuItems =
    data?.menuItems && data.menuItems.length > 0
      ? data.menuItems
      : [
          { label: 'Tratamentos', href: '/#tratamentos' },
          { label: 'Resultados', href: '/#resultados' },
          { label: 'Urgência 24h', href: '/urgencia', highlight: true },
          { label: 'Localização', href: '/#localizacao' },
        ]

  const whatsappNumber = data?.whatsappNumber || '5575991904849'
  const whatsappButtonText = data?.whatsappButtonText || 'Agendar Avaliação'
  const showWhatsappButton = data?.showWhatsappButton ?? true
  const whatsappMessage = encodeURIComponent(
    data?.whatsappMessage || 'Olá! Estava no site e gostaria de agendar uma avaliação.',
  )

  const logoTextPrimary = data?.logoTextPrimary || 'IPRO'
  const logoTextHighlight = data?.logoTextHighlight || '-Saúde'
  const logoImageUrl = data?.logoImage?.url || ''
  const logoImageAlt = data?.logoImage?.alt || 'Logo IPRO-Saúde'

  const headerHeight = HEADER_HEIGHT_CLASSES[data?.height || 'md']
  const headerBackgroundColor = applyTransparencyToColor(
    data?.backgroundColor || 'rgba(2,6,23,0.8)',
    data?.transparency ?? 80,
  )
  const headerBlurClass = data?.backdropBlur ? 'backdrop-blur-md' : ''

  const showAnnouncement = data?.showAnnouncement ?? false
  const announcementText = data?.announcementText || ''
  const announcementColor = data?.announcementColor || 'amber'
  const announcementClass =
    ANNOUNCEMENT_COLOR_CLASSES[announcementColor] || ANNOUNCEMENT_COLOR_CLASSES.amber

  const whatsappLink = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`

  return (
    <>
      {showAnnouncement && announcementText && (
        <div className={`w-full py-2 px-6 text-center text-xs md:text-sm ${announcementClass}`}>
          {announcementText}
        </div>
      )}

      <header
        className={`sticky top-0 z-50 w-full border-b border-white/10 ${headerBlurClass}`}
        style={{ backgroundColor: headerBackgroundColor }}
      >
        <div className={`container mx-auto px-6 flex items-center justify-between max-w-7xl ${headerHeight}`}>
          <Link
            href="/"
            className="flex items-center gap-3 group"
            aria-label="IPRO-Saúde - Página inicial"
          >
            {logoImageUrl ? (
              <div className="relative w-10 h-10 rounded-xl overflow-hidden bg-white/5">
                <Image
                  src={logoImageUrl}
                  alt={logoImageAlt}
                  fill
                  className="object-cover"
                  sizes="40px"
                />
              </div>
            ) : (
              <>
                <div className="w-10 h-10 bg-amber-500 rounded-xl flex items-center justify-center font-black text-slate-950 text-xl group-hover:scale-105 transition-transform">
                  {logoTextPrimary.substring(0, 2).toUpperCase()}
                </div>
                <span className="text-white font-bold text-2xl tracking-tight">
                  {logoTextPrimary}
                  <span className="text-amber-500">{logoTextHighlight}</span>
                </span>
              </>
            )}
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            {menuItems.map((item, index) => {
              const href = item.href || '/'
              const newTab = item.newTab ?? false

              return (
                <Link
                  key={`${item.label || 'item'}-${index}`}
                  href={href}
                  target={newTab ? '_blank' : undefined}
                  rel={newTab ? 'noopener noreferrer' : undefined}
                  className={
                    item.highlight
                      ? 'font-bold text-red-500 hover:text-red-400 transition-colors'
                      : 'font-medium text-slate-300 hover:text-amber-400 transition-colors'
                  }
                >
                  {item.label}
                </Link>
              )
            })}
          </nav>

          {showWhatsappButton && (
            <div className="hidden md:flex items-center gap-4">
              <a
                href={whatsappLink}
                className="flex items-center gap-2 px-6 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-900 font-bold rounded-full transition-all shadow-lg shadow-amber-500/20"
                aria-label="Agendar avaliação via WhatsApp"
                target="_blank"
                rel="noopener noreferrer"
              >
                {whatsappButtonText}
              </a>
            </div>
          )}

          <button
            className="md:hidden p-2 text-white"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Abrir menu"
            aria-expanded={isMobileMenuOpen}
            type="button"
          >
            {isMobileMenuOpen ? '✕' : '☰'}
          </button>
        </div>

        {isMobileMenuOpen && (
          <div
            className="md:hidden border-t border-white/10 px-6 py-4 space-y-4"
            style={{ backgroundColor: headerBackgroundColor }}
          >
            <nav className="flex flex-col gap-4">
              {menuItems.map((item, index) => {
                const href = item.href || '/'
                const newTab = item.newTab ?? false

                return (
                  <Link
                    key={`${item.label || 'item'}-${index}`}
                    href={href}
                    target={newTab ? '_blank' : undefined}
                    rel={newTab ? 'noopener noreferrer' : undefined}
                    className={
                      item.highlight
                        ? 'font-bold text-red-500 hover:text-red-400 transition-colors'
                        : 'font-medium text-slate-300 hover:text-amber-400 transition-colors'
                    }
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                )
              })}
            </nav>

            {showWhatsappButton && (
              <a
                href={whatsappLink}
                className="block text-center px-6 py-3 bg-amber-500 hover:bg-amber-400 text-slate-900 font-bold rounded-full transition-all"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {whatsappButtonText}
              </a>
            )}
          </div>
        )}
      </header>
    </>
  )
}