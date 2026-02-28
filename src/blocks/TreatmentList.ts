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
    // NOVO CAMPO ABAIXO:
    {
      name: 'tratamentosSelecionados',
      type: 'relationship',
      relationTo: 'tratamentos', // Tem que ser exatamente o slug da sua coleção
      hasMany: true, // Permite escolher vários
      label: 'Selecione os Tratamentos',
    },
  ],
};