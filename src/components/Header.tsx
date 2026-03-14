'use client'

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'

type HeaderMenuItem = {
  label?: string
  href?: string
  highlight?: boolean
}

type HeaderData = {
  logoTextPrimary?: string
  logoTextHighlight?: string
  logoImage?: {
    url?: string
    alt?: string
  } | null
  showWhatsappButton?: boolean
  whatsappNumber?: string
  whatsappButtonText?: string
  menuItems?: HeaderMenuItem[]
}

type HeaderProps = {
  data?: HeaderData | null
}

export const Header = ({ data }: HeaderProps) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false)
  const [isScrolled, setIsScrolled] = React.useState(false)
  const pathname = usePathname()

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 24)
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll)

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  if (pathname === '/urgencia') {
    return null
  }

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

  const logoTextPrimary = data?.logoTextPrimary || 'IPRO'
  const logoTextHighlight = data?.logoTextHighlight || '-Saúde'
  const logoImageUrl = data?.logoImage?.url
  const logoImageAlt = data?.logoImage?.alt || 'Logo IPRO-Saúde'

  const whatsappLink = `https://wa.me/${whatsappNumber}?text=Olá, gostaria de agendar uma avaliação`

  return (
    <header
      className={`sticky top-0 z-50 w-full border-b transition-all duration-300 ${
        isScrolled
          ? 'bg-slate-950/85 backdrop-blur-xl border-white/10 shadow-lg shadow-black/20'
          : 'bg-slate-950/35 backdrop-blur-md border-white/5'
      }`}
    >
      <div className="container mx-auto px-6 h-20 flex items-center justify-between max-w-7xl">
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
            <div className="w-10 h-10 bg-amber-500 rounded-xl flex items-center justify-center font-black text-slate-950 text-xl group-hover:scale-105 transition-transform">
              IP
            </div>
          )}

          <span className="text-white font-bold text-2xl tracking-tight">
            {logoTextPrimary}
            <span className="text-amber-500">{logoTextHighlight}</span>
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {menuItems.map((item, index) => (
            <Link
              key={`${item.label || 'item'}-${index}`}
              href={item.href || '/'}
              className={`font-medium transition-colors ${
                item.highlight
                  ? 'text-red-500 hover:text-red-400 font-bold animate-pulse'
                  : 'text-slate-300 hover:text-amber-400'
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {showWhatsappButton && (
          <div className="hidden md:flex items-center gap-4">
            <a
              href={whatsappLink}
              className="flex items-center gap-2 px-6 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-900 font-bold rounded-full transition-all"
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
        >
          {isMobileMenuOpen ? '✕' : '☰'}
        </button>
      </div>

      {isMobileMenuOpen && (
        <div className="md:hidden bg-slate-900/95 border-t border-white/10 px-6 py-4 space-y-4">
          <nav className="flex flex-col gap-4">
            {menuItems.map((item, index) => (
              <Link
                key={`${item.label || 'item'}-${index}`}
                href={item.href || '/'}
                className={`font-medium transition-colors ${
                  item.highlight
                    ? 'text-red-500 hover:text-red-400 font-bold'
                    : 'text-slate-300 hover:text-amber-400'
                }`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
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
  )
}