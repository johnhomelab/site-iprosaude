import type { CollectionConfig } from 'payload'

export const Leads: CollectionConfig = {
  slug: 'leads',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'phone', 'createdAt'],
  },
  access: {
    read: () => true,
    create: () => true,
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      label: 'Nome',
      required: true,
    },
    {
      name: 'phone',
      type: 'text',
      label: 'Telefone',
      required: true,
    },
    {
      name: 'email',
      type: 'email',
      label: 'Email',
    },
    {
      name: 'pageSlug',
      type: 'text',
      label: 'Page Slug',
    },
    {
      name: 'source',
      type: 'text',
      label: 'Source',
    },
    {
      name: 'whatsapp',
      type: 'text',
      label: 'WhatsApp',
    },
    {
      name: 'isUrgent',
      type: 'checkbox',
      label: 'Urgência',
    },
    {
      name: 'message',
      type: 'textarea',
      label: 'Mensagem',
    },
  ],
}
