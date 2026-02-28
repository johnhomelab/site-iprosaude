import type { Block } from 'payload';

export const Faq: Block = {
  slug: 'faq',
  labels: {
    singular: 'FAQ',
    plural: 'FAQs',
  },
  fields: [
    {
      name: 'titulo',
      type: 'text',
      defaultValue: 'Perguntas Frequentes',
    },
    {
      name: 'perguntas',
      type: 'array',
      fields: [
        { name: 'pergunta', type: 'text', required: true, label: 'Pergunta' },
        { name: 'resposta', type: 'textarea', required: true, label: 'Resposta' },
      ],
    },
  ],
};