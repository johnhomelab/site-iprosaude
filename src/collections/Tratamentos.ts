import { CollectionConfig } from 'payload';

export const tratamentos: CollectionConfig = {
  slug: 'tratamentos',
  admin: {
    useAsTitle: 'titulo', // O campo que vai aparecer na lista
  },
  access: {
    read: () => true, // Todo mundo pode ler (para o site mostrar)
  },
  fields: [
    {
      name: 'titulo',
      type: 'text',
      required: true,
      label: 'Nome do Tratamento',
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      admin: {
        position: 'sidebar', // Fica no cantinho direito
        description: 'O link amigável (ex: implantes-dentarios)',
      },
    },
    {
      name: 'descricao',
      type: 'textarea', // Caixa de texto maior
      label: 'Resumo do Procedimento',
    },
    {
      name: 'beneficios',
      type: 'array',
      label: 'Benefícios do Tratamento (Para o paciente)',
      fields: [
        {
          name: 'beneficio',
          type: 'text',
          label: 'Ex: Mastigação segura e firme',
        },
      ],
    },
    {
      name: 'imagemDestaque',
      type: 'upload',
      relationTo: 'media', // Relaciona com a coleção de Media
      required: false,
    },
    {
      name: 'meta',
      label: 'SEO para Google Ads',
      type: 'group',
      admin: {
        position: 'sidebar',
      },
      fields: [
        { name: 'title', type: 'text', label: 'Meta Title' },
        { name: 'description', type: 'textarea', label: 'Meta Description' },
      ],
    },
  ],
};