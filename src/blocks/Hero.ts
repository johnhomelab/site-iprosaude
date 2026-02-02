import type { Block } from 'payload';

export const Hero: Block = {
  slug: 'hero',
  fields: [
    {
      name: 'heading',
      type: 'text',
      required: true,
    },
    {
      name: 'text',
      type: 'textarea',
    },
    {
      name: 'backgroundImage',
      type: 'upload',
      relationTo: 'media',
    },
  ],
};
