import type { GlobalConfig } from 'payload'

export const HeaderSettings: GlobalConfig = {
  slug: 'header-settings',
  label: '🖱️Configurações do Header',
  access: {
    read: () => true,
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        // ================================
        // 🎨 ABA: APARÊNCIA
        // ================================
        {
          label: 'Aparência',
          fields: [
            {
              name: 'backgroundColor',
              type: 'text',
              label: 'Cor de fundo (hex ou rgba)',
              defaultValue: 'rgba(2,6,23,0.8)',
            },
            {
              name: 'backdropBlur',
              type: 'checkbox',
              label: 'Ativar blur no fundo',
              defaultValue: true,
            },
            {
              name: 'transparency',
              type: 'number',
              label: 'Transparência (0 a 100)',
              min: 0,
              max: 100,
              defaultValue: 80,
            },
            {
              name: 'height',
              type: 'select',
              label: 'Altura do Header',
              defaultValue: 'md',
              options: [
                { label: 'Pequeno', value: 'sm' },
                { label: 'Médio', value: 'md' },
                { label: 'Grande', value: 'lg' },
              ],
            },
          ],
        },

        // ================================
        // 🧠 ABA: LOGO
        // ================================
        {
          label: 'Logo',
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
              label: 'Imagem da logo (opcional)',
            },
          ],
        },

        // ================================
        // 📢 ABA: FAIXA DE AVISO
        // ================================
        {
          label: 'Faixa de Aviso',
          fields: [
            {
              name: 'showAnnouncement',
              type: 'checkbox',
              label: 'Mostrar faixa de aviso',
              defaultValue: false,
            },
            {
              name: 'announcementText',
              type: 'text',
              label: 'Texto da faixa de aviso',
              admin: {
                condition: (_, siblingData) => Boolean(siblingData?.showAnnouncement),
              },
            },
            {
              name: 'announcementColor',
              type: 'select',
              label: 'Cor da faixa de aviso',
              defaultValue: 'amber',
              options: [
                { label: 'Dourado', value: 'amber' },
                { label: 'Vermelho', value: 'red' },
                { label: 'Verde', value: 'green' },
              ],
              admin: {
                condition: (_, siblingData) => Boolean(siblingData?.showAnnouncement),
              },
            },
          ],
        },

        // ================================
        // 💬 ABA: WHATSAPP
        // ================================
        {
          label: 'WhatsApp',
          fields: [
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
                  label: 'Número do WhatsApp (somente números)',
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
              name: 'whatsappMessage',
              type: 'textarea',
              label: 'Mensagem automática do WhatsApp',
              defaultValue:
                'Olá! Estava no site e gostaria de agendar uma avaliação.',
              admin: {
                condition: (_, siblingData) =>
                  Boolean(siblingData?.showWhatsappButton),
              },
            },
          ],
        },

        // ================================
        // 📚 ABA: MENU
        // ================================
        {
          label: 'Menu',
          fields: [
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
                  type: 'row',
                  fields: [
                    {
                      name: 'highlight',
                      type: 'checkbox',
                      label: 'Destacar item',
                      defaultValue: false,
                      admin: { width: '50%' },
                    },
                    {
                      name: 'newTab',
                      type: 'checkbox',
                      label: 'Abrir em nova aba',
                      defaultValue: false,
                      admin: { width: '50%' },
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
  ],
}