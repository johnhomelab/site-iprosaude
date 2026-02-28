import type { Block } from 'payload';

export const Team: Block = {
  slug: 'team',
  labels: {
    singular: 'Equipe / Dentista',
    plural: 'Equipe / Dentistas',
  },
  fields: [
    {
      name: 'tituloSessao',
      type: 'text',
      defaultValue: 'Conheça nosso Especialista',
    },
    {
      name: 'membros',
      type: 'array',
      fields: [
        { name: 'nome', type: 'text', label: 'Nome (Ex: Dr. John)' },
        { name: 'cro', type: 'text', label: 'CRO (Ex: BA-17954)' },
        { name: 'especialidade', type: 'text', label: 'Especialidade' },
        { name: 'descricao', type: 'textarea', label: 'Resumo Profissional' },
        { name: 'foto', type: 'upload', relationTo: 'media', label: 'Foto do Profissional' },
      ],
    },
  ],
};