import { GlobalConfig } from 'payload';

export const Settings: GlobalConfig = {
  slug: 'settings',
  typescript: {
    interface: 'Settings',
  },
  graphQL: {
    name: 'Settings',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'analytics',
      label: 'Analytics & Scripts',
      type: 'group',
      fields: [
        {
          name: 'headerScripts',
          label: 'Header Scripts (GTM, Pixel, etc.)',
          type: 'code',
          admin: {
            language: 'html',
            description: 'Scripts added to the <head> of the page.',
          },
        },
        {
          name: 'bodyScripts',
          label: 'Body Scripts',
          type: 'code',
          admin: {
            language: 'html',
            description: 'Scripts added to the beginning of the <body>.',
          },
        },
      ],
    },
    {
      name: 'contact',
      label: 'Contact Information',
      type: 'group',
      fields: [
        {
          name: 'whatsapp',
          label: 'WhatsApp Number',
          type: 'text',
          admin: {
            description: 'Format: 5511999999999 (No symbols)',
          },
        },
      ],
    },
  ],
};
