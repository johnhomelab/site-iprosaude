import type { Block } from 'payload';

export const Testimonials: Block = {
  slug: 'testimonials',
  fields: [
    {
      name: 'items',
      type: 'array',
      fields: [
        {
          name: 'name',
          type: 'text',
        },
        {
          name: 'testimonial',
          type: 'textarea',
        },
        {
          name: 'rating',
          type: 'number',
        },
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
        },
      ],
    },
  ],
};
