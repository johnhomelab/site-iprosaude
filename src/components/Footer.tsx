import React from 'react';
import { MapPin, Phone, Instagram, MessageCircle } from 'lucide-react';
import { getFooterSettings } from '@/lib/getFooterSettings';
import { BackToTop } from './BackToTop'; // Importamos o botão que criamos

export const Footer = async () => {
  const currentYear = new Date().getFullYear();

  // Conecta ao banco de dados e busca as configurações da clínica através do cache
  const clinicData = await getFooterSettings();

  // Valores de fallback (segurança) caso o painel esteja vazio na primeira vez
  const safeData = {
    name: clinicData?.clinicName || 'IPRO-Saúde',
    phone: clinicData?.phone || '5575991904849',
    phoneFormatted: clinicData?.phoneFormatted || '(75) 99190-4849',
    address: clinicData?.address || 'Feira de Santana - BA',
    mapsQuery: clinicData?.mapsQuery || 'Feira+de+Santana',
    cro: clinicData?.cro || 'Não informado',
    cnpj: clinicData?.cnpj || 'Não informado',
    responsible: clinicData?.responsible || 'Dr. John',
    specialty: clinicData?.specialty || 'Implantes e Prótese',
    instagram: clinicData?.instagramUrl || '#',
    url: clinicData?.siteUrl || 'https://iprosaude.com.br'
  };

  const whatsappLink = `https://wa.me/${safeData.phone}`;

  // Estrutura do SEO
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Dentist",
    "name": safeData.name,
    "image": `${safeData.url}/logo.png`,
    "@id": safeData.url,
    "url": safeData.url,
    "telephone": `+${safeData.phone}`,
    "priceRange": "$$",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Feira de Santana",
      "addressRegion": "BA",
      "addressCountry": "BR"
    },
    "medicalSpecialty": ["Dentistry", "OralSurgery", "Prosthodontics"],
    "sameAs": [ safeData.instagram ]
  };

  return (
    <footer className="bg-black text-slate-300 py-16 border-t border-slate-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="container mx-auto px-6 max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          
          {/* Coluna 1 */}
          <div className="space-y-4">
            <span className="text-white font-bold text-3xl tracking-tight block">
              IPRO<span className="text-amber-500">-Saúde</span>
            </span>
            <p className="text-sm font-light leading-relaxed max-w-xs">
              Referência em implantes dentários e próteses. Devolvendo a segurança e a alegria de sorrir com precisão e atendimento humanizado.
            </p>
            <div className="flex gap-4 pt-2">
              <a href={safeData.instagram} target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-amber-400 transition-colors p-1" aria-label="Instagram">
                <Instagram className="w-5 h-5" />
              </a>
              <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-amber-400 transition-colors p-1" aria-label="WhatsApp">
                <MessageCircle className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Coluna 2 */}
          <div className="space-y-4">
            <h4 className="text-white font-bold mb-4 uppercase tracking-widest text-xs">Atendimento</h4>
            <address className="not-italic space-y-3 text-sm font-light">
              <a href={`tel:+${safeData.phone}`} className="flex items-center gap-2 hover:text-amber-400 transition-colors group">
                <span className="w-2 h-2 rounded-full bg-red-600 animate-pulse" aria-hidden="true"></span>
                <span>Plantão 24h: {safeData.phoneFormatted}</span>
                <Phone className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
              </a>
              <a href={`tel:+${safeData.phone}`} className="flex items-center gap-2 hover:text-amber-400 transition-colors group">
                <span className="w-2 h-2 rounded-full bg-amber-500"></span>
                <span>Agendamento Eletivo</span>
                <Phone className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
              </a>
              <a href={`https://www.google.com/maps/search/?api=1&query=$${safeData.mapsQuery}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-amber-400 transition-colors mt-4 pt-4 border-t border-slate-800">
                <MapPin className="w-4 h-4" />
                <span>{safeData.address}</span>
              </a>
            </address>
          </div>

          {/* Coluna 3 */}
          <div className="space-y-4">
            <h4 className="text-white font-bold mb-4 uppercase tracking-widest text-xs">Informações Legais</h4>
            <ul className="space-y-2 text-sm font-light text-slate-400">
              <li>Responsável Técnico: <span className="text-slate-300">{safeData.responsible}</span></li>
              <li>CRO-BA: <span className="text-slate-300 font-medium">{safeData.cro}</span></li>
              <li>Especialidade: <span className="text-slate-300">{safeData.specialty}</span></li>
              <li>CNPJ: <span className="text-slate-300 font-medium">{safeData.cnpj}</span></li>
            </ul>
          </div>
        </div>

        {/* Linha de Direitos */}
        <div className="pt-8 border-t border-slate-900 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-500">
          <p>© {currentYear} {safeData.name}. Todos os direitos reservados.</p>
          <div className="flex items-center gap-6">
            <BackToTop /> {/* Renderiza o botão dinâmico aqui */}
            <a href="https://efeso1.com.br" target="_blank" rel="noopener noreferrer" className="hover:text-amber-400 transition-colors">
              Desenvolvido por <span className="text-amber-500 font-medium">EfesoOne</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};