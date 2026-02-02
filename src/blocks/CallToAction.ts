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
    },
    {
      name: 'url',
      type: 'text',
    },
    {
      name: 'label',
      type: 'text',
    },
    {
      name: 'style',
      type: 'select',
      defaultValue: 'default',
      options: [
        {
          label: 'Default',
          value: 'default',
        },
        {
          label: 'Urgent',
          value: 'urgent',
        },
      ],
    },
  ],
};
