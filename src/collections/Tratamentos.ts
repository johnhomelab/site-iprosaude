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
        description: 'Procedimentos que Realizamos', // O link amigável (ex: implantes-dentarios)
      },
    },
    {
      name: 'descricao',
      type: 'textarea', // Caixa de texto maior
      label: 'Resumo do Procedimento',
    },
    {
      name: 'imagemDestaque',
      type: 'upload',
      relationTo: 'media', // Relaciona com a coleção de Media que já existe
      required: false,
    },
  ],
};
