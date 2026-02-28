import type { Block } from 'payload';

export const Features: Block = {
  slug: 'features',
  fields: [
    {
      name: 'features',
      type: 'array',
      fields: [
        {
          name: 'icone',
          type: 'upload',
          relationTo: 'media',
          label: 'Ícone ou Imagem',
          required: false, // Não é obrigatório, caso queira só texto
        },
        {
          name: 'title',
          type: 'text',
        },
        {
          name: 'description',
          type: 'textarea',
        },
      ],
    },
  ],
};