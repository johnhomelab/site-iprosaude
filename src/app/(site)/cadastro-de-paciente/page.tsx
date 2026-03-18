import type { Metadata } from 'next'
import CadastroPacientePageClient from '@/components/CadastroPacientePageClient'

export const metadata: Metadata = {
  title: 'Cadastro de Paciente | IPRO-Saúde',
  description:
    'Preencha seus dados para agilizar seu atendimento na IPRO-Saúde.',
  openGraph: {
    title: 'Cadastro de Paciente | IPRO-Saúde',
    description:
      'Preencha seus dados para agilizar seu atendimento na IPRO-Saúde.',
    images: [
      {
        url: '/cadastro-paciente-ipro-saude.png',
        width: 1200,
        height: 630,
        alt: 'Cadastro de paciente da IPRO-Saúde',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Cadastro de Paciente | IPRO-Saúde',
    description:
      'Preencha seus dados para agilizar seu atendimento na IPRO-Saúde.',
    images: ['/cadastro-paciente-ipro-saude.png'],
  },
}

export default function Page() {
  return <CadastroPacientePageClient />
}