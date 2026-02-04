import type { Block } from 'payload';

export const TreatmentList: Block = {
  slug: 'treatmentList',
  labels: {
    singular: 'Treatment List',
    plural: 'Treatment Lists',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      label: 'Section Title',
      defaultValue: 'Nossos Tratamentos',
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Section Description',
    },
  ],
};
