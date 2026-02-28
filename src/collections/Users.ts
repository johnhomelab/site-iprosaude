import type { CollectionConfig } from 'payload'

export const Users: CollectionConfig = {
  slug: 'users',
  admin: {
    useAsTitle: 'nome', // Mudamos para mostrar o Nome na lista, não o email
  },
  auth: true,
  fields: [
    // O campo Email é adicionado por padrão pelo Payload (auth: true)
    {
      name: 'nome',
      type: 'text',
      required: true,
      label: 'Nome Completo',
    },
    {
      name: 'role',
      type: 'select',
      defaultValue: 'admin',
      label: 'Nível de Acesso',
      options: [
        { label: 'Administrador (Acesso Total)', value: 'admin' },
        { label: 'Editor (Gerencia Conteúdo)', value: 'editor' },
      ],
    },
  ],
}