import type { GlobalConfig } from 'payload'

export const HeaderSettings: GlobalConfig = {
  slug: 'header-settings',
  label: 'Configurações do Header',
  access: {
    read: () => true,
  },
  fields: [
    {
      type: 'row',
      fields: [
        {
          name: 'logoTextPrimary',
          type: 'text',
          label: 'Texto principal da logo',
          defaultValue: 'IPRO',
          required: true,
          admin: { width: '50%' },
        },
        {
          name: 'logoTextHighlight',
          type: 'text',
          label: 'Texto destacado da logo',
          defaultValue: '-Saúde',
          required: true,
          admin: { width: '50%' },
        },
      ],
    },
    {
      name: 'logoImage',
      type: 'upload',
      relationTo: 'media',
      label: 'Imagem da logo',
      required: false,
    },
    {
      name: 'showWhatsappButton',
      type: 'checkbox',
      label: 'Mostrar botão de agendamento',
      defaultValue: true,
    },
    {
      type: 'row',
      fields: [
        {
          name: 'whatsappNumber',
          type: 'text',
          label: 'WhatsApp (somente números)',
          defaultValue: '5575991904849',
          admin: { width: '50%' },
        },
        {
          name: 'whatsappButtonText',
          type: 'text',
          label: 'Texto do botão',
          defaultValue: 'Agendar Avaliação',
          admin: { width: '50%' },
        },
      ],
    },
    {
      name: 'menuItems',
      type: 'array',
      label: 'Itens do menu',
      minRows: 1,
      fields: [
        {
          type: 'row',
          fields: [
            {
              name: 'label',
              type: 'text',
              label: 'Texto',
              required: true,
              admin: { width: '50%' },
            },
            {
              name: 'href',
              type: 'text',
              label: 'Link',
              required: true,
              admin: { width: '50%' },
            },
          ],
        },
        {
          name: 'highlight',
          type: 'checkbox',
          label: 'Destacar item (ex: Urgência 24h)',
          defaultValue: false,
        },
      ],
    },
  ],
}
