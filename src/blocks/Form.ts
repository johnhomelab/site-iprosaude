import type { Block } from 'payload';

export const Form: Block = {
  slug: 'form',
  fields: [
    {
      name: 'title',
      type: 'text',
      label: 'Title',
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Description',
    },
    {
      name: 'showButton',
      type: 'checkbox',
      label: 'Show Button',
      defaultValue: true,
    },
    {
      name: 'buttonText',
      type: 'text',
      label: 'Button Text',
      defaultValue: 'Solicitar Atendimento',
    },
    {
      name: 'webhookUrl',
      type: 'text',
      label: 'Webhook URL',
    },
  ],
};
