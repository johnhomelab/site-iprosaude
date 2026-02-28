import type { Block } from 'payload';

export const CallToAction: Block = {
  slug: 'cta',
  labels: {
    singular: 'Call to Action',
    plural: 'Calls to Action',
  },
  fields: [
    {
      name: 'text',
      type: 'text',
      label: 'Texto da Chamada (Ex: Volte a sorrir hoje mesmo)',
    },
    {
      name: 'botao',
      type: 'group',
      label: 'Configuração do Botão',
      fields: [
        { name: 'label', type: 'text', label: 'Texto do Botão' },
        { name: 'url', type: 'text', label: 'Link do Botão' },
        {
          name: 'style',
          type: 'select',
          defaultValue: 'default',
          label: 'Estilo da Seção',
          options: [
            { label: 'Padrão (Azul/Branco)', value: 'default' },
            { label: 'Urgente (Vermelho - Plantão)', value: 'urgent' },
            { label: 'Conversão (Verde - WhatsApp)', value: 'whatsapp' },
          ],
        },
      ],
    },
  ],
};