import type { Block } from 'payload';

export const BeforeAfter: Block = {
  slug: 'beforeAfter',
  labels: {
    singular: 'Before & After',
    plural: 'Before & After',
  },
  fields: [
    {
      type: 'row',
      fields: [
        {
          name: 'beforeImage',
          type: 'upload',
          relationTo: 'media',
          required: true,
          label: 'Before Image (Left)',
        },
        {
          name: 'afterImage',
          type: 'upload',
          relationTo: 'media',
          required: true,
          label: 'After Image (Right)',
        },
      ],
    },
    {
      type: 'row',
      fields: [
        {
          name: 'labelBefore',
          type: 'text',
          defaultValue: 'Antes',
          label: 'Label for Before',
        },
        {
          name: 'labelAfter',
          type: 'text',
          defaultValue: 'Depois',
          label: 'Label for After',
        },
      ],
    },
  ],
};
