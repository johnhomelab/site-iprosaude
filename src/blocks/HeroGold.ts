import type { Block } from 'payload';

export const HeroGold: Block = {
  slug: 'hero-gold',
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'subtitle',
      type: 'text',
    },
    {
      name: 'botao',
      type: 'group',
      label: 'Configuração do Botão',
      fields: [
        { name: 'texto', type: 'text', label: 'Texto do Botão (Ex: Agendar Agora)' },
        { name: 'url', type: 'text', label: 'Link (Ex: https://wa.me/...)' },
        {
          name: 'cor',
          type: 'select',
          defaultValue: 'dourado',
          label: 'Cor do Botão',
          options: [
            { label: 'Verde (WhatsApp)', value: 'verde' },
            { label: 'Dourado (Padrão)', value: 'dourado' },
            { label: 'Vermelho (Emergência 24h)', value: 'vermelho' },
          ],
        },
      ],
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
    },
  ],
};