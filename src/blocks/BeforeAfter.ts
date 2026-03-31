import type { Block } from 'payload';

export const BeforeAfter: Block = {
  slug: 'beforeAfter', // Mantivemos o seu slug exato
  labels: {
    singular: 'Antes e Depois',
    plural: 'Blocos de Antes e Depois',
  },
  fields: [
    // --- 1. CONFIGURAÇÕES GLOBAIS DO BLOCO ---
    // (Aparecem apenas uma vez na tela)
    {
      name: 'title',
      type: 'text',
      label: 'Título Principal (Ex: Resultados Reais)',
      defaultValue: 'Resultados Reais. Transformações Reais.',
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Descrição / Subtítulo',
      defaultValue: 'Arraste a linha central para os lados e veja a diferença que a precisão e a tecnologia avançada podem fazer pelo seu sorriso.',
    },
    {
      name: 'layout',
      type: 'select',
      defaultValue: 'default',
      label: 'Alinhamento do Bloco',
      options: [
        { label: 'Imagens na Esquerda, Texto na Direita', value: 'default' },
        { label: 'Imagens na Direita, Texto na Esquerda', value: 'reverse' },
        { label: 'Centralizado (Título em cima, Imagens embaixo)', value: 'center' }, // Adicionei essa opção baseada no seu print!
      ]
    },
    {
      type: 'row',
      fields: [
        {
          name: 'labelBefore',
          type: 'text',
          defaultValue: 'Antes',
          label: 'Etiqueta: Antes',
          admin: { width: '50%' },
        },
        {
          name: 'labelAfter',
          type: 'text',
          defaultValue: 'Depois',
          label: 'Etiqueta: Depois',
          admin: { width: '50%' },
        },
      ],
    },

    // --- 2. A LISTA INFINITA DE FOTOS ---
    // (Onde o botão de "Adicionar" vai aparecer)
    {
      name: 'comparisons',
      type: 'array',
      label: 'Lista de Fotos (Antes e Depois)',
      minRows: 1, // Exige pelo menos 1 foto para o bloco existir
      labels: {
        singular: 'Comparação',
        plural: 'Comparações',
      },
      fields: [
        {
		  name: 'beforeImage',
          type: 'upload',
          relationTo: 'media',
          required: true,
          label: 'Imagem do Antes',
        },
        {
          name: 'afterImage',
          type: 'upload',
          relationTo: 'media',
          required: true,
          label: 'Imagem do Depois',
        },
       ],
        }
      ],
    };