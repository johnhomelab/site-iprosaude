import type { Block } from 'payload'

export const FormLeadBlock: Block = {
  slug: 'formLead',
  labels: {
    singular: 'Formulário de Contato',
    plural: 'Formulários de Contato',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      label: 'Título',
      defaultValue: 'Prefere que a gente te ligue?',
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Descrição',
      defaultValue:
        'Deixe seus dados que nossa equipe entra em contato rapidamente.',
    },
    {
      name: 'buttonText',
      type: 'text',
      label: 'Texto do botão',
      defaultValue: 'Quero atendimento',
    },
  ],
}
