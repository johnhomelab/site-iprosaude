import type { Block } from 'payload';

export const Authority: Block = {
  slug: 'authority',
  labels: {
    singular: 'Autoridade (Especialista)',
    plural: 'Blocos de Autoridade',
  },
  fields: [
    { 
      name: 'headline', 
      type: 'text', 
      defaultValue: 'Tecnologia de ponta e especialização em cada sorriso.',
      label: 'Título Principal'
    },
    { name: 'nomeProfissional', type: 'text', defaultValue: 'Dr. John' },
    { name: 'credenciais', type: 'text', defaultValue: 'Cirurgião Dentista Especialista em Implantes e Prótese' },
    { name: 'registro', type: 'text', label: 'Número do CRO (Ex: CRO-BA 17954)' },
    { 
      name: 'descricao', 
      type: 'textarea', 
      label: 'Resumo da sua experiência e foco em resultados definitivos' 
    },
    { 
      name: 'fotoAutoridade', 
      type: 'upload', 
      relationTo: 'media', 
      label: 'Foto Profissional (Jaleco/Clinica)' 
    },
    {
      name: 'numerosDeSucesso',
      type: 'array',
      label: 'Números que geram confiança',
      fields: [
        { name: 'numero', type: 'text', label: 'Número (Ex: +500, 24h)' },
        { name: 'legenda', type: 'text', label: 'Legenda (Ex: Implantes Realizados, Plantão)' },
      ]
    }
  ],
};